var proto = Object.prototype;
var gpo = Object.getPrototypeOf;

function isPojo (obj) {
  if (obj === null || typeof obj !== "object") {
    return false;
  }
  return gpo(obj) === proto;
}

module.exports = isPojo;