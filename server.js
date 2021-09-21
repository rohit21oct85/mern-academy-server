const app = require('./app.js');
const http = require('http');
const server = http.createServer(app);
const host = '0.0.0.0';
const port = process.env.PORT || 8080;


server.listen(port,host)
server.on('listening', () => {
      console.info(`server running on  ${host}:${port}`);
})