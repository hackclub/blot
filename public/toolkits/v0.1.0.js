// flatten-svg/path-data-polyfill.js
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

// flatten-svg/index.ts
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

// drawingFns/displace.ts
function displace(pts, fn) {
  for (let i = 0;i < pts.length - 1; i++) {
    let [x0, y0] = pts[i];
    let [x1, y1] = pts[i + 1];
    let dx = x1 - x0;
    let dy = y1 - y0;
    let ex = -dy;
    let ey = dx;
    let d = Math.sqrt(dx * dx + dy * dy);
    ex /= d;
    ey /= d;
    let t = i;
    let s = fn(t);
    pts[i][0] += ex * s;
    pts[i][1] += ey * s;
  }
}

// drawingFns/resample.ts
var isect_circ_line = function(cx, cy, r, x0, y0, x1, y1) {
  let dx = x1 - x0;
  let dy = y1 - y0;
  let fx = x0 - cx;
  let fy = y0 - cy;
  let a = dx * dx + dy * dy;
  let b = 2 * (fx * dx + fy * dy);
  let c = fx * fx + fy * fy - r * r;
  let discriminant = b * b - 4 * a * c;
  if (discriminant < 0) {
    return null;
  }
  discriminant = Math.sqrt(discriminant);
  let t0 = (-b - discriminant) / (2 * a);
  if (0 <= t0 && t0 <= 1) {
    return t0;
  }
  let t = (-b + discriminant) / (2 * a);
  if (t > 1 || t < 0) {
    return null;
  }
  return t;
};
function resample(polyline2, step) {
  if (polyline2.length < 2) {
    return polyline2.slice();
  }
  polyline2 = polyline2.slice();
  let out = [polyline2[0].slice()];
  let next = null;
  let i = 0;
  while (i < polyline2.length - 1) {
    let a = polyline2[i];
    let b = polyline2[i + 1];
    let dx = b[0] - a[0];
    let dy = b[1] - a[1];
    let d = Math.sqrt(dx * dx + dy * dy);
    if (d == 0) {
      i++;
      continue;
    }
    let n = ~~(d / step);
    let rest = n * step / d;
    let rpx = a[0] * (1 - rest) + b[0] * rest;
    let rpy = a[1] * (1 - rest) + b[1] * rest;
    for (let j = 1;j <= n; j++) {
      let t = j / n;
      let x = a[0] * (1 - t) + rpx * t;
      let y = a[1] * (1 - t) + rpy * t;
      let xy = [x, y];
      for (let k = 2;k < a.length; k++) {
        xy.push(a[k] * (1 - t) + (a[k] * (1 - rest) + b[k] * rest) * t);
      }
      out.push(xy);
    }
    next = null;
    for (let j = i + 2;j < polyline2.length; j++) {
      let b2 = polyline2[j - 1];
      let c = polyline2[j];
      if (b2[0] == c[0] && b2[1] == c[1]) {
        continue;
      }
      let t = isect_circ_line(rpx, rpy, step, b2[0], b2[1], c[0], c[1]);
      if (t == null) {
        continue;
      }
      let q = [b2[0] * (1 - t) + c[0] * t, b2[1] * (1 - t) + c[1] * t];
      for (let k = 2;k < b2.length; k++) {
        q.push(b2[k] * (1 - t) + c[k] * t);
      }
      out.push(q);
      polyline2[j - 1] = q;
      next = j - 1;
      break;
    }
    if (next == null) {
      break;
    }
    i = next;
  }
  if (out.length > 1) {
    let lx = out[out.length - 1][0];
    let ly = out[out.length - 1][1];
    let mx = polyline2[polyline2.length - 1][0];
    let my = polyline2[polyline2.length - 1][1];
    let d = Math.sqrt((mx - lx) ** 2 + (my - ly) ** 2);
    if (d < step * 0.5) {
      out.pop();
    }
  }
  out.push(polyline2[polyline2.length - 1].slice());
  return out;
}

