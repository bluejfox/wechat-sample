var express = require("express");
var session = require('express-session');
var crypto = require('crypto');
var config = require('./config.js');
var wechat = require('./wechat.js');
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
app.post("/WS/login", function(req, res){
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
app.post("/WS/authJsSdk", function(req, res){
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


// app.get("/WS/test", function(req, res){
//     var date = new Date();
//     console.log(Date.now());
//     console.log(date - new Date(2017, 5, 13, 10, 34, 00));
//     res.json({});
// });

// // 取得全局Token
// app.post("/WS/token", function(req, res) {
//     var currentDate = null;
//     var time = null;
//     // 判断是否需要获取Token
//     if (wechatAccessToken) {
//         currentDate = Date.now();
//         time = (currentDate - wechatAccessToken.currentDate) / 1000;
//         console.log("time :: " + time);
//         if (time <= wechatAccessToken.expiresIn) {
//             res.json({
//                 "resultCode": 1,
//                 "resultObject": {
//                   "token": wechatAccessToken.accessToken
//                 }
//             });
//             return;
//         }
//     }
//     var baseAuthUrl = "https://api.weixin.qq.com/cgi-bin/token?";
//     // 获取access_token
//     request({
//         "url": baseAuthUrl + qs.stringify({
//             "grant_type": "client_credential",
//             "appid": config.APP_ID,
//             "secret": config.APP_SECRET
//         }),
//         "method": "GET"
//     }, function(error, response, body){
//         var resultCode;
//         if(response.statusCode === 200){
//             var data = JSON.parse(body);
//             if (!!data.errcode) {
//                 resultCode = 0;
//             }else{
//                 console.log("access_token :: " + data.access_token);
//                 console.log("expires_in :: " + data.expires_in);
//                 wechatAccessToken = {
//                     'accessToken': data.access_token,
//                     'expiresIn': data.expires_in,
//                     'currentDate': Date.now()
//                 };
//                 resultCode = 1;
//             }
//         }
//         res.json({
//             "resultCode": resultCode,
//             "resultObject": {
//               "token": wechatAccessToken.accessToken
//             }
//         });
//     });
// });

// app.post("/WS/auth", function(req, res){

// });

// app.post("/WS/user", function(req, res) {
//     console.log("user Post");
//     console.log(req.body);
//     var data = req.body;
//     res.set("Access-Control-Allow-Origin", "*");
//     res.set("Access-Control-Allow-Methods", "POST");
//     res.set("Access-Control-Allow-Headers", "Content-Type");
//     mysql.query("INSERT INTO vote SET ?", data, function(rows){
//         console.log("insert success");
//         res.json({
//             "result": 1
//         });
//     });
// });

// app.options("/WS/user", function(req, res) {
//     console.log("user YuJian");
//     res.set("Access-Control-Allow-Origin", "*");
//     res.set("Access-Control-Allow-Methods", "POST");
//     res.set("Access-Control-Allow-Headers", "Content-Type");
//     res.end();
// });

app.listen(process.env.VCAP_APP_PORT || 3000);
