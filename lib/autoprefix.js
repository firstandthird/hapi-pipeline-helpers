var autoprefixer = require('autoprefixer');
var postcss = require('postcss');

module.exports = function(filepath, contents, options, done) {

  postcss([autoprefixer])
    .process(contents)
    .then(function(result) {
      result.warnings().forEach(function (warn) {
        console.warn(warn.toString());
      });
      done(null, result.css);
    }, function(err) {
      done(err);
    });

};
