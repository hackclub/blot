// from https://raw.githubusercontent.com/StandardCyborg/nurbs/master/dist/nurbs.js

// Source: https://github.com/scijs/isndarray
// By Kyle Robinson Young, MIT Licensed.

var isNdarray = function (arr) {
  if (!arr) return false;
  if (!arr.dtype) return false;
  var re = new RegExp("function View[0-9]+d(:?" + arr.dtype + ")+");
  return re.test(String(arr.constructor));
};

var isNdarrayLike = function (arr) {
  if (!arr) return false;
  return (
    arr.data !== undefined &&
    Array.isArray(arr.shape) &&
    arr.offset !== undefined &&
    arr.stride !== undefined
  );
};

var isArrayLike = function isArrayLike(data) {
  return Array.isArray(data) || ArrayBuffer.isView(data);
};

function inferType(x) {
  if (!x) {
    return undefined;
  }
  if (isNdarray(x) || isNdarrayLike(x)) {
    if (x.dtype === "generic") {
      return inferType.GENERIC_NDARRAY;
    }
    return inferType.NDARRAY;
  } else {
    if (isArrayLike(x)) {
      // if (isArrayLike(x[0])) {
      return inferType.ARRAY_OF_ARRAYS;
      // }
      // return inferType.PACKED;
    }
    throw new Error("Unhandled data type. Got type: " + typeof x);
  }
}

inferType.ARRAY_OF_ARRAYS = "Arr";
inferType.NDARRAY = "Nd";
inferType.GENERIC_NDARRAY = "GenNd";
inferType.PACKED = "PackArr";

var inferType_1 = inferType;

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}

var cacheKey = function (
  nurbs,
  debug,
  checkBounds,
  pointType,
  weightType,
  knotType,
) {
  var d;
  var degreeParts = [];
  var hasAnyKnots = false;
  for (d = 0; d < nurbs.splineDimension; d++) {
    var hasKnots = isArrayLike(nurbs.knots) && isArrayLike(nurbs.knots[d]);
    if (hasKnots) hasAnyKnots = true;
    degreeParts.push(
      "Deg" +
        nurbs.degree[d] +
        (hasKnots ? "" : "Uniform") +
        capitalize(nurbs.boundary[d]),
    );
  }
  var parts = [
    [hasAnyKnots ? "NU" : "", nurbs.weights ? "RBS" : "BS"].join("") +
      nurbs.dimension +
      "D",
    degreeParts.join("_"),
  ];

  if (pointType) {
    parts.push(pointType + "Pts");
  }
  if (weightType) {
    parts.push(weightType + "Wts");
  }
  if (knotType) {
    parts.push(knotType + "Kts");
  }

  if (debug) {
    parts.push("debug");
  }

  if (checkBounds) {
    parts.push("chk");
  }

  return parts.join("_");
};

var createVariable = function createVariable(name, nurbs) {
  return function (i, period) {
    if (i !== undefined && !Array.isArray(i)) i = [i];
    var dimAccessors = [];
    for (var j = 0; j < i.length; j++) {
      dimAccessors.push(createVariable.sum(i[j]));
    }
    if (period) {
      for (i = 0; i < dimAccessors.length; i++) {
        if (period[i] === undefined) continue;
        dimAccessors[i] =
          "(" + dimAccessors[i] + " + " + period[i] + ") % " + period[i];
      }
    }
    return name + dimAccessors.join("_");
  };
};

createVariable.sum = function (parts) {
  parts = Array.isArray(parts) ? parts : [parts];
  parts = parts.filter(function (part) {
    return part !== undefined && part !== 0;
  });
  if (parts.length === 0) parts.push(0);
  return parts.join(" + ");
};

var variable = createVariable;

function wrapAccessor(callback) {
  return function (i, period) {
    if (i !== undefined && !Array.isArray(i)) i = [i];
    var dimAccessors = [];
    for (var j = 0; j < i.length; j++) {
      dimAccessors.push(variable.sum(i[j]));
    }
    if (period) {
      for (i = 0; i < dimAccessors.length; i++) {
        if (period[i] === undefined) continue;
        dimAccessors[i] =
          "(" + dimAccessors[i] + " + " + period[i] + ") % " + period[i];
      }
    }
    return callback(dimAccessors);
  };
}

function createAccessor(name, data) {
  var i;
  if (!data) return undefined;
  switch (inferType_1(data)) {
    case inferType_1.ARRAY_OF_ARRAYS:
      return wrapAccessor(function (accessors) {
        return name + "[" + accessors.join("][") + "]";
      });
    case inferType_1.GENERIC_NDARRAY:
      return wrapAccessor(function (accessors) {
        return name + ".get(" + accessors.join(",") + ")";
      });
    case inferType_1.NDARRAY:
      return wrapAccessor(function (accessors) {
        var code = [name + "Offset"];
        for (i = 0; i < accessors.length; i++) {
          code.push(name + "Stride" + i + " * (" + accessors[i] + ")");
        }
        return name + "[" + code.join(" + ") + "]";
      });
    case inferType_1.PACKED:
    default:
      return undefined;
  }
}

var createAccessors = function (nurbs) {
  var accessors = {};
  var accessor;

  accessor = createAccessor("x", nurbs.points);
  if (accessor) accessors.point = accessor;

  accessor = createAccessor("w", nurbs.weights);
  if (accessor) accessors.weight = accessor;

  accessor = createAccessor("k", nurbs.knots);
  if (accessor) accessors.knot = accessor;

  return accessors;
};

var args = [];
var tmp = [];

