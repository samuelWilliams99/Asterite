/**
 * Broachasts a message to clients (not sender)
 * @param {object} socket connection socket
 * @param {object} payload {from, message, color}
 */

var messages = [];

function sendMessage(socket, payload) {
    // socket.broadcast.emit('sendMessage', payload);
    console.log(2);
    messages.push(payload);
    // var n = messages.slice(Math.max(0, messages.length-5), messages.length);
    io.emit('chatUpdate', messages);
    
}

module.exports = {
    sendMessage
};