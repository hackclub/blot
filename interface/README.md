# Interface to Haxidraw

To run

```
yarn
yarn dev
```
---

## Commmands:

```
  up()

  down()

Moves the pen up or down off the paper.
```

```
  goTo(x, y)

  forward(distance)

  arc(angle, radius)

  setAngle(theta)

  right(theta)

  left(theta)

  translate(x, y, origin)

  rotate(angle, origin)

  scale(factor, origin)

  fromSVG(svgString)
```

You can drag in SVG's, and the interface will generate a turtle for it. Keep in mind that SVG's are often imported far too large, and will need to be scaled and translated.
