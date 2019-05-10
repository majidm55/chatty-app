const express = require('express');
const SocketServer = require('ws').Server;
const UUID = require('uuid');
const WebSocket = require ('ws');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.




wss.on('connection', (ws) => {
  console.log('Client connected');

  wss.clients.forEach(function each(client) {
    client.send(wss.clients.size);
  });

  // Broadcast Function to send data to all clients
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(JSON.stringify(data));
  });
};

    ws.on('message', (newText) => {
    let parsedMsg = JSON.parse(newText)
    parsedMsg.id = UUID();
    

    switch (parsedMsg.type) {
      case 'postMessage':
        parsedMsg.type = 'incomingMessage';
        console.log(parsedMsg);

        break;
      case 'postNotification':
        parsedMsg.type = 'incomingNotification';
        console.log(parsedMsg);
        break;

    }
    wss.broadcast(parsedMsg);
    
  
    });
  ws.on('close', () => console.log('Client disconnected'));

  })

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.

  wss.clients.forEach(function each(client) {
    client.send(wss.clients.size);
  });
