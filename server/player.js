global.players = {};
const Leaderboard = require('./leaderboard');
const p2 = require('p2');

var plyShape = [[0, -24], [12, 8], [-12, 8]];

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getHSL() {
    var h = randomInt(0, 360);
    var s = randomInt(42, 98);
    var l = randomInt(40, 90);
    var rgb = hslToRgb(h,s/100,l/100);
    console.log(rgb);
    return [`hsl(${h},${s}%,${l}%)`, rgb];
    
}

// https://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
function hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            // 
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        // If luminance less than 50% then luminance * (1+saturation) else just saturation+luminance
        var temp_1 = l < 0.5 ? l * (1 + s) : l + s - l * s;

        // 2 * Luminance - temp_1
        var temp_2 = 2 * l - temp_1;

        // Convert by dividing by 360
        var hue = h/360;

        var newRgb = [hue2rgb(temp_2, temp_1, hue + 0.333), hue2rgb(temp_2, temp_1, hue), hue2rgb(temp_2, temp_1, hue-0.333)];
        r = newRgb[0];
        g = newRgb[1];
        b = newRgb[2];
               
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Player(socket, name, World) {
    this.socket = socket;
    socket.first = false;
    this.World = World;
    this.world = World.world;
    socket.name = name;
    this.body = new p2.Body({
        mass: 10,
        position: [
            this.World.worldSize / 2 + getRandomInt(-800, 800),
            this.World.worldSize / 2 + getRandomInt(-800, 800)
        ],
        //position: [getRandomInt(100,1800), 500],
        angle: 0,
        velocity: [0, 0],
        angularVelocity: 0,
        damping: 0,
        angularDamping: 0,
        inertia: 150
    });
    this.shape = new p2.Convex({ vertices: plyShape });
    this.body.addShape(this.shape);
    this.world.addBody(this.body);
    this.thrusting = false;

    this.objectType = 'Player';

    this.score = 0;
    this.powerups = '';
    var colorsArray = getHSL();

    this.color = colorsArray[0];
    this.rgbColor = colorsArray[1];

    this.name = name;
    this.killed = false;
    this.killedTimeout = 100;

    players[name] = this;
}

Player.prototype.sendObj = function() {
    return {
        body: {
            mass: this.body.mass,
            position: this.body.position,
            angle: this.body.angle,
            velocity: this.body.velocity,
            angularVelocity: this.body.angularVelocity
        },
        powerups: this.powerups,
        score: this.score,
        name: this.name,
        color: this.color,
        rgbColor: this.rgbColor,
        thrusting: this.thrusting,
        killed: this.killed,
        killedTimeout: this.killedTimeout
    };
};

Player.prototype.sendObjSimple = function() {
    return {
        body: {
            position: this.body.position,
            angle: this.body.angle,
            velocity: this.body.velocity,
            angularVelocity: this.body.angularVelocity
        },
        powerups: this.powerups,
        score: this.score,
        name: this.name,
        thrusting: this.thrusting,
        killed: this.killed,
        killedTimeout: this.killedTimeout
    };
};

Player.prototype.updateBody = function() {
    var ply = this;

    if (ply.killed) {
        ply.killedTimeout--;
        if (ply.killedTimeout < 1) {
            console.log('remove');
            ply.remove();
        }
        return;
    }
    //angle stuff
    if (ply.targetAng) {
        ply.body.angle = ply.body.angle % d(360);

        var dir = 0;
        var angle = ply.body.angle;
        var tarAngle = ply.targetAng;
        var diff = ((tarAngle - angle + d(540)) % d(360)) - d(180);
        if (Math.abs(diff) > d(2)) {
            dir = diff > 0 ? 1 : -1;
        }

        if (dir > 0) {
            ply.body.angularVelocity = Math.min(
                ply.body.angularVelocity + d(1),
                d(20)
            );
        } else if (dir < 0) {
            ply.body.angularVelocity = Math.max(
                ply.body.angularVelocity - d(1),
                d(-20)
            );
        } else {
            ply.body.angularVelocity = 0;
        }
    }

    //vel stuff
    if (ply.keysDown && ply.keysDown.left) {
        var mag = 300;
        ply.thrusting = true;
        ply.body.applyForce([
            mag * Math.cos(ply.body.angle - Math.PI / 2),
            mag * Math.sin(ply.body.angle - Math.PI / 2)
        ]);
    } else {
        ply.thrusting = false;
    }
};

function d(ang) {
    return (ang * Math.PI) / 180;
}

Player.prototype.remove = function() {
    Leaderboard.update();
    io.emit('playerRemove', this.name);
    this.socket.name = null;
    delete players[this.name];
    this.world.removeBody(this.body);
};

Player.prototype.setScore = function(score) {
    this.score = score;
    Leaderboard.update();
};

Player.prototype.kill = function(killData) {
    this.socket.viewPos = this.body.position;
    console.log('die?');
    if (this.killed) {
        return;
    }
    console.log('BIG DIE');
    const killer = killData.killer;
    const weapon = killData.weapon;
    this.killed = true;
    console.log(this.killedTimeout);
    this.thrusting = false;
    if (killer.name != this.name) {
        players[killer.name].setScore(players[killer.name].score + 1);
    }

    io.emit('playerKilled', {
        killer: {
            name: killer.name,
            color: killer.color
        },
        killed: {
            name: this.name,
            color: this.color
        },
        weapon
    });
};

module.exports = Player;
