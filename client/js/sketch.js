function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
    radarPos = [80, windowHeight-80];
}

function setup(){
    fr = 30;
    radarSize = 120;
    radarPos = [80, windowHeight-80];
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
    ellipse(radarPos[0], radarPos[1], radarSize, radarSize);
    stroke(100, 100, 100);
    var radarCircleSize = radarSize - 20;
    for (var i = 0; i < 6; i++){
        ellipse(radarPos[0], radarPos[1], radarCircleSize, radarCircleSize);
        radarCircleSize -= 20;
    }

    stroke(0,255,0);
    fill(0,255,0);
    renderRadar(radarSize, radarPos);
}