var numericalDerivative = function numericalDerivative(out, order, dimension) {
  if (order !== 1) {
    throw new Error(
      "Numerical derivative not implemented for order n = " + order + ".",
    );
  }

  var i;
  var h =
    arguments[this.splineDimension + 3] === undefined
      ? 1e-4
      : arguments[this.splineDimension + 3];

  args.length = this.splineDimension;
  for (i = 0; i < this.splineDimension; i++) {
    args[i + 1] = arguments[i + 3];
  }

  var domain = this.domain;
  var k0 = domain[dimension][0];
  var k1 = domain[dimension][1];

  var tm, tp, T;
  var t0 = args[dimension + 1];
  var dt = (k1 - k0) * h;
  if (this.boundary[dimension] === "closed") {
    T = k1 - k0;
    tm = k0 + ((t0 - k0 - dt + T) % T);
    tp = k0 + ((t0 - k0 + dt + T) % T);
    dt *= 2;
  } else {
    tm = Math.min(k1, Math.max(k0, t0 - dt));
    tp = Math.min(k1, Math.max(k0, t0 + dt));
    dt = tp - tm;
  }

  args[dimension + 1] = tm;
  args[0] = tmp;
  this.evaluate.apply(null, args);

  args[dimension + 1] = tp;
  args[0] = out;
  this.evaluate.apply(null, args);

  for (i = 0; i < this.dimension; i++) {
    out[i] = (out[i] - tmp[i]) / dt;
  }

  return out;
};

var ndloop = function ndloop(n, callback) {
  for (var m = 1, k = 0, i = []; k < n.length; k++) {
    m *= Array.isArray(n[k]) ? n[k][1] - n[k][0] : n[k];
    i[k] = Array.isArray(n[k]) ? n[k][0] : 0;
  }
  for (var ptr = 0; ptr < m; ptr++) {
    callback(i.slice());
    for (k = n.length - 1; k >= 0; k--) {
      if (i[k] === (Array.isArray(n[k]) ? n[k][1] : n[k]) - 1) {
        i[k] = Array.isArray(n[k]) ? n[k][0] : 0;
      } else {
        i[k]++;
        break;
      }
    }
  }
};

var accessorPreamble = function (nurbs, variableName, propertyName, data) {
  var i;
  var code = [];

  switch (inferType_1(data)) {
    case inferType_1.NDARRAY:
      code.push("  var " + variableName + " = " + propertyName + ".data;");
      code.push(
        "  var " + variableName + "Offset = " + propertyName + ".offset;",
      );

      for (i = 0; i < data.dimension; i++) {
        code.push(
          "  var " +
            variableName +
            "Stride" +
            i +
            " = " +
            propertyName +
            ".stride[" +
            i +
            "];",
        );
      }
      break;
    case inferType_1.ARRAY_OF_ARRAYS:
      code.push("  var " + variableName + " = " + propertyName + ";");
  }

  return code.join("\n");
};

var sizeGetter = function (data, dataVariableName, dimension) {
  if (!data) {
    return "this.size[" + dimension + "]";
  } else if (isNdarrayLike(data)) {
    return dataVariableName + ".shape[" + dimension + "]";
  } else {
    var str = dataVariableName;
    for (var i = 0; i < dimension; i++) {
      str += "[0]";
    }
    return str + ".length";
  }
};

var evaluatorCache = {};
var codeCache = {};