// drawingFns/simplify.js
var getSqDist = function(p1, p2) {
  var dx = p1[0] - p2[0], dy = p1[1] - p2[1];
  return dx * dx + dy * dy;
};
var getSqSegDist = function(p, p1, p2) {
  var x = p1[0], y = p1[1], dx = p2[0] - x, dy = p2[1] - y;
  if (dx !== 0 || dy !== 0) {
    var t = ((p[0] - x) * dx + (p[1] - y) * dy) / (dx * dx + dy * dy);
    if (t > 1) {
      x = p2[0];
      y = p2[1];
    } else if (t > 0) {
      x += dx * t;
      y += dy * t;
    }
  }
  dx = p[0] - x;
  dy = p[1] - y;
  return dx * dx + dy * dy;
};
var simplifyRadialDist = function(points, sqTolerance) {
  var prevPoint = points[0], newPoints = [prevPoint], point2;
  for (var i = 1, len = points.length;i < len; i++) {
    point2 = points[i];
    if (getSqDist(point2, prevPoint) > sqTolerance) {
      newPoints.push(point2);
      prevPoint = point2;
    }
  }
  if (prevPoint !== point2)
    newPoints.push(point2);
  return newPoints;
};
var simplifyDPStep = function(points, first, last, sqTolerance, simplified) {
  var maxSqDist = sqTolerance, index;
  for (var i = first + 1;i < last; i++) {
    var sqDist = getSqSegDist(points[i], points[first], points[last]);
    if (sqDist > maxSqDist) {
      index = i;
      maxSqDist = sqDist;
    }
  }
  if (maxSqDist > sqTolerance) {
    if (index - first > 1)
      simplifyDPStep(points, first, index, sqTolerance, simplified);
    simplified.push(points[index]);
    if (last - index > 1)
      simplifyDPStep(points, index, last, sqTolerance, simplified);
  }
};
var simplifyDouglasPeucker = function(points, sqTolerance) {
  var last = points.length - 1;
  var simplified = [points[0]];
  simplifyDPStep(points, 0, last, sqTolerance, simplified);
  simplified.push(points[last]);
  return simplified;
};
function simplify(points, tolerance, highestQuality) {
  if (points.length <= 2)
    return points;
  var sqTolerance = tolerance !== undefined ? tolerance * tolerance : 1;
  points = highestQuality ? points : simplifyRadialDist(points, sqTolerance);
  points = simplifyDouglasPeucker(points, sqTolerance);
  return points;
}

// drawingFns/interpolatePolylines.ts
function interpolatePolylines(polylines, t) {
  t = Math.max(t, 0);
  t = Math.min(t, 1);
  let totalLength = 0;
  let lengths = polylines.map((polyline2) => {
    let length = 0;
    for (let i = 1;i < polyline2.length; i++) {
      let dx = polyline2[i][0] - polyline2[i - 1][0];
      let dy = polyline2[i][1] - polyline2[i - 1][1];
      length += Math.sqrt(dx * dx + dy * dy);
    }
    totalLength += length;
    return length;
  });
  let targetLength = totalLength * t;
  let accumulatedLength = 0;
  for (let i = 0;i < polylines.length; i++) {
    if (targetLength <= accumulatedLength + lengths[i]) {
      let polyline2 = polylines[i];
      for (let j = 1;j < polyline2.length; j++) {
        let dx = polyline2[j][0] - polyline2[j - 1][0];
        let dy = polyline2[j][1] - polyline2[j - 1][1];
        let segmentLength = Math.sqrt(dx * dx + dy * dy);
        if (targetLength <= accumulatedLength + segmentLength) {
          let segmentT = (targetLength - accumulatedLength) / segmentLength;
          let x = polyline2[j - 1][0] + dx * segmentT;
          let y = polyline2[j - 1][1] + dy * segmentT;
          return [x, y];
        }
        accumulatedLength += segmentLength;
      }
    }
    accumulatedLength += lengths[i];
  }
  let lastPolyline = polylines[polylines.length - 1];
  return lastPolyline[lastPolyline.length - 1];
}

