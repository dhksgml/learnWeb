'use strict'
var vcanvas, ctx;
var sx, sy;
//비행기 커지는 비율
var ratio;

function clearCanvas() {
    ctx.clearRect(0,0,vcanvas.width,vcanvas.height);
}

function drawShip() {
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.moveTo((sx - 15) * ratio, sy * ratio);
    ctx.lineTo(sx * ratio, (sy - 15) * ratio);
    ctx.lineTo((sx + 60) * ratio, sy * ratio);
    ctx.lineTo(sx * ratio, (sy + 15) * ratio);
    ctx.lineTo((sx - 15) * ratio, sy * ratio);
    ctx.fill();
}

function gameLoop() {
    clearCanvas();
    drawShip();

}

function updateShip() {

}

function resizeCanvas() {
    var newW = window.innerWidth;
    var newH = window.innerHeight;

    if(newW / newH < 9 / 4){
        //너비 기준
        vcanvas.width = window.innerWidth - 10;
        vcanvas.height = vcanvas.width / 9 * 4;
    }
    else{
        //높이 기준
        vcanvas.height = window.innerHeight - 10;
        vcanvas.width = vcanvas.height / 4 * 9;
    }
    
    ratio = vcanvas.width / 900;

    document.getElementById('myCanvas').style.marginLeft = (vcanvas.width/2)*-1+"px";
    document.getElementById('myCanvas').style.marginTop = (vcanvas.height/2)*-1+"px";

    gameLoop();
}

function init() {
    vcanvas = document.getElementById('myCanvas');
    ctx = vcanvas.getContext('2d');
    sx = 200, sy = 200;

    resizeCanvas();

    setInterval(gameLoop, 30);
}

