var CleanCSS = require('clean-css');
module.exports = function(filepath, contents, options, done) {

  var out = contents;
  if (options.enabled !== false) {
    out = new CleanCSS().minify(contents).styles;
  }
  done(null, out);

};
