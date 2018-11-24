const express = require('express');
const app = express();
const http = require('http').Server(app);
global.io = require('socket.io')(http);

const PORT = process.env.PORT || 5000;

const server = require('./server/app.js');

server.serve();

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
    app.use(express.static(__dirname + '/client'));
});

http.listen(PORT, function() {
    console.log('listening on *:' + PORT);
});
