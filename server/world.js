const p2 = require("p2");

function World(){
	this.world = new p2.World({gravity: [0, 0]});
	this.createMaterials(new p2.Material());
};

World.prototype.createMaterials = function(material) {
    this.world.addContactMaterial(new p2.ContactMaterial(material, material, {
        restitution: 1,
        stiffness: Number.MAX_VALUE // Infinite stiffness to get the exact restitution, according to the p2 example
    }));
};

module.exports = World;