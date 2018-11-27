var ParticleSystem = function(position) {
    this.origin = position.copy();
    this.particles = [];
};

// A simple Particle class
var Particle = function(position) {
    this.acceleration = createVector(0, 0.05);
    this.position = position.copy();
    this.lifespan = 200;
    this.velocity;
};

ParticleSystem.prototype.addParticle = function(position, velocity) {
    var newPart = new Particle(position);
    newPart.velocity = velocity;
    this.particles.push(newPart);
};

ParticleSystem.prototype.run = function(rgb) {
    for (var i = this.particles.length-1; i >= 0; i--) {
        var p = this.particles[i];
        p.run(rgb);
        if (p.isDead()) {
        this.particles.splice(i, 1);
        }
    }
};

// Method to update position
Particle.prototype.update = function(){
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 2;
};

// Is the particle still useful?
Particle.prototype.isDead = function(){
    return this.lifespan < 0;
};

// Method to display
Particle.prototype.display = function(rgb) {
    stroke(rgb[0],rgb[1],rgb[2], this.lifespan);
    strokeWeight(2);
    fill(rgb[0],rgb[1],rgb[2], this.lifespan);
    ellipse(this.position.x, this.position.y, 5, 5);
};

Particle.prototype.run = function(rgb) {
    this.update();
    this.display(rgb);
};