/**
 * Broachasts a message to clients (not sender)
 * @param {object} socket connection socket
 * @param {object} payload {from, message, color}
 */
function sendMessage(socket, payload) {
    // socket.broadcast.emit('sendMessage', payload);
    io.emit('sendMessage', payload);
    console.log(">" + payload);
}

module.exports = {
    sendMessage
};
