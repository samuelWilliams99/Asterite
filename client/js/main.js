socket.on('leaderboardUpdate', function(scores) {
    updateLeaderboard(scores);
});

socket.on('joinError', function(errorMessage) {
    $('#join-error').text(errorMessage);
    $('#join-error').removeClass('hidden');
});

socket.on('joinSuccess', function() {
    $('#player-name-dialog, #join-error').addClass('hidden');
});

$(function() {
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
    socket.emit('playerJoin', name);
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

function updateKillfeed(killObj) {
    document.getElementById('killfeed__text').innerHTML =
        '<span id="killer__span"></span> -> <span id="killed__span"></span> with <span id="weapon__span"></span>';
    document.getElementById('killer__span').innerHTML = killObj.killer.name;
    document.getElementById('killer__span').style.color = killObj.killer.color;
    document.getElementById('killed__span').innerHTML = killObj.killed.name;
    document.getElementById('killed__span').style.color = killObj.killed.color;
    document.getElementById('weapon__span').innerHTML = killObj.weapon;
}
