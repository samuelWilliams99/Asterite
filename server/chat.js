function sendMessage(socket, payload) {
    socket.broadcast.emit('sendMessage', payload);
}

module.exports = {
    sendMessage
};
