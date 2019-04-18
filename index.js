'use strict';

const PORT = 4444;

const { phrase } = require('faker').hacker;

const io = require('socket.io')(PORT);

io.on('connection', socket => {
  console.log(`${socket.id} connected`);

  socket.on('input', line => {
    console.log('A line we can work with:', line);
  });

  setInterval(() => {
    const payload = phrase();
    io.emit('output', payload);
  }, 1000);

  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnected`);
  });
});
