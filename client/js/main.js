
var pendingName = null;

username = null;
socket.on('leaderboardUpdate', function(scores) {
    updateLeaderboard(scores);
});

socket.on('joinError', function(errorMessage) {
    $('#userName').addClass('has-error');
    $('#userName').attr('placeholder', errorMessage);
    $('#userName').val('');
});

socket.on('joinSuccess', function() {
    username = pendingName;
    $('#player-name-dialog, #join-error').addClass('hidden');
});

$(function() {
    $("html").on("contextmenu",function(e){ return false; });
    // updateLeaderboard([
    //     { name: 'Tim', color: 'red', score: '5000' },
    //     { name: 'Inigo', color: 'blue', score: '500' },
    //     { name: 'Sam', color: 'green', score: '50' },
    //     { name: 'Joshua', color: 'pink', score: '5' }
    // ]);
    // updateKillfeed({
    //     killer: { name: 'Tim', color: 'red' },
    //     killed: { name: 'Joshua', color: 'pink' },
    //     weapon: 'Skittles'
    // });
});

function joinGame(e) {
    e.preventDefault();
    var name = document.getElementById('userName').value;
    pendingName = name;
    socket.emit('playerJoin', name);
    $('#play-scored').addClass("play-hidden");
}

function togglePane(e) {
    var id = '#' + e.currentTarget.id;
    var targetViewId = '#' + $(id).data('target-view');
    if ($(targetViewId).hasClass('hidden')) {
        $(targetViewId).removeClass('hidden');
    } else {
        $(targetViewId).addClass('hidden');
    }
}

function updateLeaderboard(scores) {
    var tableString = '';
    for (var i = 0; i < scores.length; i++) {
        if (i == 0) {
            myColor = '#e09e1a';
        } else if (i == 1) {
            myColor = '#719eb7';
        } else if (i == 2) {
            myColor = '#ad6114';
        } else {
            myColor = 'white';
        }
        tableString += '<tr>';
        tableString +=
            '<td class="pos" style="color:' +
            myColor +
            '">' +
            (i + 1) +
            '.' +
            '</td>';
        tableString +=
            '<td class="name" style="color:' +
            scores[i].color +
            '">' +
            scores[i].name +
            '</td>';
        tableString +=
            '<td class="score" style="color:' +
            myColor +
            '">' +
            scores[i].score +
            '</td>';
        tableString += '</tr>';
    }

    document.getElementById('leaderboard__table').innerHTML = tableString;
}

socket.on('playerKilled', function updateKillfeed(killObj){
    document.getElementById("killfeed__text").innerHTML = "<span id=\"killer__span\"></span> -> <span id=\"killed__span\"></span> with <span id=\"weapon__span\"></span>";
    document.getElementById("killer__span").innerHTML = killObj.killer.name;
    document.getElementById("killer__span").style.color = killObj.killer.color;
    document.getElementById("killed__span").innerHTML = killObj.killed.name;
    document.getElementById("killed__span").style.color = killObj.killed.color;
    document.getElementById("weapon__span").innerHTML = killObj.weapon;
});


socket.on('chatUpdate', function(m){
    message = "";
    

    for(var i = 0; i < m.length; i++){
        var userColor = m[i].color;
        var name = m[i].name;
        message = message +"<p class=\"chat__style\"><span style=color:"+userColor+";>" + name + ":</span> " + m[i].message + "</p>";
    }
    
    document.getElementById('output-chat__text').innerHTML = message;
});

function submitChat(e){
    e.preventDefault();
    m = document.getElementById('input-chat__text').value; 
    document.getElementById('input-chat__text').value = "";
    socket.emit('sendMessage', m);
}


function openStartDialog(score, name){
    $('#player-name-dialog').removeClass('hidden');
    document.getElementById("userName").value = name;
    document.getElementById("play-scored").innerHTML = "You scored "+ score;
    document.getElementById("play-again").innerHTML = "Do you want to play again?";

    $('#play-scored').removeClass("play-hidden");

}

