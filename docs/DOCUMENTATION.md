# The Toolkit  

This is the drawing library available in the Blot editor.

---

## Environment Affecting

These functions set properties of the Blot drawing environment.

### setDocDimensions(width, height)

**Parameters:**
- `width` (number): The width of the document.
- `height` (number): The height of the document.

**Returns:** Nothing.

**Description:** 

Sets the dimensions of the drawing document.
This function initializes the size of the drawing area, it's used as a visual cue.
The workarea of the Blot is 125mm by 125mm. 
It is usually one of the first functions called when setting up a new drawing. 
The bottom left corner is 0,0. 
The units are millimeters (mm).

**Example:**
```js
setDocDimensions(800, 600);
```

### drawLines(polylines, options = { fill, stroke, width })

**Parameters:**
- `polylines` ([number, number][][]): A list of polylines
- `options` (object): Optional values which can be passed to the drawing function
  - `fill` (string): Add color to the inside of polylines
  - `stroke` (string): Add color along the path of polylines
  - `width` (number): Change the width of polylines; the value is in pixels

**Returns:** Nothing.

**Description:**

Draws a copy of the polylines passed onto the screen. 
Your line drawings are best represented by not assigning any optional properties.

**Example:**

```js
drawLines([
  [
    [0, 0],
    [100, 100]
  ]
]);
```

## Importing the blotToolkit

The functions below are available in the `blotToolkit` object.

```js
// like so
blotToolkit.scale(...)
```

`blotToolkit` is also available as the abbreviated `bt`. This is **the recommended way to reference the blotToolkit**.

```js
// like so
bt.scale(...)
```

You can also destructure the functions from `blotToolkit`.

```js
// all imports
const { Turtle, trim, merge, cut, cover, rotate, scale, translate, originate, iteratePoints, pointInside, resample, join, copy, union, difference, intersection, xor, getAngle, getPoint, getNormal, bounds, nurbs, catmullRom, rand, setRandSeed, randInRange, randIntInRange, noise } = blotToolkit;
```

```js
// common imports
const { Turtle, cut, cover, copy, rotate, scale, translate, originate, iteratePoints, resample, join, getAngle, getNormal, bounds, rand, setRandSeed, randInRange, noise, nurbs } = blotToolkit;
```

## Modify Polylines

These functions modify a polyline that is passed as a first argument.

### iteratePoints(polylines, callback)

**Parameters:**
  - `polylines` ([number, number][][]): An array of polylines to iterate over.
  - `callback` (Function): A function that is called for each point with parameters:
    - `pt` ([number, number]): The current point.
    - `t` (number): The normalized position of the point in the polyline.

**Returns:** 
The original array of polylines with the points modified by the callback function. 
Points are mutated in place.

**Description:**

This function iterates over each point in a set of polylines. 
The provided callback function can modify each point by returning a new point, 
split the polyline by returning `"BREAK"`, 
or remove a point by returning `"REMOVE"`. 
The callback receives the current point and its normalized position within the polyline. 
Modifications are applied after all points are iterated through.

**Example:**

```js
const polylines = [[[0, 0], [10, 10], [20, 20]]];
const modifiedPolylines = bt.iteratePoints(polylines, (pt, t) => {
  const [x, y] = pt;
  // Move each point up by 5mm
  return [x, y + 5];
});

// or 

const modifiedPolylines2 = bt.iteratePoints(polylines, (pt, t) => {
  const [x, y] = pt;

  if (t < .2) {
    return "REMOVE";
  } else if (.5 > rand()) {
    return "BREAK";
  }

  // Move each point up by 5mm
  return [x, y + 5];
});
```

### scale(polylines, scale, origin = [0, 0])

**Parameters:**
  - `polylines` ([number, number][][]): An array of polylines to be scaled.
  - `scale` (number | [number, number]): The scale factor to apply. If a single number is provided, the scale is uniform across both axes. If an array is provided, it specifies separate scale factors for the x (`scaleX`) and y (`scaleY`) dimensions.
  - `origin` ([number, number], optional): The point around which the scaling is performed. Defaults to bounding box center if not specified.

