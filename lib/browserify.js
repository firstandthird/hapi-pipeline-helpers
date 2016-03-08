var browserify = require('browserify');
var stream = require('stream');
var path = require('path');
var babelify = require.resolve('babelify');

module.exports = function(filepath, contents, options, done) {

  if (options.ignore && filepath.match(options.ignore)) {
    return done(null, contents);
  }
  var s = new stream.Readable();
  s._read = function noop() {};
  s.push(contents);
  s.push(null);

  var b = browserify(s, {
    basedir: path.dirname(filepath)
  });

  var bundle = b
    .transform(babelify, { presets: [
      'es2015'
    ] })
    .bundle();

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
