// create webserver
// 1. create a web server
// 2. create a request handler
// 3. create a response handler
// 4. create a port
// 5. create a listener
// 6. create a server
// 7. create a listen

// create a web server
const http = require('http');
const fs = require('fs');

// create a request handler
const requestHandler = (request, response) => {
    // create a response handler
    response.writeHead(200, {'Content-Type': 'text/html'});
    // response.write('Hello World');
    fs.readFile('./index.html', null, function(error, data) {
        if (error) {
            response.writeHead(404);
            response.write('File not found');
        } else {
            response.write(data);
        }
        response.end();
    });
};

// create a port
const port = 3000;

// create a server
const server = http.createServer(requestHandler);

// create a listener
server.listen(port, (error) => {
    if (error) {
        return console.log('Error: ', error);
    }

    console.log(`Server is listening on ${port}`);
});