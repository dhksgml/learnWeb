'use strict'
var vcanvas, ctx;

function resizeCanvas() {
    vcanvas.width = (window.innerWidth/3)*2;
    vcanvas.height = (window.innerHeight/3)*2;
    // vcanvas.width = 600;
    // vcanvas.height = 600;

    document.getElementById('myCanvas').style.marginLeft = (vcanvas.width/2)*-1+"px";
    document.getElementById('myCanvas').style.marginTop = (vcanvas.height/2)*-1+"px";

}

function init() {
    vcanvas = document.getElementById('myCanvas');
    ctx = vcanvas.getContext('2d');

    resizeCanvas();
}

