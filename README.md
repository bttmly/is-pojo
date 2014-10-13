# is-pojo [![Build Status](https://travis-ci.org/nickb1080/is-pojo.svg?branch=master)](https://travis-ci.org/nickb1080/is-pojo) [![NPM version](https://badge.fury.io/js/is-pojo.svg)](http://badge.fury.io/js/is-pojo)

### Installation
`npm install is-pojo`

### Usage
```js
var isPojo = require("is-pojo");
isPojo({}) // true

// anything besides an absolutely plain object will return false.

// here are examples from the tests:

function Foo () {}
function Bar () {}
Bar.prototype.constructor = Object;

isPojo(function () {}) // false
isPojo([]) // false
isPojo(new Date()) // false
isPojo(true); // false
isPojo("abc"); // false
isPojo(123); // false
isPojo(new RegExp()); // false
isPojo(null); // false
isPojo(undefined); // false
isPojo(Object.create({})); // false
isPojo(new Foo()); // false
isPojo(new Bar()); // false
isPojo({constructor: Foo}); // true
```

### Why?
The [other module on npm](https://www.npmjs.org/package/is-plain-object) that I found to do this checks an object's `constructor` property against `Object`. This approach is error-prone since there's nothing special about the `constructor` property; you can set it willy-nilly (check out this module's test suite for examples).

In contrast, an object's prototype can be set just once, at instantiation time. As such it's safe to check an object's prototype (obtained with `Object.getPrototypeOf`) against `Object.prototype`.