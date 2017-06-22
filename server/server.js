var express = require("express");
var session = require('express-session');
var crypto = require('crypto');
var config = require('./config.js');
var wechat = require('./wechat.js');
var mock = require('./mock.js');
var bodyParser = require('body-parser');
var app = express();

app.use("/client", express.static('public'));
app.use(session({
  secret: 'Ilovecat',
  key: 'sessionId',
  resave: false,
  saveUninitialized: true
}))
app.use(bodyParser.json());

var wechatAccessToken = null;

function createResponseObject(obj, code) {
  return {
    resultCode: code === false ? 1 : 0,
    resultObject: obj
  };
}

// 登录服务
app.post("/WS/wechat/login", function(req, res){
  var code = req.body.code;
  if (code) {
    // 取得用户AccessToken
    wechat.getUserAccessToken(code, function(accessTokenObj){
      if (accessTokenObj) {
        req.session.accessToken = accessTokenObj;
        // 取得用户信息
        wechat.getUserInfo(accessTokenObj["access_token"]
          , accessTokenObj["openid"]
          , function(userObject){
            res.json(createResponseObject(userObject))
          });
      }
    });
  }
});

// 取得config接口的权限验证配置信息
app.post("/WS/wechat/authJsSdk", function(req, res){
  var currentUrl = req.body.currentUrl;
  console.log('currentToken :: ' + req.session.accessToken["access_token"]);
  wechat.getJsTicket(function(jsTicketObject) {
    var noncestr = "Wm3WZYTPz0wzccnW";
    var timestamp = "1414587457";
    var sha1 = null;
    var resultCode = 1;
    console.log('jsTicketObject :: ' + JSON.stringify(jsTicketObject));
    if(jsTicketObject.ticket){
      var ticket = jsTicketObject.ticket;
      var signatureString = "jsapi_ticket=" + ticket +
          "&noncestr=" + noncestr +
          "&timestamp=" + timestamp +
          "&url=" + currentUrl;
      sha1 = crypto.createHash("sha1").update(signatureString);
      resultCode = 0;
    }
    res.json({
        "resultCode": resultCode,
        "resultObject": {
          "appId": config.APP_ID,
          "nonceStr": noncestr,
          "timestamp": timestamp,
          "signature": sha1.digest("hex")
        }
    });
  });
});

app.post("/WS/sample/*", function(req, res){
  mock.call(req, res);
});

app.listen(process.env.VCAP_APP_PORT || 3000);
