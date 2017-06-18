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


//
// MESSAGES
// intercept the updated game state from content script, via a message
// then, emit it to other user(s) through socket connection

chrome.runtime.onConnect.addListener(function(port) {
  port.postMessage({ greeting: 'hello' });

  port.onMessage.addListener(
    function(message, sender, response) { // note: // example used (request, sender, sendResponse) as params
      if (message.highlight) {
        // console.log('got highlight: ', message.highlight);
        // now, emit this to the socket, which will broadcast it to other player?
        // socket.emit('myHighlight', message.highlight);
      }
      else if (message.guess) {
        console.log('got guess from content: ', message.guess);
        // socket.on('myLetter', function(guess) {
        //   socket.emit('otherLetter');
        //   console.log('lol I added a letter')
        // })
        socket.emit('myLetter', message.guess);
      }
    }
  );

  socket.on('otherLetter', function(guess){
    console.log('other guess, gettin it from the back', guess);
    port.postMessage({ otherLetter: guess });
  });


});


/*
// make .on associated with a function we define in content script?
socket.on('First person writing', function(letter) {
  socket.emit('First person wrote')
  console.log('I added a letter!');
});
*/

/*
socket.on('Other person wrote', function() {
  console.log('They added a letter!');
  // in here, (call a function to) send message to content script
  // instead of whiteboard.draw, I think we want window.addLetter or something?
      // or maybe chrome.pageAction??
});
*/