// drawingFns/getAngle.ts
function getAngle(polylines, t) {
  let totalLength = 0;
  let lengths = polylines.map((polyline2) => {
    let length = 0;
    for (let i = 1;i < polyline2.length; i++) {
      let dx2 = polyline2[i][0] - polyline2[i - 1][0];
      let dy2 = polyline2[i][1] - polyline2[i - 1][1];
      length += Math.sqrt(dx2 * dx2 + dy2 * dy2);
    }
    totalLength += length;
    return length;
  });
  let targetLength = totalLength * t;
  let accumulatedLength = 0;
  for (let i = 0;i < polylines.length; i++) {
    if (targetLength <= accumulatedLength + lengths[i]) {
      let polyline2 = polylines[i];
      for (let j = 1;j < polyline2.length; j++) {
        let dx2 = polyline2[j][0] - polyline2[j - 1][0];
        let dy2 = polyline2[j][1] - polyline2[j - 1][1];
        let segmentLength = Math.sqrt(dx2 * dx2 + dy2 * dy2);
        if (targetLength <= accumulatedLength + segmentLength) {
          let angle2 = Math.atan2(dy2, dx2);
          return angle2 * (180 / Math.PI);
        }
        accumulatedLength += segmentLength;
      }
    }
    accumulatedLength += lengths[i];
  }
  let lastPolyline = polylines[polylines.length - 1];
  let dx = lastPolyline[lastPolyline.length - 1][0] - lastPolyline[lastPolyline.length - 2][0];
  let dy = lastPolyline[lastPolyline.length - 1][1] - lastPolyline[lastPolyline.length - 2][1];
  let angle = Math.atan2(dy, dx);
  return angle * (180 / Math.PI);
}

// drawingFns/trimPolylines.ts
function trimPolylines(polylines, t1, t2) {
  t1 = Math.min(1, t1);
  t1 = Math.max(0, t1);
  t2 = Math.min(1, t2);
  t2 = Math.max(0, t2);
  let totalLength = getTotalLength(polylines);
  let targetLength1 = totalLength * t1;
  let targetLength2 = totalLength * t2;
  let accumulatedLength = 0;
  let startIndex, endIndex, startPolylineIndex, endPolylineIndex;
  for (let i = 0;i < polylines.length; i++) {
    let polyline2 = polylines[i];
    for (let j = 1;j < polyline2.length; j++) {
      let dx = polyline2[j][0] - polyline2[j - 1][0];
      let dy = polyline2[j][1] - polyline2[j - 1][1];
      let segmentLength = Math.sqrt(dx * dx + dy * dy);
      if (!startIndex && accumulatedLength + segmentLength >= targetLength1) {
        startIndex = j;
        startPolylineIndex = i;
      }
      if (!endIndex && accumulatedLength + segmentLength >= targetLength2) {
        endIndex = j;
        endPolylineIndex = i;
        break;
      }
      accumulatedLength += segmentLength;
    }
  }
  polylines.splice(endPolylineIndex + 1);
  polylines[endPolylineIndex].splice(endIndex + 1);
  polylines.splice(0, startPolylineIndex);
  polylines[0].splice(0, startIndex - 1);
}
var getTotalLength = function(polylines) {
  let totalLength = 0;
  for (let i = 0;i < polylines.length; i++) {
    let polyline2 = polylines[i];
    for (let j = 1;j < polyline2.length; j++) {
      let dx = polyline2[j][0] - polyline2[j - 1][0];
      let dy = polyline2[j][1] - polyline2[j - 1][1];
      totalLength += Math.sqrt(dx * dx + dy * dy);
    }
  }
  return totalLength;
};

// drawingFns/filterBreakPolylines.ts
function filterBreakPolylines(polylines, filterFunction, breakFunction) {
  for (let i = polylines.length - 1;i >= 0; i--) {
    for (let j = polylines[i].length - 1;j >= 0; j--) {
      if (filterFunction(i, j, polylines)) {
        polylines[i].splice(j, 1);
      } else if (breakFunction(i, j, polylines)) {
        if (j === 0 || j === polylines[i].length - 1) {
          polylines[i].splice(j, 1);
        } else {
          let polyline1 = polylines[i].slice(0, j);
          let polyline2 = polylines[i].slice(j + 1);
          polylines[i] = polyline1;
          polylines.splice(i + 1, 0, polyline2);
        }
      }
    }
    if (polylines[i].length === 1) {
      polylines.splice(i, 1);
    }
  }
}

