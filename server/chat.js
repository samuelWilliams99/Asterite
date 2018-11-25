/**
 * Broachasts a message to clients (not sender)
 * @param {object} socket connection socket
 * @param {object} payload {from, message, color}
 */

var messages = [];

function sendMessage(socket, payload) {
    // socket.broadcast.emit('sendMessage', payload);
    if(socket.name == null){
        var data = {name:"Guest", color:"orange", message:payload }
    }else{
        var data = {name:socket.name, color:players[socket.name].color, message:payload }
    }
    messages.push(data);
    var n = messages.slice(Math.max(0, messages.length-5), messages.length);
    io.emit('chatUpdate', n);
    
}

module.exports = {
    sendMessage
};
