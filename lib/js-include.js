var async = require('async');
var path = require('path');
var fs = require('fs');

var regex = new RegExp('^\/\/include: (.*?)$', 'gm');

module.exports = function(filepath, contents, options, done) {


  var files = [];
  var match;
  while((match = regex.exec(contents)) !== null) {
    files.push(match[1]);
  }

  if (files.length === 0) {
    return done(null, contents);
  }

  async.map(files, function(file, done) {

    var filepath = path.join(options.basepath, file);
    fs.exists(filepath, function(exists) {
      if (!exists) {
        return done(new Error(filepath + ' does not exist'));
      }
      fs.readFile(filepath, 'utf8', function(err, src) {
        done(err, src);
      });
    });

  }, function(err, results) {
    if (err) {
      return done(err);
    }
    var inject = results.join('');

    done(null, inject+contents);
  });

};
