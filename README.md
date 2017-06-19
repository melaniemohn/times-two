# Times Two
A two-player version of the New York Times crossword!
Originally designed for the "stackathon" event at Grace Hopper Academy.

At a basic level, this is a Chrome extension that connects to a Node server.
It uses Express and socket.io, with a healthy dose of jQuery on the front end.


## notes on Chrome extensions
The content script is the JS that gets injected into the page, and it can actually touch the DOM.  Here, the content script listens for changes in the DOM using jQuery. The content script uses "message passing" to send any changes to the background script, which in turn emits the event to the server on the back end. WebSockets let the server then broadcast that event to the other users.


## notes on events
At the moment, for adding / changing / removing letters, instead of listening for a keydown event, I'm just using DOMSubtreeModified.

I'm tracking the highlight by listening for a 'click' event on the cells, which (unfortunately) doesn't actually capture the wider range of ways that the highlighted cells (and the single active cell within them) can change, including clicking the clue number, using arrow keys, and straight-up inserting letters. Instead of using a click event, I'd like to switch to using Mutation Observers, which are new to me but at least *seem* entirely suited to this task.

I also need to find a way to abandon the totally duct-taped setTimeout that produces the array of highlighted cells in the content script. Once the mutation stuff above is wired up, maybe.


## notes for eventually
I haven't tried this with rebus entries, but if they break things, it'll just be a question of adjusting to account for any differences in their inner HTML.

I also haven't tested this with more than two users, but I have a hunch I'll want to limit the number of clients in any given room to two or three at most.

Ideally, the popup would let users actually start or join a room.

Long-term, I need to redeploy this, update the URL accordingly, and then pack the extension to load it in the Chrome store. Cross your fingers.
