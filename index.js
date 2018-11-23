const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 5000;

app.get('/', function(req, res){
	res.sendFile(__dirname + '/client/index.html');
});

http.listen(PORT, function(){
  	console.log('listening on *:'+PORT);
});