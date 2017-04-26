/**
 * Created by fsz on 2017/4/24.
 * use Express to add proxy in front of hapiJs
 * filter and check all url
 * retransmission the url to the hapi-server
 */
const Express = require('express');
const Proxy = require('express-http-proxy');
const Config = require('./config').load('proxy');
const User = require('./user').userInfo;

var app = Express();

module.exports = {
    
    proxy:function () {
        app.use('/',Proxy(Config.remote,{
            
            filter:function (req,res) {
                return true;
            },

            forwardPathAsync:function (req) {
                return new Promise((resolve,reject) =>{
                    //console.log(req);
                    //console.log("this is proxy by fsz");
                    var cookie = req.headers.cookie;
                    console.log(cookie);
                    User(Config.interfaceHostName,Config.interfacePath,cookie)
                        .then(function (v) {
                            console.log(v);
                            if (v.authInfo != '15061857'){
                                resolve("/fsz");
                                //resolve(require('url').parse(req.url).path);
                            }else {
                                resolve(require('url').parse(req.url).path);
                            }
                        });
                });

            }
        }));
        app.listen(Config.port);
    }
};