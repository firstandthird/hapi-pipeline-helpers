var sass = require('node-sass');
var _ = require('lodash');

module.exports = function(filepath, contents, options, done) {

  options = options || {};
  var clone = _.cloneDeep(options);
  clone.data = contents;
  sass.render(clone, function(err, results) {
    if (err) {
      return done(err);
    }
    done(null, results.css);
  });
};
