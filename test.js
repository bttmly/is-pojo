require( "chai" ).should();

var isPojo = require( "./" );

// another implementation that I don't think is very good
var isPlainObject = require( "is-plain-object" );

function Foo () {}

function Bar () {}
Bar.prototype.constructor = Object;

var notPojos = {
  "function": function () {},
  "array": [],
  "date": new Date(),
  "boolean": true,
  "string": "abc",
  "number": 123,
  "regexp": new RegExp(),
  "class instance": new Foo()
}

describe("isPojo()", function () {
  it( "correctly identifies plain objects as such", function () {
    var plainObject = { someKey: "someValue" };
    isPojo( {} ).should.equal( true );
    isPojo( plainObject ).should.equal( true );
  });

  Object.keys( notPojos ).forEach( function ( key ) {
    it( "correctly identifies " + key + " as not a plain object", function () {
      isPojo( notPojos[key] ).should.equal( false );
    });
  });

  // differences between isPojo and isPlainObject
  it( "doesn't get fooled by a `.constructor` property on an object", function () {
    var bar = new Bar();
    var obj = { constructor: Bar };
    isPojo( bar ).should.equal( false );
    isPlainObject( bar ).should.equal( true );

    isPojo( obj ).should.equal( true );
    isPlainObject( obj ).should.equal( false );
  })

});