**Returns:** A new array of polylines that have been scaled according to the specified parameters.

**Description:**

Scales the provided polylines by a specified factor, 
optionally around a custom origin point. 
This can uniformly or non-uniformly transform the size of the polylines.
It supports both uniform scaling (where the shape's proportions are maintained) and non-uniform scaling (where the shape's proportions can change). 
The function allows for scaling around a specific origin point. 
The default origin is the center of the bounding box of the shape.

**Example:**

```js
const polylines = [
  [[0, 0], [10, 0], [10, 10], [0, 10], [0, 0]]
];

// Scale uniformly by a factor of 2
const uniformlyScaled = bt.scale(polylines, 2);

// Scale non-uniformly (x by 2, y by 3)
const nonUniformlyScaled = bt.scale(polylines, [2, 3]);

// Scale uniformly around a custom origin (5, 5)
const customOriginScaled = bt.scale(polylines, 2, [5, 5]);
```

### rotate(polylines, degrees, origin = [0, 0])

**Parameters:**
  - `polylines` ([number, number][][]): An array of polylines to be rotated.
  - `degrees` (number): The angle in degrees by which the polylines should be rotated. Positive values rotate the shape clockwise, while negative values rotate it counterclockwise.
  - `origin` ([number, number], optional): The point around which the rotation will occur. Defaults to bounding box center if not specified.

**Returns:** The modified array of polylines after rotation.

**Description:**

Rotates the provided polylines around a specified origin point by a given number of degrees. 

**Example:**

```js
const polylines = [[[10, 10], [20, 20], [30, 10]]];
const degrees = 45; // Rotate 45 degrees clockwise

bt.rotate(polylines, degrees);
bt.rotate(polylines, degrees, [45, 0]);
```

### translate(polylines, [dx, dy], origin = [0, 0])

**Parameters:**
  - `polylines` ([number, number][][]): An array of polylines to be translated.
  - `[dx, dy]` ([number, number]): The distance to move the polylines along the x (dx) and y (dy) axes.
  - `origin` ([number, number], optional): The point from which the translation is performed. Defaults to `[0, 0]` if not specified.

**Description:**

Translates (moves) the provided polylines by a specified distance along the x and y axes, optionally from a custom origin point. This modification is applied directly to the provided array of polylines.
The `translate` function shifts the position of the given polylines without altering their shape or orientation. It's useful for repositioning drawings within a graphical space or relative to other elements.

**Returns:** The modified array of polylines after translation.

**Example:**

```js
const polylines = [[[0, 0], [10, 10], [20, 5]]];
bt.translate(polylines, [5, 10]);
```

### originate(polylines)

**Parameters:**
  - `polylines` ([number, number][][]): An array of polylines to be centered.

**Returns:** The modified array of polylines after centering at the coordinate origin.

**Description:**

Moves the center of the provided polylines to the coordinate origin ([0, 0]). 
This modification is applied directly to the provided array of polylines.
The `originate` function recalculates the bounding box of the given polylines and translates them such that their center aligns with the origin of the coordinate system. This is particularly useful for standardizing the position of shapes before applying transformations like rotation or scaling.

**Example:**

```js
const polylines = [[[10, 10], [20, 20], [30, 10]]];
bt.originate(polylines);
```

### resample(polylines, sampleRate)

**Parameters:**
  - `polylines` ([number, number][][]): An array of polylines to be resampled.
  - `sampleRate` (number): The new distance between adjacent points on the polyline.

**Returns:** The modified array of polylines after resampling.

**Description:**
Adjusts the density of points along the polylines according to a specified sample rate, effectively changing the resolution of the shape. This modification is applied directly to the provided array of polylines.
The `resample` function is used to either increase or decrease the number of points along a polyline, based on the specified sample rate.

**Example:**

```js
const polylines = [[[0, 0], [10, 10], [20, 5], [30, 10]]];
bt.resample(polylines, 5);
```

### simplify(polylines, tolerance, highQuality = false)

