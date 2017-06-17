

// this onClicked won't fire if there's also a popup
// for now, comment out the popup in the manifest, just to get things wired up
// eventually, move this logic to the popup.js script...??
chrome.pageAction.onClicked.addListener(function(tab) {
  console.log('got in here at least');
  chrome.tabs.executeScript(null, {file: "content.js"});
  console.log('content script loaded!');

});


// MPM general approach
// basically, this works like browser > app.js in www workshop
// check whether the tab has updated
    // pass info from content to background VIA A MESSAGE
// intercept the updated info and then emit it to other user(s)


// MESSAGES MAYBE IDK IDK
// in the past, in socket.on, we've used document.getElementById
// put this logic in the content script? and then send message?


chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    // ...
  }
)



// SOCKETS
// wrap all of this in an onMessage that's started above
// this socket object will send messages to our server
// two events: first person adding letter, and other person adding

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

