"use strict";
var test = {
  describe: function (name, fn) {
    this.log(name);
    this.indent(+1);
    fn.call(this, this.assert);
    this.indent(-1);
  },

  log: function (text) {
    console.log(this.indent() + text.toString());
  },

  assert: function (ok, msg) {
    if(typeof ok == "string") {
      var code = this.interpolate(ok, arguments);
      return this.assert(eval(code), code);
    }

    console.assert(ok, msg) || this.log(msg)
  },

  interpolate: function(string, args) {
    return string.replace(/\%(\d)/g, function(match, key){
      return args[key];
    });
  },

  indent: function(n){
    var i = this.indentation || 0;
    if(!n) return i > 0 ? new Array(i + 1).join("  ") : "";
    this.indentation = i ? i + n : n;
  },
}

if (typeof module !== "undefined") module.exports = test;
