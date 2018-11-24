global.players = {};


function Player(name){
    
    this.body = '';
    this.shape = '';
    this.powerups = '';
    this.color = 'red';
    this.name = name;

    players[name] = this;
}

module.exports = Player;