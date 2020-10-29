var DODEBUG = true;

const timemark = ()=>(new Date).toLocaleString();

let Logger = {
  /// Assign property values to new instance for preserving the given object status for logging.
  o: function(o) {
    return Object.assign({}, o);
    // return JSON.parse(JSON.stringify(o));
  },
  /// Logger constructor, usage:
  ///   let logger = App.loggerWithPrefix("[prefix]");
  ///   logger.debug("message"); // "[prefix] message"
  /// Lineage logger can be created from the parent logger. Just
  ///   let lin = log.lin("[method]");
  ///   lin.debug("called"); // "[prefix][method] called"
  withPrefix: function(prefix) {

    var O = {};

    Object.defineProperty(O, "lin", {
        get: function() {
            return function(mid) { return Logger.withPrefix(prefix+mid); };
        },
        configurable: false,
        enumerable: false
    });

    Object.defineProperty(O, "o", {
        get: function() {
            return Logger.o;
        },
        configurable: false,
        enumerable: false
    });

    // Disable all logging when not in debug mode.
    if(!DODEBUG) {

      for (var m in console) {
        let fn = console[m];
        if (typeof fn == 'function') {

          Object.defineProperty(O, m, {
              get: function() {
                  return ()=>{};
              },
              configurable: false,
              enumerable: false
          });

        }
      }
      return O;

    }

    // "dir" accept only one argument, so we should not apply prefix for it.
    Object.defineProperty(O, "dir", {
        get: function() {
            return console.dir.bind(console);
        },
        configurable: false,
        enumerable: false
    });

    for (var m2 in console) {
      let fn = console[m2];
      if (m2 !== "dir" && typeof fn == 'function') {

        Object.defineProperty(O, m2, {
            get: function() {
                return fn.bind(console, timemark() + prefix);
            },
            configurable: false,
            enumerable: false
        });

      }
    }

    return O;

  }
};

module.exports = Logger
