// shoot I think we need to USE these scripts in a background html page?
// use fetch or XMLHttpRequest to send a request to local server

// check whether the tab has updated (VIA A MESSAGE??)
// intercept the updated info and then emit it to other user(s)
// basically, this serves the same purpose as browser > app.js in workshop

// MESSAGES MAYBE IDK IDK
// in the past, in socket.on, we've used document.getElementById
// we're gonna have to do something else, using messages
// chrome.rumtime.onMessage.addListener???

// chrome.extension.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     // ...
//   }
// )

// idk but not actually a click
// function click(event) {
// 	// ...
// }



// SOCKETS I GUESS AHHHH

// contact the server to request a new socket connection
// when that socket connection is established, the browser's socket reference will emit a 'connect' event
// window.location describes the URL of the current page?
// this socket object will send messages to our server

console.log('window? lol idk', window);
var socket = io(window.location.origin);

socket.on('connect', function() { //Handler
	console.log('A persistent, two-way connection to the server! yay!');
	socket.emit('Chelsea', {whatever: 'Ugh ugh ugh'}); // Emitter
});

// where does the the original typing get emitted from?
// in www, it was a draw event emitted in whiteboard.js
// so we did whiteboard.on('draw')...
