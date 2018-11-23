const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

app.get('/', function(req, res){
	res.sendFile(__dirname + '/client/index.html');
});

http.listen(PORT, function(){
  	console.log('listening on *:'+PORT);
});