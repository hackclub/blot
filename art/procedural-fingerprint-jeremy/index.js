/*
@title: Procedural Fingerprint
@author: jer
@snapshot: 0.png
*/
const random = Math.random
/*

This Blot program programmatically generates and
draws a fingerprint.

The steps it takes are roughly as follows:

1. Generate about 8,000 random evenly-spaced
   "seed" points within the ellipse in a random
   order.
2. Start a turtle at each of those points. The
   turtle walks, following a complicated 2D noise
   function based on a combination of 2D
   arctangent and simplex noise.
3. When the turtle hits the edge or gets too close
   to another line it stops. If its line is long
   enough, it gets added to the list.
4. From the fingerprint, random points near the
   edges are randomly removed.
5. The completed fingerprint is displayed or
   plotted with your Blot machine.

*/



////////// Parameters

/**
 * Size of the fingerprint
 * Half of the width and height of the
 * fingerprint (the radii, radius
 * plural is radii)
 * @type {[x: number, y: number]}
 */
const ellipseRadii = [rr(43, 47), rr(55, 61)]

/**
 * Where the core of the fingerprint
 * (where the lines revolve around) should
 * be on the X axis. [1, -1], 1 is the
 * top, 1 is the bottom
 */
const corePosition = rr(0, -0.35)

/**
 * Which direction the fingerprint should
 * spiral. One of 'clockwise',
 * 'counterclockwise', 'random', or a
 * number (advanced, ccw = 90, cw = -90).
 * @type {'clockwise' | 'counterclockwise' | 'random' | number}
 */
const patternDirection = 'random'

// How long each line should be
const minLineLength = 10
const maxLineLength = 100

/**
 * How much to 'zoom' into the noise
 * Higher values produce a smoother fingerprint, while
 * lower values add more detail and roughness.
 */
const noiseZoom = 285

/** How much to smooth each line */
const turnSmoothing = 3

/** How close are lines allowed to be to each other */
const nearbyThreshold = 2

// How much to 'dither' the edges of the fingerprint
const dither = true
const ditherSize = rr(0.3, 0.5)
const ditherStrength = rr(0.05, 0.2)

/** Add arrows, just for fun (disables dithering) */
const arrows = false



////////// Setup

const width = 125
const height = 125
setDocDimensions(width, height)


// Variable to allow other sources of randomness
// I have noticed that using bt.rand will give one of
// only a few different possible fingerprints, but
// Math.random generates many.
// Perhaps Blot's PRNG is faulty and has noticable
// patterns? I doubt it, but I'm not sure.

random // Defined above so it can be used in the parameters

// // Use the browser's random function
// const random = Math.random

// // Use Blot's seedable PRNG
// const random = bt.rand
// bt.setRandSeed(1337)

// // Use Alea, a seedable PRNG (see bottom of this file)
// const Alea = alea()
// const random = new Alea(1337)


// Simplex noise is higher quality than built-in perlin
// noise, and the API is nicer, so I am using the
// npm:simplex-noise package. See the bottom of this
// script for more information.
const { createNoise2D } = simplexNoise()
/**
  @type {(x: number, y: number) => number} returns 0 to 1
  @see https://www.npmjs.com/package/simplex-noise#2d
*/
const noise2D = createNoise2D(random)



////////// Some helping math

const center = [width / 2, height / 2]
const ellipse = point => ellipseValue(
  center,
  ellipseRadii,
  point,
)
const pointInShape = point => ellipse(point) <= 1

const corePos = [
  center[0],
  center[1] + ellipseRadii[1] * corePosition
]

/**
 * Determines the shape of the base circular
 * pattern that guides the fingerprint.
 * It is the number of degrees left from
 * pointing directly outwards, so 90 creates
 * a counterclockwise shape and -90 makes it
 * clockwise. Any other value will make it
 * spiral more strongly.
 * @type {number}
 */
let patternTurn
if (typeof patternDirection === 'number') {
  patternTurn = patternDirection
} else if (patternDirection === 'counterclockwise') {
  patternTurn = 90
} else if (patternDirection === 'clockwise') {
  patternTurn = -90
} else if (patternDirection === 'random') {
  patternTurn = pickRandom(90, -90)
} else {
  throw new Error(
    `Invalid value for patternDirection: ${
      JSON.stringify(patternDirection)
    }`
  )
}

