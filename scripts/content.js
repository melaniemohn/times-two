
// and for highlight, listen for click OR an arrow key???

console.log('inside the content script')


// to change color of own active square

var guessIndex = $('.guess').index()
var active = $('.active').index('.flex-cell');

var highlights = $('.highlight').each(function(square){
	console.log('each square', square)
})

// helper / utility functions
// getLetter and/or putLetter???
// use these to communicate with background script??


function highlight(event){
	console.log('event: ', event)
		$('.flex-cell').not('.black').css('background-color', 'white')
		$('.highlighted').css('background-color', '#a7d8ff')
		$('.active').css('background-color', '#3abfff')
		console.log('cell index: ', $('.active').index('.flex-cell'))
}


// write an event emitter that uses jQuery to track changes in the DOM
// use a utility function from jQuery (index!!) to figure out WHICH of the huge # of squares is updating
$(document).ready(function() {
	console.log('ready or not (no, ready)')

	// okay, changing the color of flex-cell works, inside OR outside .ready
	// $('.flex-cell').css('background-color', '#3abfff')


	// okay, before doing this, figure out when a cell becomes active
	// $('.active').css('background-color', '#3abfff')
	// could maybe just connect this to a click event??
	// but, gonna have to solve the problem for other highlight, anyway
	$('.active').trigger('makeActive');

	// okay, this works for letters
	$('.guess').on('DOMSubtreeModified',function(){
		console.log('DOM modified!')
		// here, need to capture the actual data and send it to background in a message
		// use $(this) to determine which element triggers event?
		// use .html()?
	});

	$('.flex-cell').each(function(square) {
		console.log('each square', square);
	});


	// $('.active').index('.flex-cell');


	$('.flex-cell').not('.black').on('click', function(event){
		setTimeout(highlight, 5, event)
	});


	// console.log('event: ', event)
	// 	$('.flex-cell').not('.black').css('background-color', 'white')
	// 	$('.highlighted').css('background-color', '#a7d8ff')
	// 	$(this).css('background-color', '#3abfff')
	// 	console.log('cell index: ', $(this).index('.flex-cell'))

	$('.flex-cell').triggerHandler('click');


	// $('div').each(function () {
	//     var color = $(this).css("color");
	//     if (color == "#FFDA00") {
	//         $(this).css("color", '#a7d8ff');
	//     }
	// });


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



