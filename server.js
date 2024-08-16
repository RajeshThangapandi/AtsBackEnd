const http = require('http');
const getReq = require('./methods/get-request');
const postReq = require('./methods/post-request');
const putReq = require('./methods/put-request');
const deleteReq = require('./methods/delete-request');
let movies = require('./data/movies.json');

const PORT = 5001;
const allowedOrigin = 'https://rajeshthangapandi.github.io/AtsApp/'; // The correct origin

const server = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.writeHead(204); // No content
    res.end();
    return;
  }

  req.movies = movies;
  switch (req.method) {
    case 'GET':
      getReq(req, res);
      break;
    case 'POST':
      postReq(req, res);
      break;
    case 'PUT':
      putReq(req, res);
      break;
    case 'DELETE':
      deleteReq(req, res);
      break;
    default:
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify({ title: 'Not Found', message: 'Route not found' }));
      res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
