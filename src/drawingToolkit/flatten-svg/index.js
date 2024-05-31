// path-data-polyfill.js
function getPathData(svgElement, options) {
  const type = svgElement.nodeName.toLowerCase();
  if (type in pathDataGetters) {
    return pathDataGetters[type].call(svgElement, options);
  } else {
    throw new Error(`Unsupported SVG element type: '${type}'`);
  }
}
var commandsMap = {
  Z: "Z",
  M: "M",
  L: "L",
  C: "C",
  Q: "Q",
  A: "A",
  H: "H",
  V: "V",
  S: "S",
  T: "T",
  z: "Z",
  m: "m",
  l: "l",
  c: "c",
  q: "q",
  a: "a",
  h: "h",
  v: "v",
  s: "s",
  t: "t"
};
var Source = function(string) {
  this._string = string;
  this._currentIndex = 0;
  this._endIndex = this._string.length;
  this._prevCommand = null;
  this._skipOptionalSpaces();
};
Source.prototype = {
  parseSegment: function() {
    var char = this._string[this._currentIndex];
    var command = commandsMap[char] ? commandsMap[char] : null;
    if (command === null) {
      if (this._prevCommand === null) {
        return null;
      }
      if ((char === "+" || char === "-" || char === "." || char >= "0" && char <= "9") && this._prevCommand !== "Z") {
        if (this._prevCommand === "M") {
          command = "L";
        } else if (this._prevCommand === "m") {
          command = "l";
        } else {
          command = this._prevCommand;
        }
      } else {
        command = null;
      }
      if (command === null) {
        return null;
      }
    } else {
      this._currentIndex += 1;
    }
    this._prevCommand = command;
    var values = null;
    var cmd = command.toUpperCase();
    if (cmd === "H" || cmd === "V") {
      values = [this._parseNumber()];
    } else if (cmd === "M" || cmd === "L" || cmd === "T") {
      values = [this._parseNumber(), this._parseNumber()];
    } else if (cmd === "S" || cmd === "Q") {
      values = [
        this._parseNumber(),
        this._parseNumber(),
        this._parseNumber(),
        this._parseNumber()
      ];
    } else if (cmd === "C") {
      values = [
        this._parseNumber(),
        this._parseNumber(),
        this._parseNumber(),
        this._parseNumber(),
        this._parseNumber(),
        this._parseNumber()
      ];
    } else if (cmd === "A") {
      values = [
        this._parseNumber(),
        this._parseNumber(),
        this._parseNumber(),
        this._parseArcFlag(),
        this._parseArcFlag(),
        this._parseNumber(),
        this._parseNumber()
      ];
    } else if (cmd === "Z") {
      this._skipOptionalSpaces();
      values = [];
    }
    if (values === null || values.indexOf(null) >= 0) {
      return null;
    } else {
      return { type: command, values };
    }
  },
  hasMoreData: function() {
    return this._currentIndex < this._endIndex;
  },
  peekSegmentType: function() {
    var char = this._string[this._currentIndex];
    return commandsMap[char] ? commandsMap[char] : null;
  },
  initialCommandIsMoveTo: function() {
    if (!this.hasMoreData()) {
      return true;
    }
    var command = this.peekSegmentType();
    return command === "M" || command === "m";
  },
  _isCurrentSpace: function() {
    var char = this._string[this._currentIndex];
    return char <= " " && (char === " " || char === "\n" || char === "\t" || char === "\r" || char === "\f");
  },
  _skipOptionalSpaces: function() {
    while (this._currentIndex < this._endIndex && this._isCurrentSpace()) {
      this._currentIndex += 1;
    }
    return this._currentIndex < this._endIndex;
  },
  _skipOptionalSpacesOrDelimiter: function() {
    if (this._currentIndex < this._endIndex && !this._isCurrentSpace() && this._string[this._currentIndex] !== ",") {
      return false;
    }
    if (this._skipOptionalSpaces()) {
      if (this._currentIndex < this._endIndex && this._string[this._currentIndex] === ",") {
        this._currentIndex += 1;
        this._skipOptionalSpaces();
      }
    }
    return this._currentIndex < this._endIndex;
  },
  _parseNumber: function() {
    var exponent = 0;
    var integer = 0;
    var frac = 1;
    var decimal = 0;
    var sign = 1;
    var expsign = 1;
    var startIndex = this._currentIndex;
    this._skipOptionalSpaces();
    if (this._currentIndex < this._endIndex && this._string[this._currentIndex] === "+") {
      this._currentIndex += 1;
    } else if (this._currentIndex < this._endIndex && this._string[this._currentIndex] === "-") {
      this._currentIndex += 1;
      sign = -1;
    }
    if (this._currentIndex === this._endIndex || (this._string[this._currentIndex] < "0" || this._string[this._currentIndex] > "9") && this._string[this._currentIndex] !== ".") {
      return null;
    }
    var startIntPartIndex = this._currentIndex;
    while (this._currentIndex < this._endIndex && this._string[this._currentIndex] >= "0" && this._string[this._currentIndex] <= "9") {
      this._currentIndex += 1;
    }
    if (this._currentIndex !== startIntPartIndex) {
      var scanIntPartIndex = this._currentIndex - 1;
      var multiplier = 1;
      while (scanIntPartIndex >= startIntPartIndex) {
        integer += multiplier * (this._string[scanIntPartIndex] - "0");
        scanIntPartIndex -= 1;
        multiplier *= 10;
      }
    }
    if (this._currentIndex < this._endIndex && this._string[this._currentIndex] === ".") {
      this._currentIndex += 1;
      if (this._currentIndex >= this._endIndex || this._string[this._currentIndex] < "0" || this._string[this._currentIndex] > "9") {
        return null;
      }
      while (this._currentIndex < this._endIndex && this._string[this._currentIndex] >= "0" && this._string[this._currentIndex] <= "9") {
        frac *= 10;
        decimal += (this._string.charAt(this._currentIndex) - "0") / frac;
        this._currentIndex += 1;
      }
    }
    if (this._currentIndex !== startIndex && this._currentIndex + 1 < this._endIndex && (this._string[this._currentIndex] === "e" || this._string[this._currentIndex] === "E") && this._string[this._currentIndex + 1] !== "x" && this._string[this._currentIndex + 1] !== "m") {
      this._currentIndex += 1;
      if (this._string[this._currentIndex] === "+") {
        this._currentIndex += 1;
      } else if (this._string[this._currentIndex] === "-") {
        this._currentIndex += 1;
        expsign = -1;
      }
      if (this._currentIndex >= this._endIndex || this._string[this._currentIndex] < "0" || this._string[this._currentIndex] > "9") {
        return null;
      }
      while (this._currentIndex < this._endIndex && this._string[this._currentIndex] >= "0" && this._string[this._currentIndex] <= "9") {
        exponent *= 10;
        exponent += this._string[this._currentIndex] - "0";
        this._currentIndex += 1;
      }
    }
    var number = integer + decimal;
    number *= sign;
    if (exponent) {
      number *= Math.pow(10, expsign * exponent);
    }
    if (startIndex === this._currentIndex) {
      return null;
    }
    this._skipOptionalSpacesOrDelimiter();
    return number;
  },
  _parseArcFlag: function() {
    if (this._currentIndex >= this._endIndex) {
      return null;
    }
    var flag = null;
    var flagChar = this._string[this._currentIndex];
    this._currentIndex += 1;
    if (flagChar === "0") {
      flag = 0;
    } else if (flagChar === "1") {
      flag = 1;
    } else {
      return null;
    }
    this._skipOptionalSpacesOrDelimiter();
    return flag;
  }
};
var parsePathDataString = function(string) {
  if (!string || string.length === 0)
    return [];
  var source = new Source(string);
  var pathData = [];
  if (source.initialCommandIsMoveTo()) {
    while (source.hasMoreData()) {
      var pathSeg = source.parseSegment();
      if (pathSeg === null) {
        break;
      } else {
        pathData.push(pathSeg);
      }
    }
  }
  return pathData;
};
var $cachedPathData = typeof Symbol !== "undefined" ? Symbol() : "__cachedPathData";
var $cachedNormalizedPathData = typeof Symbol !== "undefined" ? Symbol() : "__cachedNormalizedPathData";
var arcToCubicCurves = function(x1, y1, x2, y2, r1, r2, angle, largeArcFlag, sweepFlag, _recursive) {
  var degToRad = function(degrees) {
    return Math.PI * degrees / 180;
  };
  var rotate = function(x3, y3, angleRad2) {
    var X = x3 * Math.cos(angleRad2) - y3 * Math.sin(angleRad2);
    var Y = x3 * Math.sin(angleRad2) + y3 * Math.cos(angleRad2);
    return { x: X, y: Y };
  };
  var angleRad = degToRad(angle);
  var params = [];
  var f1, f2, cx, cy;
  if (_recursive) {
    f1 = _recursive[0];
    f2 = _recursive[1];
    cx = _recursive[2];
    cy = _recursive[3];
  } else {
    var p1 = rotate(x1, y1, -angleRad);
    x1 = p1.x;
    y1 = p1.y;
    var p2 = rotate(x2, y2, -angleRad);
    x2 = p2.x;
    y2 = p2.y;
    var x = (x1 - x2) / 2;
    var y = (y1 - y2) / 2;
    var h = x * x / (r1 * r1) + y * y / (r2 * r2);
    if (h > 1) {
      h = Math.sqrt(h);
      r1 = h * r1;
      r2 = h * r2;
    }
    var sign;
    if (largeArcFlag === sweepFlag) {
      sign = -1;
    } else {
      sign = 1;
    }
    var r1Pow = r1 * r1;
    var r2Pow = r2 * r2;
    var left = r1Pow * r2Pow - r1Pow * y * y - r2Pow * x * x;
    var right = r1Pow * y * y + r2Pow * x * x;
    var k = sign * Math.sqrt(Math.abs(left / right));
    cx = k * r1 * y / r2 + (x1 + x2) / 2;
    cy = k * -r2 * x / r1 + (y1 + y2) / 2;
    f1 = Math.asin(parseFloat(((y1 - cy) / r2).toFixed(9)));
    f2 = Math.asin(parseFloat(((y2 - cy) / r2).toFixed(9)));
    if (x1 < cx) {
      f1 = Math.PI - f1;
    }
    if (x2 < cx) {
      f2 = Math.PI - f2;
    }
    if (f1 < 0) {
      f1 = Math.PI * 2 + f1;
    }
    if (f2 < 0) {
      f2 = Math.PI * 2 + f2;
    }
    if (sweepFlag && f1 > f2) {
      f1 = f1 - Math.PI * 2;
    }
    if (!sweepFlag && f2 > f1) {
      f2 = f2 - Math.PI * 2;
    }
  }
  var df = f2 - f1;
  if (Math.abs(df) > Math.PI * 120 / 180) {
    var f2old = f2;
    var x2old = x2;
    var y2old = y2;
    if (sweepFlag && f2 > f1) {
      f2 = f1 + Math.PI * 120 / 180 * 1;
    } else {
      f2 = f1 + Math.PI * 120 / 180 * -1;
    }
    x2 = cx + r1 * Math.cos(f2);
    y2 = cy + r2 * Math.sin(f2);
    params = arcToCubicCurves(x2, y2, x2old, y2old, r1, r2, angle, 0, sweepFlag, [f2, f2old, cx, cy]);
  }
  df = f2 - f1;
  var c1 = Math.cos(f1);
  var s1 = Math.sin(f1);
  var c2 = Math.cos(f2);
  var s2 = Math.sin(f2);
  var t = Math.tan(df / 4);
  var hx = 4 / 3 * r1 * t;
  var hy = 4 / 3 * r2 * t;
  var m1 = [x1, y1];
  var m2 = [x1 + hx * s1, y1 - hy * c1];
  var m3 = [x2 + hx * s2, y2 - hy * c2];
  var m4 = [x2, y2];
  m2[0] = 2 * m1[0] - m2[0];
  m2[1] = 2 * m1[1] - m2[1];
  if (_recursive) {
    return [m2, m3, m4].concat(params);
  } else {
    params = [m2, m3, m4].concat(params);
    var curves = [];
    for (var i = 0;i < params.length; i += 3) {
      var r1 = rotate(params[i][0], params[i][1], angleRad);
      var r2 = rotate(params[i + 1][0], params[i + 1][1], angleRad);
      var r3 = rotate(params[i + 2][0], params[i + 2][1], angleRad);
      curves.push([r1.x, r1.y, r2.x, r2.y, r3.x, r3.y]);
    }
    return curves;
  }
};
var clonePathData = function(pathData) {
  return pathData.map(function(seg) {
    return {
      type: seg.type,
      values: Array.prototype.slice.call(seg.values)
    };
  });
};
var absolutizePathData = function(pathData) {
  var absolutizedPathData = [];
  var currentX = null;
  var currentY = null;
  var subpathX = null;
  var subpathY = null;
  pathData.forEach(function(seg) {
    var type = seg.type;
    if (type === "M") {
      var x = seg.values[0];
      var y = seg.values[1];
      absolutizedPathData.push({ type: "M", values: [x, y] });
      subpathX = x;
      subpathY = y;
      currentX = x;
      currentY = y;
    } else if (type === "m") {
      var x = currentX + seg.values[0];
      var y = currentY + seg.values[1];
      absolutizedPathData.push({ type: "M", values: [x, y] });
      subpathX = x;
      subpathY = y;
      currentX = x;
      currentY = y;
    } else if (type === "L") {
      var x = seg.values[0];
      var y = seg.values[1];
      absolutizedPathData.push({ type: "L", values: [x, y] });
      currentX = x;
      currentY = y;
    } else if (type === "l") {
      var x = currentX + seg.values[0];
      var y = currentY + seg.values[1];
      absolutizedPathData.push({ type: "L", values: [x, y] });
      currentX = x;
      currentY = y;
    } else if (type === "C") {
      var x1 = seg.values[0];
      var y1 = seg.values[1];
      var x2 = seg.values[2];
      var y2 = seg.values[3];
      var x = seg.values[4];
      var y = seg.values[5];
      absolutizedPathData.push({
        type: "C",
        values: [x1, y1, x2, y2, x, y]
      });
      currentX = x;
      currentY = y;
    } else if (type === "c") {
      var x1 = currentX + seg.values[0];
      var y1 = currentY + seg.values[1];
      var x2 = currentX + seg.values[2];
      var y2 = currentY + seg.values[3];
      var x = currentX + seg.values[4];
      var y = currentY + seg.values[5];
      absolutizedPathData.push({
        type: "C",
        values: [x1, y1, x2, y2, x, y]
      });
      currentX = x;
      currentY = y;
    } else if (type === "Q") {
      var x1 = seg.values[0];
      var y1 = seg.values[1];
      var x = seg.values[2];
      var y = seg.values[3];
      absolutizedPathData.push({ type: "Q", values: [x1, y1, x, y] });
      currentX = x;
      currentY = y;
    } else if (type === "q") {
      var x1 = currentX + seg.values[0];
      var y1 = currentY + seg.values[1];
      var x = currentX + seg.values[2];
      var y = currentY + seg.values[3];
      absolutizedPathData.push({ type: "Q", values: [x1, y1, x, y] });
      currentX = x;
      currentY = y;
    } else if (type === "A") {
      var x = seg.values[5];
      var y = seg.values[6];
      absolutizedPathData.push({
        type: "A",
        values: [
          seg.values[0],
          seg.values[1],
          seg.values[2],
          seg.values[3],
          seg.values[4],
          x,
          y
        ]
      });
      currentX = x;
      currentY = y;
    } else if (type === "a") {
      var x = currentX + seg.values[5];
      var y = currentY + seg.values[6];
      absolutizedPathData.push({
        type: "A",
        values: [
          seg.values[0],
          seg.values[1],
          seg.values[2],
          seg.values[3],
          seg.values[4],
          x,
          y
        ]
      });
      currentX = x;
      currentY = y;
    } else if (type === "H") {
      var x = seg.values[0];
      absolutizedPathData.push({ type: "H", values: [x] });
      currentX = x;
    } else if (type === "h") {
      var x = currentX + seg.values[0];
      absolutizedPathData.push({ type: "H", values: [x] });
      currentX = x;
    } else if (type === "V") {
      var y = seg.values[0];
      absolutizedPathData.push({ type: "V", values: [y] });
      currentY = y;
    } else if (type === "v") {
      var y = currentY + seg.values[0];
      absolutizedPathData.push({ type: "V", values: [y] });
      currentY = y;
    } else if (type === "S") {
      var x2 = seg.values[0];
      var y2 = seg.values[1];
      var x = seg.values[2];
      var y = seg.values[3];
      absolutizedPathData.push({ type: "S", values: [x2, y2, x, y] });
      currentX = x;
      currentY = y;
    } else if (type === "s") {
      var x2 = currentX + seg.values[0];
      var y2 = currentY + seg.values[1];
      var x = currentX + seg.values[2];
      var y = currentY + seg.values[3];
      absolutizedPathData.push({ type: "S", values: [x2, y2, x, y] });
      currentX = x;
      currentY = y;
    } else if (type === "T") {
      var x = seg.values[0];
      var y = seg.values[1];
      absolutizedPathData.push({ type: "T", values: [x, y] });
      currentX = x;
      currentY = y;
    } else if (type === "t") {
      var x = currentX + seg.values[0];
      var y = currentY + seg.values[1];
      absolutizedPathData.push({ type: "T", values: [x, y] });
      currentX = x;
      currentY = y;
    } else if (type === "Z" || type === "z") {
      absolutizedPathData.push({ type: "Z", values: [] });
      currentX = subpathX;
      currentY = subpathY;
    }
  });
  return absolutizedPathData;
};
var reducePathData = function(pathData) {
  var reducedPathData = [];
  var lastType = null;
  var lastControlX = null;
  var lastControlY = null;
  var currentX = null;
  var currentY = null;
  var subpathX = null;
  var subpathY = null;
  pathData.forEach(function(seg) {
    if (seg.type === "M") {
      var x = seg.values[0];
      var y = seg.values[1];
      reducedPathData.push({ type: "M", values: [x, y] });
      subpathX = x;
      subpathY = y;
      currentX = x;
      currentY = y;
    } else if (seg.type === "C") {
      var x1 = seg.values[0];
      var y1 = seg.values[1];
      var x2 = seg.values[2];
      var y2 = seg.values[3];
      var x = seg.values[4];
      var y = seg.values[5];
      reducedPathData.push({ type: "C", values: [x1, y1, x2, y2, x, y] });
      lastControlX = x2;
      lastControlY = y2;
      currentX = x;
      currentY = y;
    } else if (seg.type === "L") {
      var x = seg.values[0];
      var y = seg.values[1];
      reducedPathData.push({ type: "L", values: [x, y] });
      currentX = x;
      currentY = y;
    } else if (seg.type === "H") {
      var x = seg.values[0];
      reducedPathData.push({ type: "L", values: [x, currentY] });
      currentX = x;
    } else if (seg.type === "V") {
      var y = seg.values[0];
      reducedPathData.push({ type: "L", values: [currentX, y] });
      currentY = y;
    } else if (seg.type === "S") {
      var x2 = seg.values[0];
      var y2 = seg.values[1];
      var x = seg.values[2];
      var y = seg.values[3];
      var cx1, cy1;
      if (lastType === "C" || lastType === "S") {
        cx1 = currentX + (currentX - lastControlX);
        cy1 = currentY + (currentY - lastControlY);
      } else {
        cx1 = currentX;
        cy1 = currentY;
      }
      reducedPathData.push({
        type: "C",
        values: [cx1, cy1, x2, y2, x, y]
      });
      lastControlX = x2;
      lastControlY = y2;
      currentX = x;
      currentY = y;
    } else if (seg.type === "T") {
      var x = seg.values[0];
      var y = seg.values[1];
      var x1, y1;
      if (lastType === "Q" || lastType === "T") {
        x1 = currentX + (currentX - lastControlX);
        y1 = currentY + (currentY - lastControlY);
      } else {
        x1 = currentX;
        y1 = currentY;
      }
      var cx1 = currentX + 2 * (x1 - currentX) / 3;
      var cy1 = currentY + 2 * (y1 - currentY) / 3;
      var cx2 = x + 2 * (x1 - x) / 3;
      var cy2 = y + 2 * (y1 - y) / 3;
      reducedPathData.push({
        type: "C",
        values: [cx1, cy1, cx2, cy2, x, y]
      });
      lastControlX = x1;
      lastControlY = y1;
      currentX = x;
      currentY = y;
    } else if (seg.type === "Q") {
      var x1 = seg.values[0];
      var y1 = seg.values[1];
      var x = seg.values[2];
      var y = seg.values[3];
      var cx1 = currentX + 2 * (x1 - currentX) / 3;
      var cy1 = currentY + 2 * (y1 - currentY) / 3;
      var cx2 = x + 2 * (x1 - x) / 3;
      var cy2 = y + 2 * (y1 - y) / 3;
      reducedPathData.push({
        type: "C",
        values: [cx1, cy1, cx2, cy2, x, y]
      });
      lastControlX = x1;
      lastControlY = y1;
      currentX = x;
      currentY = y;
    } else if (seg.type === "A") {
      var r1 = Math.abs(seg.values[0]);
      var r2 = Math.abs(seg.values[1]);
      var angle = seg.values[2];
      var largeArcFlag = seg.values[3];
      var sweepFlag = seg.values[4];
      var x = seg.values[5];
      var y = seg.values[6];
      if (r1 === 0 || r2 === 0) {
        reducedPathData.push({
          type: "C",
          values: [currentX, currentY, x, y, x, y]
        });
        currentX = x;
        currentY = y;
      } else {
        if (currentX !== x || currentY !== y) {
          var curves = arcToCubicCurves(currentX, currentY, x, y, r1, r2, angle, largeArcFlag, sweepFlag);
          curves.forEach(function(curve) {
            reducedPathData.push({ type: "C", values: curve });
          });
          currentX = x;
          currentY = y;
        }
      }
    } else if (seg.type === "Z") {
      reducedPathData.push(seg);
      currentX = subpathX;
      currentY = subpathY;
    }
    lastType = seg.type;
  });
  return reducedPathData;
};
var getLength = (el, key) => {
  if (key in el && "baseVal" in el[key]) {
    return el[key].baseVal.value;
  } else {
    return +el.getAttribute(key);
  }
};
var path = function(options) {
  if (options && options.normalize) {
    if (this[$cachedNormalizedPathData]) {
      return clonePathData(this[$cachedNormalizedPathData]);
    } else {
      var pathData;
      if (this[$cachedPathData]) {
        pathData = clonePathData(this[$cachedPathData]);
      } else {
        pathData = parsePathDataString(this.getAttribute("d") || "");
        this[$cachedPathData] = clonePathData(pathData);
      }
      var normalizedPathData = reducePathData(absolutizePathData(pathData));
      this[$cachedNormalizedPathData] = clonePathData(normalizedPathData);
      return normalizedPathData;
    }
  } else {
    if (this[$cachedPathData]) {
      return clonePathData(this[$cachedPathData]);
    } else {
      var pathData = parsePathDataString(this.getAttribute("d") || "");
      this[$cachedPathData] = clonePathData(pathData);
      return pathData;
    }
  }
};
var rect = function(options) {
  var x = getLength(this, "x");
  var y = getLength(this, "y");
  var width = getLength(this, "width");
  var height = getLength(this, "height");
  var rx = this.hasAttribute("rx") ? getLength(this, "rx") : getLength(this, "ry");
  var ry = this.hasAttribute("ry") ? getLength(this, "ry") : getLength(this, "rx");
  if (rx > width / 2) {
    rx = width / 2;
  }
  if (ry > height / 2) {
    ry = height / 2;
  }
  var pathData = [
    { type: "M", values: [x + rx, y] },
    { type: "H", values: [x + width - rx] },
    { type: "A", values: [rx, ry, 0, 0, 1, x + width, y + ry] },
    { type: "V", values: [y + height - ry] },
    { type: "A", values: [rx, ry, 0, 0, 1, x + width - rx, y + height] },
    { type: "H", values: [x + rx] },
    { type: "A", values: [rx, ry, 0, 0, 1, x, y + height - ry] },
    { type: "V", values: [y + ry] },
    { type: "A", values: [rx, ry, 0, 0, 1, x + rx, y] },
    { type: "Z", values: [] }
  ];
  pathData = pathData.filter(function(s) {
    return s.type === "A" && (s.values[0] === 0 || s.values[1] === 0) ? false : true;
  });
  if (options && options.normalize === true) {
    pathData = reducePathData(pathData);
  }
  return pathData;
};
var circle = function(options) {
  var cx = getLength(this, "cx");
  var cy = getLength(this, "cy");
  var r = getLength(this, "r");
  var pathData = [
    { type: "M", values: [cx + r, cy] },
    { type: "A", values: [r, r, 0, 0, 1, cx, cy + r] },
    { type: "A", values: [r, r, 0, 0, 1, cx - r, cy] },
    { type: "A", values: [r, r, 0, 0, 1, cx, cy - r] },
    { type: "A", values: [r, r, 0, 0, 1, cx + r, cy] },
    { type: "Z", values: [] }
  ];
  if (options && options.normalize === true) {
    pathData = reducePathData(pathData);
  }
  return pathData;
};
var ellipse = function(options) {
  var cx = getLength(this, "cx");
  var cy = getLength(this, "cy");
  var rx = getLength(this, "rx");
  var ry = getLength(this, "ry");
  var pathData = [
    { type: "M", values: [cx + rx, cy] },
    { type: "A", values: [rx, ry, 0, 0, 1, cx, cy + ry] },
    { type: "A", values: [rx, ry, 0, 0, 1, cx - rx, cy] },
    { type: "A", values: [rx, ry, 0, 0, 1, cx, cy - ry] },
    { type: "A", values: [rx, ry, 0, 0, 1, cx + rx, cy] },
    { type: "Z", values: [] }
  ];
  if (options && options.normalize === true) {
    pathData = reducePathData(pathData);
  }
  return pathData;
};
var line = function() {
  const x1 = getLength(this, "x1");
  const x2 = getLength(this, "x2");
  const y1 = getLength(this, "y1");
  const y2 = getLength(this, "y2");
  return [
    { type: "M", values: [x1, y1] },
    { type: "L", values: [x2, y2] }
  ];
};
var polyline = function() {
  var pathData = [];
  for (var i = 0;i < this.points.numberOfItems; i += 1) {
    var point = this.points.getItem(i);
    pathData.push({
      type: i === 0 ? "M" : "L",
      values: [point.x, point.y]
    });
  }
  return pathData;
};
var polygon = function() {
  var pathData = [];
  for (var i = 0;i < this.points.numberOfItems; i += 1) {
    var point = this.points.getItem(i);
    pathData.push({
      type: i === 0 ? "M" : "L",
      values: [point.x, point.y]
    });
  }
  pathData.push({
    type: "Z",
    values: []
  });
  return pathData;
};
var pathDataGetters = {
  circle,
  ellipse,
  path,
  polygon,
  polyline,
  line,
  rect
};

