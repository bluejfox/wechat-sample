var path = require('path');
var fs = require('fs');
var Mock = require('mockjs');
var config = require('./config.js');
var exclude = config.exclude;

function isExclude(service) {
  var ret = false;

  for (var i = 0; i < exclude.length; i++) {
    if (exclude[i] === service) {
      ret = true;
      break;
    }
  }
  return ret;
}

exports.call = function(proxyReq, req, res) {
  var proxyPath = proxyReq.path;
  var jsonFilePath = null;
  var mockJson = null;
  if (proxyPath && proxyPath !== '' && proxyPath.indexOf('/') !== -1) {
    proxyPath = proxyPath.replace(config.baseUrl, '');
    try {
      debugger;
      if (!isExclude(proxyPath)) {
        jsonFilePath = './datasource/' + proxyPath + '.json';
        jsonFilePath = path.resolve(__dirname, jsonFilePath);
        mockJson = Mock.mock(JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8')));
      }
    } catch (error) {
      mockJson = {
        resultCode: 1,
        exception: [
          {
            'message': '[' + proxyPath + '] 无法取得指定的Mock文件'
          }
        ],
      };
    }
  }
  res.json(mockJson);
};
