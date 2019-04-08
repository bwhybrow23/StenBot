'use strict';

exports.start = function () {
  var start = process.hrtime();
  return {
    get ms() { // milliseconds
      var t = process.hrtime(start);
      return t[0] * 1000 + t[1] / 1000000;
    },
    get us() { // microseconds
      var t = process.hrtime(start);
      return t[0] * 1000000 + t[1] / 1000;
    },
    get ns() { // nanoseconds
      var t = process.hrtime(start);
      return t[0] * 1e9 + t[1];
    }
  };
};