**Parameters:**
  - `polylines` ([number, number][][]): An array of polylines to be simplified.
  - `tolerance` (number): The maximum allowed deviation from the original line.
  - `highQuality` (boolean, optional): If true, uses a slower algorithm that ensures a higher quality of simplification. Defaults to false.

**Returns:** The modified array of polylines after simplification.

**Description:**

Reduces the number of points in a polyline while retaining its general shape, based on a specified tolerance. This modification is applied directly to the provided array of polylines.
The `simplify` function is particularly useful for reducing the complexity of polyline shapes, which can be beneficial for performance optimization in rendering and for creating a more abstract visual appearance.

**Example:**

```js
const polylines = [[[0, 0], [5, 5], [10, 10], [15, 15], [20, 20]]];
bt.simplify(polylines, 1);
```

### trim(polylines, tStart, tEnd)

**Parameters:**
  - `polylines` ([number, number][][]): An array of polylines to be trimmed.
  - `tStart` (number): The start position of the trim, normalized to the range [0, 1].
  - `tEnd` (number): The end position of the trim, normalized to the range [0, 1].

**Returns:** The modified array of polylines after trimming.

**Description:**

Trims the polylines to a specified range, based on normalized positions along their length. This modification is applied directly to the provided array of polylines.
The `trim` function reduces the length of each polyline according to the specified start and end positions. This is useful for cutting away unwanted sections of a polyline or isolating specific portions of interest.

**Example:**

```js
const polylines = [[[0, 0], [10, 10], [20, 20]]];
bt.trim(polylines, 0.25, 0.75);
```

### merge(polylines)

**Parameters:**
  - `polylines` ([number, number][][]): An array of polylines to be merged.

**Returns:** The modified array containing a single polyline after merging.

**Description:**

Merges multiple polylines with overlapping endpoints into a single polyline. This modification is applied directly to the provided array of polylines.
The `merge` function combines several polyline paths into one continuous path, effectively joining them end-to-end. This is useful for creating single, coherent shapes out of multiple segments.

**Example:**

```js
const polyline1 = [[0, 0], [10, 10]];
const polyline2 = [[10, 10], [20, 20]];
const polylines = [polyline1, polyline2];
bt.merge(polylines);
```

### join(polylines0, ...morePolylines)

**Parameters:**
  - `polylines0` ([number, number][][]): The primary array of polylines to which others will be joined.
  - `...morePolylines` ([number, number][][]): Additional arrays of polylines to be joined to the first.

**Returns:** The modified first array of polylines after joining.

**Description:**
Joins multiple arrays of polylines into a single array, concatenating them. 
This modification is applied directly to the first provided array of polylines.
The `join` function is used to concatenate multiple arrays of polylines into a single array, allowing for the combination of separate polyline collections into one.

**Example:**

```js
const polylines1 = [[[0, 0], [10, 10]]];
const polylines2 = [[[20, 20], [30, 30]]];
bt.join(polylines1, polylines2);
```

### copy(polylines)

**Parameters:**
  - `polylines` ([number, number][][]): An array of polylines to be copied.

**Returns:** A new array of polylines that is a deep copy of the provided polylines.

**Description:**

Creates a deep copy of the provided polylines. 
This function does not modify the provided array but returns a new one that is a copy.
The `copy` function is useful when you need to duplicate polylines without altering the original set, allowing for non-destructive transformations or manipulations on the copy.

**Example:**

```js
const originalPolylines = [[[0, 0], [10, 10]]];
const copiedPolylines = bt.copy(originalPolylines);
```

### cut(polylines0, polylines1)

**Parameters:**
  - `polylines0` ([number, number][][]): The primary array of polylines to be cut.
  - `polylines1` ([number, number][][]): The array of polylines used as the cutter.

**Returns:** The modified `polylines0` array after being cut by `polylines1`.

**Description:**

Removes all points of the `basePolylines` outside of the `cuttingPolylines`.

**Example:**

