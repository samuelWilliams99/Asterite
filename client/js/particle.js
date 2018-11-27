function arrToVec(arr){
    return createVector(arr[0], arr[1]);
}

var ParticleSystem = function(position, player) {
    this.origin = position.copy();
    this.particles = [];
    this.player = player;
};

// A simple Particle class
var Particle = function(position, ang) {
    this.acceleration = createVector(0, 0.05);
    this.position = position.copy();

    var speed = getRandomInt(8,12);
    var angRange = 20;
    
    var rndAng = (getRandomInt(-angRange, angRange)) * Math.PI / 180;
    this.velocity = createVector(speed*Math.cos(ang+rndAng), speed*Math.sin(ang+rndAng));
    var offset = createVector(speed*2*Math.cos(ang+rndAng), speed*2*Math.sin(ang+rndAng));
    
    this.position.add(offset);
    this.lifespan = 200;
};

ParticleSystem.prototype.addParticle = function(position, ang) {
    var newPart = new Particle(position, ang);
    newPart.sys = this;
    this.particles.push(newPart);
    newPart.first = true;
};


ParticleSystem.prototype.run = function() {
    for (var i = this.particles.length-1; i >= 0; i--) {
        var p = this.particles[i];
        p.run(this.player.rgbColor);
        if (p.isDead()) {
            this.particles.splice(i, 1);
        }
    }
};

// Method to update position
Particle.prototype.update = function(){
    if(this.first){this.first = false; return; }
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.position.sub(arrToVec(this.sys.player.body.velocity));
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