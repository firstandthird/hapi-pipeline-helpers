var browserify = require('browserify');
var stream = require('stream');
var path = require('path');

module.exports = function(filepath, contents, options, done) {

  var s = new stream.Readable();
  s._read = function noop() {};
  s.push(contents);
  s.push(null);

  var b = browserify(s, {
    basedir: path.dirname(filepath)
  });

  var bundle = b.bundle();

  var string = ''
  bundle.on('readable',function(buffer){
    var part = bundle.read();
    if (part) {
      string += part.toString();
    }
  });

  bundle.on('end',function(){
    done(null, string);
  });

};
