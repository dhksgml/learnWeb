'use strict';

var vcanvas,ctx;


function face(x,y){
    ctx.beginPath();
    ctx.arc(x,y,100,0,Math.PI*2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x-50,y-50,10,0,Math.PI*2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x-55,y-50,20,0,Math.PI*2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x+50,y-50,10,0,Math.PI*2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x+45,y-50,20,0,Math.PI*2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x,y,30,0,Math.PI);
    ctx.lineTo(x+30,y);
    ctx.stroke();
}

function init() {
    vcanvas = document.getElementById('myCanvas');
    ctx = vcanvas.getContext('2d');

    face(200,200);
    face(400,200);

}