// drawingFns/mergePolylines.ts
var calculateDistance = function(point1, point2) {
  let dx = point2[0] - point1[0];
  let dy = point2[1] - point1[1];
  return Math.sqrt(dx * dx + dy * dy);
};
var isClosed = function(polyline2, epsilon = 0.001) {
  let start = polyline2[0];
  let end = polyline2[polyline2.length - 1];
  return Math.abs(start[0] - end[0]) < epsilon && Math.abs(start[1] - end[1]) < epsilon;
};
function mergePolylines(polylines, threshold) {
  let n = polylines.length;
  for (let i = 0;i < n - 1; i++) {
    if (isClosed(polylines[i]))
      continue;
    for (let j = i + 1;j < n; j++) {
      if (isClosed(polylines[j]))
        continue;
      let d1 = calculateDistance(polylines[i][polylines[i].length - 1], polylines[j][0]);
      if (d1 <= threshold) {
        polylines[i] = polylines[i].concat(polylines[j]);
        polylines.splice(j, 1);
        n--;
        j--;
        continue;
      }
      let d2 = calculateDistance(polylines[i][polylines[i].length - 1], polylines[j][polylines[j].length - 1]);
      if (d2 <= threshold) {
        polylines[i] = polylines[i].concat(polylines[j].reverse());
        polylines.splice(j, 1);
        n--;
        j--;
        continue;
      }
      let d3 = calculateDistance(polylines[i][0], polylines[j][0]);
      if (d3 <= threshold) {
        polylines[i] = polylines[j].concat(polylines[i]);
        polylines.splice(j, 1);
        n--;
        j--;
        continue;
      }
      let d4 = calculateDistance(polylines[i][0], polylines[j][polylines[j].length - 1]);
      if (d4 <= threshold) {
        polylines[i] = polylines[j].reverse().concat(polylines[i]);
        polylines.splice(j, 1);
        n--;
        j--;
      }
    }
  }
  return polylines;
}

