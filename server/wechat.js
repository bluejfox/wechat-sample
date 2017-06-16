var request = require("request");
var qs = require('querystring');
var config = require('./config.js');

var _currentToken = null;

function isAccessTokenExpired() {
  if (_currentToken) {
    var currentDate = Date.now();
    time = (currentDate - _currentToken.tokenDate) / 1000;
    if (time <= _currentToken.expiresIn) {
      return false;
    }
  }
  return true;
}

module.exports = {
  getGlobalAccessToken: function(func) {
    // 获取Token服务的请求地址
    var baseAuthUrl = "https://api.weixin.qq.com/cgi-bin/token?";
    // 判断是否有可使用的Token
    if (!isAccessTokenExpired()) {
      // 返回可使用的Token
      func(_currentToken);
      return;
    }
    // 取得新的Token
    request({
      "url": baseAuthUrl + qs.stringify({
          "grant_type": "client_credential",
          "appid": config.APP_ID,
          "secret": config.APP_SECRET
      }),
      "method": "GET"
    }, function(error, response, body){
      if(response.statusCode === 200){
        var data = JSON.parse(body);
        if (!data.hasOwnProperty("errcode")) {
          _currentToken = {
            'accessToken': data.access_token,
            'expiresIn': data.expires_in,
            'tokenDate': Date.now()
          };
          func(_currentToken);
        } else {
          func(data);
        }
      }
    });
  },
  getUserAccessToken: function(code, func) {
    var apiUrl = 'https://api.weixin.qq.com/sns/oauth2/access_token?'
      + qs.stringify({
        appid: config.APP_ID,
        secret: config.APP_SECRET,
        code: code,
        grant_type: 'authorization_code'
      });
    request({
      url: apiUrl,
      method: 'GET'
    }, function(error, response, body){
      console.log(response);
      if(response.statusCode === 200){
        func(JSON.parse(body));
      }
    });
  },
  getUserInfo: function(accessToken, openId, func) {
    var apiUrl = 'https://api.weixin.qq.com/sns/userinfo?'
      + qs.stringify({
        access_token: accessToken,
        openid: openId,
        lang: 'zh_CN'
      });
    request({
      url: apiUrl,
      method: 'GET'
    }, function(error, response, body){
      if(response.statusCode === 200){
        func(JSON.parse(body));
      }
    });
  },
  getJsTicket: function(func) {
    this.getGlobalAccessToken(function(globalAccessToken){
      var apiUrl = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?'
        + qs.stringify({
          access_token: globalAccessToken.accessToken,
          "type": "jsapi"
        });
      request({
        url: apiUrl,
        method: 'GET'
      }, function(error, response, body){
        if(response.statusCode === 200){
          func(JSON.parse(body));
        }
      });
    });
  }
};
