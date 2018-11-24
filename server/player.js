var players = {

};


function createPlayer(name){
    players[name] = {
    body : '',
    shape : '',
    powerups : '',
    color : 'red',
    };
}

module.exports = { players, createPlayer };