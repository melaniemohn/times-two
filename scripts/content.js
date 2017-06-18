
console.log('inside the content script')


// helper / utility functions
// getLetter and/or putLetter??? plus myHighlight and getHighlight?
// use these to communicate with background script??


// what's the order of operations here? should the port connection open before the DOM loads? wrap one in the other?
// make a persistent, two-way connection with the background script
var port = chrome.runtime.connect({ name: 'puzzport' });

// then listen for messages using port.onMessage.addListener()
port.onMessage.addListener(function(message, sender) { // what's the sender param doing?
  if (message.greeting === 'hello'){
    console.log('opened the connection! message: ', message.greeting);
  }
  else if (message.otherLetter) {
  	console.log('other guess from background: ', message.otherLetter);
  	otherGuess(message.otherLetter);
  }
});


function otherGuess(guessArray){
	// we're passing in an array with index of flex-cell, plus letter
	// get the cell by its index, then update inner html
	console.log('got guess from other player: ', guessArray);
	let index = guessArray[0];
	let letter = guessArray[1];
	$('.flex-cell').eq(index).children('.other-guess').html(letter);

}

// define separate functions for myHighlight and otherHighlight?
function highlight(event) { // to change color of own active square
	console.log('event: ', event);

		// handling the color changing on own screen
		$('.flex-cell').not('.black').css('background-color', 'white');
		$('.highlighted').css('background-color', '#a7d8ff');
		$('.active').css('background-color', '#3abfff');

		// get index of active cell
		let activeIndex = $('.active').index('.flex-cell');
		console.log('active cell index: ', activeIndex);

		// get array with index of each highlighted cell
		let highlighted = [];
		$('.highlighted').map(function() {
			highlighted.push($(this).index('.flex-cell'));
		});
		console.log('highlighted array', highlighted);

		// now, send this info to the background script!
		// port.postMessage({ highlight: highlighted });
		// return highlighted;
}


// for otherHighlight, also need to get that info with a timeout...?
// use .each here?
function otherHighlight(){ /*...*/ }

function makeOtherGuessDiv(){
	// here's the HTML from guess... pull off font-size and line-height, change font color??
	// since font-size and line-height will always match, just need to pull that off once
	// then return a div with class other-guess, same font-size and line-height
	// and add new font-color (right name?)
	// <div class="guess" style="font-size: 74.7778px; line-height: 74.7778px;"></div>
 	// we want size of other guess to be same as (or at least relative to) size of own guess
 	// maybe play with this size (or alignment??) to get shadow effect???
	let size = $('.guess').css('font-size');
	console.log(size); // for some reason, even on puzzles of different sizes, this is consistently returning something 3px too big
	// not sure how this gets resized from 77 to 74 in the browser, but I'll take it
	// instead of appending all the goofy css shit to other-guess, put it in a separate css file
	let div = '<div class="other-guess" style="font-size: ' + size + '; line-height: ' + size + '; color: red; position: absolute; bottom: 0"></div>';
	return div;
}


    // position: absolute;
    // bottom: 0

// just do $(function() { /*...*/ }); as shorthand?
$(document).ready(function() {

	// here, create an additional div that's a sibling of guess
	// this way, we can store the guess info from other player without firing our guess.on below
	// how to figure out text size??
	// don't clone .guess, because the whole point is we don't want that event handler on this
	// instead, pull that off of .guess and save it as a variable?
	// maybe even pass in a function to .append?

	$('.flex-cell').append(makeOtherGuessDiv());

// <div class="guess" style="font-size: 74.7778px; line-height: 74.7778px;"></div>

	// here, capture the actual data and send it to background in a message
	// get the cell ID, plus the actual letter that was guessed
	// to get index, use .parent(), which only traverses up one level (as opposed to parents())
	$('.guess').on('DOMSubtreeModified', function() {
		// console.log('guess', $(this).html());
		// console.log('index', $(this).parent().index('.flex-cell'));
		// then post message to bg script here
		let guess = $(this).html();
		let index = $(this).parent().index('.flex-cell');
		port.postMessage({ guess: [index, guess] });
	});

	// might be cleaner to exclude black cells here, but otoh, it's lovely to be able to use the square grid for dimensions / count
	// $('.flex-cell').each(function(square) {
	// 	console.log('each square', square);
	// 	// maybe assign IDs in here??
	// });


	// I hate this setTimeout, because it's clunky
	// but I REALLY hate using 'click' because it doesn't actually track the active cell as it changes
		// (like, in response to an arrow key, say, but also WHEN SOMEONE IS TYPING AHHHH)
	$('.flex-cell').on('click', function(event) {
		setTimeout(highlight, 5, event);
	});

	$('.flex-cell').triggerHandler('click');


	// okay, the keypress business here is just NOT working
	// $('.flex-cell').on('keypress', function(event) {
	// 	setTimeout(highlight, 5, event);
	// });
	// if this works, abstract these trigger handlers into a more general event??
	// $('.flex-cell').triggerHandler('keypress');

});

