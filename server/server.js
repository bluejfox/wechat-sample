var express = require("express");
var request = require("request");
var qs = require('querystring');
var crypto = require('crypto');
var mysql = require("./mysql.js");
var bodyParser = require('body-parser');
var app = express();

app.use("/client", express.static('public'));
app.use(bodyParser.json());

var wechatAccessToken = null;
var APP_ID = "wx476f7fe37b9c59ea";

// 取得全局Token
app.post("/WS/token", function(req, res) {
    var baseAuthUrl = "https://api.weixin.qq.com/cgi-bin/token?";
    // 获取access_token
    request({
        "url": baseAuthUrl + qs.stringify({
            "grant_type": "client_credential",
            "appid": APP_ID,
            "secret": "389c441d5c2ed556ed4a8452a7743508"
        }),
        "method": "GET"
    }, function(error, response, body){
        var resultCode;
        if(response.statusCode === 200){
            var data = JSON.parse(body);
            if (!!data.errcode) {
                resultCode = 0;
            }else{
                console.log("access_token :: " + data.access_token);
                console.log("expires_in :: " + data.expires_in);
                wechatAccessToken = data.access_token;
                resultCode = 1;
            }
        }
        res.json({
            "resultCode": resultCode,
            "token": wechatAccessToken
        });
    });
});

app.post("/WS/auth", function(req, res){

});

app.post("/WS/configInfo", function(req, res){
    var url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?";
    var currentUrl = req.body.currentUrl;
    request({
        "url": url + qs.stringify({
            "access_token": wechatAccessToken,
            "type": "jsapi"
        }),
        "method": "GET"
    }, function(error, response, body){
        var resultCode;
        var noncestr = "Wm3WZYTPz0wzccnW";
        var timestamp = "1414587457";
        var sha1 = null;
        if(response.statusCode === 200){
            var data = JSON.parse(body);
            if (!!data.errcode) {
                resultCode = 0;
            }else{
                var ticket = data.ticket;
                console.log("js_ticket :: " + ticket);
                var signatureString = "jsapi_ticket=" + ticket +
                    "&noncestr=" + noncestr +
                    "&timestamp=" + timestamp +
                    "&url=" + currentUrl;
                sha1 = crypto.createHash("sha1").update(signatureString);
                resultCode = 1;
            }
        }
        res.json({
            "resultCode": resultCode,
            "appId": APP_ID,
            "nonceStr": noncestr,
            "timestamp": timestamp,
            "signature": sha1.digest("hex")
        });
    });
});

app.post("/WS/genconv", function(req, res){
    var longitude = req.body.longitude;
    var latitude = req.body.latitude;
    request({
        "url": "http://api.map.baidu.com/geoconv/v1/?" + qs.stringify({
            "coords": longitude + "," + latitude,
            "from": "3",
            "to": "5",
            "ak": "RRCAuqbWzpewMKLWmKTKiHpGRP8ba88Q"
        })
    }, function(error, response, body){
        var resultCode;
        if(response.statusCode === 200){
            var data = JSON.parse(body);
            if (data.status !== 0) {
                resultCode = 0;
            }else{
                var r = data.result;
                if (r.length > 0){
                    longitude = r[0].x;
                    latitude = r[0].y;
                }
                resultCode = 1;
            }
        }
        res.json({
            "resultCode": resultCode,
            "longitude": longitude,
            "latitude": latitude
        });
    });
});

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