var evaluate = function (
  cacheKey,
  nurbs,
  accessors,
  debug,
  checkBounds,
  isBasis,
  derivative,
) {
  var splineDimension = nurbs.splineDimension;
  var i, j, n, m, d, kvar;

  var points = nurbs.points;
  var degree = nurbs.degree;
  var weights = nurbs.weights;
  var hasWeights = weights !== undefined;
  var knots = nurbs.knots;
  var spaceDimension = nurbs.dimension;
  var boundary = nurbs.boundary;

  if (derivative !== undefined && derivative !== null) {
    if (!Array.isArray(derivative)) {
      derivative = [derivative];
    }
    var totalDerivativeOrder = 0;
    for (i = 0; i < splineDimension; i++) {
      if (derivative[i] === undefined) derivative[i] = 0;
      totalDerivativeOrder += derivative[i];
    }
    if (hasWeights && totalDerivativeOrder > 1) {
      throw new Error(
        "Analytical derivative not implemented for rational b-splines with order n = " +
          totalDerivativeOrder +
          ".",
      );
    }
  }

  if (isBasis) cacheKey = "Basis" + cacheKey;
  if (derivative) cacheKey = "Der" + derivative.join("_") + "_" + cacheKey;
  var cachedEvaluator = evaluatorCache[cacheKey];
  if (debug) {
    var logger = typeof debug === "function" ? debug : console.log;
  }

  if (cachedEvaluator) {
    if (debug) {
      logger(codeCache[cacheKey]);
    }

    return cachedEvaluator.bind(nurbs);
  }

  var code = [];
  var functionName = "evaluate" + cacheKey;

  var pointAccessor = accessors.point;
  if (isBasis) {
    pointAccessor = function (src, period) {
      var terms = [];
      for (var i = 0; i < src.length; i++) {
        var accessor = src[i];
        var terms2 = [];
        for (var j = 0; j < accessor.length; j++) {
          if (accessor[j] !== 0) terms2.push(accessor[j]);
        }
        accessor = terms2.join(" + ");
        if (period[i]) {
          accessor = "(" + accessor + " + " + period[i] + ") % " + period[i];
        }
        terms.push(accessor + " === " + indexVar(i));
      }
      return "((" + terms.join(" && ") + ") ? 1 : 0)";
    };
  }
  var weightAccessor = accessors.weight;
  var knotAccessor = accessors.knot;

  var knotVar = variable("k");
  var pointVar = variable("x");
  var weightVar = variable("w");
  var indexVar = variable("i");
  var tVar = variable("t");
  var domainVar = debug ? "domain" : "d";
  var sizeVar = variable(debug ? "size" : "s");
  var knotIndex = variable(debug ? "knotIndex" : "j");

  var allDimensionUniform = true;
  for (d = 0; d < splineDimension; d++) {
    if (isArrayLike(knots) && isArrayLike(knots[d])) {
      allDimensionUniform = false;
    }
  }

  // Just to indent properly and save lots of typing
  function line(str) {
    code.push("  " + (str || ""));
  }
  function debugLine(str) {
    if (debug) line(str);
  }
  // function clog (str) {
  // if (debug) code.push('console.log("' + str + ' =", ' + str + ');');
  // }

  if (isBasis) {
    var indexArgs = [];
  }
  var parameterArgs = [];
  for (i = 0; i < splineDimension; i++) {
    if (isBasis) {
      indexArgs.push(indexVar([i]));
    }
    parameterArgs.push(tVar([i]));
  }

  code.push(
    "function " +
      functionName +
      " (" +
      (isBasis ? "" : "out, ") +
      parameterArgs.join(", ") +
      (isBasis ? ", " + indexArgs.join(", ") : "") +
      ") {",
  );

  line("var h, m, a, b;");

  if (checkBounds) {
    line("var " + domainVar + " = this.domain;");
    line("for (var i = 0; i < this.splineDimension; i++) {");
    line("  a = arguments[i + 1];");
    line(
      "  if (a < " +
        domainVar +
        "[i][0] || a > " +
        domainVar +
        "[i][1] || a === undefined || isNaN(a)) {",
    );
    line(
      "    throw new Error('Invalid Spline parameter in dimension '+i+'. Valid domain is ['+" +
        domainVar +
        "[i][0]+', '+" +
        domainVar +
        "[i][1]+']. but got t'+i+' = '+arguments[i + 1]+'.');",
    );
    line("  }");
    line("}");
  }

  for (d = 0; d < splineDimension; d++) {
    line(
      "var " + sizeVar(d) + " = " + sizeGetter(points, "this.points", d) + ";",
    );
  }
  code.push(accessorPreamble(nurbs, "x", "this.points", points));

  if (hasWeights) {
    code.push(accessorPreamble(nurbs, "w", "this.weights", weights));
  }

  if (!allDimensionUniform) {
    code.push(accessorPreamble(nurbs, "k", "this.knots", knots));
  }

  function ternary(cond, a, b) {
    return "(" + cond + ") ? (" + a + ") : (" + b + ")";
  }

  var hasKnots = [];
  for (d = 0; d < splineDimension; d++) {
    switch (inferType_1(knots)) {
      case inferType_1.NDARRAY:
        hasKnots[d] = true;
        break;
      case inferType_1.ARRAY_OF_ARRAYS:
        hasKnots[d] = isArrayLike(knots[d]);
        break;
    }
  }

  for (d = 0; d < splineDimension; d++) {
    if (hasKnots[d]) {
      //
      // LOCATE KNOTS
      //
      debugLine(
        "\n  // Bisect to locate the knot interval in dimension " + d + "\n",
      );
      line("var " + knotIndex(d) + " = 0;");
      line("h = " + sizeVar(d) + ";");
      line("while(h > " + knotIndex(d) + " + 1) {");
      line("  m = 0.5 * (h + " + knotIndex(d) + ") | 0;");
      line("  if (" + knotAccessor([d, "m"]) + " > " + tVar(d) + ") h = m;");
      line("  else " + knotIndex(d) + " = m;");
      line("}");

      debugLine("\n  // Fetch knots for dimension " + d + "\n");

      for (i = -degree[d] + 1; i <= degree[d]; i++) {
        if (boundary[d] === "closed") {
          if (i < 0) {
            // line('var ' + knotVar([d, i + degree[d] - 1]) + ' = ' + knotAccessor([d, [knotIndex(d), i]]) + ';');
            // EDIT THIS SECTION
            line(
              "var " +
                knotVar([d, i + degree[d] - 1]) +
                " = " +
                ternary(
                  knotIndex(d) + " < " + -i,
                  knotAccessor([d, 0]) +
                    " + " +
                    knotAccessor([d, [sizeVar(d), knotIndex(d), i]]) +
                    " - " +
                    knotAccessor([d, [sizeVar(d)]]),
                  knotAccessor([d, [knotIndex(d), i]]),
                ) +
                ";",
            );
          } else if (i > 0) {
            line(
              "var " +
                knotVar([d, i + degree[d] - 1]) +
                " = " +
                ternary(
                  knotIndex(d) + " + " + i + " > " + sizeVar(d),
                  // knotAccessor([d, sizeVar(d)]) + ' + ' + knotAccessor([d, i]) + ' - ' + knotAccessor([d, 0]),
                  knotAccessor([d, sizeVar(d)]) +
                    " + " +
                    knotAccessor([
                      d,
                      i + " + " + knotIndex(d) + " - " + sizeVar(d),
                    ]) +
                    " - " +
                    knotAccessor([d, 0]),
                  knotAccessor([d, [knotIndex(d), i]]),
                ) +
                ";",
            );
          } else {
            line(
              "var " +
                knotVar([d, i + degree[d] - 1]) +
                " = " +
                knotAccessor([d, [knotIndex(d), i]]) +
                ";",
            );
          }
        } else {
          line(
            "var " +
              knotVar([d, i + degree[d] - 1]) +
              " = " +
              knotAccessor([d, [knotIndex(d), i]]) +
              ";",
          );
        }
      }
    } else {
      //
      // UNIFORM B-SPLINE
      //
      debugLine(
        "\n  // Directly compute knot interval for dimension " + d + "\n",
      );

      if (boundary[d] === "closed") {
        line(knotIndex(d) + " = (" + tVar(d) + " | 0) % " + sizeVar(d) + ";");
      } else {
        line(knotIndex(d) + " = (" + tVar(d) + " | 0);");
        line(
          "if (" +
            knotIndex(d) +
            " < " +
            degree[d] +
            ") " +
            knotIndex(d) +
            " = " +
            degree[d] +
            ";",
        );
        line(
          "if (" +
            knotIndex(d) +
            " > " +
            sizeVar(d) +
            " - 1) " +
            knotIndex(d) +
            " = " +
            sizeVar(d) +
            " - 1;",
        );
      }

      debugLine("\n  // Compute and clamp knots for dimension " + d + "\n");
      for (i = -degree[d] + 1; i <= degree[d]; i++) {
        kvar = knotVar([d, i + degree[d] - 1]);
        line("var " + kvar + " = " + knotIndex(d) + " + " + i + ";");
      }

      if (boundary[d] === "clamped") {
        for (i = -degree[d] + 1; i <= degree[d]; i++) {
          kvar = knotVar([d, i + degree[d] - 1]);
          if (i < 0) {
            line(
              "if (" +
                kvar +
                " < " +
                degree[d] +
                ") " +
                kvar +
                " = " +
                degree[d] +
                ";",
            );
          }
          if (i > 0) {
            line(
              "if (" +
                kvar +
                " > " +
                sizeVar(d) +
                ") " +
                kvar +
                " = " +
                sizeVar(d) +
                ";",
            );
          }
        }
      }

      if (boundary[d] === "closed") {
        debugLine("\n  // Wrap the B-Spline parameter for closed boundary");
        line(tVar(d) + " %= " + sizeVar(d) + ";");
      }
    }
  }

  for (d = 0, n = []; d < splineDimension; d++) {
    n[d] = degree[d] + 1;
  }

  if (hasWeights) {
    debugLine("\n  // Fetch weights\n");
    ndloop(n, function (dst) {
      var readIdx = [];
      var period = [];
      for (var d = 0; d < splineDimension; d++) {
        readIdx[d] = [knotIndex(d), dst[d] - degree[d]];
        if (boundary[d] === "closed" && dst[d] - degree[d] < 0)
          period[d] = sizeVar(d);
      }
      line(
        "var " + weightVar(dst) + " = " + weightAccessor(readIdx, period) + ";",
      );
    });
  }

  if (debug) {
    if (hasWeights) {
      line(
        "\n  // Fetch points and project into homogeneous (weighted) coordinates\n",
      );
    } else {
      line("\n  // Fetch points\n");
    }
  }

  ndloop(n, function (dst) {
    var readIdx = [];
    var period = [];
    for (var d = 0; d < splineDimension; d++) {
      readIdx[d] = [knotIndex(d), dst[d] - degree[d]];
      if (boundary[d] === "closed" && dst[d] - degree[d] < 0)
        period[d] = sizeVar(d);
    }
    if (isBasis) {
      if (hasWeights) {
        line(
          "var " +
            pointVar(dst) +
            " = " +
            pointAccessor(readIdx, period) +
            " * " +
            weightVar(dst) +
            ";",
        );
      } else {
        line(
          "var " + pointVar(dst) + " = " + pointAccessor(readIdx, period) + ";",
        );
      }
    } else {
      for (d = 0; d < spaceDimension; d++) {
        var dstWithDim = dst.concat(d);
        readIdx[splineDimension] = d;
        if (hasWeights) {
          line(
            "var " +
              pointVar(dstWithDim) +
              " = " +
              pointAccessor(readIdx, period) +
              " * " +
              weightVar(dst) +
              ";",
          );
        } else {
          line(
            "var " +
              pointVar(dstWithDim) +
              " = " +
              pointAccessor(readIdx, period) +
              ";",
          );
        }
      }
    }
  });
  debugLine("\n");

  debugLine("// Perform De Boor's algorithm");
  for (d = n.length - 1; d >= 0; d--) {
    n[d] = [degree[d], degree[d] + 1];
    for (i = 0; i < degree[d]; i++) {
      debugLine(
        "\n  // Degree " +
          degree[d] +
          " evaluation in dimension " +
          d +
          ", step " +
          (i + 1) +
          "\n",
      );
      for (j = degree[d]; j > i; j--) {
        var isDerivative = derivative && degree[d] - i - derivative[d] <= 0;

        if (isDerivative) {
          line(
            "m = 1 / (" +
              knotVar([d, j - i + degree[d] - 1]) +
              " - " +
              knotVar([d, j - 1]) +
              ");",
          );
          if (hasWeights) {
            line("a = (" + tVar(d) + " - " + knotVar([d, j - 1]) + ") * m;");
            line("b = 1 - a;");
          }
        } else {
          line(
            "a = (" +
              tVar(d) +
              " - " +
              knotVar([d, j - 1]) +
              ") / (" +
              knotVar([d, j - i + degree[d] - 1]) +
              " - " +
              knotVar([d, j - 1]) +
              ");",
          );
          line("b = 1 - a;");
        }

        if (hasWeights) {
          ndloop(n, function (ii) {
            var ij = ii.slice();
            var ij1 = ii.slice();
            ij[d] = j;
            ij1[d] = j - 1;
            if (isDerivative && hasWeights) line("h = " + weightVar(ij) + ";");
            line(
              weightVar(ij) +
                " = b * " +
                weightVar(ij1) +
                " + a * " +
                weightVar(ij) +
                ";",
            );
          });
        }
        ndloop(n, function (ii) {
          var weightFactor, pt1, pt2;
          var ij = ii.slice();
          var ij1 = ii.slice();
          // Replace the dimension being interpolated with the interpolation indices
          ij[d] = j;
          ij1[d] = j - 1;
          // Create a version to which we can append the dimension when we loop over spatial dimension
          if (isDerivative) {
            var derivCoeff = i + 1;
            if (isBasis) {
              weightFactor = hasWeights
                ? "h * " + weightVar(ij1) + " / " + weightVar(ij) + " * "
                : "";
              pt1 = pointVar(ij) + (hasWeights ? " / h" : "");
              pt2 = pointVar(ij1) + (hasWeights ? " / " + weightVar(ij1) : "");
              line(
                pointVar(ij) +
                  " = " +
                  derivCoeff +
                  " * " +
                  weightFactor +
                  "(" +
                  pt1 +
                  " - " +
                  pt2 +
                  ") * m;",
              );
            } else {
              var ijWithDimension = ij.slice();
              var ij1WithDimension = ij1.slice();
              for (m = 0; m < spaceDimension; m++) {
                ijWithDimension[splineDimension] = ij1WithDimension[
                  splineDimension
                ] = m;
                weightFactor = hasWeights
                  ? "h * " + weightVar(ij1) + " / " + weightVar(ij) + " * "
                  : "";
                pt1 = pointVar(ijWithDimension) + (hasWeights ? " / h" : "");
                pt2 =
                  pointVar(ij1WithDimension) +
                  (hasWeights ? " / " + weightVar(ij1) : "");
                line(
                  pointVar(ijWithDimension) +
                    " = " +
                    derivCoeff +
                    " * " +
                    weightFactor +
                    "(" +
                    pt1 +
                    " - " +
                    pt2 +
                    ") * m;",
                );
              }
            }
          } else {
            if (isBasis) {
              line(
                pointVar(ij) +
                  " = b * " +
                  pointVar(ij1) +
                  " + a * " +
                  pointVar(ij) +
                  ";",
              );
            } else {
              for (m = 0; m < spaceDimension; m++) {
                ij[splineDimension] = ij1[splineDimension] = m;
                line(
                  pointVar(ij) +
                    " = b * " +
                    pointVar(ij1) +
                    " + a * " +
                    pointVar(ij) +
                    ";",
                );
              }
            }
          }
        });
        debugLine("\n");
      }
    }
  }

  if (debug) {
    if (hasWeights) {
      line(
        "\n  // Project back from homogeneous coordinates and return final output\n",
      );
    } else {
      line("\n  // Return final output\n");
    }
  }
  if (isBasis) {
    if (hasWeights) {
      line("return " + pointVar(degree) + " / " + weightVar(degree) + ";");
    } else {
      line("return " + pointVar(degree) + ";");
    }
  } else {
    for (d = 0; d < spaceDimension; d++) {
      if (hasWeights) {
        line(
          "out[" +
            d +
            "] = " +
            pointVar(degree.concat([d])) +
            " / " +
            weightVar(degree) +
            ";",
        );
      } else {
        line("out[" + d + "] = " + pointVar(degree.concat([d])) + ";");
      }
    }
  }
  if (!isBasis) {
    line("return out;");
  }
  code.push("}");

  if (debug) {
    var codeStr = code.join("\n");
    logger(codeStr);

    codeCache[cacheKey] = codeStr;
  }

  var evaluator = new Function(
    [code.join("\n"), "; return ", functionName].join(""),
  )();
  evaluatorCache[cacheKey] = evaluator;
  return evaluator.bind(nurbs);
};

