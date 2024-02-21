# The Toolkit  

```js
Turtle 

// take and modify polylines return polylines
iteratePoints(polylines, ... ) 
cut(polylines, ... ) 
cover(polylines, ... ) 
pointInside(polylines, ... ) 
scale(polylines, ... ) 
rotate(polylines, ... ) 
translate(polylines, ... ) 
originate(polylines, ... ) 
resample(polylines, ... ) 
simplify(polylines, ... ) 
trim(polylines, ... )
merge(polylines, ... )  
join(polylines, ... ) 
copy(polylines, ... )
union(polylines, ... )
difference(polylines, ... )
intersect(polylines, ... )
xor(polylines, ... )

// take polylines return other
getAngle(polylines, t [0 to 1]) 
getPoint(polylines, t [0 to 1]) 
getNormal(polylines, t [0 to 1]) 
bounds(polylines)

// take other return polylines
svgToPolylines 


// curves
bezierEasing

// make pls
rect
```

### Randomness

```js
rand() 

randInRange(min: number, max: number) 

randIntInRange(min: number, max: number) 

setRandSeed(seed: number) 

noise(
  [ x:number , ?y: number , ?z: number ], 
  { 
    octaves: number [0 to 8], 
    falloff: number [0 to 100] 
  }
)
```

### Idioms

Useful common patterns.

```js
function L(pls) {
  const methods = {};
  
  [ "iteratePoints", "cut", "cover", "pointInside", "scale", "rotate", "translate", "originate", "resample", "simplify", "trim", "merge", "join", "copy", "union", "difference", "intersect", "xor", "svgToPolylines" ].forEach(name => {
    methods[name] = (...args) => {
      toolkit[name](pls, ...args);
      return methods;
    };
  });

  [ "getAngle", "getPoint", "getNormal", "bounds" ].forEach(name => {
    methods[name] = (...args) => {
      return toolkit[name](pls, ...args);
    };
  })

  methods.polylines = pls;
  methods.draw = (...args) => {
    draw(pls, ...args);
    return methods;
  }

  return methods;
}
```

Circle

Rectangle

Hatching

Displace Along Normal

Displace Along Angle