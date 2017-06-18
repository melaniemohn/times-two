
console.log('inside the content script')


// helper / utility functions
// getLetter and/or putLetter???
// use these to communicate with background script??


// define separate functions for myHighlight and otherHighlight?
function highlight(event) { // to change color of own active square
	console.log('event: ', event);
		$('.flex-cell').not('.black').css('background-color', 'white');
		$('.highlighted').css('background-color', '#a7d8ff');
		$('.active').css('background-color', '#3abfff');
		console.log('cell index: ', $('.active').index('.flex-cell'));
}

// for otherHighlight, also need to get that info with a timeout...?
// use .each here?
function otherHighlight(){ /*...*/ }

$(document).ready(function() {

	// here, capture the actual data and send it to background in a message
	// get the cell ID, plus the actual letter that was guessed
	// to get index, use .parent(), which only traverses up one level (as opposed to parents())
	$('.guess').on('DOMSubtreeModified', function() {
		console.log('guess', $(this).html());
		console.log('index', $(this).parent().index('.flex-cell'));
	});

	// might be cleaner to exclude black cells here, but otoh, it's lovely to be able to use the square grid for dimensions / count
	$('.flex-cell').each(function(square) {
		console.log('each square', square);
		// maybe assign IDs in here??
	});


	// I hate this setTimeout, because it's clunky
	// but I hate on 'click' because it doesn't actually track the active cell as it changes
		// (in response to an arrow key, say, but also WHEN SOMEONE IS TYPING)
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


	$('.highlighted').each(function(square) {
		console.log('each highlight', square);
	});

});


// use message passing to communicate DOM change with background.js
	// chrome.runtime.sendMessage( /* ... */ )
			// 	chrome.extension.sendMessage({greeting: 'hello'}, function(response) {
			// 	  console.log(response.farewell);
			// 	});


// receive messages from background using onMessage
	// chrome.runtime.onMessage.addListener( /* ... */ )



