/**
 * Test1k 0.0.1 | https://github.com/3den/test1k
 * (c) 2013 Marcelo Eden
 * @license MIT
 **/
(function (global) {
  "use strict";

  global.Logger = (function (){
    function Logger(i){
      this.i = i || 0;
    }

    Logger.prototype.indent = function(n){
      var i = this.i;

      if(!n) return i > 0 ? new Array(i + 1).join("  ") : "";
      this.i = i ? i + n : n;
    };

    Logger.prototype.log = function (text) {
      console.log(this.indent() + text.toString());
    };

    return Logger;
  })();

  var test = (function(){
    var logger = new Logger();

    function log(text) { logger.log(text) }
    function indent(n) { logger.indent(n) }

    function interpolationTest(ok, args) {
      ok = this.interpolate(ok, args);
      this.assert(eval(ok), ok);
    }

    return {
      describe: function (name, fn) {
        log(name);
        indent(+1);
        fn.call(this);
        indent(-1);
      },

      assert: function (ok, msg) {
        if(typeof ok == "string") {
          return interpolationTest.call(this, ok, msg);
        }

        console.assert(ok, msg) || log(msg)
      },

      interpolate: function(string, args) {
        return string.replace(/\%(\w+)/g, function(match, key){
          return args[key];
        });
      }
    };
  })();

  // Bind the global vars
  for (var prop in test) { global[prop] = test[prop].bind(test); }
})(typeof global !== "undefined" ? global : window);
