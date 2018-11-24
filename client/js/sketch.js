var fr = 30;
var maxSubSteps;
var fixedTimeStep;
var lastTimeSeconds;

function setup(){
    frameRate(fr);
    maxSubSteps = 10;
    fixedTimeStep = 1 / fr;
    lastTimeSeconds = 0;

    createCanvas(screen.width, screen.height);
}

function draw(){
    var timeSeconds = millis();
    lastTimeSeconds = lastTimeSeconds || timeSeconds;
    var timeSinceLastCall = timeSeconds - lastTimeSeconds;
    gameWorld.step(fixedTimeStep, timeSinceLastCall, maxSubSteps);

    renderBodies();
}
