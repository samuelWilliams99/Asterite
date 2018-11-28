
var pendingName = null;

username = null;


// Calls the function to update the leaderboard when the event is recieved
socket.on('leaderboardUpdate', function(scores) {
    updateLeaderboard(scores);
});

// If there is an error on the plyer joining then the user is alerted as to what they did wrong
// A placeholder is set so that when the user clicks in the box to type it disappears and any existing text is also cleared
socket.on('joinError', function(errorMessage) {
    $('#userName').addClass('has-error');
    $('#userName').attr('placeholder', errorMessage);
    $('#userName').val('');
});


// If the player successfully joins the game then they are assigned their username
// The dialogs are hidden as appropriate
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


// When a player successfully joins the game the game needs to know so a message is emitted
// The name of the player is taken from the input box
function joinGame(e) {
    e.preventDefault();
    var name = document.getElementById('userName').value;
    pendingName = name;
    socket.emit('playerJoin', name);
    $('#play-scored').addClass("play-hidden");
}


// This function does some magic 
// It takes the id of the box that needs hidden
// Having got the unique id it then hides or shows the appropriate box depending on whether the box is currently hidden or shown
function togglePane(e) {
    var id = '#' + e.currentTarget.id;
    var targetViewId = '#' + $(id).data('target-view');
    if ($(targetViewId).hasClass('hidden')) {
        $(targetViewId).removeClass('hidden');
    } else {
        $(targetViewId).addClass('hidden');
    }
}


// This funciton takes the scores and updates the leaderboard
// The scores variable is an object containing player name, player color and score
function updateLeaderboard(scores) {
    var tableString = '';

    // Goes through as many scores as in the array
    for (var i = 0; i < scores.length; i++) {
        // Top 3 players given gold, silver & bronze
        if (i == 0) {
            myColor = '#e09e1a';
        } else if (i == 1) {
            myColor = '#719eb7';
        } else if (i == 2) {
            myColor = '#ad6114';
        } else {
            myColor = 'white';
        }

        // Add new row to 3 ccolumn table and get the names as appropriate
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

    // Actually apply the update by changing the HTML
    document.getElementById('leaderboard__table').innerHTML = tableString;
}


// When the player is killed this displays it in the killfeed
// If the player killed themselves then it has a special message otherwise it displays as a killfeed would usually in a game
// killObj is an object that contains the killer, the colour of the killer, the name of the victim, the vitims name and the weapon used to kill the victim
socket.on('playerKilled', function updateKillfeed(killObj){
    if(killObj.killer.name == killObj.killed.name){
        document.getElementById("killfeed__text").innerHTML = "<span id=\"killed__span\"></span> crashed into an <span id=\"weapon__span\">asteroid</span>";
    }else{
        document.getElementById("killfeed__text").innerHTML = "<span id=\"killer__span\"></span> -> <span id=\"killed__span\"></span> with <span id=\"weapon__span\"></span>";
        document.getElementById("killer__span").innerHTML = killObj.killer.name;
        document.getElementById("weapon__span").innerHTML = killObj.weapon;
        document.getElementById("killer__span").style.color = killObj.killer.color;
    }
    document.getElementById("killed__span").innerHTML = killObj.killed.name;
    document.getElementById("killed__span").style.color = killObj.killed.color;
});


// When someone puts a message in chat this function is called
// Updates the chat with both text and colour
// m is an object containing player name, player colour and the message that they typed
socket.on('chatUpdate', function(m){
    message = "";
    for(var i = 0; i < m.length; i++){
        var userColor = m[i].color;
        var name = m[i].name;
        message = message +"<p class=\"chat__style\"><span style=color:"+userColor+";>" + name + ":</span> " + m[i].message + "</p>";
    }
    
    document.getElementById('output-chat__text').innerHTML = message;
});


// When the player presses the button to send the chat this gets the value and clears the input box
// A message is emitted which will get another function to update the chat for all players
function submitChat(e){
    e.preventDefault();
    m = document.getElementById('input-chat__text').value; 
    document.getElementById('input-chat__text').value = "";
    socket.emit('sendMessage', m);
}

// Opens the initial dialog when called
// This is for after a player has died and displays their score
// Their name is filled in so they can simply click the button to jump straight back in
function openStartDialog(score, name){
    $('#player-name-dialog').removeClass('hidden');
    document.getElementById("userName").value = name;
    document.getElementById("play-scored").innerHTML = "You scored "+ score;
    document.getElementById("play-again").innerHTML = "Do you want to play again?";

    $('#play-scored').removeClass("play-hidden");

}

