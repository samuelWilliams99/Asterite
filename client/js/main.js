socket.on('leaderboardUpdate', function(scores){
    updateLeaderboard(scores);
});

$(function(){
    updateLeaderboard([{name: "Time", score: "50000"}, {name: "Joshua", score: "500"}]);
    updateKillfeed("Tim", "Joshua", "Skittles");
});

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
        document.getElementById("span__leaderboard").innerHTML = ">";
    }else{
        $('#leaderboard').addClass('hidden');
        document.getElementById("span__leaderboard").innerHTML = "<";
    }
}

function updateLeaderboard(scores){
    var tableString = "";
    for(var i = 0; i < scores.length; i++){
        tableString += "<tr>";
        tableString += "<td class=\"pos\">" + (i+1)+"." + "</td>";
        tableString += "<td class=\"name\">" + scores[i].name + "</td>";
        tableString += "<td class=\"score\">" + scores[i].score + "</td>";
        tableString += "</tr>";
    }

    document.getElementById("leaderboard__table").innerHTML = tableString;						
}

function updateKillfeed(killer, killed, weapon){
    document.getElementById("killer__span").innerHTML = killer;
    document.getElementById("killed__span").innerHTML = killed;
    document.getElementById("weapon__span").innerHTML = weapon;

}