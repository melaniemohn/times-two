
// content script will pass info VIA A MESSAGE
// intercept the updated info from message and then emit it to other user(s)
// for now, try to get some console.logs wired up in here?

chrome.runtime.onConnect.addListener(function(port) {
  port.postMessage({ greeting: 'hello' });

  port.onMessage.addListener(
  function(message, sender, response) {
    if (message.highlight) {
      console.log('got your highlight: ', message.highlight);
    }
    else if (message.guess) {
      console.log('got your guess: ', message.guess);
    }
  }
);

});

/*
// then listen for messages using port.onMessage.addListener()
// example used (request, sender, sendResponse) as params
// chrome.extension.onMessage.addListener(
//   function(request, sender, sendResponse) { // again, what's up with the params
port.onMessage.addListener(
  function(message, sender, response){
    // ... now, if message.highlighted? or...
    if (message.highlight) {
    console.log('got your highlight: ', message.highlight);
    }
  }
);
*/


// SOCKETS
// this socket object will send messages to server... wrap all of this in an onMessage?
// two events: first person adding letter, and other person adding

/*
console.log('window object:', window);

var socket = io('http://localhost:8080');
// contact the server to request a new socket connection
// when that socket connection is established, the browser's socket reference will emit a 'connect' event

socket.on('connect', function() {
  console.log('A persistent, two-way connection to the server! yay!');
  // socket.emit('First person writing', 'whatever');
});

// make .on associated with a function we define in content script?
socket.on('First person writing', function(letter) {
  socket.emit('First person wrote')
  console.log('I added a letter!');
});

socket.on('Other person wrote', function() {
  console.log('They added a letter!');
  // in here, (call a function to) send message to content script
  // instead of whiteboard.draw, I think we want window.addLetter or something?
      // or maybe chrome.pageAction??
});
*/
