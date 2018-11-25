const p2 = require("p2");

function World(){
	this.world = new p2.World({
        gravity: [0, 0],
        applyDamping: false,
        applyGravity: false,
        frictionGravity: 0
    });
    this.world.on("beginContact", function(data){
        bodyA = data.bodyA;
        bodyB = data.bodyB;
        var plyA = getPlayerFromBody(bodyA);
        var plyB = getPlayerFromBody(bodyB);
        if(plyA && plyA.objectType == "Player") {
            if(!plyB || plyB.objectType == "Asteroid") {
                plyA.kill({killer: {name: plyA.name, color: "#FFFFFF"}, weapon:"pain"});
            }
            
        }
        if(plyB && plyB.objectType == "Player") {
            if(!plyA || plyA.objectType == "Asteroid") {
                plyB.kill({killer: {name: plyB.name, color: "#FFFFFF"}, weapon:"pain"});
            }
        }
    })
    this.worldSize = 8000;
	this.createMaterials(new p2.Material());
};

function getPlayerFromBody(body){
    if(!body){return null;}
    var ret = null;
    for(var key in players){
        var ply = players[key];
        if(ply.body.id == body.id){
            ret = ply;
        }
    };
    for(var key in Asteroids){
        var ast = Asteroids[key];
        if(ast.body.id == body.id){
            ret = ast;
        }
    };
    return ret;
}

World.prototype.createMaterials = function(material) {
    this.world.addContactMaterial(new p2.ContactMaterial(material, material, {
        restitution: 0.4,
        stiffness: Number.MAX_VALUE // Infinite stiffness to get the exact restitution, according to the p2 example
    }));
};

module.exports = World;