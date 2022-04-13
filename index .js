require('dotenv').config();
const fs = require('fs');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const https = require('https');
const parser = require('body-parser');

const HTTPS_PORT = process.env.HTTPS_PORT || 4000;

const todosRouter = require('./router/todosRouter');


app.use(cookieParser());
app.use(parser.json());
app.use('/todos', todosRouter);

let server;
if (fs.existsSync('./key.pem') && fs.existsSync('./cert.pem')) {
  const privateKey = fs.readFileSync(__dirname + '/key.pem', 'utf8');
  const certificate = fs.readFileSync(__dirname + '/cert.pem', 'utf8');
  const credentials = { key: privateKey, cert: certificate };

  server = https.createServer(credentials, app);
  server.listen(HTTPS_PORT, () => console.log('https server runnning'));
} else {
  server = app.listen(HTTPS_PORT, () => console.log('http server runnning'));
}
module.exports = server;