// turtle.ts
var iteratePath = function(turtle, fn) {
  const path2 = turtle.path;
  const toRemove = new Set;
  const toBreak = new Set;
  const tValues = tValuesForPoints(path2);
  let ptIndex = 0;
  let newPts = {};
  for (let i = 0;i < path2.length; i++) {
    for (let j = 0;j < path2[i].length; j++) {
      const pt = path2[i][j];
      const newPt = fn(pt, tValues[ptIndex]);
      if (newPt === "BREAK") {
        toBreak.add(`${i},${j}`);
      } else if (newPt === "REMOVE") {
        toRemove.add(`${i},${j}`);
      } else if (Array.isArray(newPt)) {
        newPts[ptIndex] = newPt;
      }
      ptIndex++;
    }
  }
  path2.flat().forEach((pt, i) => {
    if (i in newPts) {
      pt[0] = newPts[i][0];
      pt[1] = newPts[i][1];
    }
  });
  filterBreakPolylines(path2, (i, j, arr) => toRemove.has(`${i},${j}`), (i, j, arr) => toBreak.has(`${i},${j}`));
  turtle.path = path2.filter((pl) => pl.length > 1);
  return turtle;
};
var translate = function(pt, [x, y], origin = [0, 0]) {
  return [pt[0] + x - origin[0], pt[1] + y - origin[1]];
};
var rotate = function(pt, angle, origin = [0, 0]) {
  let delta = angle / 180 * Math.PI;
  let hereX = pt[0] - origin[0];
  let hereY = pt[1] - origin[1];
  let newPoint = [
    hereX * Math.cos(delta) - hereY * Math.sin(delta) + origin[0],
    hereY * Math.cos(delta) + hereX * Math.sin(delta) + origin[1]
  ];
  return newPoint;
};
var scale = function(pt, factor, origin) {
  if (typeof factor === "number")
    factor = [factor, factor];
  const [xFactor, yFactor] = factor;
  const [x, y] = origin;
  const newPoint = [(pt[0] - x) * xFactor + x, (pt[1] - y) * yFactor + y];
  return newPoint;
};
var extrema = function(pts) {
  let xMin = Number.POSITIVE_INFINITY;
  let xMax = Number.NEGATIVE_INFINITY;
  let yMin = Number.POSITIVE_INFINITY;
  let yMax = Number.NEGATIVE_INFINITY;
  pts.forEach((p) => {
    const [x, y] = p;
    if (xMin > x)
      xMin = x;
    if (xMax < x)
      xMax = x;
    if (yMin > y)
      yMin = y;
    if (yMax < y)
      yMax = y;
  });
  return {
    xMin,
    xMax,
    yMin,
    yMax
  };
};
var tValuesForPoints = function(polylines) {
  let totalLength = 0;
  let lengths = [];
  let tValues = [];
  let segmentLength = 0;
  for (let i = 0;i < polylines.length; i++) {
    let polyline2 = polylines[i];
    for (let j = 0;j < polyline2.length; j++) {
      if (j > 0) {
        let dx = polyline2[j][0] - polyline2[j - 1][0];
        let dy = polyline2[j][1] - polyline2[j - 1][1];
        segmentLength = Math.sqrt(dx * dx + dy * dy);
        totalLength += segmentLength;
      }
      lengths.push(segmentLength);
    }
  }
  let accumulatedLength = 0;
  for (let i = 0;i < lengths.length; i++) {
    accumulatedLength += lengths[i];
    tValues.push(accumulatedLength / totalLength);
  }
  return tValues;
};
var getTotalLength2 = function(polylines) {
  let totalLength = 0;
  for (let i = 0;i < polylines.length; i++) {
    let polyline2 = polylines[i];
    for (let j = 1;j < polyline2.length; j++) {
      let dx = polyline2[j][0] - polyline2[j - 1][0];
      let dy = polyline2[j][1] - polyline2[j - 1][1];
      totalLength += Math.sqrt(dx * dx + dy * dy);
    }
  }
  return totalLength;
};
class Turtle {
  drawing;
  position;
  angle;
  path;
  style;
  constructor(start = [0, 0]) {
    this.drawing = true;
    this.position = [...start];
    this.angle = 0;
    this.path = [[[...start]]];
    this.style = {
      fill: "none",
      stroke: "black",
      width: 0.25
    };
  }
  up() {
    if (!this.drawing)
      return this;
    this.drawing = false;
    this.path.push([[...this.position]]);
    return this;
  }
  down() {
    this.drawing = true;
    return this;
  }
  goTo([x, y]) {
    const lastPath = this.path.at(-1);
    if (this.drawing) {
      const [lastX, lastY] = this.position;
      const dist = Math.sqrt((x - lastX) ** 2 + (y - lastY) ** 2);
      if (dist < 0.0001)
        return this;
      lastPath.push([x, y]);
    } else {
      if (lastPath.length === 1)
        lastPath[0] = [x, y];
    }
    this.position = [x, y];
    return this;
  }
  jump(pt) {
    this.up();
    this.goTo(pt);
    this.down();
    return this;
  }
  forward(distance) {
    const last = this.position;
    const a = this.angle / 180 * Math.PI;
    const x = last[0] + distance * Math.cos(a);
    const y = last[1] + distance * Math.sin(a);
    this.goTo([x, y]);
    return this;
  }
  arc(angle, radius) {
    if (angle === 0 || radius === 0)
      return this;
    const n = 64;
    let pts = [];
    const a = angle / 180 * Math.PI;
    const lp = this.position;
    const la = this.angle;
    const getX = (theta, r) => r * Math.cos(theta);
    const getY = (theta, r) => r * Math.sin(theta);
    for (let i = 0;i <= n; i++) {
      const theta = a / n * i;
      const x = getX(theta, radius);
      const y = getY(theta, radius);
      pts.push([x, y]);
    }
    pts = pts.map((pt) => translate(pt, lp, pts[0]));
    pts = pts.map((pt) => rotate(pt, la + (angle < 0 ? 90 : -90), pts[0]));
    pts.slice(1).forEach((pt) => this.goTo(pt));
    this.setAngle(la + angle);
    return this;
  }
  setAngle(theta) {
    this.angle = theta;
    return this;
  }
  right(theta) {
    this.angle -= theta;
    return this;
  }
  left(theta) {
    this.angle += theta;
    return this;
  }
  translate(to, origin) {
    this.position = translate(this.position, to, origin);
    iteratePath(this, (pt) => translate(pt, to, origin));
    return this;
  }
  rotate(angle, origin) {
    if (!origin)
      origin = this.cc;
    this.position = rotate(this.position, angle, origin);
    iteratePath(this, (pt) => rotate(pt, angle, origin));
    return this;
  }
  scale(factor, origin) {
    if (!origin)
      origin = this.cc;
    this.position = scale(this.position, factor, origin);
    iteratePath(this, (pt) => scale(pt, factor, origin));
    return this;
  }
  displace(fn) {
    this.path.forEach((pl) => displace(pl, fn));
    return this;
  }
  iteratePath(fn) {
    iteratePath(this, fn);
    return this;
  }
  originate() {
    this.translate([0, 0], this.cc);
    return this;
  }
  fromSVG(svgString) {
    const parser = new DOMParser;
    const doc = parser.parseFromString(svgString, "image/svg+xml");
    const svg = doc.querySelector("svg");
    const pls = flattenSVG(svg, { maxError: 0.001 });
    pls.forEach((pl) => {
      this.up();
      pl.points.forEach((pt, i) => {
        this.goTo([pt[0], pt[1]]);
        if (i === 0)
          this.down();
      });
    });
    return this;
  }
  join(...turtles) {
    turtles.forEach((t) => {
      this.path.push(...t.path);
    });
    return this;
  }
  merge(threshold = 0.01) {
    this.path = mergePolylines(this.path, threshold);
    return this;
  }
  copy() {
    const copy = (obj) => JSON.parse(JSON.stringify(obj));
    const t = new Turtle;
    t.path = copy(this.path);
    t.drawing = copy(t.drawing);
    t.position = copy(t.position);
    t.angle = copy(t.angle);
    t.path = copy(t.path);
    t.style = copy(t.style);
    return t;
  }
  resample(resolution) {
    this.path.forEach((pl) => {
      const newPl = resample(pl, resolution);
      while (pl.length > 0)
        pl.pop();
      while (newPl.length > 0) {
        pl.push(newPl.shift());
      }
    });
    return this;
  }
  simplify(tolerance, hq = true) {
    this.path.forEach((pl) => {
      const newPl = simplify(pl, tolerance, hq);
      while (pl.length > 0)
        pl.pop();
      while (newPl.length > 0) {
        pl.push(newPl.shift());
      }
    });
  }
  interpolate(t) {
    return interpolatePolylines(this.path, t);
  }
  getAngle(t) {
    return getAngle(this.path, t);
  }
  trim(t0, t1) {
    trimPolylines(this.path, t0, t1);
    return this;
  }
  warp(fn, baseAngle = null) {
    if (fn instanceof Turtle) {
      const ogTurtle = fn;
      fn = (t) => ogTurtle.interpolate(t)[1];
    }
    const tValues = tValuesForPoints(this.path);
    const newPts = [];
    tValues.forEach((t, i) => {
      const pt = this.path.flat()[i];
      let angle = baseAngle ?? this.getAngle(t);
      if (typeof angle === "function") {
        angle = angle(this.getAngle(t));
      } else if (typeof angle === "number") {
        angle = angle;
      }
      const y = fn(t);
      const newPoint = rotate([0, y], angle);
      newPts.push([pt[0] + newPoint[0], pt[1] + newPoint[1]]);
    });
    this.path.flat().forEach((pt, i, arr) => {
      pt[0] = newPts[i][0];
      pt[1] = newPts[i][1];
    });
    return this;
  }
  extrema() {
    return extrema(this.path.flat());
  }
  get width() {
    const { xMin, xMax } = this.extrema();
    return xMax - xMin;
  }
  get height() {
    const { yMin, yMax } = this.extrema();
    return yMax - yMin;
  }
  get length() {
    return getTotalLength2(this.path);
  }
  get start() {
    if (!this.path.at(0))
      throw new Error("Path is empty, so there is no start point");
    const pt = this.path.at(0).at(0);
    return [pt[0], pt[1]];
  }
  get end() {
    if (!this.path.at(-1))
      throw new Error("Path is empty, so there is no end point");
    const pt = this.path.at(-1).at(-1);
    return [pt[0], pt[1]];
  }
  get lt() {
    const { xMin, xMax, yMin, yMax } = this.extrema();
    return [xMin, yMax];
  }
  get lc() {
    const { xMin, xMax, yMin, yMax } = this.extrema();
    return [xMin, (yMax + yMin) / 2];
  }
  get lb() {
    const { xMin, xMax, yMin, yMax } = this.extrema();
    return [xMin, yMin];
  }
  get ct() {
    const { xMin, xMax, yMin, yMax } = this.extrema();
    return [(xMax + xMin) / 2, yMax];
  }
  get cc() {
    const { xMin, xMax, yMin, yMax } = this.extrema();
    return [(xMax + xMin) / 2, (yMax + yMin) / 2];
  }
  get cb() {
    const { xMin, xMax, yMin, yMax } = this.extrema();
    return [(xMax + xMin) / 2, yMin];
  }
  get rt() {
    const { xMin, xMax, yMin, yMax } = this.extrema();
    return [xMax, yMax];
  }
  get rc() {
    const { xMin, xMax, yMin, yMax } = this.extrema();
    return [xMax, (yMax + yMin) / 2];
  }
  get rb() {
    const { xMin, xMax, yMin, yMax } = this.extrema();
    return [xMax, yMin];
  }
}

