/*
@title: Blot Raytracer (Ascii Art)
@author: HyperTNTClown
@snapshot: img.png
*/

// Everything should scale accordingly, regardless of the aspect ratio
const width = 256;
const height = 256;
setDocDimensions(width, height);

// will affect both the result with just lines and 
// the one with real pixels due to the spheres reflecting it
const backgroundColour = [241, 243, 264];


// set this to true to see the real raytraced result instead of the lines
const colouredSquares = false

// A higher value does allow for complexer/deeper reflections, but this comes
// with a huge impact on performance, I would not really recommend setting this
// any higher.
const recursionDepth = 20

const lineWidth = 1.0
const letterScale = 1

// This stepsize will only be used when generating the Ascii art. It will determine how many rows will be rendered.
// With the default value of 2 it will for example always skip over one row and one column each iteration (works best with the current lineWith and letterScale)
const stepSize = 2

// The following values control the scene
const scene = {
  spheres: [
    { radius: 0.3, center: [0, -0.8, 2], colour: [255, 0, 0], specular: 1, reflective: 0.7 },
    { radius: 0.7, center: [-2, -0.8, 19], colour: [50, 100, 120], specular: 10, reflective: 0 },
    { radius: 0.3, center: [-0.4, -0.8, 2], colour: [255, 0, 0], specular: 276, reflective: .8 },
    { radius: 0.75, center: [1, 0, 6], colour: [255, 221, 255], specular: 250, reflective: 0.8 },
    { radius: 1000.0, center: [-4, -1001, 18], colour: [0, 0, 0], specular: 1000, reflective: 0.3 },
  ],
  triangles: [
    { vert0: [0, 0.5, 6], vert1: [1, 2.4, 4], vert2: [-1, 0, 4], colour: [0, 0, 0], specular: 13, reflective: 0.7 }
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
// letters can be easily expanded by just adding a new entry into the object and idk array
const letters = {
  'idx': ['$', '@', 'B', 'X', 'I', 'i', ':', '_', '.', ' '],
  '$': () => [
    [
      [1, 1],
      [.5, 1.2],
      [0, 1],
      [0, .6],
      [1, .4],
      [1, 0],
      [.5, -.2],
      [0, 0]
    ],
    [
      [.5, 1.5],
      [.5, -.5]
    ]
  ],
  '@': () => [
    [
      [.75, 0],
      [0, 0],
      [0, 1],
      [1, 1],
      [1, .25],
      [.25, .25],
      [.25, .75],
      [.75, .75],
      [.75, .25]
    ]
  ],
  'B': () => [
    [
      [0, 1],
      [.75, 1],
      [.75, .5],
      [0, .5],
      [.75, .5],
      [.75, 0],
      [0, 0]
    ],
    [
      [0, 0],
      [0, 1]
    ]
  ],
  'X': () => [
    [
      [0, 0],
      [1, 1]
    ],
    [
      [0, 1],
      [1, 0],
    ]
  ],
  'I': () => [
    [
      [.35, .1],
      [.35, .2],
      [.45, .2],
      [.45, .8],
      [.35, .8],
      [.35, .9],
      [.65, .9],
      [.65, .8],
      [.55, .8],
      [.55, .2],
      [.65, .2],
      [.65, .1],
      [.35, .1]
    ]
  ],
  'i': () => [
    [
      [.35, .1],
      [.35, .2],
      [.45, .2],
      [.45, .7],
      [.55, .7],
      [.55, .2],
      [.65, .2],
      [.65, .1],
      [.35, .1]
    ],
    [
      [.45, .9],
      [.45, .8],
      [.55, .8],
      [.55, .9],
      [.45, .9]
    ]
  ],
  ':': () => [
    [
      [.45, .1],
      [.45, .2],
      [.55, .2],
      [.55, .1],
      [.45, .1]
    ],
    [
      [.45, .9],
      [.45, .8],
      [.55, .8],
      [.55, .9],
      [.45, .9]
    ]
  ],
  '_': () => [
    [
      [.1, .1],
      [.1, .2],
      [.9, .2],
      [.9, .1],
      [.1, .1]
    ]
  ],
  '.': () => [
    [
      [.45, .1],
      [.45, .2],
      [.55, .2],
      [.55, .1],
      [.45, .1]
    ]
  ],
  ' ': () => [
    [
      []
    ]
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

const closestIntersection = (origin, direction, t_min, t_max) => {
  let closest_t = Infinity
  let closest = null
  for (let sphere of scene.spheres) {
    let t = intersectRaySphere(origin, direction, sphere);
    let t1 = t[0]
    let t2 = t[1]
    if (t1 >= t_min && t1 <= t_max && t1 < closest_t) {
      closest_t = t1;
      closest = sphere;
      closest.type = "sphere"
    }
    if (t2 >= t_min && t2 <= t_max && t2 < closest_t) {
      closest_t = t2;
      closest = sphere;
      closest.type = "sphere";
    }
  }
  for (let trig of scene.triangles) {
    let t = intersectRayTriangle(origin, direction, trig);
    if (t[0] >= t_min && t[0] <= t_max && t[0] < closest_t) {
      closest_t = t[0];
      closest = trig;
      closest.normal = t[1]
      closest.type = "triangle";
    }
  }
  return { closest_t: closest_t, closest: closest }
}

const traceRay = (origin, direction, t_min, t_max, recursion_depth) => {
  let res = closestIntersection(origin, direction, t_min, t_max)
  let closest_t = res.closest_t
  let closest = res.closest

  if (closest == null) {
    return backgroundColour
  }

  let pos = origin.map((_, i) => origin[i] + closest_t * direction[i])
  let normal;
  if (closest.type == "sphere") {
    normal = pos.map((_, i) => pos[i] - closest.center[i])
  } else {
    normal = closest.normal
  }
  // normalize the normal - duh
  normal = normal.map((_, i) => normal[i] / length(normal))
  let factor = computeLightning(pos, normal, direction.map((el) => -el), closest.specular)
  let local_colour = closest.colour.map((el) => el * factor)

  let r = closest.reflective
  if (recursion_depth <= 0 || r <= 0) {
    return local_colour
  }

  let R = reflectRay(direction.map((el) => -el), normal)
  let reflected_colour = traceRay(pos, R, 0.001, Infinity, recursion_depth - 1)

  return local_colour.map((_, i) => local_colour[i] * (1 - r) + reflected_colour[i] * r)
}

const dot = (a, b) => a.map((_, i) => a[i] * b[i]).reduce((m, n) => m + n);
const length = (a) => Math.sqrt(a.map((el) => el * el).reduce((m, n) => m + n));
const cross = (a, b) => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0]
]

const reflectRay = (R, N) => {
  return N.map((_, i) => 2 * N[i] * dot(N, R) - R[i]);
}

const intersectRaySphere = (origin, direction, sphere) => {
  let r = sphere.radius
  let C0 = origin.map((_, i) => origin[i] - sphere.center[i]);

  let a = dot(direction, direction);
  let b = 2 * dot(C0, direction);
  let c = dot(C0, C0) - r * r;

  let discr = b * b - 4 * a * c;
  if (discr < 0) {
    return [Infinity, Infinity]
  }

  let t1 = (-b + Math.sqrt(discr)) / (2 * a)
  let t2 = (-b - Math.sqrt(discr)) / (2 * a)
  return [t1, t2]
}

const intersectRayTriangle = (origin, direction, triangle) => {
  let edge0 = triangle.vert0.map((_, i) => triangle.vert1[i] - triangle.vert0[i]);
  let edge1 = triangle.vert0.map((_, i) => triangle.vert2[i] - triangle.vert0[i]);
  let normal = cross(edge0, edge1)
  normal = normal.map((_, i) => normal[i] / length(normal))

  let distance = -dot(normal, triangle.vert0)
  let nrml_dot_dir = dot(normal, direction);
  if (nrml_dot_dir == 0) {
    return Infinity
  }
  let t = -(dot(normal, origin) + distance) / nrml_dot_dir;
  if (t < 0) {
    return Infinity
  }
  let hit = origin.map((_, i) => origin[i] + (t * direction[i]));
  let edge2 = triangle.vert0.map((_, i) => triangle.vert0[i] - triangle.vert2[i])
  let C0 = hit.map((el, i) => el - triangle.vert0[i])
  let C1 = hit.map((el, i) => el - triangle.vert1[i])
  let C2 = hit.map((el, i) => el - triangle.vert2[i])

  if (dot(normal, cross(edge0, C0)) < 0) {
    return Infinity
  }

  if (dot(normal, cross(edge1, C1)) < 0) {
    return Infinity
  }

  if (dot(normal, cross(edge2, C2)) < 0) {
    return Infinity
  }

  return [t, normal]
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

let step = colouredSquares ? 1 : stepSize;

for (let y = 0; y < height; y += step) {

  for (let x = 0; x < width; x += step) {
    let dir = canvasToWorld(x, y);
    let colour = traceRay(cameraOrigin, dir, 1, Infinity, recursionDepth);

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
      let chosen = letters['idx'][Math.round(Math.min(gColour, 255) / 255 * (letters['idx'].length - 1))]
      let e = letters[chosen]
      let f = e()
      let letter = bt.translate(f, [x, y])
      letter = bt.scale(letter, letterScale)
      lines = bt.join(lines, letter)
    }


  }
}

if (colouredSquares) {
  for (let el in lines) {
    drawLines(lines[el].lines, { fill: `rgb(${lines[el].colour[0]}, ${lines[el].colour[1]}, ${lines[el].colour[2]})`, width: 1, stroke: `rgb(${lines[el].colour[0]}, ${lines[el].colour[1]}, ${lines[el].colour[2]})` })
  }
} else {

    const cc = bt.bounds(lines).cc;
  bt.translate(lines, [width / 2, height / 2], cc);

  drawLines(lines, { width: lineWidth });

}
