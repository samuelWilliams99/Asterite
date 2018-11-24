gameWorld = new p2.World({
    gravity: [0, 0],
    applyDamping: false,
    applyGravity: false,
    frictionGravity: 0
});
var material = new p2.Material();

gameWorld.addContactMaterial(new p2.ContactMaterial(material, material, {
    restitution: 1,
    stiffness: Number.MAX_VALUE // Infinite stiffness to get the exact restitution, according to the p2 example
}));

function createAsteroid(asteroidData){
    new Asteroid(gameWorld, asteroidData);
}
