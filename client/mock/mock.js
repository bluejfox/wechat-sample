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

function getJsonFileFullPath(jsonPath) {
  return path.resolve(__dirname, jsonPath);
}

exports.call = function(proxyReq, req, res) {
  var proxyPath = proxyReq.path;
  var jsonFilePath = null;
  var mockJson = null;
  if (proxyPath && proxyPath !== '' && proxyPath.indexOf('/') !== -1) {
    proxyPath = proxyPath.replace(config.baseUrl, '');
    try {
      if (!isExclude(proxyPath)) {
        jsonFilePath = getJsonFileFullPath('./datasource/' + proxyPath + '.json');
        mockJson = Mock.mock(JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8')));
      }
    } catch (error) {
      jsonFilePath = getJsonFileFullPath('./datasource/error.json');
      mockJson = Mock.mock(JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8')));
    }
  }
  res.json(mockJson);
};
