'use strict';

// HARD CODED PORT! DO NOT CHANGE
const PORT = 4444;

// `io` is your server instantiated with the port
const io = require('socket.io')(PORT);

// When sockets connect to your server
io.on('connection', socket => {
  
  // A proof of life statement that console logs to your server terminal the socket id
  console.log(`${socket.id} connected`);
  
  //A welcome message for whoever joins
  const welcome = `Hello there ${socket.id} from template server. This is a number guessing game. Guess a number between 0-9`;
  socket.emit('output', welcome);
  
  /*
  The client will only emit an event('input', line), where line is what the client typed in. The client emits NO OTHER EVENTS
  This is your app logic in this below function. Currently, this game is just a guessing game. Guess between a number between 1-10 You can build hangman with the client clear function to repaint the hung man and the letters. You can do a number guessing game. This is your job.
  */
  socket.on('input', line => {
    console.log('A line we can work with:', line);
    const num = Math.floor(Math.random()*10);
    console.log(num)
    if(num == line){
      socket.emit('output', 'YOU GUESSED MY NUMBER');
    }
    else{
      socket.emit('output', 'You did not guess my number');
    }
  });

  //Here, upon client disconnect, your server will log which socket disconnected.
  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnected`);
  });
});
