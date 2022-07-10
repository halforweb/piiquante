//* import http package of node
const http = require('http');

//* import the application
const app = require('./app');

//* import package for environment variables
if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
};

//* function to get a normalized port regardless if it's originally a number or a string
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
//* define the port that the server is listening
const port = normalizePort(process.env.PORT || '3000');
app.set('port', process.env.PORT);

//* function to handle error from the server
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

//* create the server using the createServer method of http
const server = http.createServer(app);

//* check server status when started and get message on the console 
server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

//* event listener set up
server.listen(process.env.PORT);