```js
const polylinesToCut = [[[0, 0], [10, 10], [20, 0]]];
const cuttingPolylines = [[[5, 5], [15, 5]]];
bt.cut(polylinesToCut, cuttingPolylines);
```

### cover(polylines0, polylines1)

**Parameters:**
  - `polylines0` ([number, number][][]): The primary array of polylines to be covered.
  - `polylines1` ([number, number][][]): The array of polylines used to cover the first.

**Returns:** The modified `polylines0` array after being covered by `polylines1`.

**Description:**

Removes all points of the `basePolylines` inside of the `coveringPolylines`.

**Example:**

```js
const basePolylines = [[[0, 0], [10, 10], [20, 0]]];
const coveringPolylines = [[[5, -5], [15, 15]]];
bt.cover(basePolylines, coveringPolylines);
```

### union(polylines0, polylines1)

**Parameters:**
  - `polylines0` ([number, number][][]): The first array of polylines.
  - `polylines1` ([number, number][][]): The second array of polylines.

**Returns:** The modified `polylines0` array after union with `polylines1`.

**Description:**

Takes the boolean union of both sets of polylines.

**Example:**

```js
const subjectPolylines = [[[0, 0], [10, 10], [20, 0]]];
const clippingPolylines = [[[10, 10], [30, 10], [20, -10]]];
bt.union(subjectPolylines, clippingPolylines);
```

### difference(polylines0, polylines1)

**Parameters:**
  - `polylines0` ([number, number][][]): The primary array of polylines to be modified.
  - `polylines1` ([number, number][][]): The array of polylines used to subtract from the first.

**Returns:** The modified `polylines0` array after the difference operation with `polylines1`.

**Description:**

Subtracts the `clippingPolylines` from the `subjectPolylines`.

**Example:**

```js
const subjectPolylines = [[[0, 0], [20, 0], [10, 20]]];
const clippingPolylines = [[[0, 10], [20, 10], [10, -10]]];
bt.difference(subjectPolylines, clippingPolylines);
```

### intersection(polylines0, polylines1)

**Parameters:**
  - `polylines0` ([number, number][][]): The first array of polylines.
  - `polylines1` ([number, number][][]): The second array of polylines.

**Returns:** The modified `polylines0` array after finding the intersection with `polylines1`.

**Description:**

Modifies the `subjectPolylines` to only the part that intersects with the `clippingPolylines`.

**Example:**

```js
const subjectPolylines = [[[0, 0], [10, 10], [20, 0]]];
const clippingPolylines = [[[0, 10], [10, 0], [20, 10]]];
bt.intersection(subjectPolylines, clippingPolylines);
```

### xor(polylines0, polylines1)

**Parameters:**
  - `polylines0` ([number, number][][]): The first array of polylines.
  - `polylines1` ([number, number][][]): The second array of polylines.

**Returns:** The modified `polylines0` array after the xor operation with `polylines1`.

**Description:**

Performs an exclusive or operation on two sets of polylines, leaving only the parts of each set that do not overlap with the other. This operation modifies the first set of polylines directly.

**Example:**

```js
const polylines0 = [[[0, 0], [10, 10], [20, 0]]];
const polylines1 = [[[0, 10], [10, 0], [20, 10]]];
bt.xor(polylines0, polylines1);
```

### offset(polylines, delta, ops = { endType, joinType, miterLimit, arcTolerance })

**Parameters:**
- `polylines` ([number, number][][]): The array of polylines.
- `delta` (number): Distance between offset polylines and target polylines.
- `ops` (object, optional): Configuration options for the offset curve.
  - `endType` ("openSquare" | "openRound" | "openButt" | "closedLine" | "closedPolygon"): End type of the offset. Defaults to "closedPolygon" if closed and "openRound" if open.
  - `joinType` ("square" | "round" | "miter"): Join type of the offset. Defaults to "round".
  - `miterLimit` (number): Miter limit. Defaults to 2.
  - `arcTolerance` (number): Rounding precision. Defaults to 0.1.

**Returns:** A polyline ([number, number][]) of the given shape offset along its normal.

**Description:** 

