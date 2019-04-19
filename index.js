'use strict';

// HARD CODED PORT! DO NOT CHANGE
const PORT = 4444;

//We're taking the node module faker hacker property
const { phrase } = require('faker').hacker;

// `io` is your server instantiated with the port
const io = require('socket.io')(PORT);

// When sockets connect to your server
io.on('connection', socket => {
  
  // A proof of life statement that console logs to your server terminal the socket id
  console.log(`${socket.id} connected`);
  
  //A welcome message for whoever joins
  const welcome = `Hello there ${socket.id} from server`;
  socket.emit('output', welcome);
  
  /*
  The client will only emit an event('input', line), where line is what the client typed in. The client emits NO OTHER EVENTS
  This simple listener will merely console log the string below, along with the user input to the server terminal. It will then create a hacker phrase made from faker, and then emit the output event with the string below
  */
  socket.on('input', line => {
    console.log('A line we can work with:', line);

    const payload = phrase();
    socket.emit('output', `You said this: ${line}, but the server said this: ${payload}`)
  });

  //Here, upon client disconnect, your server will log which socket disconnected.
  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnected`);
  });
});
