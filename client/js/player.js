Players = {};
var plyShape = [[0, -6], [3, 2], [-3, 2]];

function Player(world, playerData) {
    this.world = world;
    this.body = new p2.Body({
        mass: playerData.body.mass,
        position: playerData.body.position,
        angle: playerData.body.angle,
        velocity: playerData.body.velocity,
        angularVelocity: playerData.body.angularVelocity,
        damping: 0,
        angularDamping: 0,
        inertia: 150
    });
    this.shape = new p2.Convex({vertices: plyShape});
    this.body.addShape(this.shape);
    this.world.addBody(this.body);

    this.score = playerData.score;
    this.powerups = playerData.powerups;
    this.color = playerData.color;
    this.name = name;

    Players[name] = this;
}