/**
 * Created by fsz on 2017/4/24.
 * this is the plugin of auth manage for kibana-v4.6
 *
 */
'use strict'
module.exports = function (kibana) {
    const Filter = require('./src/filter');
    const Config = require('./src/config').load('proxy');
    return new kibana.Plugin({
        init:function init(server) {
            Filter.proxy();
            server.route({
                method:'GET',
                path:'/fsz',
                handler:function (request,reply) {
                    return reply.redirect(Config.loginUrl);
                }
            })
        }
    });
    
};