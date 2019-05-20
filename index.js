const http = require('http');

const PORT = process.env.PORT || 5000
const resBody = {
  message: 'Hello World'
};

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(resBody));
}).listen(PORT, () => console.log(`Listening on ${ PORT }`));