/**
 * Get the angle that a line at pos will try
 * to follow
 * @param pos {[x: number, y: number]}
 */
const getTargetAngle = pos => {

  const normalizedPos = [
    (pos[0] - corePos[0]) / ellipseRadii[0],
    (pos[1] - corePos[1]) / ellipseRadii[1],
  ]
  /** Pattern that would create perfect circles */
  const baseAngle = norm(atan2(normalizedPos) + patternTurn)

  /** Sampled from simplex noise, random */
  const noiseAngle = noiseInRange(
    pos.map(n => n / noiseZoom),
    0,
    360,
  )

  /** How strong the noise should be, 0 to 1 */
  const noiseStrength = remapRange(
    center[1] + ellipseRadii[1],
    center[1] - ellipseRadii[1],
    0,
    1,
    pos[1],
  )

  /** Angle between base and noise, scaled down */
  const noiseDiff = clamp(
    angleDiff(baseAngle, noiseAngle) * noiseStrength,
    -10,
    10,
  )
  
  const angle = norm(baseAngle + noiseDiff)
  return angle
}



//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

////////// Main algorithm

// Generate a set of seeds to start lines from
const seeds = []
const seedSpacing = 1
const seedShuffle = 1
for (const x of range(
  0,
  width,
  seedSpacing,
)) {
  for (const y of range(
    0,
    height,
    seedSpacing,
  )) {
    const point = [
      x + remapRange(-seedShuffle, seedShuffle, 0, 1, random()),
      y + remapRange(-seedShuffle, seedShuffle, 0, 1, random()),
    ]
    if (pointInShape(point)) {
      seeds.push(point)
    }
  }
}

// Use the seeds in a random order
shuffleArray(seeds)

// Draw lines from the seeds
const lines = []
for (const seed of seeds) {
  const t = new bt.Turtle()
  t.jump(seed)
  t.angle = getTargetAngle(t.pos)

  // "Walk", following the noise given by getTargetAngle
  for (let i = 0; i < maxLineLength; i++) {
    // Stop if too close to the edge or another line
    if (!pointInShape(t.pos)) break
    if (hasNearbyPolylines(
      lines,
      t.pos,
      nearbyThreshold
    )) break

    // Move
    t.forward(1)

    // Turn in the direction of the noise
    const targetAngle = getTargetAngle(t.pos)
    const diff = angleDiff(t.angle, targetAngle)
    t.left(diff / turnSmoothing)
  }
  // Draw an arrowhead, if enabled
  if (arrows) {
    t.right(210)
    t.forward(1)
    t.forward(-1)
    t.right(-60)
    t.forward(1)
  }

  // Only add the line to the list if it is long enough
  const newLine = t.lines()
  const length = newLine.reduce((a, c) => a + c.length, 0)
  if (length > minLineLength) bt.join(lines, newLine)
}

// Remove random points near the edge
if (dither && !arrows) {
  bt.iteratePoints(lines, (point, t) => {
    // This value is 0 at the center to 1 at the edge
    const pointValue = ellipse(point)
    /** The chance this point should be removed */
    const removalChance = clamp(remapRange(
      1 - ditherSize,
      1,
      0,
      ditherStrength,
      pointValue,
    ), 0, 1)
  
    if (random() < removalChance) return 'BREAK'
    return point
  })
}

// bt.resample(lines, 1)

drawLines(lines)

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////



////////// Logging

// throw new Error(lines.length)
console.log(lines.length, 'polylines')
console.log(
  lines.reduce((a, c) => a + c.length, 0),
  'points',
)



////////// Helper functions

function distance([ax, ay], [bx, by]) {
  return ((ax - bx) ** 2 + (ay - by) ** 2) ** 0.5
}
function isInBox(
  [x, y],
  [minX, minY],
  [maxX, maxY],
  padding = 0,
) {
  if (x <= minX + padding) return false
  if (x >= maxX - padding) return false
  if (y <= minY + padding) return false
  if (y >= maxY - padding) return false
  return true
}
function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max)
}
function rr(min, max) {
  return remapRange(0, 1, min, max, random())
}
/** max is exclusive */
function randomInt(min, max) {
  return Math.floor(rr(min, max))
}
function pickRandom(...array) {
  if (array.length === 1) array = array[0]
  const index = randomInt(0, array.length)
  return array[index]
}
function norm(angle) {
  angle %= 360
  if (angle < 0) angle += 360
  return angle
}
/**
 * @see {Math.atan2} but it takes
 * an array [x, y] and returns
 * degrees. Used for converting a
 * point to an angle.
 */
