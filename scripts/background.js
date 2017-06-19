// console.log('window object:', window);


// SOCKETS
var socket = io('http://localhost:8080');
// contact the server to request a new socket connection
// when that socket connection is established, the browser's socket reference will emit a 'connect' event

// aside from initial connection, wrap all of this in an onMessage
// two events: first person adding letter, and other person adding

socket.on('connect', function() {
	console.log('A persistent, two-way connection to the server! yay!');
});


// MESSAGES
// intercept the updated game state from content script, via a message
// then, emit it to other user(s) through socket connection

chrome.runtime.onConnect.addListener(function(port) {
	port.postMessage({ greeting: 'hello' });

	port.onMessage.addListener(
		function(message, sender, response) { // note: // example used (request, sender, sendResponse) as params
			if (message.highlight) {
				console.log('my highlight from content script: ', message.highlight);
				socket.emit('myHighlight', message.highlight);
			}
			else if (message.guess) {
				console.log('my guess from content script: ', message.guess);
				socket.emit('myLetter', message.guess);
			}
		}
	);

	socket.on('otherLetter', function(guess){
		console.log('other guess, gettin it from the back', guess);
		port.postMessage({ otherLetter: guess });
	});

	socket.on('otherHighlight', function(highlight){
		console.log('other highlight, gettin it from the back', highlight);
		port.postMessage({ otherHighlight: highlight });
	});


});



