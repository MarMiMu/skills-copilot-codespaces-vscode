// create webserver
// create a server that listens on port 3000
// create a route that listens on /comments
// when a GET request is made to /comments
// return the comments array as JSON
// when a POST request is made to /comments
// add the comment to the comments array
// return the comments array as JSON

const http = require('http');
const fs = require('fs');
const path = require('path');

const comments = [];

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/comments') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(comments));
  } else if (req.method === 'POST' && req.url === '/comments') {
    let body = '';
    req.on('data', (data) => {
      body += data;
    });
    req.on('end', () => {
      comments.push(JSON.parse(body));
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(comments));
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});