var transformerCache = {};

var transform = function createTransform(cacheKey, nurbs, accessors, debug) {
  var i, j, iterator, iterators, terms, n, rvalue, lvalue;
  var cachedTransformer = transformerCache[cacheKey];
  if (cachedTransformer) {
    return cachedTransformer.bind(nurbs);
  }

  var code = [];
  var functionName = "transform" + cacheKey;

  code.push("function " + functionName + "(m) {");
  code.push("var i, w;");
  code.push(accessorPreamble(nurbs, "x", "this.points", nurbs.points));

  var sizeVar = variable(debug ? "size" : "s");
  for (i = 0; i < nurbs.splineDimension; i++) {
    code.push(
      "var " +
        sizeVar(i) +
        " = " +
        sizeGetter(nurbs.points, "this.points", i) +
        ";",
    );
  }

  iterators = [];
  for (i = 0; i < nurbs.splineDimension; i++) {
    iterator = "i" + i;
    iterators.push(iterator);
    code.push(
      "for (" +
        iterator +
        " = " +
        sizeVar(i) +
        "- 1; " +
        iterator +
        " >= 0; " +
        iterator +
        "--) {",
    );
  }

  for (i = 0; i < nurbs.dimension; i++) {
    code.push("x" + i + " = " + accessors.point(iterators.concat([i])));
  }

  terms = [];
  for (i = 0; i < nurbs.dimension; i++) {
    terms.push("m[" + ((nurbs.dimension + 1) * (i + 1) - 1) + "] * x" + i);
  }
  terms.push("m[" + ((nurbs.dimension + 1) * (nurbs.dimension + 1) - 1) + "]");
  code.push("var w = (" + terms.join(" + ") + ") || 1.0;");

  for (i = 0; i < nurbs.dimension; i++) {
    terms = [];
    n = nurbs.dimension;
    for (j = 0; j < n; j++) {
      terms.push("m[" + (j * (n + 1) + i) + "] * x" + j);
    }
    terms.push("m[" + (j * (n + 1) + i) + "]");
    lvalue = accessors.point(iterators.concat([i]));
    rvalue = "(" + terms.join(" + ") + ") / w";
    code.push(lvalue + " = " + rvalue + ";");
  }

  for (i = nurbs.splineDimension - 1; i >= 0; i--) {
    code.push("}");
  }

  code.push("return this;");
  code.push("}");

  var transform = new Function(
    [code.join("\n"), "; return ", functionName].join(""),
  )();

  if (debug) console.log(code.join("\n"));

  transformerCache[cacheKey] = transform;
  return transform.bind(nurbs);
};

