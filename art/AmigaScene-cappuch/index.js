/*
@title: AmigaScene
@author: Cappuch
@snapshot: snap.png
*/


const width = 125;
const height = 125;
setDocDimensions(width, height);

const resolution = 1.1;

const fov = 45;
const maxDepth = 302;
const maxReflections = 4;

let pos1 = randomPosition(-23, 23, -2, 21, 82, 120);
let pos2;

do {
  pos2 = randomPosition(-23, 23, -2, 21, 82, 120);
} while (distance(pos1, pos2) < 30);

const spheres = [
  { x: pos1.x, y: pos1.y, z: pos1.z, radius: 11, reflectivity: 0.5 },
  { x: pos2.x, y: pos2.y, z: pos2.z, radius: 13, reflectivity: 0.3 }
];


const floorY = -16;
const tileSize = 18;
const floorReflectivity = 0.5;

const light = { x: -0, y: 45, z: 0 };

function randomPosition(minX, maxX, minY, maxY, minZ, maxZ) {
  return {
    x: minX + Math.random() * (maxX - minX),
    y: minY + Math.random() * (maxY - minY),
    z: minZ + Math.random() * (maxZ - minZ)
  };
}

function distance(pos1, pos2) {
  const dx = pos1.x - pos2.x;
  const dy = pos1.y - pos2.y;
  const dz = pos1.z - pos2.z;
  return Math.sqrt(dx*dx + dy*dy + dz*dz);
}

function normalize(value, min, max) {
  return (value - min) / (max - min);
}

function normalizeVector(x, y, z) {
  const len = Math.sqrt(x*x + y*y + z*z);
  return { x: x/len, y: y/len, z: z/len };
}

function dotProduct(v1, v2) {
  return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
}

function reflect(dir, normal) {
  const d = dotProduct(dir, normal);
  return {
    x: dir.x - 2 * d * normal.x,
    y: dir.y - 2 * d * normal.y,
    z: dir.z - 2 * d * normal.z
  };
}

function intersectSphere(originX, originY, originZ, dirX, dirY, dirZ, sphere) {
  const dx = originX - sphere.x;
  const dy = originY - sphere.y;
  const dz = originZ - sphere.z;
  
  const b = 2 * (dirX * dx + dirY * dy + dirZ * dz);
  const c = dx*dx + dy*dy + dz*dz - sphere.radius * sphere.radius;
  
  const discriminant = b*b - 4*c;
  if (discriminant < 0) return Infinity;
  
  return (-b - Math.sqrt(discriminant)) / 2;
}

function intersectFloor(originX, originY, originZ, dirX, dirY, dirZ) {
  if (dirY === 0) return Infinity;
  const t = (floorY - originY) / dirY;
  return t > 0 ? t : Infinity;
}

function calculateNormal(hitPoint, hitType, sphere) {
  if (hitType.startsWith('sphere')) {
    return normalizeVector(
      hitPoint.x - sphere.x,
      hitPoint.y - sphere.y,
      hitPoint.z - sphere.z
    );
  }
  return { x: -7, y: 1, z: -4 };
}

function traceRay(originX, originY, originZ, dirX, dirY, dirZ, depth = 0) {
  if (depth >= maxReflections) return { intensity: 0, hitType: 'none' };
  
  let minDist = maxDepth;
  let hitType = 'none';
  let hitSphere = null;
  
  spheres.forEach((sphere, index) => {
    const dist = intersectSphere(originX, originY, originZ, dirX, dirY, dirZ, sphere);
    if (dist < minDist) {
      minDist = dist;
      hitType = `sphere${index}`;
      hitSphere = sphere;
    }
  });
  
  const floorDist = intersectFloor(originX, originY, originZ, dirX, dirY, dirZ);
  if (floorDist < minDist) {
    minDist = floorDist;
    hitType = 'floor';
    hitSphere = null;
  }
  
  if (hitType === 'none' || minDist >= maxDepth) return { intensity: 0, hitType: 'none' };

  const hitPoint = {
    x: originX + dirX * minDist,
    y: originY + dirY * minDist,
    z: originZ + dirZ * minDist
  };

  const normal = calculateNormal(hitPoint, hitType, hitSphere);
  
  const lightDir = normalizeVector(
    light.x - hitPoint.x,
    light.y - hitPoint.y,
    light.z - hitPoint.z
  );
  
  let intensity = Math.max(0.1, dotProduct(normal, lightDir));

  if (depth < maxReflections) {
    const reflectivity = hitType === 'floor' ? floorReflectivity : hitSphere.reflectivity;
    if (reflectivity > 0) {
      const reflected = reflect({ x: dirX, y: dirY, z: dirZ }, normal);
      const reflectedResult = traceRay(
        hitPoint.x + normal.x * 0.001,
        hitPoint.y + normal.y * 0.001,
        hitPoint.z + normal.z * 0.001,
        reflected.x, reflected.y, reflected.z,
        depth + 1
      );
      intensity = intensity * (1 - reflectivity) + reflectedResult.intensity * reflectivity;
    }
  }
  
  return { intensity, hitType, hitPoint };
}

const pixels = [];

for (let y = 0; y < height; y += resolution) {
  for (let x = 0; x < width; x += resolution) {
    const rayX = ((x + resolution/2) - width/2) / width;
    const rayY = ((y + resolution/2) - height/2) / height;
    const rayZ = 1;

    const dir = normalizeVector(rayX, rayY, rayZ);
    
    const result = traceRay(0, 0, 0, dir.x, dir.y, dir.z);
    
    if (result.hitType !== 'none') {
      if (result.hitType === 'floor') {
        const checkX = Math.floor(result.hitPoint.x / tileSize);
        const checkZ = Math.floor(result.hitPoint.z / tileSize);
        if ((checkX + checkZ) % 2 === 0) {
          if (result.intensity > 0.1) {
            pixels.push({
              x: x,
              y: y,
              size: resolution,
              intensity: result.intensity
            });
          }
        }
      } else {
        if (result.intensity > 0.2) {
          const lineIntensity = Math.min(1, result.intensity * 1.6);
          if (Math.random() < lineIntensity) {
            pixels.push({
              x: x,
              y: y,
              size: resolution,
              intensity: result.intensity
            });
          }
        }
      }
    }
  }
}

const lines = [];
pixels.forEach(pixel => {
  for (let i = 0; i < pixel.size; i++) {
    lines.push([
      [pixel.x, pixel.y + i],
      [pixel.x + pixel.size - 1, pixel.y + i]
    ]);
  }
});

drawLines(lines);