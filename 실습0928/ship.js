'use stirct';

var vcanvas,ctx;

function ship(x,y) {

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
};

function init() {
    vcanvas = document.getElementById('myCanvas');
    ctx = vcanvas.getContext('2d');

    ship(100,100);

    ship(300,100);
}