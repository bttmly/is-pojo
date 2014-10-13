var proto = Object.prototype;
var gpo = Object.getPrototypeOf;

function isPojo ( obj ) {
  if (typeof obj !== "object") {
    return false;
  }
  return gpo( obj ) === proto;
}

module.exports = isPojo;