function atan2([x, y]) {
  return norm(Math.atan2(y, x) * (180 / Math.PI))
}
/**
 * smallest left turn or addition to
 * get from a to b, range -180 to 180
 */
function angleDiff(a, b) {
  a = norm(a)
  b = norm(b)

  let diff = norm(b - a)
  if (diff > 180) diff -= 360
  return diff
}
function hasNearbyPolylines(polylines, point, threshold) {
  return polylines.some(polyline =>
    polyline.some(currentPoint => {
      const dist = Math.abs(distance(currentPoint, point))
      return dist < threshold
    })
  )
}
function range(start, end, step = 1) {
  let output = []
  if (typeof end === 'undefined') {
    end = start
    start = 0
  }
  for (let i = start; i < end; i += step) {
    output.push(i)
  }
  return output
}
// https://stackoverflow.com/a/12646864
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}
function remapRange(fromMin, fromMax, toMin, toMax, from) {
  const fromSize = fromMax - fromMin
  const toSize = toMax - toMin

  // normalized to the range 0 to 1
  const normalized = (from - fromMin) / fromSize

  const to = (normalized * toSize) + toMin
  return to
}
function noiseInRange([x, y, z], min, max, noise = noise2D) {
  const noiseValue = noise(x, y, z)
  return remapRange(0, 1, min, max, noiseValue)
}
/**
 * @returns {number} [0, inf), <1 = outside, 1 = on, >1 = inside
 */
function ellipseValue(
  [centerX, centerY],
  [xRadius, yRadius],
  [x, y],
) {
  // this equation in LaTeX
  // \frac{\left(x-centerX\right)^{2}}{xRadius^{2}}+\frac{\left(y-centerY\right)^{2}}{yRadius^{2}}
  const xTerm = (x - centerX) ** 2 / xRadius ** 2
  const yTerm = (y - centerY) ** 2 / yRadius ** 2
  const result = xTerm + yTerm
  return result
}



////////// Modules

// These are here because they are quite big.
// They're in a function so they get their own scope
// and so they can be hoisted.

// I would import them dynamically at runtime, which
// is supported by the worker that runs this code, but
// the syntax is checked before that, and both import
// declarations and top-level await are disallowed by
// it, so I can't. I could put everyting inside an async
// main function, but I'd rather just vendor the libs
// that I need.
// https://github.com/hackclub/blot/blob/main/src/runCodeInner.js#L7
// https://github.com/hackclub/blot/blob/main/src/run.ts#L63

