// content script is the JS we inject into the page
// this is the thing that can actually touch the DOM

// use message passing to communicate with background.js??
// receive messages from background using onMessage

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