var supportCache = {};

var support = function (cacheKey, nurbs, accessors, debug, checkBounds) {
  var cachedSupport = supportCache[cacheKey];
  if (cachedSupport) {
    return cachedSupport.bind(nurbs);
  }

  var degree = nurbs.degree;
  var knots = nurbs.knots;
  var splineDimension = nurbs.splineDimension;
  var boundary = nurbs.boundary;

  var i, n, d;
  var code = [];
  var functionName = "support" + cacheKey;

  var knotAccessor = accessors.knot;

  var tVar = variable("t");
  var domainVar = debug ? "domain" : "d";
  var sizeVar = variable(debug ? "size" : "s");
  var knotIndex = variable(debug ? "knotIndex" : "i");

  var allDimensionUniform = true;
  for (d = 0; d < splineDimension; d++) {
    if (isArrayLike(knots) && isArrayLike(knots[d])) {
      allDimensionUniform = false;
    }
  }

  // Just to indent properly and save lots of typing
  function line(str) {
    code.push("  " + (str || ""));
  }

  var parameterArgs = [];
  for (i = 0; i < splineDimension; i++) {
    parameterArgs.push(tVar([i]));
  }

  code.push(
    "function " + functionName + " (out, " + parameterArgs.join(", ") + ") {",
  );

  var c = 0;
  function pushSupport(args, period) {
    if (period === undefined) {
      line("out[" + c++ + "] = " + args.join(" + ") + ";");
    } else {
      line(
        "out[" +
          c++ +
          "] = (" +
          args.join(" + ") +
          " + " +
          period +
          ") % " +
          period +
          ";",
      );
    }
  }

  line("var h, m;");
  line("var c = 0;");

  if (checkBounds) {
    line("var " + domainVar + " = this.domain;");
    line("for (var i = 0; i < this.splineDimension; i++) {");
    line("  a = arguments[i + 1];");
    line(
      "  if (a < " +
        domainVar +
        "[i][0] || a > " +
        domainVar +
        "[i][1] || a === undefined || isNaN(a)) {",
    );
    line(
      "    throw new Error('Invalid Spline parameter in dimension '+i+'. Valid domain is ['+" +
        domainVar +
        "[i][0]+', '+" +
        domainVar +
        "[i][1]+']. but got t'+i+' = '+arguments[i + 1]+'.');",
    );
    line("  }");
    line("}");
  }

  for (d = 0; d < splineDimension; d++) {
    line(
      "var " +
        sizeVar(d) +
        " = " +
        sizeGetter(nurbs.points, "this.points", d) +
        ";",
    );
  }

  if (!allDimensionUniform) {
    code.push(accessorPreamble(nurbs, "k", "this.knots", knots));
  }

  var hasKnots = [];
  for (d = 0; d < splineDimension; d++) {
    switch (inferType_1(knots)) {
      case inferType_1.NDARRAY:
        hasKnots[d] = true;
        break;
      case inferType_1.ARRAY_OF_ARRAYS:
        hasKnots[d] = isArrayLike(knots[d]);
        break;
    }
  }

  for (d = 0; d < splineDimension; d++) {
    if (hasKnots[d]) {
      line("var " + knotIndex(d) + " = 0;");
      line("h = " + sizeVar(d) + ";");
      line("while(h > " + knotIndex(d) + " + 1) {");
      line("  m = 0.5 * (h + " + knotIndex(d) + ") | 0;");
      line("  if (" + knotAccessor([d, "m"]) + " > " + tVar(d) + ") h = m;");
      line("  else " + knotIndex(d) + " = m;");
      line("}");
    } else {
      if (boundary[d] === "closed") {
        line(knotIndex(d) + " = (" + tVar(d) + " | 0) % " + sizeVar(d) + ";");
      } else {
        line(knotIndex(d) + " = (" + tVar(d) + " | 0);");
        line(
          "if (" +
            knotIndex(d) +
            " < " +
            degree[d] +
            ") " +
            knotIndex(d) +
            " = " +
            degree[d] +
            ";",
        );
        line(
          "if (" +
            knotIndex(d) +
            " > " +
            sizeVar(d) +
            " - 1) " +
            knotIndex(d) +
            " = " +
            sizeVar(d) +
            " - 1;",
        );
      }
    }
  }

  for (d = 0, n = []; d < splineDimension; d++) {
    n[d] = degree[d] + 1;
  }

  ndloop(n, function (dst) {
    var readIdx = [];
    var period = [];
    for (var d = 0; d < splineDimension; d++) {
      readIdx[d] = [knotIndex(d), dst[d] - degree[d]];
      if (boundary[d] === "closed" && dst[d] - degree[d] < 0)
        period[d] = sizeVar(d);
    }
    for (d = 0; d < splineDimension; d++) {
      pushSupport(readIdx[d], period[d]);
    }
  });

  line("out.length = " + c + ";");

  line("return out;");
  code.push("}");

  if (debug) console.log(code.join("\n"));

  var evaluator = new Function(
    [code.join("\n"), "; return ", functionName].join(""),
  )();
  supportCache[cacheKey] = evaluator;
  return evaluator.bind(nurbs);
};

