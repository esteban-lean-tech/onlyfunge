(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __assign = Object.assign;
  var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
  var __commonJS = (callback, module) => () => {
    if (!module) {
      module = {exports: {}};
      callback(module.exports, module);
    }
    return module.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, {get: all[name], enumerable: true});
  };
  var __exportStar = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, {get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable});
    }
    return target;
  };
  var __toModule = (module) => {
    return __exportStar(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? {get: () => module.default, enumerable: true} : {value: module, enumerable: true})), module);
  };

  // node_modules/bignumber.js/bignumber.js
  var require_bignumber = __commonJS((exports, module) => {
    (function(globalObject) {
      "use strict";
      var BigNumber2, isNumeric = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i, mathceil = Math.ceil, mathfloor = Math.floor, bignumberError = "[BigNumber Error] ", tooManyDigits = bignumberError + "Number primitive has more than 15 significant digits: ", BASE = 1e14, LOG_BASE = 14, MAX_SAFE_INTEGER = 9007199254740991, POWS_TEN = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13], SQRT_BASE = 1e7, MAX = 1e9;
      function clone(configObject) {
        var div2, convertBase, parseNumeric, P = BigNumber3.prototype = {constructor: BigNumber3, toString: null, valueOf: null}, ONE = new BigNumber3(1), DECIMAL_PLACES = 20, ROUNDING_MODE = 4, TO_EXP_NEG = -7, TO_EXP_POS = 21, MIN_EXP = -1e7, MAX_EXP = 1e7, CRYPTO = false, MODULO_MODE = 1, POW_PRECISION = 0, FORMAT = {
          prefix: "",
          groupSize: 3,
          secondaryGroupSize: 0,
          groupSeparator: ",",
          decimalSeparator: ".",
          fractionGroupSize: 0,
          fractionGroupSeparator: "\xA0",
          suffix: ""
        }, ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyz";
        function BigNumber3(v, b) {
          var alphabet, c, caseChanged, e, i, isNum, len2, str, x = this;
          if (!(x instanceof BigNumber3))
            return new BigNumber3(v, b);
          if (b == null) {
            if (v && v._isBigNumber === true) {
              x.s = v.s;
              if (!v.c || v.e > MAX_EXP) {
                x.c = x.e = null;
              } else if (v.e < MIN_EXP) {
                x.c = [x.e = 0];
              } else {
                x.e = v.e;
                x.c = v.c.slice();
              }
              return;
            }
            if ((isNum = typeof v == "number") && v * 0 == 0) {
              x.s = 1 / v < 0 ? (v = -v, -1) : 1;
              if (v === ~~v) {
                for (e = 0, i = v; i >= 10; i /= 10, e++)
                  ;
                if (e > MAX_EXP) {
                  x.c = x.e = null;
                } else {
                  x.e = e;
                  x.c = [v];
                }
                return;
              }
              str = String(v);
            } else {
              if (!isNumeric.test(str = String(v)))
                return parseNumeric(x, str, isNum);
              x.s = str.charCodeAt(0) == 45 ? (str = str.slice(1), -1) : 1;
            }
            if ((e = str.indexOf(".")) > -1)
              str = str.replace(".", "");
            if ((i = str.search(/e/i)) > 0) {
              if (e < 0)
                e = i;
              e += +str.slice(i + 1);
              str = str.substring(0, i);
            } else if (e < 0) {
              e = str.length;
            }
          } else {
            intCheck(b, 2, ALPHABET.length, "Base");
            if (b == 10) {
              x = new BigNumber3(v);
              return round(x, DECIMAL_PLACES + x.e + 1, ROUNDING_MODE);
            }
            str = String(v);
            if (isNum = typeof v == "number") {
              if (v * 0 != 0)
                return parseNumeric(x, str, isNum, b);
              x.s = 1 / v < 0 ? (str = str.slice(1), -1) : 1;
              if (BigNumber3.DEBUG && str.replace(/^0\.0*|\./, "").length > 15) {
                throw Error(tooManyDigits + v);
              }
            } else {
              x.s = str.charCodeAt(0) === 45 ? (str = str.slice(1), -1) : 1;
            }
            alphabet = ALPHABET.slice(0, b);
            e = i = 0;
            for (len2 = str.length; i < len2; i++) {
              if (alphabet.indexOf(c = str.charAt(i)) < 0) {
                if (c == ".") {
                  if (i > e) {
                    e = len2;
                    continue;
                  }
                } else if (!caseChanged) {
                  if (str == str.toUpperCase() && (str = str.toLowerCase()) || str == str.toLowerCase() && (str = str.toUpperCase())) {
                    caseChanged = true;
                    i = -1;
                    e = 0;
                    continue;
                  }
                }
                return parseNumeric(x, String(v), isNum, b);
              }
            }
            isNum = false;
            str = convertBase(str, b, 10, x.s);
            if ((e = str.indexOf(".")) > -1)
              str = str.replace(".", "");
            else
              e = str.length;
          }
          for (i = 0; str.charCodeAt(i) === 48; i++)
            ;
          for (len2 = str.length; str.charCodeAt(--len2) === 48; )
            ;
          if (str = str.slice(i, ++len2)) {
            len2 -= i;
            if (isNum && BigNumber3.DEBUG && len2 > 15 && (v > MAX_SAFE_INTEGER || v !== mathfloor(v))) {
              throw Error(tooManyDigits + x.s * v);
            }
            if ((e = e - i - 1) > MAX_EXP) {
              x.c = x.e = null;
            } else if (e < MIN_EXP) {
              x.c = [x.e = 0];
            } else {
              x.e = e;
              x.c = [];
              i = (e + 1) % LOG_BASE;
              if (e < 0)
                i += LOG_BASE;
              if (i < len2) {
                if (i)
                  x.c.push(+str.slice(0, i));
                for (len2 -= LOG_BASE; i < len2; ) {
                  x.c.push(+str.slice(i, i += LOG_BASE));
                }
                i = LOG_BASE - (str = str.slice(i)).length;
              } else {
                i -= len2;
              }
              for (; i--; str += "0")
                ;
              x.c.push(+str);
            }
          } else {
            x.c = [x.e = 0];
          }
        }
        BigNumber3.clone = clone;
        BigNumber3.ROUND_UP = 0;
        BigNumber3.ROUND_DOWN = 1;
        BigNumber3.ROUND_CEIL = 2;
        BigNumber3.ROUND_FLOOR = 3;
        BigNumber3.ROUND_HALF_UP = 4;
        BigNumber3.ROUND_HALF_DOWN = 5;
        BigNumber3.ROUND_HALF_EVEN = 6;
        BigNumber3.ROUND_HALF_CEIL = 7;
        BigNumber3.ROUND_HALF_FLOOR = 8;
        BigNumber3.EUCLID = 9;
        BigNumber3.config = BigNumber3.set = function(obj) {
          var p, v;
          if (obj != null) {
            if (typeof obj == "object") {
              if (obj.hasOwnProperty(p = "DECIMAL_PLACES")) {
                v = obj[p];
                intCheck(v, 0, MAX, p);
                DECIMAL_PLACES = v;
              }
              if (obj.hasOwnProperty(p = "ROUNDING_MODE")) {
                v = obj[p];
                intCheck(v, 0, 8, p);
                ROUNDING_MODE = v;
              }
              if (obj.hasOwnProperty(p = "EXPONENTIAL_AT")) {
                v = obj[p];
                if (v && v.pop) {
                  intCheck(v[0], -MAX, 0, p);
                  intCheck(v[1], 0, MAX, p);
                  TO_EXP_NEG = v[0];
                  TO_EXP_POS = v[1];
                } else {
                  intCheck(v, -MAX, MAX, p);
                  TO_EXP_NEG = -(TO_EXP_POS = v < 0 ? -v : v);
                }
              }
              if (obj.hasOwnProperty(p = "RANGE")) {
                v = obj[p];
                if (v && v.pop) {
                  intCheck(v[0], -MAX, -1, p);
                  intCheck(v[1], 1, MAX, p);
                  MIN_EXP = v[0];
                  MAX_EXP = v[1];
                } else {
                  intCheck(v, -MAX, MAX, p);
                  if (v) {
                    MIN_EXP = -(MAX_EXP = v < 0 ? -v : v);
                  } else {
                    throw Error(bignumberError + p + " cannot be zero: " + v);
                  }
                }
              }
              if (obj.hasOwnProperty(p = "CRYPTO")) {
                v = obj[p];
                if (v === !!v) {
                  if (v) {
                    if (typeof crypto != "undefined" && crypto && (crypto.getRandomValues || crypto.randomBytes)) {
                      CRYPTO = v;
                    } else {
                      CRYPTO = !v;
                      throw Error(bignumberError + "crypto unavailable");
                    }
                  } else {
                    CRYPTO = v;
                  }
                } else {
                  throw Error(bignumberError + p + " not true or false: " + v);
                }
              }
              if (obj.hasOwnProperty(p = "MODULO_MODE")) {
                v = obj[p];
                intCheck(v, 0, 9, p);
                MODULO_MODE = v;
              }
              if (obj.hasOwnProperty(p = "POW_PRECISION")) {
                v = obj[p];
                intCheck(v, 0, MAX, p);
                POW_PRECISION = v;
              }
              if (obj.hasOwnProperty(p = "FORMAT")) {
                v = obj[p];
                if (typeof v == "object")
                  FORMAT = v;
                else
                  throw Error(bignumberError + p + " not an object: " + v);
              }
              if (obj.hasOwnProperty(p = "ALPHABET")) {
                v = obj[p];
                if (typeof v == "string" && !/^.?$|[+\-.\s]|(.).*\1/.test(v)) {
                  ALPHABET = v;
                } else {
                  throw Error(bignumberError + p + " invalid: " + v);
                }
              }
            } else {
              throw Error(bignumberError + "Object expected: " + obj);
            }
          }
          return {
            DECIMAL_PLACES,
            ROUNDING_MODE,
            EXPONENTIAL_AT: [TO_EXP_NEG, TO_EXP_POS],
            RANGE: [MIN_EXP, MAX_EXP],
            CRYPTO,
            MODULO_MODE,
            POW_PRECISION,
            FORMAT,
            ALPHABET
          };
        };
        BigNumber3.isBigNumber = function(v) {
          if (!v || v._isBigNumber !== true)
            return false;
          if (!BigNumber3.DEBUG)
            return true;
          var i, n, c = v.c, e = v.e, s = v.s;
          out:
            if ({}.toString.call(c) == "[object Array]") {
              if ((s === 1 || s === -1) && e >= -MAX && e <= MAX && e === mathfloor(e)) {
                if (c[0] === 0) {
                  if (e === 0 && c.length === 1)
                    return true;
                  break out;
                }
                i = (e + 1) % LOG_BASE;
                if (i < 1)
                  i += LOG_BASE;
                if (String(c[0]).length == i) {
                  for (i = 0; i < c.length; i++) {
                    n = c[i];
                    if (n < 0 || n >= BASE || n !== mathfloor(n))
                      break out;
                  }
                  if (n !== 0)
                    return true;
                }
              }
            } else if (c === null && e === null && (s === null || s === 1 || s === -1)) {
              return true;
            }
          throw Error(bignumberError + "Invalid BigNumber: " + v);
        };
        BigNumber3.maximum = BigNumber3.max = function() {
          return maxOrMin(arguments, P.lt);
        };
        BigNumber3.minimum = BigNumber3.min = function() {
          return maxOrMin(arguments, P.gt);
        };
        BigNumber3.random = function() {
          var pow2_53 = 9007199254740992;
          var random53bitInt = Math.random() * pow2_53 & 2097151 ? function() {
            return mathfloor(Math.random() * pow2_53);
          } : function() {
            return (Math.random() * 1073741824 | 0) * 8388608 + (Math.random() * 8388608 | 0);
          };
          return function(dp) {
            var a, b, e, k, v, i = 0, c = [], rand = new BigNumber3(ONE);
            if (dp == null)
              dp = DECIMAL_PLACES;
            else
              intCheck(dp, 0, MAX);
            k = mathceil(dp / LOG_BASE);
            if (CRYPTO) {
              if (crypto.getRandomValues) {
                a = crypto.getRandomValues(new Uint32Array(k *= 2));
                for (; i < k; ) {
                  v = a[i] * 131072 + (a[i + 1] >>> 11);
                  if (v >= 9e15) {
                    b = crypto.getRandomValues(new Uint32Array(2));
                    a[i] = b[0];
                    a[i + 1] = b[1];
                  } else {
                    c.push(v % 1e14);
                    i += 2;
                  }
                }
                i = k / 2;
              } else if (crypto.randomBytes) {
                a = crypto.randomBytes(k *= 7);
                for (; i < k; ) {
                  v = (a[i] & 31) * 281474976710656 + a[i + 1] * 1099511627776 + a[i + 2] * 4294967296 + a[i + 3] * 16777216 + (a[i + 4] << 16) + (a[i + 5] << 8) + a[i + 6];
                  if (v >= 9e15) {
                    crypto.randomBytes(7).copy(a, i);
                  } else {
                    c.push(v % 1e14);
                    i += 7;
                  }
                }
                i = k / 7;
              } else {
                CRYPTO = false;
                throw Error(bignumberError + "crypto unavailable");
              }
            }
            if (!CRYPTO) {
              for (; i < k; ) {
                v = random53bitInt();
                if (v < 9e15)
                  c[i++] = v % 1e14;
              }
            }
            k = c[--i];
            dp %= LOG_BASE;
            if (k && dp) {
              v = POWS_TEN[LOG_BASE - dp];
              c[i] = mathfloor(k / v) * v;
            }
            for (; c[i] === 0; c.pop(), i--)
              ;
            if (i < 0) {
              c = [e = 0];
            } else {
              for (e = -1; c[0] === 0; c.splice(0, 1), e -= LOG_BASE)
                ;
              for (i = 1, v = c[0]; v >= 10; v /= 10, i++)
                ;
              if (i < LOG_BASE)
                e -= LOG_BASE - i;
            }
            rand.e = e;
            rand.c = c;
            return rand;
          };
        }();
        BigNumber3.sum = function() {
          var i = 1, args = arguments, sum = new BigNumber3(args[0]);
          for (; i < args.length; )
            sum = sum.plus(args[i++]);
          return sum;
        };
        convertBase = function() {
          var decimal = "0123456789";
          function toBaseOut(str, baseIn, baseOut, alphabet) {
            var j, arr = [0], arrL, i = 0, len2 = str.length;
            for (; i < len2; ) {
              for (arrL = arr.length; arrL--; arr[arrL] *= baseIn)
                ;
              arr[0] += alphabet.indexOf(str.charAt(i++));
              for (j = 0; j < arr.length; j++) {
                if (arr[j] > baseOut - 1) {
                  if (arr[j + 1] == null)
                    arr[j + 1] = 0;
                  arr[j + 1] += arr[j] / baseOut | 0;
                  arr[j] %= baseOut;
                }
              }
            }
            return arr.reverse();
          }
          return function(str, baseIn, baseOut, sign, callerIsToString) {
            var alphabet, d, e, k, r, x, xc, y, i = str.indexOf("."), dp = DECIMAL_PLACES, rm = ROUNDING_MODE;
            if (i >= 0) {
              k = POW_PRECISION;
              POW_PRECISION = 0;
              str = str.replace(".", "");
              y = new BigNumber3(baseIn);
              x = y.pow(str.length - i);
              POW_PRECISION = k;
              y.c = toBaseOut(toFixedPoint(coeffToString(x.c), x.e, "0"), 10, baseOut, decimal);
              y.e = y.c.length;
            }
            xc = toBaseOut(str, baseIn, baseOut, callerIsToString ? (alphabet = ALPHABET, decimal) : (alphabet = decimal, ALPHABET));
            e = k = xc.length;
            for (; xc[--k] == 0; xc.pop())
              ;
            if (!xc[0])
              return alphabet.charAt(0);
            if (i < 0) {
              --e;
            } else {
              x.c = xc;
              x.e = e;
              x.s = sign;
              x = div2(x, y, dp, rm, baseOut);
              xc = x.c;
              r = x.r;
              e = x.e;
            }
            d = e + dp + 1;
            i = xc[d];
            k = baseOut / 2;
            r = r || d < 0 || xc[d + 1] != null;
            r = rm < 4 ? (i != null || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2)) : i > k || i == k && (rm == 4 || r || rm == 6 && xc[d - 1] & 1 || rm == (x.s < 0 ? 8 : 7));
            if (d < 1 || !xc[0]) {
              str = r ? toFixedPoint(alphabet.charAt(1), -dp, alphabet.charAt(0)) : alphabet.charAt(0);
            } else {
              xc.length = d;
              if (r) {
                for (--baseOut; ++xc[--d] > baseOut; ) {
                  xc[d] = 0;
                  if (!d) {
                    ++e;
                    xc = [1].concat(xc);
                  }
                }
              }
              for (k = xc.length; !xc[--k]; )
                ;
              for (i = 0, str = ""; i <= k; str += alphabet.charAt(xc[i++]))
                ;
              str = toFixedPoint(str, e, alphabet.charAt(0));
            }
            return str;
          };
        }();
        div2 = function() {
          function multiply(x, k, base) {
            var m, temp, xlo, xhi, carry = 0, i = x.length, klo = k % SQRT_BASE, khi = k / SQRT_BASE | 0;
            for (x = x.slice(); i--; ) {
              xlo = x[i] % SQRT_BASE;
              xhi = x[i] / SQRT_BASE | 0;
              m = khi * xlo + xhi * klo;
              temp = klo * xlo + m % SQRT_BASE * SQRT_BASE + carry;
              carry = (temp / base | 0) + (m / SQRT_BASE | 0) + khi * xhi;
              x[i] = temp % base;
            }
            if (carry)
              x = [carry].concat(x);
            return x;
          }
          function compare2(a, b, aL, bL) {
            var i, cmp;
            if (aL != bL) {
              cmp = aL > bL ? 1 : -1;
            } else {
              for (i = cmp = 0; i < aL; i++) {
                if (a[i] != b[i]) {
                  cmp = a[i] > b[i] ? 1 : -1;
                  break;
                }
              }
            }
            return cmp;
          }
          function subtract(a, b, aL, base) {
            var i = 0;
            for (; aL--; ) {
              a[aL] -= i;
              i = a[aL] < b[aL] ? 1 : 0;
              a[aL] = i * base + a[aL] - b[aL];
            }
            for (; !a[0] && a.length > 1; a.splice(0, 1))
              ;
          }
          return function(x, y, dp, rm, base) {
            var cmp, e, i, more, n, prod, prodL, q, qc, rem, remL, rem0, xi, xL, yc0, yL, yz, s = x.s == y.s ? 1 : -1, xc = x.c, yc = y.c;
            if (!xc || !xc[0] || !yc || !yc[0]) {
              return new BigNumber3(!x.s || !y.s || (xc ? yc && xc[0] == yc[0] : !yc) ? NaN : xc && xc[0] == 0 || !yc ? s * 0 : s / 0);
            }
            q = new BigNumber3(s);
            qc = q.c = [];
            e = x.e - y.e;
            s = dp + e + 1;
            if (!base) {
              base = BASE;
              e = bitFloor(x.e / LOG_BASE) - bitFloor(y.e / LOG_BASE);
              s = s / LOG_BASE | 0;
            }
            for (i = 0; yc[i] == (xc[i] || 0); i++)
              ;
            if (yc[i] > (xc[i] || 0))
              e--;
            if (s < 0) {
              qc.push(1);
              more = true;
            } else {
              xL = xc.length;
              yL = yc.length;
              i = 0;
              s += 2;
              n = mathfloor(base / (yc[0] + 1));
              if (n > 1) {
                yc = multiply(yc, n, base);
                xc = multiply(xc, n, base);
                yL = yc.length;
                xL = xc.length;
              }
              xi = yL;
              rem = xc.slice(0, yL);
              remL = rem.length;
              for (; remL < yL; rem[remL++] = 0)
                ;
              yz = yc.slice();
              yz = [0].concat(yz);
              yc0 = yc[0];
              if (yc[1] >= base / 2)
                yc0++;
              do {
                n = 0;
                cmp = compare2(yc, rem, yL, remL);
                if (cmp < 0) {
                  rem0 = rem[0];
                  if (yL != remL)
                    rem0 = rem0 * base + (rem[1] || 0);
                  n = mathfloor(rem0 / yc0);
                  if (n > 1) {
                    if (n >= base)
                      n = base - 1;
                    prod = multiply(yc, n, base);
                    prodL = prod.length;
                    remL = rem.length;
                    while (compare2(prod, rem, prodL, remL) == 1) {
                      n--;
                      subtract(prod, yL < prodL ? yz : yc, prodL, base);
                      prodL = prod.length;
                      cmp = 1;
                    }
                  } else {
                    if (n == 0) {
                      cmp = n = 1;
                    }
                    prod = yc.slice();
                    prodL = prod.length;
                  }
                  if (prodL < remL)
                    prod = [0].concat(prod);
                  subtract(rem, prod, remL, base);
                  remL = rem.length;
                  if (cmp == -1) {
                    while (compare2(yc, rem, yL, remL) < 1) {
                      n++;
                      subtract(rem, yL < remL ? yz : yc, remL, base);
                      remL = rem.length;
                    }
                  }
                } else if (cmp === 0) {
                  n++;
                  rem = [0];
                }
                qc[i++] = n;
                if (rem[0]) {
                  rem[remL++] = xc[xi] || 0;
                } else {
                  rem = [xc[xi]];
                  remL = 1;
                }
              } while ((xi++ < xL || rem[0] != null) && s--);
              more = rem[0] != null;
              if (!qc[0])
                qc.splice(0, 1);
            }
            if (base == BASE) {
              for (i = 1, s = qc[0]; s >= 10; s /= 10, i++)
                ;
              round(q, dp + (q.e = i + e * LOG_BASE - 1) + 1, rm, more);
            } else {
              q.e = e;
              q.r = +more;
            }
            return q;
          };
        }();
        function format(n, i, rm, id) {
          var c0, e, ne, len2, str;
          if (rm == null)
            rm = ROUNDING_MODE;
          else
            intCheck(rm, 0, 8);
          if (!n.c)
            return n.toString();
          c0 = n.c[0];
          ne = n.e;
          if (i == null) {
            str = coeffToString(n.c);
            str = id == 1 || id == 2 && (ne <= TO_EXP_NEG || ne >= TO_EXP_POS) ? toExponential(str, ne) : toFixedPoint(str, ne, "0");
          } else {
            n = round(new BigNumber3(n), i, rm);
            e = n.e;
            str = coeffToString(n.c);
            len2 = str.length;
            if (id == 1 || id == 2 && (i <= e || e <= TO_EXP_NEG)) {
              for (; len2 < i; str += "0", len2++)
                ;
              str = toExponential(str, e);
            } else {
              i -= ne;
              str = toFixedPoint(str, e, "0");
              if (e + 1 > len2) {
                if (--i > 0)
                  for (str += "."; i--; str += "0")
                    ;
              } else {
                i += e - len2;
                if (i > 0) {
                  if (e + 1 == len2)
                    str += ".";
                  for (; i--; str += "0")
                    ;
                }
              }
            }
          }
          return n.s < 0 && c0 ? "-" + str : str;
        }
        function maxOrMin(args, method) {
          var n, i = 1, m = new BigNumber3(args[0]);
          for (; i < args.length; i++) {
            n = new BigNumber3(args[i]);
            if (!n.s) {
              m = n;
              break;
            } else if (method.call(m, n)) {
              m = n;
            }
          }
          return m;
        }
        function normalise(n, c, e) {
          var i = 1, j = c.length;
          for (; !c[--j]; c.pop())
            ;
          for (j = c[0]; j >= 10; j /= 10, i++)
            ;
          if ((e = i + e * LOG_BASE - 1) > MAX_EXP) {
            n.c = n.e = null;
          } else if (e < MIN_EXP) {
            n.c = [n.e = 0];
          } else {
            n.e = e;
            n.c = c;
          }
          return n;
        }
        parseNumeric = function() {
          var basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i, dotAfter = /^([^.]+)\.$/, dotBefore = /^\.([^.]+)$/, isInfinityOrNaN = /^-?(Infinity|NaN)$/, whitespaceOrPlus = /^\s*\+(?=[\w.])|^\s+|\s+$/g;
          return function(x, str, isNum, b) {
            var base, s = isNum ? str : str.replace(whitespaceOrPlus, "");
            if (isInfinityOrNaN.test(s)) {
              x.s = isNaN(s) ? null : s < 0 ? -1 : 1;
            } else {
              if (!isNum) {
                s = s.replace(basePrefix, function(m, p1, p2) {
                  base = (p2 = p2.toLowerCase()) == "x" ? 16 : p2 == "b" ? 2 : 8;
                  return !b || b == base ? p1 : m;
                });
                if (b) {
                  base = b;
                  s = s.replace(dotAfter, "$1").replace(dotBefore, "0.$1");
                }
                if (str != s)
                  return new BigNumber3(s, base);
              }
              if (BigNumber3.DEBUG) {
                throw Error(bignumberError + "Not a" + (b ? " base " + b : "") + " number: " + str);
              }
              x.s = null;
            }
            x.c = x.e = null;
          };
        }();
        function round(x, sd, rm, r) {
          var d, i, j, k, n, ni, rd, xc = x.c, pows10 = POWS_TEN;
          if (xc) {
            out: {
              for (d = 1, k = xc[0]; k >= 10; k /= 10, d++)
                ;
              i = sd - d;
              if (i < 0) {
                i += LOG_BASE;
                j = sd;
                n = xc[ni = 0];
                rd = n / pows10[d - j - 1] % 10 | 0;
              } else {
                ni = mathceil((i + 1) / LOG_BASE);
                if (ni >= xc.length) {
                  if (r) {
                    for (; xc.length <= ni; xc.push(0))
                      ;
                    n = rd = 0;
                    d = 1;
                    i %= LOG_BASE;
                    j = i - LOG_BASE + 1;
                  } else {
                    break out;
                  }
                } else {
                  n = k = xc[ni];
                  for (d = 1; k >= 10; k /= 10, d++)
                    ;
                  i %= LOG_BASE;
                  j = i - LOG_BASE + d;
                  rd = j < 0 ? 0 : n / pows10[d - j - 1] % 10 | 0;
                }
              }
              r = r || sd < 0 || xc[ni + 1] != null || (j < 0 ? n : n % pows10[d - j - 1]);
              r = rm < 4 ? (rd || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2)) : rd > 5 || rd == 5 && (rm == 4 || r || rm == 6 && (i > 0 ? j > 0 ? n / pows10[d - j] : 0 : xc[ni - 1]) % 10 & 1 || rm == (x.s < 0 ? 8 : 7));
              if (sd < 1 || !xc[0]) {
                xc.length = 0;
                if (r) {
                  sd -= x.e + 1;
                  xc[0] = pows10[(LOG_BASE - sd % LOG_BASE) % LOG_BASE];
                  x.e = -sd || 0;
                } else {
                  xc[0] = x.e = 0;
                }
                return x;
              }
              if (i == 0) {
                xc.length = ni;
                k = 1;
                ni--;
              } else {
                xc.length = ni + 1;
                k = pows10[LOG_BASE - i];
                xc[ni] = j > 0 ? mathfloor(n / pows10[d - j] % pows10[j]) * k : 0;
              }
              if (r) {
                for (; ; ) {
                  if (ni == 0) {
                    for (i = 1, j = xc[0]; j >= 10; j /= 10, i++)
                      ;
                    j = xc[0] += k;
                    for (k = 1; j >= 10; j /= 10, k++)
                      ;
                    if (i != k) {
                      x.e++;
                      if (xc[0] == BASE)
                        xc[0] = 1;
                    }
                    break;
                  } else {
                    xc[ni] += k;
                    if (xc[ni] != BASE)
                      break;
                    xc[ni--] = 0;
                    k = 1;
                  }
                }
              }
              for (i = xc.length; xc[--i] === 0; xc.pop())
                ;
            }
            if (x.e > MAX_EXP) {
              x.c = x.e = null;
            } else if (x.e < MIN_EXP) {
              x.c = [x.e = 0];
            }
          }
          return x;
        }
        function valueOf(n) {
          var str, e = n.e;
          if (e === null)
            return n.toString();
          str = coeffToString(n.c);
          str = e <= TO_EXP_NEG || e >= TO_EXP_POS ? toExponential(str, e) : toFixedPoint(str, e, "0");
          return n.s < 0 ? "-" + str : str;
        }
        P.absoluteValue = P.abs = function() {
          var x = new BigNumber3(this);
          if (x.s < 0)
            x.s = 1;
          return x;
        };
        P.comparedTo = function(y, b) {
          return compare(this, new BigNumber3(y, b));
        };
        P.decimalPlaces = P.dp = function(dp, rm) {
          var c, n, v, x = this;
          if (dp != null) {
            intCheck(dp, 0, MAX);
            if (rm == null)
              rm = ROUNDING_MODE;
            else
              intCheck(rm, 0, 8);
            return round(new BigNumber3(x), dp + x.e + 1, rm);
          }
          if (!(c = x.c))
            return null;
          n = ((v = c.length - 1) - bitFloor(this.e / LOG_BASE)) * LOG_BASE;
          if (v = c[v])
            for (; v % 10 == 0; v /= 10, n--)
              ;
          if (n < 0)
            n = 0;
          return n;
        };
        P.dividedBy = P.div = function(y, b) {
          return div2(this, new BigNumber3(y, b), DECIMAL_PLACES, ROUNDING_MODE);
        };
        P.dividedToIntegerBy = P.idiv = function(y, b) {
          return div2(this, new BigNumber3(y, b), 0, 1);
        };
        P.exponentiatedBy = P.pow = function(n, m) {
          var half, isModExp, i, k, more, nIsBig, nIsNeg, nIsOdd, y, x = this;
          n = new BigNumber3(n);
          if (n.c && !n.isInteger()) {
            throw Error(bignumberError + "Exponent not an integer: " + valueOf(n));
          }
          if (m != null)
            m = new BigNumber3(m);
          nIsBig = n.e > 14;
          if (!x.c || !x.c[0] || x.c[0] == 1 && !x.e && x.c.length == 1 || !n.c || !n.c[0]) {
            y = new BigNumber3(Math.pow(+valueOf(x), nIsBig ? 2 - isOdd(n) : +valueOf(n)));
            return m ? y.mod(m) : y;
          }
          nIsNeg = n.s < 0;
          if (m) {
            if (m.c ? !m.c[0] : !m.s)
              return new BigNumber3(NaN);
            isModExp = !nIsNeg && x.isInteger() && m.isInteger();
            if (isModExp)
              x = x.mod(m);
          } else if (n.e > 9 && (x.e > 0 || x.e < -1 || (x.e == 0 ? x.c[0] > 1 || nIsBig && x.c[1] >= 24e7 : x.c[0] < 8e13 || nIsBig && x.c[0] <= 9999975e7))) {
            k = x.s < 0 && isOdd(n) ? -0 : 0;
            if (x.e > -1)
              k = 1 / k;
            return new BigNumber3(nIsNeg ? 1 / k : k);
          } else if (POW_PRECISION) {
            k = mathceil(POW_PRECISION / LOG_BASE + 2);
          }
          if (nIsBig) {
            half = new BigNumber3(0.5);
            if (nIsNeg)
              n.s = 1;
            nIsOdd = isOdd(n);
          } else {
            i = Math.abs(+valueOf(n));
            nIsOdd = i % 2;
          }
          y = new BigNumber3(ONE);
          for (; ; ) {
            if (nIsOdd) {
              y = y.times(x);
              if (!y.c)
                break;
              if (k) {
                if (y.c.length > k)
                  y.c.length = k;
              } else if (isModExp) {
                y = y.mod(m);
              }
            }
            if (i) {
              i = mathfloor(i / 2);
              if (i === 0)
                break;
              nIsOdd = i % 2;
            } else {
              n = n.times(half);
              round(n, n.e + 1, 1);
              if (n.e > 14) {
                nIsOdd = isOdd(n);
              } else {
                i = +valueOf(n);
                if (i === 0)
                  break;
                nIsOdd = i % 2;
              }
            }
            x = x.times(x);
            if (k) {
              if (x.c && x.c.length > k)
                x.c.length = k;
            } else if (isModExp) {
              x = x.mod(m);
            }
          }
          if (isModExp)
            return y;
          if (nIsNeg)
            y = ONE.div(y);
          return m ? y.mod(m) : k ? round(y, POW_PRECISION, ROUNDING_MODE, more) : y;
        };
        P.integerValue = function(rm) {
          var n = new BigNumber3(this);
          if (rm == null)
            rm = ROUNDING_MODE;
          else
            intCheck(rm, 0, 8);
          return round(n, n.e + 1, rm);
        };
        P.isEqualTo = P.eq = function(y, b) {
          return compare(this, new BigNumber3(y, b)) === 0;
        };
        P.isFinite = function() {
          return !!this.c;
        };
        P.isGreaterThan = P.gt = function(y, b) {
          return compare(this, new BigNumber3(y, b)) > 0;
        };
        P.isGreaterThanOrEqualTo = P.gte = function(y, b) {
          return (b = compare(this, new BigNumber3(y, b))) === 1 || b === 0;
        };
        P.isInteger = function() {
          return !!this.c && bitFloor(this.e / LOG_BASE) > this.c.length - 2;
        };
        P.isLessThan = P.lt = function(y, b) {
          return compare(this, new BigNumber3(y, b)) < 0;
        };
        P.isLessThanOrEqualTo = P.lte = function(y, b) {
          return (b = compare(this, new BigNumber3(y, b))) === -1 || b === 0;
        };
        P.isNaN = function() {
          return !this.s;
        };
        P.isNegative = function() {
          return this.s < 0;
        };
        P.isPositive = function() {
          return this.s > 0;
        };
        P.isZero = function() {
          return !!this.c && this.c[0] == 0;
        };
        P.minus = function(y, b) {
          var i, j, t, xLTy, x = this, a = x.s;
          y = new BigNumber3(y, b);
          b = y.s;
          if (!a || !b)
            return new BigNumber3(NaN);
          if (a != b) {
            y.s = -b;
            return x.plus(y);
          }
          var xe = x.e / LOG_BASE, ye = y.e / LOG_BASE, xc = x.c, yc = y.c;
          if (!xe || !ye) {
            if (!xc || !yc)
              return xc ? (y.s = -b, y) : new BigNumber3(yc ? x : NaN);
            if (!xc[0] || !yc[0]) {
              return yc[0] ? (y.s = -b, y) : new BigNumber3(xc[0] ? x : ROUNDING_MODE == 3 ? -0 : 0);
            }
          }
          xe = bitFloor(xe);
          ye = bitFloor(ye);
          xc = xc.slice();
          if (a = xe - ye) {
            if (xLTy = a < 0) {
              a = -a;
              t = xc;
            } else {
              ye = xe;
              t = yc;
            }
            t.reverse();
            for (b = a; b--; t.push(0))
              ;
            t.reverse();
          } else {
            j = (xLTy = (a = xc.length) < (b = yc.length)) ? a : b;
            for (a = b = 0; b < j; b++) {
              if (xc[b] != yc[b]) {
                xLTy = xc[b] < yc[b];
                break;
              }
            }
          }
          if (xLTy)
            t = xc, xc = yc, yc = t, y.s = -y.s;
          b = (j = yc.length) - (i = xc.length);
          if (b > 0)
            for (; b--; xc[i++] = 0)
              ;
          b = BASE - 1;
          for (; j > a; ) {
            if (xc[--j] < yc[j]) {
              for (i = j; i && !xc[--i]; xc[i] = b)
                ;
              --xc[i];
              xc[j] += BASE;
            }
            xc[j] -= yc[j];
          }
          for (; xc[0] == 0; xc.splice(0, 1), --ye)
            ;
          if (!xc[0]) {
            y.s = ROUNDING_MODE == 3 ? -1 : 1;
            y.c = [y.e = 0];
            return y;
          }
          return normalise(y, xc, ye);
        };
        P.modulo = P.mod = function(y, b) {
          var q, s, x = this;
          y = new BigNumber3(y, b);
          if (!x.c || !y.s || y.c && !y.c[0]) {
            return new BigNumber3(NaN);
          } else if (!y.c || x.c && !x.c[0]) {
            return new BigNumber3(x);
          }
          if (MODULO_MODE == 9) {
            s = y.s;
            y.s = 1;
            q = div2(x, y, 0, 3);
            y.s = s;
            q.s *= s;
          } else {
            q = div2(x, y, 0, MODULO_MODE);
          }
          y = x.minus(q.times(y));
          if (!y.c[0] && MODULO_MODE == 1)
            y.s = x.s;
          return y;
        };
        P.multipliedBy = P.times = function(y, b) {
          var c, e, i, j, k, m, xcL, xlo, xhi, ycL, ylo, yhi, zc, base, sqrtBase, x = this, xc = x.c, yc = (y = new BigNumber3(y, b)).c;
          if (!xc || !yc || !xc[0] || !yc[0]) {
            if (!x.s || !y.s || xc && !xc[0] && !yc || yc && !yc[0] && !xc) {
              y.c = y.e = y.s = null;
            } else {
              y.s *= x.s;
              if (!xc || !yc) {
                y.c = y.e = null;
              } else {
                y.c = [0];
                y.e = 0;
              }
            }
            return y;
          }
          e = bitFloor(x.e / LOG_BASE) + bitFloor(y.e / LOG_BASE);
          y.s *= x.s;
          xcL = xc.length;
          ycL = yc.length;
          if (xcL < ycL)
            zc = xc, xc = yc, yc = zc, i = xcL, xcL = ycL, ycL = i;
          for (i = xcL + ycL, zc = []; i--; zc.push(0))
            ;
          base = BASE;
          sqrtBase = SQRT_BASE;
          for (i = ycL; --i >= 0; ) {
            c = 0;
            ylo = yc[i] % sqrtBase;
            yhi = yc[i] / sqrtBase | 0;
            for (k = xcL, j = i + k; j > i; ) {
              xlo = xc[--k] % sqrtBase;
              xhi = xc[k] / sqrtBase | 0;
              m = yhi * xlo + xhi * ylo;
              xlo = ylo * xlo + m % sqrtBase * sqrtBase + zc[j] + c;
              c = (xlo / base | 0) + (m / sqrtBase | 0) + yhi * xhi;
              zc[j--] = xlo % base;
            }
            zc[j] = c;
          }
          if (c) {
            ++e;
          } else {
            zc.splice(0, 1);
          }
          return normalise(y, zc, e);
        };
        P.negated = function() {
          var x = new BigNumber3(this);
          x.s = -x.s || null;
          return x;
        };
        P.plus = function(y, b) {
          var t, x = this, a = x.s;
          y = new BigNumber3(y, b);
          b = y.s;
          if (!a || !b)
            return new BigNumber3(NaN);
          if (a != b) {
            y.s = -b;
            return x.minus(y);
          }
          var xe = x.e / LOG_BASE, ye = y.e / LOG_BASE, xc = x.c, yc = y.c;
          if (!xe || !ye) {
            if (!xc || !yc)
              return new BigNumber3(a / 0);
            if (!xc[0] || !yc[0])
              return yc[0] ? y : new BigNumber3(xc[0] ? x : a * 0);
          }
          xe = bitFloor(xe);
          ye = bitFloor(ye);
          xc = xc.slice();
          if (a = xe - ye) {
            if (a > 0) {
              ye = xe;
              t = yc;
            } else {
              a = -a;
              t = xc;
            }
            t.reverse();
            for (; a--; t.push(0))
              ;
            t.reverse();
          }
          a = xc.length;
          b = yc.length;
          if (a - b < 0)
            t = yc, yc = xc, xc = t, b = a;
          for (a = 0; b; ) {
            a = (xc[--b] = xc[b] + yc[b] + a) / BASE | 0;
            xc[b] = BASE === xc[b] ? 0 : xc[b] % BASE;
          }
          if (a) {
            xc = [a].concat(xc);
            ++ye;
          }
          return normalise(y, xc, ye);
        };
        P.precision = P.sd = function(sd, rm) {
          var c, n, v, x = this;
          if (sd != null && sd !== !!sd) {
            intCheck(sd, 1, MAX);
            if (rm == null)
              rm = ROUNDING_MODE;
            else
              intCheck(rm, 0, 8);
            return round(new BigNumber3(x), sd, rm);
          }
          if (!(c = x.c))
            return null;
          v = c.length - 1;
          n = v * LOG_BASE + 1;
          if (v = c[v]) {
            for (; v % 10 == 0; v /= 10, n--)
              ;
            for (v = c[0]; v >= 10; v /= 10, n++)
              ;
          }
          if (sd && x.e + 1 > n)
            n = x.e + 1;
          return n;
        };
        P.shiftedBy = function(k) {
          intCheck(k, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER);
          return this.times("1e" + k);
        };
        P.squareRoot = P.sqrt = function() {
          var m, n, r, rep, t, x = this, c = x.c, s = x.s, e = x.e, dp = DECIMAL_PLACES + 4, half = new BigNumber3("0.5");
          if (s !== 1 || !c || !c[0]) {
            return new BigNumber3(!s || s < 0 && (!c || c[0]) ? NaN : c ? x : 1 / 0);
          }
          s = Math.sqrt(+valueOf(x));
          if (s == 0 || s == 1 / 0) {
            n = coeffToString(c);
            if ((n.length + e) % 2 == 0)
              n += "0";
            s = Math.sqrt(+n);
            e = bitFloor((e + 1) / 2) - (e < 0 || e % 2);
            if (s == 1 / 0) {
              n = "5e" + e;
            } else {
              n = s.toExponential();
              n = n.slice(0, n.indexOf("e") + 1) + e;
            }
            r = new BigNumber3(n);
          } else {
            r = new BigNumber3(s + "");
          }
          if (r.c[0]) {
            e = r.e;
            s = e + dp;
            if (s < 3)
              s = 0;
            for (; ; ) {
              t = r;
              r = half.times(t.plus(div2(x, t, dp, 1)));
              if (coeffToString(t.c).slice(0, s) === (n = coeffToString(r.c)).slice(0, s)) {
                if (r.e < e)
                  --s;
                n = n.slice(s - 3, s + 1);
                if (n == "9999" || !rep && n == "4999") {
                  if (!rep) {
                    round(t, t.e + DECIMAL_PLACES + 2, 0);
                    if (t.times(t).eq(x)) {
                      r = t;
                      break;
                    }
                  }
                  dp += 4;
                  s += 4;
                  rep = 1;
                } else {
                  if (!+n || !+n.slice(1) && n.charAt(0) == "5") {
                    round(r, r.e + DECIMAL_PLACES + 2, 1);
                    m = !r.times(r).eq(x);
                  }
                  break;
                }
              }
            }
          }
          return round(r, r.e + DECIMAL_PLACES + 1, ROUNDING_MODE, m);
        };
        P.toExponential = function(dp, rm) {
          if (dp != null) {
            intCheck(dp, 0, MAX);
            dp++;
          }
          return format(this, dp, rm, 1);
        };
        P.toFixed = function(dp, rm) {
          if (dp != null) {
            intCheck(dp, 0, MAX);
            dp = dp + this.e + 1;
          }
          return format(this, dp, rm);
        };
        P.toFormat = function(dp, rm, format2) {
          var str, x = this;
          if (format2 == null) {
            if (dp != null && rm && typeof rm == "object") {
              format2 = rm;
              rm = null;
            } else if (dp && typeof dp == "object") {
              format2 = dp;
              dp = rm = null;
            } else {
              format2 = FORMAT;
            }
          } else if (typeof format2 != "object") {
            throw Error(bignumberError + "Argument not an object: " + format2);
          }
          str = x.toFixed(dp, rm);
          if (x.c) {
            var i, arr = str.split("."), g1 = +format2.groupSize, g2 = +format2.secondaryGroupSize, groupSeparator = format2.groupSeparator || "", intPart = arr[0], fractionPart = arr[1], isNeg = x.s < 0, intDigits = isNeg ? intPart.slice(1) : intPart, len2 = intDigits.length;
            if (g2)
              i = g1, g1 = g2, g2 = i, len2 -= i;
            if (g1 > 0 && len2 > 0) {
              i = len2 % g1 || g1;
              intPart = intDigits.substr(0, i);
              for (; i < len2; i += g1)
                intPart += groupSeparator + intDigits.substr(i, g1);
              if (g2 > 0)
                intPart += groupSeparator + intDigits.slice(i);
              if (isNeg)
                intPart = "-" + intPart;
            }
            str = fractionPart ? intPart + (format2.decimalSeparator || "") + ((g2 = +format2.fractionGroupSize) ? fractionPart.replace(new RegExp("\\d{" + g2 + "}\\B", "g"), "$&" + (format2.fractionGroupSeparator || "")) : fractionPart) : intPart;
          }
          return (format2.prefix || "") + str + (format2.suffix || "");
        };
        P.toFraction = function(md) {
          var d, d0, d1, d2, e, exp, n, n0, n1, q, r, s, x = this, xc = x.c;
          if (md != null) {
            n = new BigNumber3(md);
            if (!n.isInteger() && (n.c || n.s !== 1) || n.lt(ONE)) {
              throw Error(bignumberError + "Argument " + (n.isInteger() ? "out of range: " : "not an integer: ") + valueOf(n));
            }
          }
          if (!xc)
            return new BigNumber3(x);
          d = new BigNumber3(ONE);
          n1 = d0 = new BigNumber3(ONE);
          d1 = n0 = new BigNumber3(ONE);
          s = coeffToString(xc);
          e = d.e = s.length - x.e - 1;
          d.c[0] = POWS_TEN[(exp = e % LOG_BASE) < 0 ? LOG_BASE + exp : exp];
          md = !md || n.comparedTo(d) > 0 ? e > 0 ? d : n1 : n;
          exp = MAX_EXP;
          MAX_EXP = 1 / 0;
          n = new BigNumber3(s);
          n0.c[0] = 0;
          for (; ; ) {
            q = div2(n, d, 0, 1);
            d2 = d0.plus(q.times(d1));
            if (d2.comparedTo(md) == 1)
              break;
            d0 = d1;
            d1 = d2;
            n1 = n0.plus(q.times(d2 = n1));
            n0 = d2;
            d = n.minus(q.times(d2 = d));
            n = d2;
          }
          d2 = div2(md.minus(d0), d1, 0, 1);
          n0 = n0.plus(d2.times(n1));
          d0 = d0.plus(d2.times(d1));
          n0.s = n1.s = x.s;
          e = e * 2;
          r = div2(n1, d1, e, ROUNDING_MODE).minus(x).abs().comparedTo(div2(n0, d0, e, ROUNDING_MODE).minus(x).abs()) < 1 ? [n1, d1] : [n0, d0];
          MAX_EXP = exp;
          return r;
        };
        P.toNumber = function() {
          return +valueOf(this);
        };
        P.toPrecision = function(sd, rm) {
          if (sd != null)
            intCheck(sd, 1, MAX);
          return format(this, sd, rm, 2);
        };
        P.toString = function(b) {
          var str, n = this, s = n.s, e = n.e;
          if (e === null) {
            if (s) {
              str = "Infinity";
              if (s < 0)
                str = "-" + str;
            } else {
              str = "NaN";
            }
          } else {
            if (b == null) {
              str = e <= TO_EXP_NEG || e >= TO_EXP_POS ? toExponential(coeffToString(n.c), e) : toFixedPoint(coeffToString(n.c), e, "0");
            } else if (b === 10) {
              n = round(new BigNumber3(n), DECIMAL_PLACES + e + 1, ROUNDING_MODE);
              str = toFixedPoint(coeffToString(n.c), n.e, "0");
            } else {
              intCheck(b, 2, ALPHABET.length, "Base");
              str = convertBase(toFixedPoint(coeffToString(n.c), e, "0"), 10, b, s, true);
            }
            if (s < 0 && n.c[0])
              str = "-" + str;
          }
          return str;
        };
        P.valueOf = P.toJSON = function() {
          return valueOf(this);
        };
        P._isBigNumber = true;
        if (configObject != null)
          BigNumber3.set(configObject);
        return BigNumber3;
      }
      function bitFloor(n) {
        var i = n | 0;
        return n > 0 || n === i ? i : i - 1;
      }
      function coeffToString(a) {
        var s, z, i = 1, j = a.length, r = a[0] + "";
        for (; i < j; ) {
          s = a[i++] + "";
          z = LOG_BASE - s.length;
          for (; z--; s = "0" + s)
            ;
          r += s;
        }
        for (j = r.length; r.charCodeAt(--j) === 48; )
          ;
        return r.slice(0, j + 1 || 1);
      }
      function compare(x, y) {
        var a, b, xc = x.c, yc = y.c, i = x.s, j = y.s, k = x.e, l = y.e;
        if (!i || !j)
          return null;
        a = xc && !xc[0];
        b = yc && !yc[0];
        if (a || b)
          return a ? b ? 0 : -j : i;
        if (i != j)
          return i;
        a = i < 0;
        b = k == l;
        if (!xc || !yc)
          return b ? 0 : !xc ^ a ? 1 : -1;
        if (!b)
          return k > l ^ a ? 1 : -1;
        j = (k = xc.length) < (l = yc.length) ? k : l;
        for (i = 0; i < j; i++)
          if (xc[i] != yc[i])
            return xc[i] > yc[i] ^ a ? 1 : -1;
        return k == l ? 0 : k > l ^ a ? 1 : -1;
      }
      function intCheck(n, min, max, name) {
        if (n < min || n > max || n !== mathfloor(n)) {
          throw Error(bignumberError + (name || "Argument") + (typeof n == "number" ? n < min || n > max ? " out of range: " : " not an integer: " : " not a primitive number: ") + String(n));
        }
      }
      function isOdd(n) {
        var k = n.c.length - 1;
        return bitFloor(n.e / LOG_BASE) == k && n.c[k] % 2 != 0;
      }
      function toExponential(str, e) {
        return (str.length > 1 ? str.charAt(0) + "." + str.slice(1) : str) + (e < 0 ? "e" : "e+") + e;
      }
      function toFixedPoint(str, e, z) {
        var len2, zs;
        if (e < 0) {
          for (zs = z + "."; ++e; zs += z)
            ;
          str = zs + str;
        } else {
          len2 = str.length;
          if (++e > len2) {
            for (zs = z, e -= len2; --e; zs += z)
              ;
            str += zs;
          } else if (e < len2) {
            str = str.slice(0, e) + "." + str.slice(e);
          }
        }
        return str;
      }
      BigNumber2 = clone();
      BigNumber2["default"] = BigNumber2.BigNumber = BigNumber2;
      if (typeof define == "function" && define.amd) {
        define(function() {
          return BigNumber2;
        });
      } else if (typeof module != "undefined" && module.exports) {
        module.exports = BigNumber2;
      } else {
        if (!globalObject) {
          globalObject = typeof self != "undefined" && self ? self : window;
        }
        globalObject.BigNumber = BigNumber2;
      }
    })(exports);
  });

  // src/contract-create.ts
  async function simulateCreateContractFromSource(arweave, wallet, initState, contractSrc) {
    const srcTx = await arweave.createTransaction({data: contractSrc}, wallet);
    srcTx.addTag("App-Name", "SmartWeaveContractSource");
    srcTx.addTag("App-Version", "0.3.0");
    srcTx.addTag("Content-Type", "application/javascript");
    await arweave.transactions.sign(srcTx, wallet);
    const deployInitStateTx = await simulateCreateContractFromTx(arweave, wallet, srcTx.id, initState);
    const initStateReward = deployInitStateTx.reward;
    srcTx.reward = (parseFloat(srcTx.reward) + parseFloat(initStateReward)).toString();
    return srcTx;
  }
  async function simulateCreateContractFromTx(arweave, wallet, srcTxId, state, tags = [], target = "", winstonQty = "") {
    let contractTX = await arweave.createTransaction({data: state}, wallet);
    if (target && winstonQty && target.length && +winstonQty > 0) {
      contractTX = await arweave.createTransaction({
        data: state,
        target: target.toString(),
        quantity: winstonQty.toString()
      }, wallet);
    }
    if (tags && tags.length) {
      for (const tag of tags) {
        contractTX.addTag(tag.name.toString(), tag.value.toString());
      }
    }
    contractTX.addTag("App-Name", "SmartWeaveContract");
    contractTX.addTag("App-Version", "0.3.0");
    contractTX.addTag("Contract-Src", srcTxId);
    contractTX.addTag("Content-Type", "application/json");
    await arweave.transactions.sign(contractTX, wallet);
    return contractTX;
  }
  async function createContract(arweave, wallet, contractSrc, initState) {
    const srcTx = await arweave.createTransaction({data: contractSrc}, wallet);
    srcTx.addTag("App-Name", "SmartWeaveContractSource");
    srcTx.addTag("App-Version", "0.3.0");
    srcTx.addTag("Content-Type", "application/javascript");
    await arweave.transactions.sign(srcTx, wallet);
    const response = await arweave.transactions.post(srcTx);
    if (response.status === 200 || response.status === 208) {
      return await createContractFromTx(arweave, wallet, srcTx.id, initState);
    } else {
      throw new Error("Unable to write Contract Source.");
    }
  }
  async function createContractFromTx(arweave, wallet, srcTxId, state, tags = [], target = "", winstonQty = "") {
    let contractTX = await arweave.createTransaction({data: state}, wallet);
    if (target && winstonQty && target.length && +winstonQty > 0) {
      contractTX = await arweave.createTransaction({
        data: state,
        target: target.toString(),
        quantity: winstonQty.toString()
      }, wallet);
    }
    if (tags && tags.length) {
      for (const tag of tags) {
        contractTX.addTag(tag.name.toString(), tag.value.toString());
      }
    }
    contractTX.addTag("App-Name", "SmartWeaveContract");
    contractTX.addTag("App-Version", "0.3.0");
    contractTX.addTag("Contract-Src", srcTxId);
    contractTX.addTag("Content-Type", "application/json");
    await arweave.transactions.sign(contractTX, wallet);
    const response = await arweave.transactions.post(contractTX);
    if (response.status === 200 || response.status === 208) {
      return contractTX.id;
    } else {
      throw new Error("Unable to write Contract Initial State");
    }
  }

  // node_modules/@weavery/clarity/clarity.js
  var clarity_exports = {};
  __export(clarity_exports, {
    Err: () => Err,
    Panic: () => Panic,
    SmartWeave: () => SmartWeave,
    add: () => add,
    append: () => append,
    asContract: () => asContract,
    asMaxLen: () => asMaxLen,
    atBlock: () => atBlock,
    blockHeight: () => blockHeight,
    concat: () => concat,
    contractCall: () => contractCall,
    contractCaller: () => contractCaller,
    contractOf: () => contractOf,
    defaultTo: () => defaultTo,
    div: () => div,
    err: () => err,
    filter: () => filter,
    fold: () => fold,
    ftGetBalance: () => ftGetBalance,
    ftMint: () => ftMint,
    ftTransfer: () => ftTransfer,
    ge: () => ge,
    get: () => get,
    getBlockInfo: () => getBlockInfo,
    gt: () => gt,
    hash160: () => hash160,
    isEq: () => isEq,
    isErr: () => isErr,
    isNone: () => isNone,
    isOk: () => isOk,
    isSome: () => isSome,
    keccak256: () => keccak256,
    le: () => le,
    len: () => len,
    list: () => list,
    lt: () => lt,
    map: () => map,
    mapDelete: () => mapDelete,
    mapGet: () => mapGet,
    mapInsert: () => mapInsert,
    mapSet: () => mapSet,
    match: () => match,
    mod: () => mod,
    mul: () => mul,
    nftGetOwner: () => nftGetOwner,
    nftMint: () => nftMint,
    nftTransfer: () => nftTransfer,
    none: () => none,
    not: () => not,
    ok: () => ok,
    pow: () => pow,
    print: () => print,
    requireFeature: () => requireFeature,
    requireVersion: () => requireVersion,
    sha256: () => sha256,
    sha512: () => sha512,
    sha512_256: () => sha512_256,
    some: () => some,
    sub: () => sub,
    toInt: () => toInt,
    toUint: () => toUint,
    tryUnwrap: () => tryUnwrap,
    tuple: () => tuple,
    txSender: () => txSender,
    unwrap: () => unwrap,
    unwrapErr: () => unwrapErr,
    unwrapErrPanic: () => unwrapErrPanic,
    unwrapPanic: () => unwrapPanic,
    xor: () => xor
  });
  function hash(algorithm, value) {
    if (Number.isInteger(value)) {
      let buff = new Uint8Array(16);
      let view = new DataView(buff.buffer);
      view.setBigUint64(0, BigInt(value), true);
      value = buff;
    }
    if (value instanceof Uint8Array) {
      let buffer = null;
      switch (algorithm) {
        case "keccak256":
          throw new Error("not implemented yet");
        default:
          throw new Error("not implemented yet");
      }
      return new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    }
    throw new TypeError();
  }
  var txSenderStack = [];
  var SmartWeave = null;
  var Panic = class extends Error {
    constructor(message) {
      super(message);
      Object.setPrototypeOf(this, Panic.prototype);
    }
  };
  var Err = class extends Error {
    constructor(value) {
      super("");
      this.value = value;
      Object.setPrototypeOf(this, Err.prototype);
    }
  };
  function requireVersion(version) {
  }
  function requireFeature(feature) {
  }
  function add(...args) {
    return args.reduce((sum, operand) => sum + operand, 0);
  }
  function sub(...args) {
    return args.slice(1).reduce((difference, operand) => difference - operand, args[0]);
  }
  function mul(...args) {
    return args.reduce((product, operand) => product * operand, 1);
  }
  function div(...args) {
    return Math.trunc(args.slice(1).reduce((quotient, operand) => quotient / operand, args[0]));
  }
  function lt(a, b) {
    return a < b;
  }
  function le(a, b) {
    return a <= b;
  }
  function gt(a, b) {
    return a > b;
  }
  function ge(a, b) {
    return a >= b;
  }
  function append(list2, value) {
    return [...list2, value];
  }
  function asContract(expr) {
    if (SmartWeave) {
      try {
        txSenderStack.unshift(SmartWeave.contract.id);
        return expr();
      } finally {
        txSenderStack.shift();
      }
    }
    throw new Error("as-contract not supported");
  }
  function asMaxLen(value, length) {
    return value.length <= length ? some(value) : none;
  }
  function atBlock(blockHash, expr) {
    if (SmartWeave) {
      throw new Error("at-block not supported on SmartWeave");
    }
    throw new Error("not implemented yet");
  }
  function blockHeight() {
    if (SmartWeave) {
      return SmartWeave.block.height;
    }
    throw new Error("block-height not supported");
  }
  function concat(a, b) {
    if (a instanceof Array && b instanceof Array) {
      return [].concat(a, b);
    }
    if (a instanceof Uint8Array && b instanceof Uint8Array) {
      const result = new Uint8Array(a.byteLength + b.byteLength);
      result.set(a, 0);
      result.set(b, a.byteLength);
      return result;
    }
    throw new TypeError();
  }
  function contractCall(contractName, functionName, ...args) {
    if (SmartWeave) {
      throw new Error("contract-call? not supported on SmartWeave");
    }
    throw new Error("not implemented yet");
  }
  function contractCaller() {
    if (SmartWeave) {
      return txSender();
    }
    throw new Error("contract-caller not supported");
  }
  function contractOf(contractName) {
    if (SmartWeave) {
      throw new Error("contract-of not supported on SmartWeave");
    }
    throw new Error("not implemented yet");
  }
  function defaultTo(defaultValue, optionValue) {
    return optionValue !== null && optionValue !== void 0 ? optionValue : defaultValue;
  }
  function err(value) {
    return new Err(value);
  }
  function filter(func, list2) {
    if (list2 instanceof Array) {
      return list2.filter(func);
    }
    throw new TypeError();
  }
  function fold(func, list2, initialValue) {
    if (list2 instanceof Array) {
      return list2.reduce((accumulator, currentValue) => func(currentValue, accumulator), initialValue);
    }
    throw new TypeError();
  }
  function ftGetBalance(tokenName, principal) {
    throw new Error("not implemented yet");
  }
  function ftMint(tokenName, amount, recipient) {
    throw new Error("not implemented yet");
  }
  function ftTransfer(tokenName, amount, sender, recipient) {
    throw new Error("not implemented yet");
  }
  function get(keyName, tuple2) {
    return isNone(tuple2) ? none : tuple2.get(keyName);
  }
  function getBlockInfo(propName, blockHeight2) {
    if (SmartWeave) {
      throw new Error("get-block-info? not supported on SmartWeave");
    }
    throw new Error("not implemented yet");
  }
  function hash160(value) {
    if (Number.isInteger(value)) {
      let buff = new Uint8Array(16);
      let view = new DataView(buff.buffer);
      view.setBigUint64(0, BigInt(value), true);
      value = buff;
    }
    if (value instanceof Uint8Array) {
      throw new Error("not implemented yet");
    }
    throw new TypeError();
  }
  function isEq(...values) {
    if (values.length > 0 && values.every((value) => typeof value === typeof values[0])) {
      return values.every((value) => value === values[0]);
    }
    throw new TypeError();
  }
  function isErr(value) {
    return value instanceof Err;
  }
  function isNone(value) {
    return value === none;
  }
  function isOk(value) {
    return !(value instanceof Err);
  }
  function isSome(value) {
    return value !== none;
  }
  function keccak256(value) {
    return hash("keccak256", value);
  }
  function len(value) {
    return value.length;
  }
  function list(...values) {
    if (values.length > 0 && values.some((value) => typeof value !== typeof values[0])) {
      throw new TypeError();
    }
    return values;
  }
  function map(func, list2) {
    if (list2 instanceof Array) {
      return list2.map(func);
    }
    throw new TypeError();
  }
  function mapDelete(map2, key) {
    return map2.delete(key);
  }
  function mapGet(map2, key) {
    const value = map2.get(key);
    return value ? some(value) : none;
  }
  function mapInsert(map2, key, value) {
    if (map2.has(key))
      return false;
    map2.set(key, value);
    return true;
  }
  function mapSet(map2, key, value) {
    map2.set(key, value);
    return true;
  }
  function match(input, okBranch, errBranch) {
    if (isNone(input) || isErr(input)) {
      return errBranch(input);
    }
    return okBranch(input);
  }
  function mod(a, b) {
    if (b === 0) {
      throw new RangeError("division by zero");
    }
    return a % b;
  }
  function nftGetOwner(assetClass, assetID) {
    throw new Error("not implemented yet");
  }
  function nftMint(assetClass, assetID, recipient) {
    throw new Error("not implemented yet");
  }
  function nftTransfer(assetClass, assetID, sender, recipient) {
    throw new Error("not implemented yet");
  }
  var none = null;
  function not(value) {
    return !value;
  }
  function ok(value) {
    return value;
  }
  function pow(a, b) {
    return Math.pow(a, b);
  }
  function print(value) {
    console.log(value);
    return value;
  }
  function sha256(value) {
    return hash("sha256", value);
  }
  function sha512(value) {
    return hash("sha512", value);
  }
  function sha512_256(value) {
    return hash("sha512-256", value);
  }
  function some(value) {
    return value;
  }
  function toInt(value) {
    return value;
  }
  function toUint(value) {
    return value;
  }
  function tryUnwrap(optionInput) {
    if (isSome(optionInput) || isOk(optionInput)) {
      return optionInput;
    }
    if (isErr(optionInput)) {
      return optionInput.value;
    }
    return none;
  }
  function tuple(...pairs) {
    return pairs.reduce((tuple2, [k, v]) => tuple2.set(k, v), new Map());
  }
  function txSender() {
    if (SmartWeave) {
      if (txSenderStack.length > 0) {
        return txSenderStack[0];
      }
      return SmartWeave.transaction.owner;
    }
    throw new Error("tx-sender not supported");
  }
  function unwrap(optionInput, thrownValue) {
    if (isNone(optionInput) || isErr(optionInput)) {
      return thrownValue;
    }
    return optionInput;
  }
  function unwrapErr(responseInput, thrownValue) {
    if (isErr(responseInput)) {
      return responseInput.value;
    }
    return thrownValue;
  }
  function unwrapErrPanic(responseInput) {
    if (isErr(responseInput)) {
      return responseInput.value;
    }
    throw new Panic("unwrapErrPanic");
  }
  function unwrapPanic(optionInput) {
    if (isNone(optionInput) || isErr(optionInput)) {
      throw new Panic("unwrapPanic");
    }
    return optionInput;
  }
  function xor(a, b) {
    return a ^ b;
  }

  // src/utils.ts
  function getTag(tx, name) {
    const tags = tx.get("tags");
    for (const tag of tags) {
      try {
        if (tag.get("name", {decode: true, string: true}) === name) {
          return tag.get("value", {decode: true, string: true});
        }
      } catch (e) {
      }
    }
    return false;
  }
  function unpackTags(tx) {
    const tags = tx.get("tags");
    const result = {};
    for (const tag of tags) {
      try {
        const name = tag.get("name", {decode: true, string: true});
        const value = tag.get("value", {decode: true, string: true});
        if (!result.hasOwnProperty(name)) {
          result[name] = value;
          continue;
        }
        result[name] = [...result[name], value];
      } catch (e) {
      }
    }
    return result;
  }
  function arrayToHex(arr) {
    let str = "";
    for (const a of arr) {
      str += ("0" + a.toString(16)).slice(-2);
    }
    return str;
  }
  function log(arweave, ...str) {
    if (!arweave || !arweave.getConfig().api.logging)
      return;
    typeof arweave.getConfig().api.logger === "function" ? arweave.getConfig().api.logger(...str) : console.log(...str);
  }
  function normalizeContractSource(contractSrc) {
    contractSrc = contractSrc.replace(/export\s+async\s+function\s+handle/gmu, "async function handle").replace(/export\s+function\s+handle/gmu, "function handle").replace(/\(\s*\(\)\s*=>\s*{/g, "").replace(/\s*\(\s*function\s*\(\)\s*{/g, "").replace(/}\s*\)\s*\(\)\s*;/g, "");
    return `
    const [SmartWeave, BigNumber, clarity] = arguments;
    clarity.SmartWeave = SmartWeave;
    class ContractError extends Error { constructor(message) { super(message); this.name = 'ContractError' } };
    function ContractAssert(cond, message) { if (!cond) throw new ContractError(message) };
    ${contractSrc};
    return handle;
  `;
  }

  // src/contract-step.ts
  async function execute(handler, interaction, state) {
    try {
      const stateCopy = JSON.parse(JSON.stringify(state));
      const result = await handler(stateCopy, interaction);
      if (result && (result.state || result.result)) {
        return {
          type: "ok",
          result: result.result,
          state: result.state || state
        };
      }
      throw new Error(`Unexpected result from contract: ${JSON.stringify(result)}`);
    } catch (err2) {
      if (err2.name === "ContractError") {
        return {
          type: "error",
          result: err2.message,
          state
        };
      }
      return {
        type: "exception",
        result: `${err2 && err2.stack || err2 && err2.message}`,
        state
      };
    }
  }

  // src/errors.ts
  var SmartWeaveErrorType;
  (function(SmartWeaveErrorType2) {
    SmartWeaveErrorType2["CONTRACT_NOT_FOUND"] = "CONTRACT_NOT_FOUND";
  })(SmartWeaveErrorType || (SmartWeaveErrorType = {}));
  var SmartWeaveError = class extends Error {
    constructor(type, optional = {}) {
      if (optional.message) {
        super(optional.message);
      } else {
        super();
      }
      this.type = type;
      this.otherInfo = optional;
    }
    getType() {
      return this.type;
    }
  };
  var errors_default = SmartWeaveError;

  // src/contract-read.ts
  async function readContract(arweave, contractId, height, returnValidity) {
    if (!height) {
      const networkInfo = await arweave.network.getInfo();
      height = networkInfo.height;
    }
    const loadPromise = loadContract(arweave, contractId).catch((err2) => {
      const error = new errors_default(SmartWeaveErrorType.CONTRACT_NOT_FOUND, {
        message: `Contract having txId: ${contractId} not found`,
        requestedTxId: contractId
      });
      throw error;
    });
    const fetchTxPromise = fetchTransactions(arweave, contractId, height).catch((err2) => err2);
    let [contractInfo, txInfos] = await Promise.all([loadPromise, fetchTxPromise]);
    if (contractInfo instanceof Error)
      throw contractInfo;
    if (txInfos instanceof Error)
      throw txInfos;
    let state;
    const contractSrcTXID = contractInfo.contractSrcTXID;
    try {
      state = JSON.parse(contractInfo.initState);
    } catch (e) {
      throw new Error(`Unable to parse initial state for contract: ${contractId}`);
    }
    log(arweave, `Replaying ${txInfos.length} confirmed interactions`);
    await sortTransactions(arweave, txInfos);
    let {handler, swGlobal} = contractInfo;
    const validity = {};
    for (const txInfo of txInfos) {
      const currentTx = txInfo.node;
      const contractIndex = txInfo.node.tags.findIndex((tag) => tag.name === "Contract" && tag.value === contractId);
      const inputTag = txInfo.node.tags[contractIndex + 1];
      if (!inputTag || inputTag.name !== "Input") {
        log(arweave, `Skipping tx with missing or invalid Input tag - ${currentTx.id}`);
        continue;
      }
      let input = inputTag.value;
      try {
        input = JSON.parse(input);
      } catch (e) {
        log(arweave, e);
        continue;
      }
      if (!input) {
        log(arweave, `Skipping tx with missing or invalid Input tag - ${currentTx.id}`);
        continue;
      }
      const interaction = {
        input,
        caller: currentTx.owner.address
      };
      swGlobal._activeTx = currentTx;
      const result = await execute(handler, interaction, state);
      if (result.type === "exception") {
        log(arweave, `${result.result}`);
        log(arweave, `Executing of interaction: ${currentTx.id} threw exception.`);
      }
      if (result.type === "error") {
        log(arweave, `${result.result}`);
        log(arweave, `Executing of interaction: ${currentTx.id} returned error.`);
      }
      validity[currentTx.id] = result.type === "ok";
      state = result.state;
      const settings = state.settings ? new Map(state.settings) : new Map();
      const evolve = state.evolve || settings.get("evolve");
      let canEvolve = state.canEvolve || settings.get("canEvolve");
      if (canEvolve === void 0 || canEvolve === null) {
        canEvolve = true;
      }
      if (evolve && /[a-z0-9_-]{43}/i.test(evolve) && canEvolve) {
        if (contractSrcTXID !== evolve) {
          try {
            contractInfo = await loadContract(arweave, contractId, evolve);
            handler = contractInfo.handler;
          } catch (e) {
            const error = new errors_default(SmartWeaveErrorType.CONTRACT_NOT_FOUND, {
              message: `Contract having txId: ${contractId} not found`,
              requestedTxId: contractId
            });
            throw error;
          }
        }
      }
    }
    return returnValidity ? {state, validity} : state;
  }
  async function sortTransactions(arweave, txInfos) {
    const addKeysFuncs = txInfos.map((tx) => addSortKey(arweave, tx));
    await Promise.all(addKeysFuncs);
    txInfos.sort((a, b) => a.sortKey.localeCompare(b.sortKey));
  }
  async function addSortKey(arweave, txInfo) {
    const {node} = txInfo;
    const blockHashBytes = arweave.utils.b64UrlToBuffer(node.block.id);
    const txIdBytes = arweave.utils.b64UrlToBuffer(node.id);
    const concatted = arweave.utils.concatBuffers([blockHashBytes, txIdBytes]);
    const hashed = arrayToHex(await arweave.crypto.hash(concatted));
    const blockHeight2 = `000000${node.block.height}`.slice(-12);
    txInfo.sortKey = `${blockHeight2},${hashed}`;
  }
  var MAX_REQUEST = 100;
  async function fetchTransactions(arweave, contractId, height) {
    let variables = {
      tags: [
        {
          name: "App-Name",
          values: ["SmartWeaveAction"]
        },
        {
          name: "Contract",
          values: [contractId]
        }
      ],
      blockFilter: {
        max: height
      },
      first: MAX_REQUEST
    };
    let transactions = await getNextPage(arweave, variables);
    const txInfos = transactions.edges.filter((tx) => !tx.node.parent || !tx.node.parent.id);
    while (transactions.pageInfo.hasNextPage) {
      const cursor = transactions.edges[MAX_REQUEST - 1].cursor;
      variables = __assign(__assign({}, variables), {
        after: cursor
      });
      transactions = await getNextPage(arweave, variables);
      txInfos.push(...transactions.edges.filter((tx) => !tx.node.parent || !tx.node.parent.id));
    }
    return txInfos;
  }
  async function getNextPage(arweave, variables) {
    const query = `query Transactions($tags: [TagFilter!]!, $blockFilter: BlockFilter!, $first: Int!, $after: String) {
    transactions(tags: $tags, block: $blockFilter, first: $first, sort: HEIGHT_ASC, after: $after) {
      pageInfo {
        hasNextPage
      }
      edges {
        node {
          id
          owner { address }
          recipient
          tags {
            name
            value
          }
          block {
            height
            id
            timestamp
          }
          fee { winston }
          quantity { winston }
          parent { id }
        }
        cursor
      }
    }
  }`;
    const response = await arweave.api.post("graphql", {
      query,
      variables
    });
    if (response.status !== 200) {
      throw new Error(`Unable to retrieve transactions. Arweave gateway responded with status ${response.status}.`);
    }
    const data = response.data;
    const txs = data.data.transactions;
    return txs;
  }

  // src/smartweave-global.ts
  var SmartWeaveGlobal = class {
    get _isDryRunning() {
      return !this._activeTx;
    }
    constructor(arweave, contract) {
      this.unsafeClient = arweave;
      this.arweave = {
        ar: arweave.ar,
        utils: arweave.utils,
        wallets: arweave.wallets,
        crypto: arweave.crypto
      };
      this.contract = contract;
      this.transaction = new Transaction(this);
      this.block = new Block(this);
      this.contracts = {
        readContractState: (contractId, height, returnValidity) => readContract(arweave, contractId, height || (this._isDryRunning ? Number.POSITIVE_INFINITY : this.block.height), returnValidity)
      };
    }
  };
  var Transaction = class {
    constructor(global) {
      this.global = global;
    }
    get id() {
      if (!this.global._activeTx) {
        throw new Error("No current Tx");
      }
      return this.global._activeTx.id;
    }
    get owner() {
      if (!this.global._activeTx) {
        throw new Error("No current Tx");
      }
      return this.global._activeTx.owner.address;
    }
    get target() {
      if (!this.global._activeTx) {
        throw new Error("No current Tx");
      }
      return this.global._activeTx.recipient;
    }
    get tags() {
      if (!this.global._activeTx) {
        throw new Error("No current Tx");
      }
      return this.global._activeTx.tags;
    }
    get quantity() {
      if (!this.global._activeTx) {
        throw new Error("No current Tx");
      }
      return this.global._activeTx.quantity.winston;
    }
    get reward() {
      if (!this.global._activeTx) {
        throw new Error("No current Tx");
      }
      return this.global._activeTx.fee.winston;
    }
  };
  var Block = class {
    constructor(global) {
      this.global = global;
    }
    get height() {
      if (!this.global._activeTx) {
        throw new Error("No current Tx");
      }
      return this.global._activeTx.block.height;
    }
    get indep_hash() {
      if (!this.global._activeTx) {
        throw new Error("No current Tx");
      }
      return this.global._activeTx.block.id;
    }
    get timestamp() {
      if (!this.global._activeTx) {
        throw new Error("No current tx");
      }
      return this.global._activeTx.block.timestamp;
    }
  };

  // src/contract-load.ts
  var import_bignumber = __toModule(require_bignumber());
  async function loadContract(arweave, contractID, contractSrcTXID) {
    const contractTX = await arweave.transactions.get(contractID);
    const contractOwner = await arweave.wallets.ownerToAddress(contractTX.owner);
    contractSrcTXID = contractSrcTXID || getTag(contractTX, "Contract-Src");
    const minFee = getTag(contractTX, "Min-Fee");
    const contractSrcTX = await arweave.transactions.get(contractSrcTXID);
    const contractSrc = contractSrcTX.get("data", {decode: true, string: true});
    let state;
    if (getTag(contractTX, "Init-State")) {
      state = getTag(contractTX, "Init-State");
    } else if (getTag(contractTX, "Init-State-TX")) {
      const stateTX = await arweave.transactions.get(getTag(contractTX, "Init-State-TX"));
      state = stateTX.get("data", {decode: true, string: true});
    } else {
      state = contractTX.get("data", {decode: true, string: true});
    }
    const {handler, swGlobal} = createContractExecutionEnvironment(arweave, contractSrc, contractID, contractOwner);
    return {
      id: contractID,
      contractSrcTXID,
      contractSrc,
      initState: state,
      minFee,
      contractTX,
      handler,
      swGlobal
    };
  }
  function createContractExecutionEnvironment(arweave, contractSrc, contractId, contractOwner) {
    const returningSrc = normalizeContractSource(contractSrc);
    const swGlobal = new SmartWeaveGlobal(arweave, {id: contractId, owner: contractOwner});
    const getContractFunction = new Function(returningSrc);
    return {
      handler: getContractFunction(swGlobal, import_bignumber.default, clarity_exports),
      swGlobal
    };
  }

  // src/contract-interact.ts
  async function interactWrite(arweave, wallet, contractId, input, tags = [], target = "", winstonQty = "") {
    const interactionTx = await createTx(arweave, wallet, contractId, input, tags, target, winstonQty);
    const response = await arweave.transactions.post(interactionTx);
    if (response.status !== 200)
      return null;
    return interactionTx.id;
  }
  async function simulateInteractWrite(arweave, wallet, contractId, input, tags = [], target = "", winstonQty = "") {
    const interactionTx = await createTx(arweave, wallet, contractId, input, tags, target, winstonQty);
    return interactionTx;
  }
  async function interactWriteDryRun(arweave, wallet, contractId, input, tags = [], target = "", winstonQty = "", myState, fromParam, contractInfoParam) {
    let {handler, swGlobal, contractSrcTXID} = contractInfoParam || await loadContract(arweave, contractId);
    const latestState = myState || await readContract(arweave, contractId);
    const from = fromParam || await arweave.wallets.getAddress(wallet);
    const settings = latestState.settings ? new Map(latestState.settings) : new Map();
    const evolve = latestState.evolve || settings.get("evolve");
    let canEvolve = latestState.canEvolve || settings.get("canEvolve");
    if (canEvolve === void 0 || canEvolve === null) {
      canEvolve = true;
    }
    if (evolve && /[a-z0-9_-]{43}/i.test(evolve) && canEvolve) {
      if (contractSrcTXID !== evolve) {
        try {
          const contractInfo = await loadContract(arweave, contractId, evolve);
          handler = contractInfo.handler;
        } catch (e) {
          const error = new errors_default(SmartWeaveErrorType.CONTRACT_NOT_FOUND, {
            message: `Contract having txId: ${contractId} not found`,
            requestedTxId: contractId
          });
          throw error;
        }
      }
    }
    const interaction = {
      input,
      caller: from
    };
    const tx = await createTx(arweave, wallet, contractId, input, tags, target, winstonQty);
    const ts = unpackTags(tx);
    const currentBlock = await arweave.blocks.getCurrent();
    swGlobal._activeTx = createDummyTx(tx, from, ts, currentBlock);
    return await execute(handler, interaction, latestState);
  }
  async function interactWriteDryRunCustom(arweave, tx, contractId, input, myState, fromParam = {}, contractInfoParam) {
    let {handler, swGlobal, contractSrcTXID} = contractInfoParam || await loadContract(arweave, contractId);
    const latestState = myState || await readContract(arweave, contractId);
    const from = fromParam;
    const settings = latestState.settings ? new Map(latestState.settings) : new Map();
    const evolve = latestState.evolve || settings.get("evolve");
    let canEvolve = latestState.canEvolve || settings.get("canEvolve");
    if (canEvolve === void 0 || canEvolve === null) {
      canEvolve = true;
    }
    if (evolve && /[a-z0-9_-]{43}/i.test(evolve) && canEvolve) {
      if (contractSrcTXID !== evolve) {
        try {
          const contractInfo = await loadContract(arweave, contractId, evolve);
          handler = contractInfo.handler;
        } catch (e) {
          const error = new errors_default(SmartWeaveErrorType.CONTRACT_NOT_FOUND, {
            message: `Contract having txId: ${contractId} not found`,
            requestedTxId: contractId
          });
          throw error;
        }
      }
    }
    const interaction = {
      input,
      caller: from
    };
    const ts = unpackTags(tx);
    const currentBlock = await arweave.blocks.getCurrent();
    swGlobal._activeTx = createDummyTx(tx, from, ts, currentBlock);
    return await execute(handler, interaction, latestState);
  }
  async function interactRead(arweave, wallet, contractId, input, tags = [], target = "", winstonQty = "") {
    let {handler, swGlobal, contractSrcTXID} = await loadContract(arweave, contractId);
    const latestState = await readContract(arweave, contractId);
    const from = wallet ? await arweave.wallets.getAddress(wallet) : "";
    const settings = latestState.settings ? new Map(latestState.settings) : new Map();
    const evolve = latestState.evolve || settings.get("evolve");
    let canEvolve = latestState.canEvolve || settings.get("canEvolve");
    if (canEvolve === void 0 || canEvolve === null) {
      canEvolve = true;
    }
    if (evolve && /[a-z0-9_-]{43}/i.test(evolve) && canEvolve) {
      if (contractSrcTXID !== evolve) {
        try {
          const contractInfo = await loadContract(arweave, contractId, evolve);
          handler = contractInfo.handler;
        } catch (e) {
          const error = new errors_default(SmartWeaveErrorType.CONTRACT_NOT_FOUND, {
            message: `Contract having txId: ${contractId} not found`,
            requestedTxId: contractId
          });
          throw error;
        }
      }
    }
    const interaction = {
      input,
      caller: from
    };
    const tx = await createTx(arweave, wallet, contractId, input, tags, target, winstonQty);
    const ts = unpackTags(tx);
    const currentBlock = await arweave.blocks.getCurrent();
    swGlobal._activeTx = createDummyTx(tx, from, ts, currentBlock);
    const result = await execute(handler, interaction, latestState);
    return result.result;
  }
  async function createTx(arweave, wallet, contractId, input, tags, target = "", winstonQty = "0") {
    const options = {
      data: Math.random().toString().slice(-4)
    };
    if (target && target.length) {
      options.target = target.toString();
      if (winstonQty && +winstonQty > 0) {
        options.quantity = winstonQty.toString();
      }
    }
    const interactionTx = await arweave.createTransaction(options, wallet);
    if (!input) {
      throw new Error(`Input should be a truthy value: ${JSON.stringify(input)}`);
    }
    if (tags && tags.length) {
      for (const tag of tags) {
        interactionTx.addTag(tag.name.toString(), tag.value.toString());
      }
    }
    interactionTx.addTag("App-Name", "SmartWeaveAction");
    interactionTx.addTag("App-Version", "0.3.0");
    interactionTx.addTag("Contract", contractId);
    interactionTx.addTag("Input", JSON.stringify(input));
    await arweave.transactions.sign(interactionTx, wallet);
    return interactionTx;
  }
  function createDummyTx(tx, from, tags, block) {
    return {
      id: tx.id,
      owner: {
        address: from
      },
      recipient: tx.target,
      tags,
      fee: {
        winston: tx.reward
      },
      quantity: {
        winston: tx.quantity
      },
      block: {
        id: block.indep_hash,
        height: block.height,
        timestamp: block.timestamp
      }
    };
  }

  // src/weighted-pst-holder.ts
  function selectWeightedPstHolder(balances) {
    let totalTokens = 0;
    for (const address of Object.keys(balances)) {
      totalTokens += balances[address];
    }
    const weighted = {};
    for (const address of Object.keys(balances)) {
      weighted[address] = balances[address] / totalTokens;
    }
    let sum = 0;
    const r = Math.random();
    for (const address of Object.keys(weighted)) {
      sum += weighted[address];
      if (r <= sum && weighted[address] > 0) {
        return address;
      }
    }
    throw new Error("Unable to select token holder");
  }

  // src/index.ts
  var smartweave = {
    simulateCreateContractFromTx,
    simulateCreateContractFromSource,
    createContract,
    createContractFromTx,
    loadContract,
    interactWrite,
    interactWriteDryRun,
    interactWriteDryRunCustom,
    simulateInteractWrite,
    interactRead,
    readContract,
    selectWeightedPstHolder
  };
})();

},{}]},{},[1]);
