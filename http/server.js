const http = require('http');
const path = require('path');
const fs = require('fs');

http
  .createServer((req, res) => {
    const file = req.url === '/'
      ? 'index.html'
      : req.url;
    const filePath = path.join(__dirname, 'public', file);
    const extName = path.extname(filePath);

    const allowedFileType = ['.html', '.css', '.js'];
    const allowed = allowedFileType.find(item => item === extName);

    if (!allowed) return;

    fs.readFile(
      filePath,
      (err, content) => {
        if (err) throw err;
        return res.end(content);
      }
    );

    return;
  })
  .listen(5000, () => console.log('Server is running'));