var BOUNDARY_TYPES = {
  open: "open",
  closed: "closed",
  clamped: "clamped",
};

function isBlank(x) {
  return x === undefined || x === null;
}

function parseNURBS(points, degree, knots, weights, boundary, opts) {
  var i, dflt;

  if (points && !isArrayLike(points) && !isNdarray(points)) {
    opts = points;
    this.debug = points.debug;
    this.checkBounds = !!points.checkBounds;
    this.weights = points.weights;
    this.knots = points.knots;
    this.degree = points.degree;
    this.boundary = points.boundary;
    this.points = points.points;
    Object.defineProperty(this, "size", {
      value: opts.size,
      writable: true,
      configurable: true,
    });
  } else {
    opts = opts || {};
    this.weights = weights;
    this.knots = knots;
    this.degree = degree;
    this.points = points;
    this.boundary = boundary;
    this.debug = opts.debug;
    this.checkBounds = !!opts.checkBounds;
    Object.defineProperty(this, "size", {
      value: opts.size,
      writable: true,
      configurable: true,
    });
  }

  var pointType = inferType_1(this.points);
  var weightType = inferType_1(this.weights);
  var knotType = inferType_1(this.knots);

  if (this.points) {
    //
    // Sanitize the points
    //
    switch (pointType) {
      case inferType_1.GENERIC_NDARRAY:
      case inferType_1.NDARRAY:
        Object.defineProperties(this, {
          splineDimension: {
            value: this.points.shape.length - 1,
            writable: false,
            configurable: true,
          },
          dimension: {
            value: this.points.shape[this.points.shape.length - 1],
            writable: false,
            configurable: true,
          },
          size: {
            get: function () {
              return this.points.shape.slice(0, this.points.shape.length - 1);
            },
            set: function () {
              throw new Error("Cannot assign to read only property 'size'");
            },
            configurable: true,
          },
        });
        break;

      case inferType_1.ARRAY_OF_ARRAYS:
        // Follow the zeroth entries until we hit something that's not an array
        var splineDimension = 0;
        var size = this.size || [];
        size.length = 0;
        for (var ptr = this.points; isArrayLike(ptr[0]); ptr = ptr[0]) {
          splineDimension++;
          size.push(ptr.length);
        }
        if (splineDimension === 0) {
          throw new Error("Expected an array of points");
        }

        Object.defineProperties(this, {
          splineDimension: {
            value: splineDimension,
            writable: false,
            configurable: true,
          },
          dimension: {
            value: ptr.length,
            writable: false,
            configurable: true,
          },
          size: {
            get: function () {
              var size = [];
              size.length = 0;
              for (
                var i = 0, ptr = this.points;
                i < this.splineDimension;
                i++, ptr = ptr[0]
              ) {
                size[i] = ptr.length;
              }
              return size;
            },
            set: function () {
              throw new Error("Cannot assign to read only property 'size'");
            },
            configurable: true,
          },
        });

        break;
      case inferType_1.PACKED:
      default:
        throw new Error(
          "Expected either a packed array, array of arrays, or ndarray of points",
        );
    }
  } else {
    if (this.size === undefined || this.size === null) {
      throw new Error("Either points or a control hull size must be provided.");
    }
    if (!isArrayLike(this.size)) {
      Object.defineProperty(this, "size", {
        value: [this.size],
        writable: true,
        configurable: true,
      });
    }
    if (this.size.length === 0) {
      throw new Error(
        "`size` must be a number or an array of length at least one.",
      );
    }

    Object.defineProperties(this, {
      splineDimension: {
        value: this.size.length,
        writable: false,
        configurable: true,
      },
      dimension: {
        value: 0,
        writable: false,
        configurable: true,
      },
    });
  }

  //
  // Sanitize the degree into an array
  //
  if (isArrayLike(this.degree)) {
    for (i = 0; i < this.splineDimension; i++) {
      if (isBlank(this.degree[i])) {
        throw new Error("Missing degree in dimension " + (i + 1));
      }
    }
  } else {
    var hasBaseDegree = !isBlank(this.degree);
    var baseDegree = isBlank(this.degree) ? 2 : this.degree;
    this.degree = [];
    for (i = 0; i < this.splineDimension; i++) {
      if (this.size[i] <= baseDegree) {
        if (hasBaseDegree) {
          throw new Error(
            "Expected at least " +
              (baseDegree + 1) +
              " points for degree " +
              baseDegree +
              " spline in dimension " +
              (i + 1) +
              " but got only " +
              this.size[i],
          );
        } else {
          this.degree[i] = this.size[i] - 1;
        }
      } else {
        this.degree[i] = baseDegree;
      }
    }
  }

  //
  // Sanitize boundaries
  //
  dflt = typeof this.boundary !== "string" ? "open" : this.boundary;
  if (!BOUNDARY_TYPES[dflt]) {
    throw new Error(
      "Boundary type must be one of " +
        Object.keys(BOUNDARY_TYPES) +
        ". Got " +
        dflt,
    );
  }
  this.boundary = isArrayLike(this.boundary) ? this.boundary : [];
  this.boundary.length = this.splineDimension;
  for (i = 0; i < this.splineDimension; i++) {
    this.boundary[i] = isBlank(this.boundary[i]) ? dflt : this.boundary[i];

    if (!BOUNDARY_TYPES[dflt]) {
      throw new Error(
        "Boundary type must be one of " +
          Object.keys(BOUNDARY_TYPES) +
          ". Got " +
          dflt +
          " for dimension " +
          (i + 1),
      );
    }
  }

  //
  // Sanitize knots
  //
  switch (knotType) {
    case inferType_1.ARRAY_OF_ARRAYS:
      // Wrap flat arrays in an array so that curves are more natural
      if (
        isArrayLike(this.knots) &&
        this.knots.length > 0 &&
        !isArrayLike(this.knots[0])
      ) {
        this.knots = [this.knots];
      }

      for (i = 0; i < this.splineDimension; i++) {
        if (this.size[i] <= this.degree[i]) {
          throw new Error(
            "Expected at least " +
              (this.degree[i] + 1) +
              " points in dimension " +
              (i + 1) +
              " but got " +
              this.size[i] +
              ".",
          );
        }

        if (isArrayLike(this.knots[i])) {
          if (
            this.boundary[i] !== "closed" &&
            this.knots[i].length !== this.degree[i] + this.size[i] + 1
          ) {
            throw new Error(
              "Expected " +
                (this.degree[i] + this.size[i] + 1) +
                " knots in dimension " +
                (i + 1) +
                " but got " +
                this.knots[i].length +
                ".",
            );
          } else if (
            this.boundary[i] === "closed" &&
            this.knots[i].length !== this.size[i] + 1
          ) {
            // Fudge factor allowance for just ignoring extra knots. This makes some allowance
            // for passing regular clamped/open spline knots to a closed spline by ignoring extra
            // knots instead of simply truncating.
            var canBeFudged =
              this.knots[i].length === this.size[i] + this.degree[i] + 1;
            if (!canBeFudged) {
              throw new Error(
                "Expected " +
                  (this.size[i] + 1) +
                  " knots for closed spline in dimension " +
                  (i + 1) +
                  " but got " +
                  this.knots[i].length +
                  ".",
              );
            }
          }
        }
      }
      break;
  }

  //
  // Create evaluator
  //
  var newCacheKey = cacheKey(
    this,
    this.debug,
    this.checkBounds,
    pointType,
    weightType,
    knotType,
  );

  if (newCacheKey !== this.__cacheKey) {
    this.__cacheKey = newCacheKey;

    var accessors = createAccessors(this);

    this.evaluate = evaluate(
      this.__cacheKey,
      this,
      accessors,
      this.debug,
      this.checkBounds,
      false,
    );
    this.transform = transform(this.__cacheKey, this, accessors, this.debug);
    this.support = support(
      this.__cacheKey,
      this,
      accessors,
      this.debug,
      this.checkBounds,
    );

    this.evaluator = function (derivativeOrder, isBasis) {
      return evaluate(
        this.__cacheKey,
        this,
        accessors,
        this.debug,
        this.checkBounds,
        isBasis,
        derivativeOrder,
      );
    };
  }

  this.numericalDerivative = numericalDerivative.bind(this);

  return this;
}

