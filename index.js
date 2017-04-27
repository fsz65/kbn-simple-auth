/**
 * Created by fsz on 2017/4/24.
 * this is the plugin of auth manage for kibana-v4.6
 *
 */
'use strict'
module.exports = function (kibana) {
    const Filter = require('./src/filter');
    const Config = require('./src/config').load('proxy');
    const URL = require('url');
    return new kibana.Plugin({
        init:function init(server) {
            Filter.proxy();
            server.state('session',{
                ttl: null,
                isSecure: false,
                isHttpOnly: false,
                //isSameSite:false,
                encoding: 'base64json',
                clearInvalid: false, // remove invalid cookies
                strictHeader: false // don't allow violations of RFC 6265
            });
            server.ext('onPreHandler',function (request,reply) {
                var session = request.state.session;
                if (request.path.startsWith('/fsz')) {
                    var tem = require('url').parse(request.url,true);
                    if (!session){
                        session = tem.query;
                        reply.state('session', session);
                    }
                }

                reply.continue();
            });
            server.route({
                method:'GET',
                path:'/fsz',
                handler:function (request,reply) {
                    //var httpUrl = "http://www.xxx.com" + request.url.path;
                    //const temUrl = new URL(httpUrl);
                    //var tem = require('url').parse(request.url,true);
                    //console.log(tem.query);
                    //console.log(URL.parse(request.url).searchParams.get('user'));
                    return reply.redirect(Config.loginUrl);
                }
            })
        }
    });
    
};