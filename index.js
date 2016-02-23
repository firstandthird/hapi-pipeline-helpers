module.exports = {
  styles: {
    less: require('./lib/less'),
    clean: require('./lib/css-clean'),
    autoprefix: require('./lib/autoprefix')
  },
  scripts: {
    include: require('./lib/js-include'),
    uglify: require('./lib/uglify')
  }
};
