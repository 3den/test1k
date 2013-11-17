/**
 * Test1k 0.0.1 | https://github.com/3den/test1k
 * (c) 2013 Marcelo Eden
 * @license MIT
 **/
(function (global) {
  "use strict";

  // The Logger Classs
  global.Logger = (function () {
    function Logger(i) {
      this.i = i || 0;
    }

    Logger.prototype = {
      indent: function(n) {
        var i = this.i;

        if (n) {
          this.i = i ? i + n : n;
        } else {
          return i > 0 ? new Array(i + 1).join("  ") : "";
        }
      },

      log: function (text) {
        console.log(this.indent() + text.toString());
      },

      assert: function (ok, msg) {
        console.assert(ok, msg) || this.log(msg);
      }
    };

    return Logger;
  })();

  // The test Suite Class
  global.Suite = (function () {
    function Suite() {
      this.logger = new Logger();
      this.assertions = 0;
      this.successes = 0;
    }

    Suite.prototype = {
      log: function (text) { this.logger.log(text) },
      indent: function (n) { this.logger.indent(n) },

      describe: function (name, fn) {
        this.log(name);
        this.indent(+1);
        fn.call(this);
        this.indent(-1);
        this.finish();
      },

      assert: function (ok, msg) {
        if (typeof ok == "string") {
          ok = this.interpolate(ok, msg);
          return this.assert(eval(ok), ok)
        }

        this.assertions++;
        this.logger.assert(ok, msg);
        ok && this.successes++;
      },

      interpolate: function (string, args) {
        return string.replace(/\%(\w+)/g, function (match, key) {
          return args[key];
        });
      },

      finish: function () {
        if (this.indent() > 0) return;

        var errors = this.assertions - this.successes;
        this.log(this.interpolate("\n%0 assertions, %1 failures", [
          this.assertions, errors
        ]));

        if (errors && typeof process !== "undefined") process.exit(1)
      }
    };

    return Suite;
  })();

  // Bind all the global var
  var prop, test = new Suite();
  for (prop in Suite.prototype) { global[prop] = test[prop].bind(test); }

})(typeof global !== "undefined" ? global : window);
