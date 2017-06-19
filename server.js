const path = require('path');
const express = require('express');
const app = express();
const socketio = require('socket.io');

// note: the app returned by express() is a JS function, not something we can pass to our sockets
// app.listen() returns an http.Server object
const server = app.listen(8080, function () {
    console.log('The server is listening on port 8080!');
});


var io = socketio(server);
// creates a new connection server for web sockets and integrates it into our HTTP server
// below app.listen so that app takes precedence over socket server for typical HTTP requests
	// although is this a concern I even have here idk

// use socket server as an event emitter in order to listen for new connctions
// what's the difference between 'connection' and 'connect' (see demo??)
io.on('connection', function(socket) {

  // receives the newly connected socket, called for each browser that connects to our server
  console.log('A new client has connected with socket id: ', socket.id);

  // this event runs anytime a socket disconnects
  socket.on('disconnect', function() {
    console.log('socket id ' + socket.id + ' has disconnected.');
  });

  // here, server receives data from the background script
  // then, broadcasts that data to all other connected clients

  socket.on('myLetter', function(guess) {
    console.log('Catching the guess event...', guess);
    socket.broadcast.emit('otherLetter', guess);
  });

  socket.on('myHighlight', function(highlight) {
    console.log('Catching the highlight event...', highlight);
    socket.broadcast.emit('otherHighlight', highlight); // BROADCAST THO
  });

});


// OKAY COOOL CREATE ROOMS HERE: see commented-out section of www workshop


app.use(express.static(path.join(__dirname, 'scripts')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'background.html'));
});