Can be used to expand, contract, or thicken curves. If passed an open curve it will thicken it with a closed curve around it. If passed a closed curve it will contract or expand based on the sign of delta.

**Example:**

```js
// thicken an open curve
const polylines0 = [[[0, 0], [10, 10], [20, 0]]];
bt.offset(polylines0, 3);

// expand a closed curve
const polylines1 = [[[0, 0], [10, 10], [20, 0], [0, 0]]];
bt.offset(polylines1, 3);

// thicken a closed curve
const polylines2 = [[[0, 0], [10, 10], [20, 0], [0, 0]]];
bt.offset(polylines2, 3, { endType: "openRound" });
```
## Get Data From Polylines

These functions take polylines and return other values. 
They do not modify the polylines.

### getAngle(polylines, t: [0 to 1])

**Parameters:**
- `polylines` ([number, number][][]): An array of polylines representing a shape.
- `t` (number): Normalized position along the polylines where the angle is calculated. Should be between 0 and 1.

**Returns:** The angle in degrees at the specified point along the polylines.

**Description:** 

Calculates the angle in degrees at the specified point along the polylines. 
This function determines the angle of the tangent line to the shape at the given position `t`.

### getPoint(polylines, t: [0 to 1])

**Parameters:**
- `polylines` ([number, number][][]): An array of polylines representing a shape.
- `t` (number): Normalized position along the polylines where the point is obtained. Should be between 0 and 1.

**Returns:** The point coordinates `[x, y]` at the specified position along the polylines.

**Description:** 

Returns the coordinates of the point at the specified position `t` along the polylines. 

### getNormal(polylines, t: [0 to 1])

**Parameters:**
- `polylines` ([number, number][][]): An array of polylines representing a shape.
- `t` (number): Normalized position along the polylines where the normal vector is obtained. Should be between 0 and 1.

**Returns:** The normal vector `[x, y]` at the specified position along the polylines.

**Description:** 

Calculates the normal vector at the specified point along the polylines. 
The normal vector is a vector that is perpendicular to the tangent line at the given position `t`. 

### pointInside(polylines, pt)

**Parameters:**
- `polylines` ([number, number][][]): An array of polylines representing a shape.
- `pt` ([number, number]): The point `[x, y]` to test for containment within the shape.

**Returns:** 
- `true` if the point is inside the shape.
- `false` if the point is outside the shape.

**Description:** 

Determines whether a point lies inside the provided shape defined by the polylines. 
This function is useful for collision detection, hit testing, or determining containment of points within shapes.

### bounds(polylines)

**Parameters:**
- `polylines` ([number, number][][]): An array of polylines representing a shape.

**Returns:** 
An object containing bounding box information:
- `xMin`, `xMax`: The minimum and maximum x-coordinates of the bounding box.
- `yMin`, `yMax`: The minimum and maximum y-coordinates of the bounding box.
- `lt`, `ct`, `rt`, `lc`, `cc`, `rc`, `lb`, `cb`, `rb`: Coordinates of the bounding box corners (left-top, center-top, right-top, left-center, center-center, right-center, left-bottom, center-bottom, right-bottom).
- `width`, `height`: Width and height of the bounding box.

**Description:** 

Calculates the bounding box of the provided shape defined by the polylines. 

They are arranged in this configuration around the bounding box of the polylines

```
lt--ct--rt
 |   |   |
lc--cc--rc
 |   |   | 
lb--cb--rb
```

**Example:**

```js
const polylines = [[[0, 0], [10, 10], [20, 0]]];
const boundingBox = bt.bounds(polylines);
/*
returns { 
  xMin, xMax, 
  yMin, yMax, 
  lt, ct, rt, 
  lc, cc, rc,
  lb, cb, rb,
  width, height
}
*/

const center = boundingBox.cc;
```

## Generate Polylines

A collection of functions and classes for creating polylines.

### Turtle

A `Turtle` class represents a cursor that moves around a canvas to draw shapes. It is inspired by the Logo programming language and can be used to create intricate designs and patterns programmatically.

**Methods:**

