<!--

Add methods to polylines

```js
function L(pls) {
  const methods = {};
  
  [ "iteratePoints", "cut", "cover", "scale", "rotate", "translate", "originate", "resample", "simplify", "trim", "merge", "join", "union", "difference", "intersection", "xor", "svgToPolylines" ].forEach(name => {
    methods[name] = (...args) => {
      toolkit[name](pls, ...args);
      return methods;
    };
  });

  [ "getAngle", "getPoint", "getNormal", "bounds", "pointInside" ].forEach(name => {
    methods[name] = (...args) => {
      return toolkit[name](pls, ...args);
    };
  })

  methods.copy = () => {
    const copied = toolkit.copy(pls);
    return L(copied);
  }

  methods.polylines = pls;
  methods.draw = (...args) => {
    drawLines(pls, ...args);
    return methods;
  }

  return methods;
}
```

Add methods to Turtle

```js
function createTurtle() {
  const t = new toolkit.Turtle();
  const pls = t.path;
    
  [ "iteratePoints", "cut", "cover", "scale", "rotate", "translate", "originate", "resample", "simplify", "trim", "merge", "join", "copy", "union", "difference", "intersection", "xor", "svgToPolylines" ].forEach(name => {
    t[name] = (...args) => {
      toolkit[name](
        pls, 
        ...args.map(x => x instanceof toolkit.Turtle ? x.path : x)
      )
      return t;
    };
  });

  [ "getAngle", "getPoint", "getNormal", "bounds", "pointInside" ].forEach(name => {
    t[name] = (...args) => {
      return toolkit[name](pls, ...args);
    };
  })

  t.draw = (...args) => {
    drawLines(pls, ...args);
    return t;
  }

  t.apply = (fn) => {
    fn(t);
    return t;
  }
  
  return t;
}
```

-->