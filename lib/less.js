var less = require('less');

module.exports = function(filepath, contents, options, done) {

  options = options || {};
  options.plugins = [
    require('less-plugin-glob')
  ]
  less.render(contents, options, function(err, results) {
    if (err) {
      return done(err);
    }

    done(null, results.css);
  });
};