- `forward(distance)` Moves the turtle forward by the specified distance, drawing a line if the pen is down.
- `arc(angle, radius)` Draws an arc with the specified angle and radius from the current position.
- `goTo([x, y])` Moves the turtle to the specified coordinates, drawing a line if the pen is down.
- `jump([x, y])` Moves the turtle to the specified coordinates without drawing a line.
- `step([dx, dy])` Moves the turtle to the current positon plus the passed delta values.
- `right(angle)` Rotates the turtle to the right by the specified angle.
- `left(angle)` Rotates the turtle to the left by the specified angle.
- `setAngle(angle)` Sets the absolute angle of the turtle's orientation.
- `up()` Lifts the pen so that moving the turtle does not draw lines.
- `down()` Lowers the pen so that moving the turtle draws lines.
- `copy()` Creates a copy of the turtle's current state.
- `applyToPath(fn)` Takes a function that receives the turtle's path as an argument.
- `lines()` Returns a copy of the Turtle's path.

**Properties:**

- `pos` The current position of the turtle as an `[x, y]` array.
- `angle` The current orientation angle of the turtle.
- `path` The path drawn by the turtle, represented as an array of polylines `[number, number][][]`.
- `drawing` A boolean indicating whether the turtle is currently drawing.

**Example:**

```js
const myTurtle = new bt.Turtle()
  .down()
  .forward(100)
  .right(90)
  .forward(100);
const position = myTurtle.pos; // Gets the current position of the turtle
const path = myTurtle.path; // Gets the path drawn by the turtle, use this to get polylines
```

## Text Creation
Blot contains a limited subset of procedurally created characters, including an instruction parser for "compressed" turtle programming.

### text(str, origin, scale = 100, spacing = [2.5,4.5])

**Parameters:**

- `str` (string): A string of characters to draw. Supports A-Z, 0-9, newlines and some other characters.
- `origin` ([number, number]): Origin(bottom-left hand) position to start drawing letters from.
- `scale` (number, optional): Scaling of drawn letters. Defaults to `100` times original size.
- `spacing` ([number, number], optional): Default spacing between individual letters, multiplied with scale. X is correspondant to X-axis spacing, and Y is likewise for Y-axis spacing. Defaults to `[2.5,4.5]`

**Returns:** An array of polylines ([][][number, number]) corresponding to each of the drawn characters.

**Description:** 

Generates an array of polylines from the provided string, with given origin, scaling and spacing.

**Example:**

```js
// Generate the provided string at position 0,0 with scale of 14
bt.text("Hello world!",[0,0],14)
```

### fromInstructions(inst, org?, scale = 1, returnEndpoint = false)

**Parameters:**

- `inst` (string): String containing instructions for the function to interpret and run.
- `org?` ([number, number]): Origin to run the instructions from. If unspecified, defaults to (0,0).
- `scale` (number): Number to scale instructions given by. If unspecified, does not scale.
- `returnEndpoint` (boolean): Return the last point and polylines instead of just the drawn polylines. If unspecified, function returns polylines only.

**Returns:** An array of polylines generated by the instructions parsed and interpreted. If `returnEndpoint` is true, returns both endpoint and polylines.

**Description:**

A function that contains a limited subset of turtle functions for use in procedural programming. Used internally by `bt.text` for drawing text.

Instructions follow the format of `command1$arg1:arg2,command2$arg1`. Instructions should always be in a single string, with no newlines or breaks. Parameters are seperated from commands by `$`, parameters are seperated from eachother by `:` and whole commands are seperated by `,`.

Instruction|Description|Parameters|Notes
---|---|---|---
`u`|Pen up|None|n/a
`d`|Pen down|None|n/a
`f`|Move turtle forward|Length(mm)|Supports negative length for moving in the opposite direction.
`arc`|Draw an arc|Angle(º), Radius(mm)|n/a
`jmp`|Jumps turtle to the given point.|Point X(mm), Point Y(mm)|n/a
`sa`|Set absolute angle|Angle(Degrees)|0º points the turtle to the top of the screen.
`l`|Turn turtle left|Angle(º)|n/a
`r`|Turn turtle right|Angle(º)|n/a

