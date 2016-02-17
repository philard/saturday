'use strict';

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var w = canvas.width;
var h = canvas.height;

ctx.fillStyle = '#CCCCCC';
ctx.strokeStyle = '#333333';

var x = 30;
var y = 100;

var circEnergy = 4;
var circVector = {x:1,y:0.3};
var circColor = 'blue'
//  animate();
function animate() {
    if(document.getElementById('stop_ball').checked) {
        document.getElementById('stop_ball').checked = false;
        return;
    } 


    if(x > w) {
        if(circVector.x > 0) {
            bounceOffRight();
        }
    } else if(x < 0) {
        if(circVector.x < 0) {
            bounceOffLeft();
        }
    }
    if(y > h) {
        if(circVector.y > 0) {
            bounceOffBottom();
        }
    } else if(y < 0) {
        if(circVector.y < 0) {
            bounceOffTop();
        }
    }

    enactMomentum();

    ctx.clearRect(0,0,w,h);
    drawCircle(x, y, circColor);
    
    requestAnimationFrame(animate);
}    

function bounceOffRight() {
    circVector.x = circVector.x * -1;
    circColor = randomColor();
    circEnergy = Math.floor(Math.random()*10) + 2;
}

function bounceOffLeft() {
    circVector.x = circVector.x * -1;
    circColor = randomColor();
    circEnergy = Math.floor(Math.random()*10 + 2);

}

function bounceOffBottom() {
    circVector.y = circVector.y * -1;
    circColor = randomColor();
    circEnergy = Math.floor(Math.random()*10 + 2);
}

function bounceOffTop() {
    circVector.y = circVector.y * -1;
    circColor = randomColor();
    circEnergy = Math.floor(Math.random()*10 + 2);
}

function randomColor() {
    function c() {
        return Math.floor(Math.random()*256).toString(16)
    }
    return "#"+c()+c()+c();
}

function enactMomentum(){
    x += circVector.x * circEnergy;
    y += circVector.y * circEnergy;

}


function drawCircle(x,y, color) {
    ctx.fillStyle = color;

    ctx.beginPath();
    ctx.arc(x, y, 30, 0, Math.PI*2, true);
    ctx.stroke();
    ctx.fill();
}

function drawTriangle() {    
    ctx.beginPath();

    ctx.moveTo(50,50);
    ctx.lineTo(85, 150);
    ctx.lineTo(15, 150);
    ctx.closePath();

    ctx.stroke();
    ctx.fill();
}
function drawSquare() {
    // var midX = canvas.height/2;
// var midY = canvas.width/2;
// ctx.fillRect(midX-50, midY-50 , 50, 50);
}



console.log('Done');