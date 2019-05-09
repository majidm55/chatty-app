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

    ws.on('message', (newText) => {
    let parsedMsg = JSON.parse(newText)
    parsedMsg.id = UUID;
    

    switch (parsedMsg.type) {
      case 'postMessage':
        parsedMsg.type = 'incomingMessage';
        break;
      case 'postNotification':
        parsedMsg.type = 'incomingNotification';
        break;
    }
    // console.log("User",parsedMsg.username,"said",parsedMsg.content,"type",parsedMsg.type);
    
    wss.clients.forEach(function  (client){
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(parsedMsg));
        console.log("data", parsedMsg);
      }
    });
  
  })

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));

  wss.clients.forEach(function each(client) {
    client.send(wss.clients.size);
  });
});