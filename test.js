"use strict";
var Logger = (function (){
  function Logger(){ }

  Logger.prototype.indent = function(n){
    var i = this.indentation || 0;
    if(!n) return i > 0 ? new Array(i + 1).join("  ") : "";
    this.indentation = i ? i + n : n;
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
      fn.call(this, this.assert);
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
    },
  };
})();

if (typeof module !== "undefined") module.exports = test;
