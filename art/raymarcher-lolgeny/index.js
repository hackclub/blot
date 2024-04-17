/*
@title: Blot Raymarcher
@author: lolgeny
@snapshot: img2.png
*/

/// Blot Raymarcher
/// Draws a 3D shape by raymarching and plotting crosses

const width = 125;
const height = 125;

// Increase for higher quality, but will take longer
const max_ray_iter = 500;
// Distance between pixels - decrease for higher resolution
const step = 0.5;
// Position of the camera
const camera = [0, 0, -10];
// Ambient light level
const ambient = 0.2;

// Parameters for light 1 (intensity + position)
const diffuse1 = 0.4;
const light1 = [6,7,-10];

// Parameters for light 2 (intensity + position)
const diffuse2 = 0.4;
const light2 = [-6,7,-10];

// The number of random background spheres
const n_random_spheres = 30;

setDocDimensions(width, height);

const finalLines = [];

const smoothMin = (a, b, k) => {
  const r = 2**(-a/k) + 2**(-b/k);
  return -k*Math.log2(r);
};

const sdfCircle = (p, c, r) => {
  return Math.sqrt((p[0]-c[0])**2+(p[1]-c[1])**2+(p[2]-c[2])**2) - r;
};

const sdfLink = (p, l, r1, r2) => {
  const qy = Math.max(0, Math.abs(p[0])-l);
  return Math.sqrt(p[2]**2 + (Math.sqrt(qy**2 + p[1]**2)-r1)**2) - r2;
};

var spheres = [
  [[-5, 0, 1.5], 2],
  [[-3, -3, 0], 1.5],
  [[3, -3, 0], 1.5],
  [[5, 0, 1.5], 2],
  [[-3, 3, 0], 1.5],
  [[3, 3, 0], 1.5]
];

for (var i = 0; i < n_random_spheres; ++i) {
  spheres.push([[bt.randInRange(-15, 15), bt.randInRange(-15, 15), 5], 0.5]);
}

const sdf = ([x, y, z]) => {
  // Elongation
  var z2 = z;
  if (z2 < 0) z2 = 0; if (z2 > 5) z2 = 5;
  z = z - z2;
  
  // Generate shapes
  var s = 1e6;
  spheres.forEach(sphere => {
    const a = sdfCircle([x, y, z], sphere[0], sphere[1]);
    s = smoothMin(a, s, 0.4);
  });
  const g = sdfLink([x, y, z], 2, 1.0, 0.35);

  // var i = 1e6;
  // for (var n = 0; n < n_random_spheres; ++n) {
    // const x = bt.randInRange();
  // }

  // Smooth, blending min
  return smoothMin(s, g, 0.4);
};

// Calculates the normal vector of the sdf
const delta = 1e-5;
const normal = ([x, y, z]) => {
  const dx = sdf([x+delta, y, z])-sdf([x-delta, y, z]);
  const dy = sdf([x, y+delta, z])-sdf([x, y-delta, z]);
  const dz = sdf([x, y, z+delta])-sdf([x, y, z-delta]);
  return normalise([dx,dy,dz]);
}

// Convert screen coords to world space
const screenToWorld = (x, y) => {
  return [7*(x/width - 0.5), 7*(y/height - 0.5), -6];
};

// Util function for creating unit vectors
const normalise = ([x, y, z]) => {
  const size = Math.sqrt(x*x+y*y+z*z);
  return [x/size, y/size, z/size];
};

// Calculate diffuse lighting in accordance with the Phong model
const diffuse = (norm, ray, light, d) => {
  const dtl = normalise([light[0]-ray[0], light[1]-ray[1], light[2]-ray[2]]);
  return (norm[0]*dtl[0] + norm[1]*dtl[1] + norm[2]*dtl[2])*d;
};

// Render a pixel at brightness 0 <= b <= 1 (brighter results in a lighter result)
const plot_pixel = (x, y, b) => {
  if (b < 0) b = 0;
  if (b > 1) b = 1;
  b = 1 - b;
  if (b == 0) return;
  bt.join(finalLines, [[[x, y], [x+b, y+b]], [[x+b,y],[x,y+b]]]);
}

// Raymarching loop
for (var x = 0; x < width; x+=step) {
  for (var y = 0; y < height; y+=step) {
    const pos = screenToWorld(x, y);
    var ray = pos;
    var dir = normalise([pos[0]-camera[0], pos[1]-camera[1], pos[2]-camera[2]]);
    var s = sdf(ray);
    for (var i = 0; i < max_ray_iter; ++i) {
      if (s < 0.01) break;
      if (ray[2] > 10) break;
      ray = [ray[0]+s*dir[0], ray[1]+s*dir[1], ray[2]+s*dir[2]];
      s = sdf(ray);
    }
    if (s < 0.01) {
      const norm = normal(ray);
      const l1 = diffuse(norm, ray, light1, diffuse1);
      const l2 = diffuse(norm, ray, light2, diffuse2);
      const brightness = l1 + l2 + ambient;
      plot_pixel(x, y, brightness);
    }
  }
}

// draw it
drawLines(finalLines);