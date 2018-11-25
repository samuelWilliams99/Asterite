Players = {};
var plyShape = [[0, -24], [12, 8], [-12, 8]];

function Player(world, playerData) {
    this.world = world;
    this.body = new p2.Body({
        mass: playerData.body.mass,
        position: realToScreen(playerData.body.position),
        angle: playerData.body.angle,
        velocity: playerData.body.velocity,
        angularVelocity: playerData.body.angularVelocity,
        damping: 0,
        angularDamping: 0,
        inertia: 150
    });
    this.shapeVertices = plyShape;
    this.shape = new p2.Convex({vertices: this.shapeVertices});
    this.body.addShape(this.shape);
    this.world.addBody(this.body);

    this.score = playerData.score;
    this.powerups = playerData.powerups;
    this.color = playerData.color;
    this.name = playerData.name;

    Players[this.name] = this;
}