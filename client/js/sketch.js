var fr = 30;
var maxSubSteps;
var fixedTimeStep;
var lastTimeSeconds;

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
}
