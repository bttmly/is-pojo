# is-pojo

### Installation
`npm install is-pojo`

### Usage
```js
var isPojo = require("is-pojo");
isPojo({}) // true

// anything besides an absolutely plain object will return false.
// for examples, see the tests
```

### Why?
The [other module on npm]() that I found to do this checks an object's `constructor` property against `Object`. This approach is error-prone since there's nothing special about the `constructor` property; you can set it willy-nilly (check out this module's test suite for examples).

In contrast, an object's prototype can be set just once, at instantiation time. As such it's safe to check an object's prototype (obtained with `Object.getPrototypeOf`) against `Object.prototype`.