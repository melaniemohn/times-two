# times-two
for stackathon

# on Chrome extensions, generally
content script is the JS we inject into the page, and it can actually touch the DOM.  The content script listens for changes in the DOM using jQuery.

for adding / changing / removing letters, instead of listening for a keydown event, I'm just using DOMSubtreeModified

then, the content script uses message passing to send this change to the background script, which emits a message to the back-end


# putting some styling notes in here
because whatever

user's own text will be black with blue highlights (so, the default)
but, change the color of their active cell from yellow to... brighter blue?
	nb: this also involves changing the color of the text highlight. I haven't done this, which is why some letters will have a weird halo effect

then, change other user's input to dark purple font
and change their highlighted cells to lavender
don't worry about tracking their active cell


colors (for my own reference)
    NYT current
    - yellow active background: FFDA00
    - light blue highlight background: A7D8FF

	brighter blues
	- 3abfff

	dark purples (other user's input)
	- 600191
	- 673ab7 (not bright enough)
	- 9c27b0 (better)

	lavender (other user's highlight)
	[eventually]
	- e1dbec

