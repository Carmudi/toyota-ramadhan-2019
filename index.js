const http = require('http'),
      url = require('url');
const client = require('redis').createClient(process.env.REDIS_URL);
const {promisify} = require('util');
const incrAsync = promisify(client.incr).bind(client);
const PORT = process.env.PORT || 5000

async function incr(key) {
  return await incrAsync(key);
}

http.createServer(async function (req, res) {
  let query = url.parse(req.url, true).query;
  let key = (query && query.id) ? query.id : 'carmudi';
  let count = await incr(key);

  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify({
    count: count
  }));
}).listen(PORT, () => console.log(`Listening on ${ PORT }`));
