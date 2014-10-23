require( "chai" ).should();

var isPojo = require( "./" );

var isPlainObject = require( "is-plain-object" );

var pojos = {
  "object literal": {},
  "Object.create(Object.prototype)": Object.create(Object.prototype),
  "new Object()": new Object()
};

var notPojos = {
  "function": function () {},
  "array": [],
  "date": new Date(),
  "boolean": true,
  "string": "abc",
  "number": 123,
  "regexp": new RegExp(),
  "null": null,
  "undefined": undefined,
  "created from object": Object.create( {} ),
  "created from null": Object.create( null ),
  "class instance": new (function Foo() {})
};

describe("isPojo()", function () {
  Object.keys( pojos ).forEach( function ( key ) {
    it( "correctly identifies " + key + " as such", function () {
      isPojo( pojos[key] ).should.equal( true );
    });
  });

  Object.keys( notPojos ).forEach( function ( key ) {
    it( "correctly identifies " + key + " as not a plain object", function () {
      isPojo( notPojos[key] ).should.equal( false );
    });
  });

  // differences between isPojo and isPlainObject (https://www.npmjs.org/package/is-plain-object)
  it( "doesn't get fooled by a `.constructor` property on an object", function () {

    function Bar () {}
    Bar.prototype.constructor = Object;

    var bar = new Bar();
    var obj = { constructor: Bar };

    isPojo( bar ).should.equal( false );
    isPlainObject( bar ).should.equal( true );

    isPojo( obj ).should.equal( true );
    isPlainObject( obj ).should.equal( false );
  })

});
