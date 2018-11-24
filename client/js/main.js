
function joinGame(e){
    e.preventDefault();
    var name = document.getElementById('userName').value;
    $('#player-name-dialog').addClass('hidden');
    console.log(name);
    socket.emit('playerJoin', name);
}