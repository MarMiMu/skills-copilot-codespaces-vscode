// create webserver
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var path = require('path');

var app = http.createServer(function(request,response){
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathName = url.parse(_url, true).pathname;
  var title = queryData.id;
  var description = queryData.id;
  var comments = queryData.comments;
  var html = template.HTML(title, description, comments);
  var dir = pathName;
  if(pathName === '/'){
    title = 'Welcome';
    description = 'Hello, Node.js';
    comments = '<ul><li>hello</li><li>world</li></ul>';
    html = template.HTML(title, description, comments);
    response.writeHead(200);
    response.end(html);
  } else {
    fs.readdir(`./data/${dir}`, function(error, filelist){
      if(error){
        console.log(error);
        response.writeHead(404);
        response.end('Not Found');
      } else {
        var title = 'Welcome';
        var description = 'Hello, Node.js';
        var comments = '<ul><li>hello</li><li>world</li></ul>';
        html = template.HTML(title, description, comments);
        response.writeHead(200);
        response.end(html);
      }
    });
  }
});
app.listen(3000);