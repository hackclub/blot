/*
@title: Blot Raytracer (SinArt Filtered)
@author: HyperTNTClown
@snapshot: img.png
*/

// Everything should scale accordingly, regardless of the aspect ratio
const width = 256;
const height = 256;
setDocDimensions(width, height);

// will affect both the result with just lines and 
// the one with real pixels due to the spheres reflecting it
const backgroundColour = [255, 25, 196];


// set this to true to see the real raytraced result instead of the lines
const colouredSquares = false

// A higher value does allow for complexer/deeper reflections, but this comes
// with a huge impact on performance, I would not really recommend setting this
// any higher.
const recursionDepth = 2

// Changing values in here should be fairly trivial
const scene = {
  spheres: [
    { radius: 0.5, center: [0, -0.8, 2], colour: [255, 0, 0], specular: 10, reflective: 1.8 },
    { radius: 0.75, center: [1, 0, 3], colour: [255, 221, 255], specular: 250, reflective: 0.8 },
    { radius: 1000.0, center: [-4, -1001, 18], colour: [0, 0, 0], specular: 1000, reflective: 0.3 },
  ],
  lights: [{
      type: "ambient",
      intensity: 0.3
    },
    {
      type: "point",
      intensity: 1.1,
      position: [-17, 5, -5]
    },
    {
      type: "directional",
      intensity: 1.5,
      direction: [33, 4, 4]
    }
  ]
}

const cameraOrigin = [0, 0, 0];


const canvasToWorld = (x, y) => {
  //real nice centered stuffz regardless of size and aspect ratio
  if (width > height) {
    return [x / height - (width / height) / 2, y / height - .5, 1]
  } else {
    return [x / width - .5, y / width - (height / width) / 2, 1]
  }
}

const closestIntersection = (origin, position, t_min, t_max) => {
  let closest_t = Infinity
  let closest_sphere = null
  for (let sphere of scene.spheres) {
    let t = intersectRaySphere(origin, position, sphere);
    let t1 = t[0]
    let t2 = t[1]
    if (t1 >= t_min && t1 <= t_max && t1 < closest_t) {
      closest_t = t1;
      closest_sphere = sphere;
    }
    if (t2 >= t_min && t2 <= t_max && t2 < closest_t) {
      closest_t = t2;
      closest_sphere = sphere;
    }
  }
  return { closest_t: closest_t, closest_sphere: closest_sphere }
}

const traceRay = (origin, position, t_min, t_max, recursion_depth) => {
  let res = closestIntersection(origin, position, t_min, t_max)
  let closest_t = res.closest_t
  let closest_sphere = res.closest_sphere

  if (closest_sphere == null) {
    return backgroundColour
  }

  let pos = origin.map((_, i) => origin[i] + closest_t * position[i])
  let normal = pos.map((_, i) => pos[i] - closest_sphere.center[i])
  // normalize the normal - duh
  normal = normal.map((_, i) => normal[i] / length(normal))
  let factor = computeLightning(pos, normal, position.map((el) => -el), closest_sphere.specular)
  let local_colour = closest_sphere.colour.map((el) => el * factor)

  let r = closest_sphere.reflective
  if (recursion_depth <= 0 || r <= 0) {
    return local_colour
  }

  let R = reflectRay(position.map((el) => -el), normal)
  let reflected_colour = traceRay(pos, R, 0.001, Infinity, recursion_depth - 1)

  return local_colour.map((_, i) => local_colour[i] * (1 - r) + reflected_colour[i] * r)
}

const dot = (a, b) => a.map((_, i) => a[i] * b[i]).reduce((m, n) => m + n);
const length = (a) => Math.sqrt(a.map((el) => el * el).reduce((m, n) => m + n));

const reflectRay = (R, N) => {
  return N.map((_, i) => 2 * N[i] * dot(N, R) - R[i]);
}

const intersectRaySphere = (origin, position, sphere) => {
  let r = sphere.radius
  let C0 = origin.map((_, i) => origin[i] - sphere.center[i]);

  let a = dot(position, position);
  let b = 2 * dot(C0, position);
  let c = dot(C0, C0) - r * r;

  let discr = b * b - 4 * a * c;
  if (discr < 0) {
    return [Infinity, Infinity]
  }

  let t1 = (-b + Math.sqrt(discr)) / (2 * a)
  let t2 = (-b - Math.sqrt(discr)) / (2 * a)
  return [t1, t2]
}

const computeLightning = (position, normal, V, s) => {
  let i = 0.0
  for (let il in scene.lights) {
    let light = scene.lights[il]
    if (light.type == "ambient") {
      i += light.intensity
    } else {
      let L = null
      let t_max = Infinity
      if (light.type == "point") {
        L = position.map((_, i) => light.position[i] - position[i])
        t_max = 1
      } else {
        L = light.direction
      }

      let res = closestIntersection(position, L, 0.001, t_max)
      let shadow_sphere = res.closest_sphere
      let shadow_t = res.closest_t
      if (shadow_sphere != null) {
        continue
      }

      // diffusé~
      let n_dot_l = dot(normal, L)
      if (n_dot_l > 0) {
        i += light.intensity * n_dot_l / (length(normal) * length(L))
      }

      // speculaír
      if (s != -1) {
        let R = normal.map((_, i) => 2 * normal[i] * dot(normal, L) - L[i])
        let r_dot_v = dot(R, V)
        if (r_dot_v > 0) {
          let base = r_dot_v / (length(R) * length(V))
          let exp = s
          let result = Math.pow(base, exp)
          i += light.intensity * result
        }
      }
    }
  }
  return i
}

let lines;
if (colouredSquares) {
  lines = {};
} else {
  lines = [];
}

const lerp = (a, b, alpha) => {
  return a + alpha * (b - a)
}

const t = new bt.Turtle();

for (let y = 0; y < height; y+=2) {
  let factor = 1;
  t.up()
  t.goTo([0, y])
  t.down()

  for (let x = 0; x < width; x++) {
    let pos = canvasToWorld(x, y);
    let colour = traceRay(cameraOrigin, pos, 1, Infinity, recursionDepth);

    let gColour = colour[0] * 0.3 + colour[1] * 0.59 + colour[2] * 0.11
    gColour = Math.round(gColour)

    if (colouredSquares) {
      if (!lines[colour.toString()]) {
        lines[colour.toString()] = {
          colour: colour,
          lines: []
        }
      }

      let pixel = [
        [x, y],
        [x + 1, y],
        [x + 1, y + 1],
        [x, y + 1],
        [x, y]
      ];

      lines[colour.toString()].lines.push(pixel);
    } else {

      for (let smolX = x; smolX < x + 1; smolX += 0.01) {
        factor = lerp(factor, smolX * gColour / 255, 0.06)
        let sin_change = Math.max(-2, Math.min(2, Math.sin(factor * 1) * gColour / 270));
        t.goTo([smolX, y + sin_change * 1.5]);
      }
    }


  }
}

if (colouredSquares) {
  for (let el in lines) {
    drawLines(lines[el].lines, { fill: `rgb(${lines[el].colour[0]}, ${lines[el].colour[1]}, ${lines[el].colour[2]})`, width: 1, stroke: `rgb(${lines[el].colour[0]}, ${lines[el].colour[1]}, ${lines[el].colour[2]})` })
  }
} else {

  bt.join(lines, t.lines());
  console.log(lines)

  const cc = bt.bounds(lines).cc;
  bt.translate(lines, [width / 2, height / 2], cc);

  for (let el in lines) {
    lines[el] = bt.nurbs(lines[el], { steps: 1000, degree: 8 })
  }
  drawLines(lines);

}
