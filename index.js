module.exports = {
  styles: {
    less: require('./lib/less'),
    clean: require('./lib/css-clean'),
    autoprefix: require('./lib/autoprefix'),
    sass: require('./lib/sass')
  },
  scripts: {
    include: require('./lib/js-include'),
    browserify: require('./lib/browserify'),
    uglify: require('./lib/uglify')
  }
};
