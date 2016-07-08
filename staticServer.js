var http = require('http');
var fs = require('fs');
var mime = require('mime');
var path = require('path');

var config = require('./config.json');

http.createServer((request, response) => {
    var filePath = (function() {
        if (request.url == '/') {
            return `${config.basePath}/${config.mainFile}`;
        } else {
            return `${config.basePath}${request.url}`;
        }
    })();
    console.log(filePath);
    fs.readFile(filePath, (err, data) => {
        let result;
        if(err){
            response.writeHead(404, {'Content-Type' : 'text/plain'});
            result = config.msg404;
        }else {
            response.writeHead(200, {'Content-Type' : mime.lookup(path.basename(filePath))});
            result = data;
        }
        response.end(result);
    });
}).listen(config.port, function(){
    console.log(`server running on ${config.port}...`);
});
