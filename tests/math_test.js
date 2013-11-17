/**
 * Tests for the javascript `Math`
 *
 * We choose `Math` because is a native javascript object
 * that works fine and has a simple API. Those tests will use a single level of describe
 *
 * If you want to learn TDD, the 1k style, just read this file.
 * I am sure that you will get it ;)
 **/

// Allow the tests to run in node
if (typeof module !== "undefined") require("../test.js");

// You can use the describe to group your assertions
describe("Math", function(){
  // #sqrt
  assertSqrt(4, 2);
  assertSqrt(9, 3);
  assertSqrt(16, 4);

  // The assertion function can interpolate a string with an array
  function assertSqrt(n, expectation) {
    assert("Math.sqrt(%0) === %1", [n, expectation]);
  }

  // #flor
  assertFloor(1.4, 1)
  assertFloor(3.41221341234, 3)

  // The assertion function can interpolate a string with an object
  function assertFloor(n, expectation) {
    assert("Math.floor(%n) === %result", {
      n: n, result: expectation
    });
  }

  // #pow
  assertPow(2, 2, 4);
  assertPow(4, 2, 16);
  assertPow(2, 1, 2);

  // you can customize your assertion anyway you like
  function assertPow(n1, n2, expectation) {
    var result = Math.pow(n1, n2)
      , msg = interpolate("#pow(%0, %1): %2 === %3",
        [n1, n2, expectation, result]);

    assert(result === expectation, msg);
  }
});
