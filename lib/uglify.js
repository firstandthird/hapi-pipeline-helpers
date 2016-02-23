var UglifyJS = require('uglify-js');
module.exports = function(filepath, contents, options, done) {

  if (options.enabled !== false) {

    var out = UglifyJS.minify(contents, { fromString: true });

    done(null, out.code);
  } else {
    done(null, contents);
  }


};
