const fs = require('fs')
const http = require('http')

const PORT = 5000

http
  .createServer((req, res) => {
    switch (req.url) {
      case '/bundle.js':
        res.writeHeader(200, { 'Content-Type': 'text/javascript' })
        fs.createReadStream('./build/bundle.js').pipe(res)
        break
      case '/index.css':
        res.writeHeader(200, { 'Content-Type': 'text/css' })
        fs.createReadStream('./build/index.css').pipe(res)
        break
      case '/':
      case '/index.html':
        res.writeHeader(200, { 'Content-Type': 'text/html' })
        fs.createReadStream('./build/index.html').pipe(res)
        break
      default:
        res.writeHeader(404)
        res.end()
    }
  })
  .listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`) // eslint-disable-line no-console
  })
