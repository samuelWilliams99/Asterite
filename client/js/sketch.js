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

    keysDown = {left: false, right: false}

    createCanvas(window.innerWidth, window.innerHeight);
}

function draw(){
    
    background(0);
    fill(0);
    stroke(255);

    // text(Math.round(viewPos[0]) + ", " + Math.round(viewPos[1]), 100, 100);
    
    document.getElementById('left-view-pos').innerHTML = Math.round(viewPos[0]);
    document.getElementById('right-view-pos').innerHTML = Math.round(viewPos[1]), 100, 100;
    
    var timeSeconds = millis();
    lastTimeSeconds = lastTimeSeconds || timeSeconds;
    var timeSinceLastCall = timeSeconds - lastTimeSeconds;
    gameWorld.step(fixedTimeStep, timeSinceLastCall, maxSubSteps);
    renderBodies();

    fill(0);
    strokeWeight(1);
    stroke(255);
    ellipse(radarPos[0], radarPos[1], radarSize, radarSize);

    stroke(100, 100, 100);
    var radarCircleSize = radarSize - 20;
    for (var i = 0; i < 6; i++){
        ellipse(radarPos[0], radarPos[1], radarCircleSize, radarCircleSize);
        radarCircleSize -= 20;
    }

    stroke(0,255,0);
    renderRadar(radarSize, radarPos);

    if(username){
        if(!Players[username]){ return; }
        var dx = mouseX - width/2;
        var dy = mouseY - height/2
        var mouseAng = Math.atan(dx / dy);
        if(dy < 0){
            mouseAng += Math.PI;
        }

        mouseAng = (Math.PI*2) - mouseAng;
        mouseAng = (mouseAng + Math.PI) % (Math.PI*2);


        tryFace(mouseAng);
        sendKeys();
        if(keysDown && keysDown.left && Players[username]){
            var mag = 300;
            Players[username].body.applyForce([mag * Math.cos(Players[username].body.angle - Math.PI/2), mag*Math.sin(Players[username].body.angle - Math.PI/2)]);

        }
    }

}

function sendKeys() {
    socket.emit("playerSendKeys", username, keysDown);
}

function tryFace(ang){
    socket.emit("playerTryFace", username, ang);
}

function mousePressed(){
    if(mouseButton == "left"){
        keysDown.left = true;
    } else if(mouseButton == "right") {
        keysDown.right = true;
    }
}

function mouseReleased(){
    if(mouseButton == "left"){
        keysDown.left = false;
    } else if(mouseButton == "right") {
        keysDown.right = false;
    }
}