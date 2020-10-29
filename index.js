const http = require('http');
const fs = require('fs');
const hostname = 'localhost';
var path = require('path');

var express = require('express');
var app = express();

var staffdata = require('./test.json');

app.get('/' , function(req, response) {
       console.log(req.headers);
       response.statusCode = 200;
       response.setHeader('Content-Type','text/html');
       fs.readFile('./index.html', null, function(error, data) {
           if (error) {
              response.writeHead(404);
              response.write('File not found!');
           } else {
              response.write(data);
           }
           response.end();
        })
      })

app.get('/test.json', function(req, response) {
   console.log(req.headers);
   response.statusCode = 200;
   response.writeHead(200, {"Content-Type": "text/json"});
   response.end(JSON.stringify(staffdata));
   
})
app.get('/app.js', function(req, response) {
   console.log(req.headers);
   response.statusCode = 200;
   response.writeHead(200, {"Content-Type": "text/javascript"});
   fs.readFile('./app.js', null, function(error, data) {
      if (error) {
         response.writeHead(404);
         response.write('File not found!');
      } else {
         response.write(data);
      }
      response.end();
   })
 })

app.use(express.static(path.join(__dirname, '/public')));

app.use(express.static(__dirname + 'public'));
app.use(express.static('public'));

app.use((req, res, next) => {
   res.statusCode=200;

})
const server = http.createServer((req, response) => {
    console.log(req.headers);
    response.statusCode = 200;
    response.setHeader('Content-Type','text/html');
    fs.readFile('./dashboard.html', null, function(error, data) {
        if (error) {
           response.writeHead(404);
           response.write('File not found!');
        } else {
           response.write(data);
        }
        response.end();
     });
})

const server = http.createServer(app);

app.listen(3000);