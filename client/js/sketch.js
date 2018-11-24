var fr = 30;
var maxSubSteps;
var fixedTimeStep;
var lastTimeSeconds;
var radarSize = 100;

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
}

function setup(){
    frameRate(fr);
    maxSubSteps = 10;
    fixedTimeStep = 1 / fr;
    lastTimeSeconds = 0;
    angleMode(RADIANS);

    createCanvas(window.innerWidth, window.innerHeight);
}

function draw(){
    background(0);
    fill(0);
    stroke(255);
    
    var timeSeconds = millis();
    lastTimeSeconds = lastTimeSeconds || timeSeconds;
    var timeSinceLastCall = timeSeconds - lastTimeSeconds;
    gameWorld.step(fixedTimeStep, timeSinceLastCall, maxSubSteps);
    
    renderBodies();
    
    ellipse(80, windowHeight-80, radarSize, radarSize);
    stroke(100, 100, 100);
    var radarCircleSize = 100;
    for (var i = 0; i < 3; i++){
        ellipse(80, windowHeight-80, radarCircleSize, radarCircleSize);
        radarCircleSize -= 20;
    }

    renderRadar(radarSize);
}


