/**
 * Created by fsz on 2017/4/24.
 * new and sent a request by cookie
 * if the cookie have no auth to get the user message,then return user a login page
 */
var http = require('http');
const userInfo = (hostname,path,cookie) => {
    return new Promise((resolve,reject) =>{
        const options = {
            hostname: hostname,
            port: 9080,
            path: path,
            method: 'GET',
            /*headers: {
             /!*'Content-Type': 'application/x-www-form-urlencoded',
             'Content-Length': Buffer.byteLength("this is message")*!/
             },*/
            headers:{
                Cookie:cookie
            },
            agent:false
        };
        //console.log("fffffff");
        const req = http.request(options, (res) => {
            //console.log(options);
            var bodyString = '';
            //console.log(`STATUS: ${res.statusCode}`);
            //console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                //console.log(`BODY: ${chunk}`);
                bodyString = bodyString + chunk;
            });
            res.on('end', () => {
                //console.log('No more data in response.');
                var authInfo = {authInfo:bodyString,status:res.statusCode};
                resolve(authInfo);
            });
        });
        req.end();
    })

};

module.exports = {
    userInfo:userInfo
};