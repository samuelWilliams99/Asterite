socket.on('leaderboardUpdate', function(scores){
    updateLeaderboard(scores);
});

$(function(){
    updateLeaderboard([{name: "Tim", score: "50000"}, {name: "Joshua", score: "500"}]);
    updateKillfeed({killer: "Tim", killed: "Joshua", weapon: "Skittles"});
});

function joinGame(e){
    e.preventDefault();
    var name = document.getElementById('userName').value;
    $('#player-name-dialog').addClass('hidden');
    console.log(name);
    socket.emit('playerJoin', name);
}

function togglePane(e){
    var id = "#" + e.currentTarget.id;
    var targetViewId = "#" + $(id).data("target-view");
    if($(targetViewId).hasClass('hidden')){
        $(targetViewId).removeClass('hidden');
    }else{
        $(targetViewId).addClass('hidden');
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

function updateKillfeed(killObj){
    document.getElementById("killfeed__text").innerHTML = "<span id=\"killer__span\"></span> -> <span id=\"killed__span\"></span> with <span id=\"weapon__span\"></span>";
    document.getElementById("killer__span").innerHTML = killObj.killer;
    document.getElementById("killed__span").innerHTML = killObj.killed;
    document.getElementById("weapon__span").innerHTML = killObj.weapon;

}