function domainGetter() {
  var sizeArray;
  var ret = [];

  // If the reference to size is hard-coded, then the size cannot change, or
  // if you change points manually (like by appending a point) without re-running
  // the constructor, then it'll be incorrect. This aims for middle-ground
  // by querying the size directly, based on the point data type
  //
  // A pointer to the point array-of-arrays:
  var ptr = this.points;

  if (!ptr) {
    // If there are no points, then just use this.size
    sizeArray = this.size;
  } else if (isNdarrayLike(ptr)) {
    // If it's an ndarray, use the ndarray's shape property
    sizeArray = ptr.shape;
  }

  for (var d = 0; d < this.splineDimension; d++) {
    var size = sizeArray ? sizeArray[d] : ptr.length;
    var p = this.degree[d];
    var isClosed = this.boundary[d] === "closed";

    if (this.knots && this.knots[d]) {
      var k = this.knots[d];
      ret[d] = [k[isClosed ? 0 : p], k[size]];
    } else {
      ret[d] = [isClosed ? 0 : p, size];
    }

    // Otherwise if it's an array of arrays, we get the size of the next
    // dimension by recursing into the points
    if (ptr) ptr = ptr[0];
  }
  return ret;
}

// Evaluate Non-Uniform Rational B-Splines (NURBS)
// @param points {Array} - data array
// @param degree {Array} - spline curve degree
// @param knots {Array} - knot vector
// @param weights {Array} - weight vector
// @param opts {object} - additional options
export function nurbs(points, degree, knots, weights, boundary, opts) {
  var ctor = function (points, degree, knots, weights, boundary, opts) {
    parseFcn(points, degree, knots, weights, boundary, opts);
    return ctor;
  };

  var parseFcn = parseNURBS.bind(ctor);

  Object.defineProperty(ctor, "domain", {
    get: domainGetter,
  });

  parseFcn(points, degree, knots, weights, boundary, opts);

  return ctor;
}
