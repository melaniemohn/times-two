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
	div.flex-cell.highlighted.active

then, change other user's input to dark purple font
and change their highlighted cells to lavender
don't worry about tracking their active cell


light blue (active highlight cell)
in their scss: .flex-cell.active background-color: #FFDA00
but .flex-cell.highlighted.active ???
    NYT current
    - active background: FFDA00
    - highlight background: A7D8FF

brighter blues
- 3abfff

dark purples (other user's input)
- 600191
- 673ab7 (not bright enough)
- 9c27b0 (better)

lavender (other user's highlight)
- e1dbec


add some styling using jQuery
font color="#9c27b0"
