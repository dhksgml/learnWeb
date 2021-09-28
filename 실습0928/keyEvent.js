'use strict';

var vcanvas,ctx;

var x = 200, y = 200, vel = 5;
var r_left,r_right,r_up,r_down;

function clearCanvas(){
    ctx.clearRect(0,0,vcanvas.width,vcanvas.height);
}

function drawShip(x,y) {
    ctx.fillStyle = 'gray';
    ctx.beginPath();
    ctx.moveTo(x-10,y);
    ctx.lineTo(x-10,y+10);
    ctx.lineTo(x,y+15);
    ctx.lineTo(x+20,y+15);
    ctx.lineTo(x-10,y+30);
    ctx.lineTo(x+30,y+30);
    ctx.lineTo(x+100,y);

    ctx.lineTo(x+30,y-30);
    ctx.lineTo(x-10,y-30);
    ctx.lineTo(x+20,y-15);
    ctx.lineTo(x,y-15);
    ctx.lineTo(x-10,y-10);
    ctx.lineTo(x-10,y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x+30,y);
    ctx.lineTo(x+50,y+10);
    ctx.lineTo(x+50,y-10);
    ctx.lineTo(x+30,y);
    ctx.stroke();
    ctx.fillStyle="black";
    ctx.fill();
}

function update() {
    if(r_left) {x -= vel;}
    if(r_right) {x += vel;}
    if(r_up) {y -= vel;}
    if(r_down) {y += vel;}

    if(x+100 > vcanvas.width){ x = vcanvas.width-100; }
    if(x-10 < 0){ x = 10 }

    if(y+30 > vcanvas.height){ y = vcanvas.height-30; }
    if(y-30 < 0){ y =  30; }
}

function gameloop() {
    clearCanvas();
    update();
    drawShip(x,y);
}

function init() {
    vcanvas = document.getElementById('myCanvas');
    ctx = vcanvas.getContext('2d');

    setInterval(gameloop,33);
}

function set_key(event){

    if(event.keyCode===37){
        r_left = 1;
    }
    if(event.keyCode===38){
        r_up = 1;
    }
    if(event.keyCode===39){
        r_right = 1;
    }
    if(event.keyCode===40){
        r_down = 1;
    }
}

function stop_key(event){
    
    if(event.keyCode===37){
        r_left = 0;
    }
    if(event.keyCode===38){
        r_up = 0;
    }
    if(event.keyCode===39){
        r_right = 0;
    }
    if(event.keyCode===40){
        r_down = 0;
    }
}

document.onkeydown = set_key;
document.onkeyup = stop_key;