// content script is the JS we inject into the page, and it can actually touch the DOM

// for letters, listen for a keydown event?
// and for highlight, listen for click OR an arrow key???

// first argument, tabID, is optional; defaults to the active tab of the current window
chrome.tabs.executeScript(null, {file: "content.js"});
console.log('content script loaded from... content script lol no');

// okay, but for guess and square these aren't IDs....
var guess = document.getElementById("guess");
var square = document.getElementById("flex-cell");
var highlight = document.getElementsByClassName("flex-cell.highlighted");
var activeSquare = document.getElementsByClassName("flex-cell.highlighted.active"); // or just flex-cell.active ????
// getElementsByClassName RETURNS AN ARRAY OF ELEMENTS
// loop over squares and add listeners to them idk
// NO JUST USE JQUERY lol

// oh lol but we're using jQuery so it's like
// $(".class-name").html(" ");
	// so to change color... $(".highlighted")???
// $('.flex-cell').keyup(function(event){
//  // play with event
//  // use $(this) to determine which element triggers this event
// });
var guessIndex = $(".guess").index()
var active = $(".active").index(".flex-cell");
var highlights = $(".highlight").each(function(square){
	console.log(square)
})


// helper / utility functions
// use these to communicate with background script??


// write an event emitter that uses jQuery to track changes in the DOM
// use a utility function from jQuery (index!!) to figure out WHICH of the huge # of squares is updating
$(document).ready(function() { /* . . . */ }

	// listen for changes in DOM using jQuery
	// use message passing to communicate this change with background.js
	chrome.runtime.sendMessage( /* ... */ )


	// receive messages from background using onMessage
	chrome.runtime.onMessage.addListener( /* ... */ )



// utility functions?
// function id(name) { return document.getElementById(name)}
// function exists(val) { return (val == null || val == undefined || val == "") ? false : true }
// here, write getLetter and/or putLetter???

// function init() {
// 	console.log('content script initialized')

// 	// this is basically its last thing to call?
// 	chrome.extension.sendMessage({greeting: 'hello'}, function(response) {
// 	  console.log(response.farewell);
// 	});

// }

// where does the the original typing get emitted from?
// in www, it was a draw event emitted in whiteboard.js
// so we did whiteboard.on('draw')...