// index.ts
var isFlatEnough = function([x0, y0, x1, y1, x2, y2, x3, y3], flatness) {
  const ux = 3 * x1 - 2 * x0 - x3, uy = 3 * y1 - 2 * y0 - y3, vx = 3 * x2 - 2 * x3 - x0, vy = 3 * y2 - 2 * y3 - y0;
  return Math.max(ux * ux, vx * vx) + Math.max(uy * uy, vy * vy) <= 16 * flatness * flatness;
};
var subdivide = function([x0, y0, x1, y1, x2, y2, x3, y3], t) {
  if (t === undefined)
    t = 0.5;
  let u = 1 - t, x4 = u * x0 + t * x1, y4 = u * y0 + t * y1, x5 = u * x1 + t * x2, y5 = u * y1 + t * y2, x6 = u * x2 + t * x3, y6 = u * y2 + t * y3, x7 = u * x4 + t * x5, y7 = u * y4 + t * y5, x8 = u * x5 + t * x6, y8 = u * y5 + t * y6, x9 = u * x7 + t * x8, y9 = u * y7 + t * y8;
  return [
    [x0, y0, x4, y4, x7, y7, x9, y9],
    [x9, y9, x8, y8, x6, y6, x3, y3]
  ];
};
var flatten = function(v, flatness, maxRecursion = 32) {
  const minSpan = 1 / maxRecursion;
  const parts = [];
  function computeParts(curve, t1, t2) {
    if (t2 - t1 > minSpan && !isFlatEnough(curve, flatness)) {
      const halves = subdivide(curve, 0.5);
      const tMid = (t1 + t2) / 2;
      computeParts(halves[0], t1, tMid);
      computeParts(halves[1], tMid, t2);
    } else {
      const dx = curve[6] - curve[0];
      const dy = curve[7] - curve[1];
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > 0) {
        parts.push(curve);
      }
    }
  }
  computeParts(v, 0, 1);
  return parts;
};
function* walkSvgShapes(svgEl) {
  switch (svgEl.nodeName.toLowerCase()) {
    case "svg":
    case "g":
    case "a":
      for (const child of svgEl.children) {
        yield* walkSvgShapes(child);
      }
      break;
    case "rect":
    case "circle":
    case "ellipse":
    case "path":
    case "line":
    case "polyline":
    case "polygon":
      yield svgEl;
      break;
  }
}
var getStroke = function(shape) {
  if (!shape)
    return;
  const explicitStroke = shape.getAttribute("stroke") || shape.style.stroke;
  if (explicitStroke) {
    return explicitStroke;
  }
  if (shape === shape.ownerSVGElement || !shape.ownerSVGElement)
    return;
  if (shape.parentNode) {
    return getStroke(shape.parentNode);
  }
  return;
};
var getGroupId = function(shape) {
  if (!shape)
    return;
  if (shape.id && shape.nodeName.toLowerCase() === "g") {
    return shape.id;
  }
  if (shape.parentNode) {
    return getGroupId(shape.parentNode);
  }
  return;
};
var point = function(x, y) {
  const pt = [x, y];
  pt.x = x;
  pt.y = y;
  return pt;
};
var ang = function(ux, uy, vx, vy) {
  return Math.atan2(ux * vy - uy * vx, ux * vx + uy * vy);
};
function flattenSVG(svg, options = {}) {
  const { maxError = 0.1 } = options;
  const svgPoint = svg.createSVGPoint();
  const paths = [];
  for (const shape of walkSvgShapes(svg)) {
    const ctm = shape.getCTM();
    const xf = ctm == null ? ([x, y]) => {
      return point(x, y);
    } : ([x, y]) => {
      svgPoint.x = x;
      svgPoint.y = y;
      const xfd = svgPoint.matrixTransform(ctm);
      return point(xfd.x, xfd.y);
    };
    const pathData = getPathData(shape, { normalize: true });
    let cur = null;
    let closePoint = null;
    for (const cmd of pathData) {
      if (cmd.type === "M") {
        cur = xf(cmd.values);
        closePoint = cur;
        paths.push({
          points: [cur],
          stroke: getStroke(shape),
          groupId: getGroupId(shape)
        });
      } else if (cmd.type === "L") {
        cur = xf(cmd.values);
        paths[paths.length - 1].points.push(cur);
      } else if (cmd.type === "C") {
        const [x1, y1, x2, y2, x3, y3] = cmd.values;
        if (cur === null) {
          throw new Error(`C ${cmd.values} encountered without current point`);
        }
        const [x0, y0] = cur;
        const [tx1, ty1] = xf([x1, y1]);
        const [tx2, ty2] = xf([x2, y2]);
        const [tx3, ty3] = xf([x3, y3]);
        const parts = flatten([x0, y0, tx1, ty1, tx2, ty2, tx3, ty3], maxError);
        for (const part of parts) {
          paths[paths.length - 1].points.push(point(part[6], part[7]));
        }
        cur = point(tx3, ty3);
      } else if (cmd.type === "A") {
        const [rx_, ry_, phi, fA, fS, x, y] = cmd.values;
        const { cos, sin, sqrt, acos, abs, ceil } = Math;
        if (cur === null) {
          throw new Error(`A ${cmd.values} encountered without current point`);
        }
        const mpx = (cur[0] - x) / 2, mpy = (cur[1] - y) / 2;
        const x1_ = cos(phi) * mpx + sin(phi) * mpy, y1_ = -sin(phi) * mpx + cos(phi) * mpy;
        const x1_2 = x1_ * x1_, y1_2 = y1_ * y1_;
        const L = x1_2 / (rx_ * rx_) + y1_2 / (ry_ * ry_);
        const rx = L <= 1 ? sqrt(L) * rx_ : rx_;
        const ry = L <= 1 ? sqrt(L) * ry_ : ry_;
        const rx2 = rx * rx, ry2 = ry * ry;
        let factor = (rx2 * ry2 - rx2 * y1_2 - ry2 * x1_2) / (rx2 * y1_2 + ry2 * x1_2);
        if (abs(factor) < 0.0001)
          factor = 0;
        if (factor < 0)
          throw new Error(`bad arc args ${factor}`);
        const k = (fA === fS ? -1 : 1) * sqrt(factor);
        const cx_ = k * rx * y1_ / ry, cy_ = k * -ry * x1_ / rx;
        const cx = cos(phi) * cx_ - sin(phi) * cy_ + (cur[0] + x) / 2, cy = sin(phi) * cx_ + cos(phi) * cy_ + (cur[1] + y) / 2;
        const t1 = ang(1, 0, (x1_ - cx_) / rx, (y1_ - cy_) / ry);
        const dt_ = ang((x1_ - cx_) / rx, (y1_ - cy_) / ry, (-x1_ - cx_) / rx, (-y1_ - cy_) / ry) % (Math.PI * 2);
        const dt = fS === 0 && dt_ > 0 ? dt_ - Math.PI * 2 : fS === 1 && dt_ < 0 ? dt_ + Math.PI * 2 : dt_;
        const n = ceil(abs(dt) / acos(1 - maxError / rx));
        for (let i = 1;i <= n; i++) {
          const theta = t1 + dt * i / n;
          const tx = cos(phi) * rx * cos(theta) - sin(phi) * ry * sin(theta) + cx;
          const ty = sin(phi) * rx * cos(theta) + cos(phi) * ry * sin(theta) + cy;
          paths[paths.length - 1].points.push(point(tx, ty));
        }
        cur = point(x, y);
      } else if (cmd.type === "Z") {
        if (cur === null) {
          throw new Error(`Z encountered without current point`);
        }
        if (closePoint && (cur[0] !== closePoint[0] || cur[1] !== closePoint[1])) {
          paths[paths.length - 1].points.push(closePoint);
        }
      } else {
        throw Error(`Unexpected path command: "${cmd.type}" ${cmd.values}`);
      }
    }
  }
  return paths;
}
export {
  flattenSVG
};