
function joinGame(e){
    e.preventDefault();
    var name = document.getElementById('userName').value;
    $('#player-name-dialog').addClass('hidden');
    console.log(name);
    socket.emit('playerJoin', name);
}

function toggleLeaderBoard(){
    if($('#leaderboard').hasClass('hidden')){
        $('#leaderboard').removeClass('hidden');
        document.getElementById("toggle-leaderboard").innerHTML = ">";
    }else{
        $('#leaderboard').addClass('hidden');
        document.getElementById("toggle-leaderboard").innerHTML = "<";
    }
}