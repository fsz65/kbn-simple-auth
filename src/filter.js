/**
 * Created by fsz on 2017/4/24.
 * use Express to add proxy in front of hapiJs
 * filter and check all url
 * retransmission the url to the hapi-server
 */
const Express = require('express');
const Proxy = require('express-http-proxy');
const Config = require('./config').load('proxy');
const User = require('./user');

var app = Express();

module.exports = {
    
    proxy:function () {
        app.use('/',Proxy(Config.remote,{
            
            filter:function (req,res) {
                return true;
            },
            decorateRequest:function (req) {
                console.log(req);
               console.log("this is proxy by fsz");
                var cookie = req.headers.cookie;
                /*User.userInfo('minos2.cnsuning.com','/minos2-admin/event/getAppcodes.htm',cookie,function (body,status) {
                    if (status == 302){
                        req.path = "/fsz"
                    }
                });*/
                req.path = "/fsz";
                return req;
            },
            forwardPath:function (req) {
                return require('url').parse(req.url).path;
            }
        }));
        app.listen(Config.port);
    }
};