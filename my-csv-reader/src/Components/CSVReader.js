const WebSocket = require('ws');
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

const server = new WebSocket.Server({ port: 3001 });
const port = new SerialPort('/dev/ttyUSB0', { baudRate: 9600 }); // Adjust the port based on your Arduino configuration
const parser = port.pipe(new Readline({ delimiter: '\n' }));

server.on('connection', (socket) => {
  console.log('Client connected');

  // Arduino sends data to the server via serial port
  parser.on('data', (data) => {
    // Broadcast data to all connected clients
    server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });

  // Handle disconnections
  socket.on('close', () => {
    console.log('Client disconnected');
  });
});
