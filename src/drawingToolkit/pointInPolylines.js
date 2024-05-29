export function pointInPolylines(polylines, point, ops = {}) {
  if (typeof polylines.at(0)?.at(0) === "number") polylines = [polylines];

  const insides = polylines
    .map(poly => pointInPolyline(point, poly, ops))
    .reduce((cur, acc) => (cur ? 1 : 0) + acc, 0);

  return insides % 2 === 1;
};

function pointInPolyline(point, polyline, ops = {}) {
  const edge = ops.edge ?? false;

  if (!isClosed(polyline)) {
    return false;
  }

  const x = point[0], y = point[1];
  let wn = 0;

  for (let i = 0, j = polyline.length - 1; i < polyline.length; j = i++) {
    let xi = polyline[i][0], yi = polyline[i][1];
    let xj = polyline[j][0], yj = polyline[j][1];

    // if on edge
    // Tentatively removed since it causes bugs and doesn't seem necessary
    // const distanceToSegment = pDistance(point, [xj, yj], [xi, yi]);
    // if (distanceToSegment < 1e-4) return edge;

    if (yj <= y) {
      if (yi > y) {
        if (isLeft([xj, yj], [xi, yi], [x,y]) > 0) {
          wn++;
        }
      }
    } else {
      if (yi <= y) {
        if (isLeft([xj, yj], [xi, yi], [x, y]) < 0) {
          wn--;
        }
      }
    }
  }

  return wn !== 0;
};

function isLeft(P0, P1, P2) {
  let res = ( (P1[0] - P0[0]) * (P2[1] - P0[1])
            - (P2[0] -  P0[0]) * (P1[1] - P0[1]) );
  return res;
}

function isClosed(polyline, epsilon = 1e-4) {
  const start = polyline[0];
  const end = polyline[polyline.length - 1];

  return (
    Math.abs(start[0] - end[0]) < epsilon &&
    Math.abs(start[1] - end[1]) < epsilon
  );
}

function pDistance([x, y], [x1, y1], [x2, y2]) {

  var A = x - x1;
  var B = y - y1;
  var C = x2 - x1;
  var D = y2 - y1;

  var dot = A * C + B * D;
  var len_sq = C * C + D * D;
  var param = -1;
  if (len_sq != 0) //in case of 0 length line
      param = dot / len_sq;

  var xx, yy;

  if (param < 0) {
    xx = x1;
    yy = y1;
  }
  else if (param > 1) {
    xx = x2;
    yy = y2;
  }
  else {
    xx = x1 + param * C;
    yy = y1 + param * D;
  }

  var dx = x - xx;
  var dy = y - yy;
  return Math.sqrt(dx * dx + dy * dy);
}
