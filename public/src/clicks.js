'use strict';


var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var w = canvas.width;
var h = canvas.height;

canvas.addEventListener('mousedown', canvasMouseDown)

function canvasMouseDown(event) {
//     drawClickCircle({x:event.layerX, y:event.layerY, color:'yellow'});
}

function drawClickCircle(cord) {
    ctx.fillStyle = cord.color;
    ctx.beginPath();
    ctx.arc(cord.x, cord.y, 30, 0, Math.PI*2, true);
    ctx.stroke();
    ctx.fill();
}
function drawClickTriangle(cord) {
    ctx.beginPath();

    ctx.moveTo(cord.x+0,cord.y+0);
    ctx.lineTo(cord.x+35, cord.y+100);
    ctx.lineTo(cord.x+-35, cord.y+100);
    ctx.closePath();

    ctx.stroke();
    ctx.fill();
}