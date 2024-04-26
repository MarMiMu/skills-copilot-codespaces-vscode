// Create web server
// Create a web server that listens on port 3000 and serves the comments.html file.
// The comments.html file should have a form that posts to /comments and a list of comments.
// When a POST request is sent to /comments, the server should add the posted comment to the list of comments and redirect to /comments.
// The list of comments should be stored in a separate comments.js file as an array of strings.
// The server should serve the comments.html file with the list of comments interpolated into the file.
// If you receive a GET request to /comments, you should respond with the comments in JSON format.
const fs = require('fs');
const http = require('http');
const url = require('url');
const querystring = require('querystring');

const comments = require('./comments');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  const parsedQuery = querystring.parse(parsedUrl.query);

  if (parsedUrl.pathname === '/comments') {
    if (req.method === 'POST') {
      let body = '';

      req.on('data', (chunk) => {
        body += chunk;
      });

      req.on('end', () => {
        const comment = querystring.parse(body).comment;
        comments.push(comment);

        res.writeHead(302, { Location: '/comments' });
        res.end();
      });
    } else if (req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(comments));
    }
  } else {
    fs.readFile('./comments.html', (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('Not Found');
      } else {
        const commentsList = comments.map((comment) => `<li>${comment}</li>`).join('');
        const html = data.toString().replace('<!-- comments -->', commentsList);

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
      }
    });
  }
});

server.listen(3000);

// Path: comments.html
// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>Comments</title>