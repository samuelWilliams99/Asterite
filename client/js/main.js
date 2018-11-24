
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

function updateLeaderboard(){
    document.getElementById("toggle-leaderboard").innerHTML = ">";
    tableString += "";
    for(var i = 0; i < 10; i++){
        tableString += "<tr>";
        tableString += "<td>{$i}</td>";
        tableString += "<td>player</td>";
        tableString += "<td>score</td>";
        tableString += "</tr>";
    }

    document.getElementById("leaderboard__table").innerHTML = tableString;						
}