function simplexNoise() {
  // npm:simplex-noise@4.0.1
  // Jonas Wagner
  // MIT license
  // https://github.com/jwagner/simplex-noise.js
  const M1=.5*(Math.sqrt(3)-1),r1=(3-Math.sqrt(3))/6,D1=1/3,Z=1/6,q1=(Math.sqrt(5)-1)/4,m=(5-Math.sqrt(5))/20,W=P=>Math.floor(P)|0,h1=new Float64Array([1,1,-1,1,1,-1,-1,-1,1,0,-1,0,1,0,-1,0,0,1,0,-1,0,1,0,-1]),z1=new Float64Array([1,1,0,-1,1,0,1,-1,0,-1,-1,0,1,0,1,-1,0,1,1,0,-1,-1,0,-1,0,1,1,0,-1,1,0,1,-1,0,-1,-1]),l1=new Float64Array([0,1,1,1,0,1,1,-1,0,1,-1,1,0,1,-1,-1,0,-1,1,1,0,-1,1,-1,0,-1,-1,1,0,-1,-1,-1,1,0,1,1,1,0,1,-1,1,0,-1,1,1,0,-1,-1,-1,0,1,1,-1,0,1,-1,-1,0,-1,1,-1,0,-1,-1,1,1,0,1,1,1,0,-1,1,-1,0,1,1,-1,0,-1,-1,1,0,1,-1,1,0,-1,-1,-1,0,1,-1,-1,0,-1,1,1,1,0,1,1,-1,0,1,-1,1,0,1,-1,-1,0,-1,1,1,0,-1,1,-1,0,-1,-1,1,0,-1,-1,-1,0]);function b1(P=Math.random){const t=i1(P),l=new Float64Array(t).map(a=>h1[a%12*2]),n=new Float64Array(t).map(a=>h1[a%12*2+1]);return function(f,p){let z=0,h=0,M=0;const D=(f+p)*M1,A=W(f+D),G=W(p+D),q=(A+G)*r1,S=A-q,T=G-q,d=f-S,F=p-T;let b,N;d>F?(b=1,N=0):(b=0,N=1);const U=d-b+r1,y=F-N+r1,x=d-1+2*r1,g=F-1+2*r1,j=A&255,k=G&255;let s=.5-d*d-F*F;if(s>=0){const o=j+t[k],u=l[o],w=n[o];s*=s,z=s*s*(u*d+w*F)}let c=.5-U*U-y*y;if(c>=0){const o=j+b+t[k+N],u=l[o],w=n[o];c*=c,h=c*c*(u*U+w*y)}let e=.5-x*x-g*g;if(e>=0){const o=j+1+t[k+1],u=l[o],w=n[o];e*=e,M=e*e*(u*x+w*g)}return 70*(z+h+M)}}function N1(P=Math.random){const t=i1(P),l=new Float64Array(t).map(f=>z1[f%12*3]),n=new Float64Array(t).map(f=>z1[f%12*3+1]),a=new Float64Array(t).map(f=>z1[f%12*3+2]);return function(p,z,h){let M,D,A,G;const q=(p+z+h)*D1,S=W(p+q),T=W(z+q),d=W(h+q),F=(S+T+d)*Z,b=S-F,N=T-F,U=d-F,y=p-b,x=z-N,g=h-U;let j,k,s,c,e,o;y>=x?x>=g?(j=1,k=0,s=0,c=1,e=1,o=0):y>=g?(j=1,k=0,s=0,c=1,e=0,o=1):(j=0,k=0,s=1,c=1,e=0,o=1):x<g?(j=0,k=0,s=1,c=0,e=1,o=1):y<g?(j=0,k=1,s=0,c=0,e=1,o=1):(j=0,k=1,s=0,c=1,e=1,o=0);const u=y-j+Z,w=x-k+Z,X=g-s+Z,Y=y-c+2*Z,K=x-e+2*Z,L=g-o+2*Z,O=y-1+3*Z,Q=x-1+3*Z,R=g-1+3*Z,H=S&255,I=T&255,J=d&255;let v=.6-y*y-x*x-g*g;if(v<0)M=0;else{const i=H+t[I+t[J]];v*=v,M=v*v*(l[i]*y+n[i]*x+a[i]*g)}let B=.6-u*u-w*w-X*X;if(B<0)D=0;else{const i=H+j+t[I+k+t[J+s]];B*=B,D=B*B*(l[i]*u+n[i]*w+a[i]*X)}let C=.6-Y*Y-K*K-L*L;if(C<0)A=0;else{const i=H+c+t[I+e+t[J+o]];C*=C,A=C*C*(l[i]*Y+n[i]*K+a[i]*L)}let E=.6-O*O-Q*Q-R*R;if(E<0)G=0;else{const i=H+1+t[I+1+t[J+1]];E*=E,G=E*E*(l[i]*O+n[i]*Q+a[i]*R)}return 32*(M+D+A+G)}}function X1(P=Math.random){const t=i1(P),l=new Float64Array(t).map(p=>l1[p%32*4]),n=new Float64Array(t).map(p=>l1[p%32*4+1]),a=new Float64Array(t).map(p=>l1[p%32*4+2]),f=new Float64Array(t).map(p=>l1[p%32*4+3]);return function(z,h,M,D){let A,G,q,S,T;const d=(z+h+M+D)*q1,F=W(z+d),b=W(h+d),N=W(M+d),U=W(D+d),y=(F+b+N+U)*m,x=F-y,g=b-y,j=N-y,k=U-y,s=z-x,c=h-g,e=M-j,o=D-k;let u=0,w=0,X=0,Y=0;s>c?u++:w++,s>e?u++:X++,s>o?u++:Y++,c>e?w++:X++,c>o?w++:Y++,e>o?X++:Y++;const K=u>=3?1:0,L=w>=3?1:0,O=X>=3?1:0,Q=Y>=3?1:0,R=u>=2?1:0,H=w>=2?1:0,I=X>=2?1:0,J=Y>=2?1:0,v=u>=1?1:0,B=w>=1?1:0,C=X>=1?1:0,E=Y>=1?1:0,i=s-K+m,a1=c-L+m,f1=e-O+m,y1=o-Q+m,m1=s-R+2*m,p1=c-H+2*m,g1=e-I+2*m,u1=o-J+2*m,w1=s-v+3*m,d1=c-B+3*m,x1=e-C+3*m,F1=o-E+3*m,j1=s-1+4*m,k1=c-1+4*m,A1=e-1+4*m,G1=o-1+4*m,V=F&255,_=b&255,$=N&255,t1=U&255;let n1=.6-s*s-c*c-e*e-o*o;if(n1<0)A=0;else{const r=V+t[_+t[$+t[t1]]];n1*=n1,A=n1*n1*(l[r]*s+n[r]*c+a[r]*e+f[r]*o)}let o1=.6-i*i-a1*a1-f1*f1-y1*y1;if(o1<0)G=0;else{const r=V+K+t[_+L+t[$+O+t[t1+Q]]];o1*=o1,G=o1*o1*(l[r]*i+n[r]*a1+a[r]*f1+f[r]*y1)}let s1=.6-m1*m1-p1*p1-g1*g1-u1*u1;if(s1<0)q=0;else{const r=V+R+t[_+H+t[$+I+t[t1+J]]];s1*=s1,q=s1*s1*(l[r]*m1+n[r]*p1+a[r]*g1+f[r]*u1)}let c1=.6-w1*w1-d1*d1-x1*x1-F1*F1;if(c1<0)S=0;else{const r=V+v+t[_+B+t[$+C+t[t1+E]]];c1*=c1,S=c1*c1*(l[r]*w1+n[r]*d1+a[r]*x1+f[r]*F1)}let e1=.6-j1*j1-k1*k1-A1*A1-G1*G1;if(e1<0)T=0;else{const r=V+1+t[_+1+t[$+1+t[t1+1]]];e1*=e1,T=e1*e1*(l[r]*j1+n[r]*k1+a[r]*A1+f[r]*G1)}return 27*(A+G+q+S+T)}}function i1(P){const t=512,l=new Uint8Array(t);for(let n=0;n<t/2;n++)l[n]=n;for(let n=0;n<t/2-1;n++){const a=n+~~(P()*(256-n)),f=l[n];l[n]=l[a],l[a]=f}for(let n=256;n<t;n++)l[n]=l[n-256];return l}return{buildPermutationTable:i1,createNoise2D:b1,createNoise3D:N1,createNoise4D:X1} // hello!    
}
function alea() {
  // npm:alea@1.0.1
  // Johannes Baagøe & Richard Hoffman
  // MIT license
  // https://github.com/coverslide/node-alea
  const n={exports:{}},t=n.exports=function(){return n.importState=function(t){var e=new n;return e.importState(t),e},n;function n(){return function(n){var e=0,r=0,o=0,a=1;0==n.length&&(n=[+new Date]);var u=t();e=u(" "),r=u(" "),o=u(" ");for(var i=0;i<n.length;i++)(e-=u(n[i]))<0&&(e+=1),(r-=u(n[i]))<0&&(r+=1),(o-=u(n[i]))<0&&(o+=1);u=null;var f=function(){var n=2091639*e+2.3283064365386963e-10*a;return e=r,r=o,o=n-(a=0|n)};return f.next=f,f.uint32=function(){return 4294967296*f()},f.fract53=function(){return f()+11102230246251565e-32*(2097152*f()|0)},f.version="Alea 0.9",f.args=n,f.exportState=function(){return[e,r,o,a]},f.importState=function(n){e=+n[0]||0,r=+n[1]||0,o=+n[2]||0,a=+n[3]||0},f}(Array.prototype.slice.call(arguments))}function t(){var n=4022871197,t=function(t){t=t.toString();for(var e=0;e<t.length;e++){var r=.02519603282416938*(n+=t.charCodeAt(e));r-=n=r>>>0,n=(r*=n)>>>0,n+=4294967296*(r-=n)}return 2.3283064365386963e-10*(n>>>0)};return t.version="Mash 0.9",t}}();return t
}