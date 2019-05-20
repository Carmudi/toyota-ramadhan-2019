const http = require('http');
const client = require('redis').createClient(process.env.REDIS_URL);
const {promisify} = require('util');
const incrAsync = promisify(client.incr).bind(client);
const PORT = process.env.PORT || 5000

async function incrFoo(key) {
  return await incrAsync(key);
}

http.createServer(async function (req, res) {
  let key = (req.query && req.query.id) ? req.query.id : 'foo';
  let count = await incrFoo(key);

  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify({
    count: count
  }));
}).listen(PORT, () => console.log(`Listening on ${ PORT }`));
