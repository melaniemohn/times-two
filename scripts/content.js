// content script is the JS we inject into the page, and it can actually touch the DOM

// use jQuery to track changes in the DOM
// use a utility function from jQuery (index!!) to figure out WHICH of the huge # of squares is updating

// use message passing to communicate with background.js
	// chrome.runtime.sendMessage(...)
	// do this whenever a letter changes



// receive messages from background using onMessage
	// chrome.runtime.onMessage.addListener(...)



// utility functions?
// function id(name) { return document.getElementById(name)}
// function exists(val) { return (val == null || val == undefined || val == "") ? false : true }


function init() {
	console.log('content script initialized')


	// this is basically its last thing to call?
	chrome.extension.sendMessage({greeting: 'hello'}, function(response) {
	  console.log(response.farewell);
	});

}

// where does the the original typing get emitted from?
// in www, it was a draw event emitted in whiteboard.js
// so we did whiteboard.on('draw')...