// ext-utils/rand.ts
function rand() {
  const max = 4294967295;
  jsr ^= jsr << 17;
  jsr ^= jsr >>> 13;
  jsr ^= jsr << 5;
  return (jsr >>> 0) / max;
}
function setRandSeed(seed) {
  jsr = seed;
}
function randInRange(min, max) {
  return rand() * (max - min) + min;
}
function randIntInRange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(rand() * (max - min + 1) + min);
}
var jsr = 69;

// ext-utils/noise.ts
function noise(vector, options = {}) {
  if (typeof vector === "number")
    vector = [vector, 0, 0];
  let [x, y, z] = vector;
  y = y || 0;
  z = z || 0;
  const perlin_octaves = options?.octaves || 4;
  const perlin_amp_falloff = options?.falloff || 0.5;
  if (perlin == null) {
    perlin = Float64Array.from({ length: PERLIN_SIZE + 1 }, rand);
  }
  if (x < 0) {
    x = -x;
  }
  if (y < 0) {
    y = -y;
  }
  if (z < 0) {
    z = -z;
  }
  let xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
  let xf = x - xi;
  let yf = y - yi;
  let zf = z - zi;
  let rxf, ryf;
  let r = 0;
  let ampl = 0.5;
  let n1, n2, n3;
  for (let o = 0;o < perlin_octaves; o++) {
    let of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB);
    rxf = scaled_cosine(xf);
    ryf = scaled_cosine(yf);
    n1 = perlin[of & PERLIN_SIZE];
    n1 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n1);
    n2 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
    n2 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n2);
    n1 += ryf * (n2 - n1);
    of += PERLIN_ZWRAP;
    n2 = perlin[of & PERLIN_SIZE];
    n2 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n2);
    n3 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
    n3 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n3);
    n2 += ryf * (n3 - n2);
    n1 += scaled_cosine(zf) * (n2 - n1);
    r += n1 * ampl;
    ampl *= perlin_amp_falloff;
    xi <<= 1;
    xf *= 2;
    yi <<= 1;
    yf *= 2;
    zi <<= 1;
    zf *= 2;
    if (xf >= 1) {
      xi++;
      xf--;
    }
    if (yf >= 1) {
      yi++;
      yf--;
    }
    if (zf >= 1) {
      zi++;
      zf--;
    }
  }
  return r;
}
var PERLIN_YWRAPB = 4;
var PERLIN_YWRAP = 1 << PERLIN_YWRAPB;
var PERLIN_ZWRAPB = 8;
var PERLIN_ZWRAP = 1 << PERLIN_ZWRAPB;
var PERLIN_SIZE = 4095;
var scaled_cosine = function(i) {
  return 0.5 * (1 - Math.cos(i * Math.PI));
};
var perlin;

