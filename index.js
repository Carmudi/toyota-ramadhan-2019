const http = require('http');
const client = require('redis').createClient(process.env.REDIS_URL);
const {promisify} = require('util');
const incrAsync = promisify(client.incr).bind(client);
const PORT = process.env.PORT || 5000

const resBody = {
  message: 'Hello World'
};

async function incrFoo() {
  return await incrAsync('foo');
}

http.createServer(async function (req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify({
    message: await incrFoo()
  }));
}).listen(PORT, () => console.log(`Listening on ${ PORT }`));
