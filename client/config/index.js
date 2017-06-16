// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path');
var devEnvObj = require('./dev.env');
var prodEnvObj = require('./prod.env');

function getEnvConfig (key) {
  var env = process.env.NODE_ENV === 'production' ? prodEnvObj : devEnvObj;
  return env[key].replace(/"/g, '');
}

var config = {
  build: {
    env: prodEnvObj,
    index: path.resolve(__dirname, '../../server/public/index.html'),
    assetsRoot: path.resolve(__dirname, '../../server/public'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: devEnvObj,
    port: 8083,
    autoOpenBrowser: false,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    // cann't use es6 grammar, so define it in other ways
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}

// only use in dev
var proxyKey = getEnvConfig('PROXY_KEY');
var pathRegex = '^' + proxyKey;
config.dev.proxyTable[proxyKey] = {
  target: getEnvConfig('TARGET_WEBSERVICE_SERVER'),
  changeOrigin: true
}
config.dev.proxyTable[proxyKey].pathRewrite = {};
config.dev.proxyTable[proxyKey].pathRewrite[pathRegex] = '';
module.exports = config;
