/**
 * Tests for the javascript `Math`
 *
 * We choose `Math` because is a native javascript object
 * that works fine and has a simple API.
 *
 * If you want to learn BDD, the 1k style, just read this file.
 * I am sure that you will get it ;)
 **/

// Allow the tests to run in node
if (module) test = require("../test.js");

// You can use the describe to group your assertions
test.describe("Math", function(){
  // #sqrt
  assertSqrt(4, 2);
  assertSqrt(9, 3);

  // The assertion function can use a string
  function assertSqrt(n, expectation) {
    test.assert("Math.sqrt(%1) === %2", n, expectation)
  }

  // Math.pow
  assertPow(2, 2, 4);
  assertPow(2, 1, 2);

  // you can customize your assertion anyway you like
  function assertPow(n1, n2, expectation) {
    var result = Math.pow(n1, n2)
      , msg = test.interpolate("#pow(%1, %2): %3 === %4", arguments);

    test.assert(result === expectation, msg);
  }
});
