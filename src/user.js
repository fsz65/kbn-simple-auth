/**
 * Created by 15061857 on 2017/4/24.
 * new and sent a request by cookie
 * if the cookie have no auth to get the user message,then return user a login page
 */
var http = require('http');
var userInfo = function (hostname,path,cookie,callback) {
    const options = {
        hostname: hostname,
        port: 80,
        path: path,
        method: 'GET',
        /*headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
         'Content-Length': Buffer.byteLength(postData)
         }*/
        headers:{
            Cookie:cookie
        },
        agent:false
    };

    const req = http.request(options, (res) => {
        var bodyString = '';
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            //console.log(`BODY: ${chunk}`);
            bodyString = bodyString + chunk;
        });
        res.on('end', () => {
            console.log('No more data in response.');
            callback(bodyString,res.statusCode);
        });
    });

    req.end();
};
module.exports = {
    userInfo:userInfo
};