// ext-utils/bezierEasing3.ts
var calculateBezierPoint = function(t, p0, p1, p2, p3) {
  let u = 1 - t;
  let tt = t * t;
  let uu = u * u;
  let uuu = uu * u;
  let ttt = tt * t;
  let p = [uuu * p0[0], uuu * p0[1]];
  p[0] += 3 * uu * t * p1[0];
  p[1] += 3 * uu * t * p1[1];
  p[0] += 3 * u * tt * p2[0];
  p[1] += 3 * u * tt * p2[1];
  p[0] += ttt * p3[0];
  p[1] += ttt * p3[1];
  return p;
};
var findTForGivenX = function(xTarget, p0, p1, p2, p3) {
  let tolerance = 0.00001;
  let t = 0.5;
  let iterations = 0;
  while (iterations < 1000) {
    let p = calculateBezierPoint(t, p0, p1, p2, p3);
    let difference = p[0] - xTarget;
    if (Math.abs(difference) < tolerance) {
      return t;
    } else {
      t = t - difference / 2;
    }
    iterations++;
  }
  return t;
};
var getYForX = function(x, p0, p1, p2, p3) {
  let t = findTForGivenX(x, p0, p1, p2, p3);
  let p = calculateBezierPoint(t, p0, p1, p2, p3);
  return p[1];
};
function bezierEasing(initial, p0, p1, final) {
  return (x) => getYForX(x, [0, initial], [Math.min(Math.max(0, p0[0]), 1), p0[1]], [Math.min(Math.max(0, p1[0]), 1), p1[1]], [1, final]);
}

