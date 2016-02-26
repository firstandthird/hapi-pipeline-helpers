var async = require('async');
var path = require('path');
var fs = require('fs');

var regex = new RegExp('^\/\/include: (.*?)$', 'gm');

var tryRead = function(paths, file, done) {

  var index = 0;
  var exists = false;
  var filePaths = paths.map(function(p) {
    return path.resolve(p, file);
  });

  var check = function() {
    if (filePaths.length == (index - 1)) {
      return done(new Error(file + ' not found'));
    }

    fs.exists(filePaths[index], function(exists) {
      if (!exists) {
        index++;
        return check();
      }

      fs.readFile(filePaths[index], 'utf8', done);
    });

  }
  check();

};

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

    tryRead(options.paths, file, function(err, contents) {
      done(err, contents);
    });

  }, function(err, results) {
    if (err) {
      return done(err);
    }
    var inject = results.join('');

    done(null, inject+contents);
  });

};
