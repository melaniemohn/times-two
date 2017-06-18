
// console.log('inside the content script')

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
	else if (message.otherHighlight) { // call a function to make otherHighlight
		console.log('other highlight from background: ', message.otherHighlight);
		traceHighlight(message.otherHighlight);
	}
});


function otherGuess(guessArray) {
	// passing in an array with index of flex-cell, plus letter
	// get the cell by its index, then update inner html
	console.log('got guess from other player: ', guessArray);
	let index = guessArray[0];
	let letter = guessArray[1];
	$('.flex-cell').eq(index).children('.other-guess').html(letter);
}


// what if, instead of changing cell color, we put a circle there?
// or outlined it and then removed outline?? play with css border?
// make a whole class of selected items... .trace
function traceHighlight(highlightArray) {
	console.log('tracing highlight: ', highlightArray);
	// what's the `this` context? need to bind? arrow func??
	// first, reset other cells
	// $('.flex-cell').css('border', '1px solid #696969'); // lololol
	$('.flex-cell').removeClass('other-trace');

	highlightArray.forEach(function(index) {
		// shoot gonna have to reset this to white when it changes
		// but need a way to do this without resetting
		console.log('touching cell with index: ', index);
		// $('.flex-cell').not('.black').css('background-color', 'white');
		// $('.flex-cell').eq(index).css('background-color', '#e1dbec');
		// $('.flex-cell').eq(index).css('border', '3px dotted');	// 4px dashed also looks really nice
		$('.flex-cell').eq(index).addClass('other-trace');
	});
}


// define separate functions for myHighlight and otherHighlight?
function highlight(event) { // to change color of own active square
	// console.log('event: ', event);

		// handling the color changing on own screen
		// need a way to reset to white without changing other person's
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
		port.postMessage({ highlight: highlighted });

}



function otherGuessDiv(){
	// since font-size and line-height will always match, just need to pull that off once
	// I want size of other guess to be same as (or at least relative to) size of own guess
	let size = $('.guess').css('font-size');
	// console.log(size); // even on puzzles of different sizes, this is consistently returning something 3px too big (making room for flags in each cell?), but whatever
	// instead of appending all the goofy css shit to other-guess, put it in a separate css file
	let div = '<div class="other-guess" style="font-size: ' + size + '; line-height: ' + size + '"></div>';
	return div;
}


// just do $(function() { /*...*/ }); as shorthand?
$(document).ready(function() {

	// here, create an additional div that's a sibling of guess
	// this way, we can store the guess info from other player without firing our guess.on below
	// how to figure out text size??
	// don't clone .guess, because the whole point is we don't want that event handler on this
	// instead, pull that off of .guess and save it as a variable?
	// maybe even pass in a function to .append?

	$('.flex-cell').append(otherGuessDiv());

	// here, capture the actual data: cell that changed, plus the actual letter that was guessed
	// get the cell using .parent(), which only traverses up one level (as opposed to parents())
	// then, post a message to the background script
	$('.guess').on('DOMSubtreeModified', function() {
		// console.log('guess', $(this).html());
		// console.log('index', $(this).parent().index('.flex-cell'));
		// then post message to bg script here
		let guess = $(this).html();
		let index = $(this).parent().index('.flex-cell');
		port.postMessage({ guess: [index, guess] });
	});


	// I hate this setTimeout because it's clunky
	// but I REALLY hate using 'click' because it doesn't actually track the active cell as it changes
		// (like, in response to an arrow key, say, but also WHEN SOMEONE IS TYPING AHHHH)
		// also, need a click handler on the clue that points to the respective flex-cell (by clue-number)
	$('.flex-cell').on('click', function(event) {
		setTimeout(highlight, 5, event);
	});

	$('.flex-cell').triggerHandler('click');




	// okay, the keypress business here is also just NOT working
	// $('.flex-cell').on('keypress', function(event) {
	// 	setTimeout(highlight, 5, event);
	// });
	// if this works, abstract these trigger handlers into a more general event??
	// $('.flex-cell').triggerHandler('keypress');


});

