
function joinGame(e){
    e.preventDefault();
    var name = document.getElementById('userName').value;
    console.log(name);
    socket.emit('playerJoin', name);
}