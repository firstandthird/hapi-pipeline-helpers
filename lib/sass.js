var sass = require('node-sass');

module.exports = function(filepath, contents, options, done) {

  options = options || {};
  options.data = contents;
  sass.render(options, function(err, results) {
    console.log(err);
    if (err) {
      return done(err);
    }
    done(null, results.css);
  });
};