// ext-utils/isPointInPolyline.ts
function isPointInPolyline(point2, polyline2) {
  if (!isClosed2(polyline2)) {
    return false;
  }
  let x = point2[0], y = point2[1];
  let inside = false;
  for (let i = 0, j = polyline2.length - 1;i < polyline2.length; j = i++) {
    let xi = polyline2[i][0], yi = polyline2[i][1];
    let xj = polyline2[j][0], yj = polyline2[j][1];
    let intersect = yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
    if (intersect)
      inside = !inside;
  }
  return inside;
}
function inside(point2, polyline2) {
  if (!isClosed2(polyline2)) {
    return false;
  }
  const x = point2[0], y = point2[1];
  let inside2 = false;
  for (let i = 0, j = polyline2.length - 1;i < polyline2.length; j = i++) {
    const xi = polyline2[i][0], yi = polyline2[i][1];
    const xj = polyline2[j][0], yj = polyline2[j][1];
    const intersect = yi > y != yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
    if (intersect)
      inside2 = !inside2;
  }
  return inside2;
}
var isClosed2 = function(polyline2, epsilon = 0.0001) {
  const start = polyline2[0];
  const end = polyline2[polyline2.length - 1];
  return Math.abs(start[0] - end[0]) < epsilon && Math.abs(start[1] - end[1]) < epsilon;
};

// exports.js
var exports_default = {
  Turtle,
  createTurtle() {
    return new Turtle;
  },
  rand,
  randInRange,
  randIntInRange,
  setRandSeed,
  noise,
  bezierEasing,
  isPointInPolyline,
  inside,
  lerp(start, end, t) {
    return (1 - t) * start + t * end;
  }
};
export {
  exports_default as default
};
