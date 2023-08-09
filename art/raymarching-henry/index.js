const screenWidth = 4
const screenHeight = 2
const dx = 0.01
const dy = 0.01

const t = new Turtle()

class Vec3 {
    constructor(x, y, z) {
        this.x = x
        this.y = y
        this.z = z
    }
    add(other) {
        return new Vec3(other.x + this.x, other.y + this.y, other.z + this.z)
    }
    subtract(other) {
        return new Vec3(this.x - other.x, this.y - other.y, this.z - other.z)
    }
    dist(other) {
        return Math.sqrt((other.x - this.x)**2 + (other.y - this.y)**2 + (other.z - this.z)**2)
    }
    scale(scalar) {
        return new Vec3(this.x * scalar, this.y * scalar, this.z * scalar)
    }
    magnitude() {
        return this.dist(new Vec3(0, 0, 0))
    }
    normalized() {
      return this.scale(1/this.magnitude())
    }
    dot(other) {
      return (this.x * other.x + this.y * other.y + this.z * other.z)
    }
}

class Sphere {
    constructor(pos, radius) {
        this.pos = pos
        this.radius = radius
    }
    SDF(pos) {
        return (pos.dist(this.pos) - this.radius)
    }
}

class NoisySphere {
    constructor(pos, radius, noiseScale, noiseAmp) {
        this.pos = pos
        this.radius = radius
        this.noiseScale = noiseScale
        this.noiseAmp = noiseAmp
    }
    SDF(pos) {
        return (pos.dist(this.pos) - this.radius) + this.noiseAmp * noise([pos.x * this.noiseScale + 10, pos.y * this.noiseScale - 7, pos.z * this.noiseScale + 2])
    }
}

class Cube {
    constructor(pos, size) {
        this.pos = pos
        this.size = size
    }
    SDF(pos) {
        return Math.max(Math.abs(pos.x - this.pos.x), Math.abs(pos.y - this.pos.y), Math.abs(pos.z - this.pos.z)) - this.size
    }
}

class Plane {
    constructor(pos) {
        this.pos = pos
    }
    SDF(pos) {
        return pos.y - this.pos.y
    }
}

class LightSource {
    constructor(pos, size) {
        this.pos = pos
        this.size = size
    }
}

function computeNormal(pos, obj) {
  let startSDF = obj.SDF(pos)
  return new Vec3(
    obj.SDF(pos.add(new Vec3(0.001, 0, 0))) - startSDF,
    obj.SDF(pos.add(new Vec3(0, 0.001, 0))) - startSDF,
    obj.SDF(pos.add(new Vec3(0, 0, 0.001))) - startSDF
  ).normalized()
}

class Camera {
    constructor(pos, fov, clipDist) {
        this.pos = pos
        this.fov = fov
        this.clipDist = clipDist
    }
    getRay(x, y, world) {
      let ray = new Ray(this.pos, new Vec3(x, y, this.fov))
      return ray.cast(world.objects, this)
    }
    getShadow(pos, world) {
      for (let i in world.lightSources) {
        let size = world.lightSources[i].size
        let randOffset = new Vec3(Math.random() * size, Math.random() * size, Math.random() * size)
        let diff = world.lightSources[i].pos.add(randOffset).subtract(pos)
        let ray = new Ray(pos, diff.scale(1))
        if (ray.getTarget(world.lightSources[i].pos.add(randOffset), world.objects, this)) return true
      }
      return false
    }
}


class Ray {
    constructor (pos, dir) {
        this.pos = pos
        this.dir = dir
    }
    travel(dist) {
        this.pos = this.pos.add(this.dir.scale(dist))
    }
    cast(objects, camera) {
        let closestDist = Infinity
        let minDist = 0.01
        let maxDist = camera.clipDist
        let hitObj = null
        while ((closestDist > minDist) && (this.pos.dist(camera.pos) < maxDist)) {
          closestDist = Infinity
            for (let obj in objects) {
                let dist = objects[obj].SDF(this.pos)
                if (dist < closestDist) {
                    closestDist = dist
                    hitObj = objects[obj]
                }
            }
            this.travel(closestDist)
          
        }
        return [closestDist < minDist, hitObj, this.pos]
    }
    getTarget(target, objects, camera) {
        let closestDist = Infinity
        let minDist = 0.05
        let maxDist = 80
        let hitObj = null
        this.travel(0.01)
        while ((closestDist > minDist) && (this.pos.dist(camera.pos) < maxDist)) {
            for (let obj in objects) {
                let dist = objects[obj].SDF(this.pos)
                if (dist < closestDist) {
                    closestDist = dist
                    hitObj = objects[obj]
                }
            }
            let dist = target.dist(this.pos)
                if (dist < 0.2) {
                    return true
                }
            this.travel(0.05 * closestDist)
          
        }
        return false
    }
}

class World {
    constructor (objects, lightsources) {
        this.objects = objects
        this.lightsources = lightsources
    }
}

function drawPixel(x, y, w, h, brightness) {
    x += 1
    y += 0.5
    x *= 50
    y *= -50
    w *= 50
    h *= 50
  t.up()
  t.goto([x, y])
  t.down()
  //t.goto([x + w, y])
  //t.goto([x + w, y + h])
  //t.goto([x, y + h])
  if (brightness < Math.random()) {
    t.goto([x + w, y + h])
    t.goto([x, y])
    if (brightness < Math.random() * 0.5) {
      t.goto([x + w, y])
      t.goto([x, y + h])
      t.goto([x + w, y + h])
      t.goto([x, y])
    }
  }
}

function renderFrame(camera) {
  
  for (let y = -screenHeight/2; y < screenHeight/2; y+= dy) {
    for (let x = -screenWidth/2; x < screenHeight/2; x+= dx) {
      let [hit, hitObj, rayPos] = camera.getRay(x, y, world)
      if (hit) {
        let noShadow = camera.getShadow(rayPos, world)
        let brightness = 0;
        if (noShadow) {
          let norm = (computeNormal(rayPos, hitObj))
          for (let i in world.lightSources) {
          brightness += norm.dot(
            world.lightSources[i].pos.subtract(rayPos).normalized()
          ) 
          }
          brightness /= world.lightSources.length
        }
        drawPixel(x, y, dx, dy, brightness)
      } else {
        t.up()
        t.goto([x, y])
      }
    }
    t.up()
    t.goto([-3, 0])
    t.down()
  }
}

const cam = new Camera(new Vec3(0, 0, 0), 1.0, 20)
const world = new World()
world.lightSources = [new LightSource(new Vec3(20, 10, -5), 5)]
 world.objects = [
  new Cube(new Vec3(-2.09, -2, 9.2), 1),
  new Cube(new Vec3(-4.9, -2, 6.3), 1),
  new Cube(new Vec3(1.2, -2, 7.2), 1),
  new Plane(new Vec3(0, -3, 0))
 ]
renderFrame(cam)
drawTurtles(t) 