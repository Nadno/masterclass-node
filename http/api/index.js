const http = require('http');
const path = require('path');
const URL = require('url');
const fs = require('fs');

const data = require('./urls.json');

function writeFile(cb) {
  fs.writeFile(
    path.join(__dirname, 'urls.json'),
    JSON.stringify(data, null, 2),
    (err) => {
      if (err) throw err;

      cb(JSON.stringify({ message: 'Item deleted' }));
    }
  );
}

http
  .createServer((req, res) => {
    const { name, url, del } = URL.parse(req.url, true).query;

    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
    });

    if (!name || !url) {
      return res.end(JSON.stringify(data));
    }

    if (del) {
      const formatURL = (url) => String(url).trim();
      data.urls = data.urls.filter(
        (item) => formatURL(item.url) !== formatURL(url)
      );
      return writeFile((message) => res.end(message));
    }

    data.urls.push({ name, url });

    return writeFile((message) => res.end(message));
  })
  .listen(3000, () => console.log('API is running'));
