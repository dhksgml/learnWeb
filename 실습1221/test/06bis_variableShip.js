'use strict'
var vcanvas, ctx;
var sx, sy;
var r_left, r_right, r_up, r_down;
var vel = 5;
//비행기 커지는 비율
var ratio;
//게임이 돌아가는 영역과 화면에 표시되는 영역이 달라야 함. 게임 영역에 따라 게임이 돌아가야 함
var vcanvas0 = {width: 900, height: 400}
//터치 이벤트
var joystick = { x: 0, y: 0, r: 70, tx: 0, ty: 0, tr: 30};

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
    updateShip();
    drawShip();
}

function updateShip() {
    // if(r_left) { sx -= vel }
    // if(r_right) { sx += vel }
    // if(r_up) { sy -= vel }
    // if(r_down) { sy += vel }

    var dx,dy,vx,vy;
    var jst = joystick;

    dx = jst.tx - jst.x;
    dy = jst.ty - jst.y;
    vx = (dx/(jst.r - jst.tr)) * vel;
    vy = (dy/(jst.r - jst.tr)) * vel;

    sx += vx;
    sy == vy;

    //보정
    if(sx - 15 < 0) { sx = 15; }
    if(sx + 60 > vcanvas0.width) { sx = vcanvas0.width - 60; }
    if(sy - 15 < 0) { sy = 15; }
    if(sy + 15 > vcanvas0.height) { sy = vcanvas0.height - 15; }
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

//key control
function set_key(event) {
    if(event.keyCode === 37) { r_left = 1; }
    if(event.keyCode === 38) { r_up = 1; }
    if(event.keyCode === 39) { r_right = 1; }
    if(event.keyCode === 40) { r_down = 1; }
}

function stop_key(event){
    if(event.keyCode === 37) { r_left = 0; }
    if(event.keyCode === 38) { r_up = 0; }
    if(event.keyCode === 39) { r_right = 0; }
    if(event.keyCode === 40) { r_down = 0; }
}

document.onkeydown = set_key;
document.onkeyup = stop_key;
