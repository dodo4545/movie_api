const http = require('http');
   const fs = require('fs');
   const url = require('url');

   const server = http.createServer((request, response) => {
       const parsedUrl = url.parse(request.url, true);

       // Log the request URL and timestamp to log.txt
       const logEntry = `Requested URL: ${request.url} at ${new Date().toISOString()}\n`;
       fs.appendFile('log.txt', logEntry, (err) => {
           if (err) console.error('Error writing to log file', err);
       });

       // Check if the request is for documentation
       if (parsedUrl.pathname === '/documentation') {
           fs.readFile('documentation.html', (err, data) => {
               if (err) {
                   response.writeHead(500, {'Content-Type': 'text/plain'});
                   response.end('Error loading documentation.');
               } else {
                   response.writeHead(200, {'Content-Type': 'text/html'});
                   response.end(data);
               }
           });
       } else {
           fs.readFile('index.html', (err, data) => {
               if (err) {
                   response.writeHead(500, {'Content-Type': 'text/plain'});
                   response.end('Error loading index.');
               } else {
                   response.writeHead(200, {'Content-Type': 'text/html'});
                   response.end(data);
               }
           });
       }
   });

   server.listen(8080, () => {
       console.log('Server is listening on port 8080');
   });