**Example:**

```js
// Draw the Nixie tube counter as seen on the packaging notecard
setDocDimensions(58,12)

const buildno = 1337
const allLines = []

const CreateTube = (char, org, scale) => {
    let lines = []
    if (typeof bt.letters[char[0]] == "function") {
        lines.push(...bt.letters[char[0]](org, scale))
    } else {
        lines.push(...bt.fromInstructions(bt.letters[char[0]], org, scale))
    }

    lines.push(...bt.fromInstructions("u,sa$90,f$4.5,l$90,d,f$.5,l$90,f$4.5,arc$-90:.5,f$2,arc$-90:.5,f$4.5,l$90,f$.5,arc$90:1,sa$270,u,f$0.025,d,arc$90:1", org, scale))
    lines.push(...bt.fromInstructions("u,sa$270,f$0.5,d,f$1,u,l$90,f$.5,l$90,d,f$1,u,r$90,f$.5,r$90,d,f$1,u,l$90,f$.5,l$90,d,f$1,u,r$90,f$.5,r$90,d,f$1", org, scale))

    return lines
}

allLines.push(...bt.text("Build No. ", [3, 4], 0.82))

const tubeOrg = [51, 3.14]
const tubeScale = 1.35
for (let i = 0; i <= 6; i++) {
    if (i == 0) {
        allLines.push(...CreateTube("#", [tubeOrg[0] + 3.5 * tubeScale * (i - 6), tubeOrg[1]], tubeScale))
        continue
    }
    allLines.push(...CreateTube((Math.floor(buildno / (10 ** Math.abs(i - 6))) % 10).toString(), [tubeOrg[0] + 3.5 * tubeScale * (i - 6), tubeOrg[1]], tubeScale))
}

drawLines(allLines)
```

## Curves

### catmullRom(points, steps = 1000)

**Parameters:**
- `points` ([number, number][]): An array of points through which the curve should pass.
- `steps` (number, optional): The number of steps to divide the curve into. Defaults to 1000.

**Returns:** A polyline ([number, number][]) that represents the Catmull-Rom spline through the given points.

**Description:** 

Generates a [Catmull-Rom spline](https://en.wikipedia.org/wiki/Centripetal_Catmull%E2%80%93Rom_spline), which is a type of interpolating curve, passing through a series of control points. The `steps` parameter controls the smoothness of the curve, with higher values resulting in a more detailed curve.

**Example:**

```js
bt.catmullRom([[0, 0], [10, 15], [20, 5]], 100); // Returns a polyline with 100 points forming a smooth curve through the specified points
```

### nurbs(points, ops = { steps: 100, degree: 2})

**Parameters:**
- `points` ([number, number][]): An array of control points for the NURBS curve.
- `ops` (object, optional): Configuration options for the NURBS curve.
  - `steps` (number): The number of steps to divide the curve into. Defaults to 100.
  - `degree` (number): The degree of the NURBS curve. Defaults to 2.

**Returns:** A polyline ([number, number][]) that represents the NURBS curve through the given points.

**Description:** 

Generates a [Non-Uniform Rational B-Spline (NURBS)](https://en.wikipedia.org/wiki/Non-uniform_rational_B-spline) curve, which provides great flexibility and precision in modeling curves. The `steps` parameter controls the smoothness of the curve, and the `degree` parameter defines the curve's degree, affecting its complexity and how tightly it fits to the control points.

**Example:**

```js
bt.nurbs([[0, 0], [10, 15], [20, 5]], { steps: 50, degree: 3 }); // Returns a polyline forming a NURBS curve with specified degree and steps
```

<!--
### svgToPolylines(svg: string)

**Parameters:**
- `svg` (string): An SVG path string to be converted into polylines.

**Returns:** An array of polylines ([number, number][][]), where each polyline corresponds to a path in the SVG.

**Description:** 

Converts SVG path data into an array of polylines. 

**Example:**

```js
bt.svgToPolylines(`<svg><path d="M0,0 L10,10 Q15,15 20,5" /></svg>`); // Returns an array of polylines representing the SVG path
```
-->

## Randomness

### rand()

**Returns:** A random number between 0 and 1.

**Description:** 

Generates a random floating-point number between 0 (inclusive) and 1 (inclusive). This function does not require any parameters and provides a quick way to introduce randomness into your drawing or modifications.

**Example:**

```js
bt.rand(); // Might return 0.123456789
```

### randInRange(min, max)

**Parameters:**
- `min` (number): The minimum value (inclusive).
- `max` (number): The maximum value (inclusive).

**Returns:** A random number between `min` and `max`.

**Description:** 

Generates a random floating-point number within a specified range. The function takes two parameters: the minimum value (inclusive) and the maximum value (inclusive), and returns a random number within this range.

**Example:**

```js
bt.randInRange(10, 20); // Might return 15.6789
```

### randIntInRange(min, max)

**Parameters:**
- `min` (number): The minimum value (inclusive).
- `max` (number): The maximum value (inclusive).

**Returns:** A random integer between `min` and `max`.

**Description:** 

Generates a random integer within a specified range. This function is similar to `randInRange` but ensures the returned value is an integer. The `max` value is inclusive, making the range of possible outcomes slightly wider.

**Example:**

```js
bt.randIntInRange(1, 10); // Might return 7
```

### setRandSeed(seed)

**Parameters:**
- `seed` (number): A seed value to initialize the random number generator.

**Returns:** Nothing.

**Description:** 

Initializes the random number generator with a specific seed. This function is useful for creating repeatable sequences of random numbers. Setting the same seed value will reset the random number generator to produce the same sequence of numbers.

**Example:**

```js
bt.setRandSeed(12345);
```

### noise(input, options = { octaves, falloff })

**Parameters:**
- `input` (number | [number, ?number, ?number]): A single number or an array representing the coordinates (x, [y], [z]) in n-dimensional noise space.
- `options` (object, optional): Configuration options for noise generation
  - `octaves` (number [0 to 8]): The number of octaves of noise to generate. More octaves produce more detailed noise at the cost of performance.
  - `falloff` (number [0 to 100]): The rate at which the noise detail decreases across octaves.

**Returns:** A noise value between -1 and 1 based on the input coordinates and options.

**Description:** 

Generates Perlin noise or simplex noise based on the input coordinates and configuration options. This function can produce noise in one, two, or three dimensions and is configured by the number of octaves and the falloff rate. It's useful for generating natural-looking textures, landscapes, or other organic variations.

**Example:**

```js
bt.noise(0.5);
bt.noise([0.5, 2.4]);
bt.noise([0.5, 2.4, 3]);
bt.noise(0.5, { octaves: 4, falloff: 50 }); // Might return 0.3425
bt.noise([0.5, 1.2], { octaves: 3, falloff: 75 }); // Might return -0.5687
```

<!--
  
## Easing Curves

### bezierEasing(startY, controlPt0, controlPt1, endY)

**Parameters:**
- `startY` (number): The starting Y value of the Bezier curve.
- `controlPt0` ([number, number]): The first control point as a 2D coordinate `[x, y]`, influencing the curve's shape.
- `controlPt1` ([number, number]): The second control point as a 2D coordinate `[x, y]`, influencing the curve's shape.
- `endY` (number): The ending Y value of the Bezier curve.

**Returns:** A function that, when given an X value between 0 and 1, returns the corresponding Y value on the Bezier curve defined by the input parameters.

**Description:** 

Creates a Bezier easing function based on the provided start and end Y values and two control points. 
This function is useful for generating smooth, customizable easing curves for interpolations between two values. 
The returned function maps an input X (ranging from 0 to 1) to a Y value on the Bezier curve.

**Example:**

```js
const ease = bt.bezierEasing(0, [0.25, 0.1], [0.25, 1], 1);
const y = ease(0.5); // Returns the Y value at X=0.5 on the Bezier curve
```

-->
