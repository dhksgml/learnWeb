'use strict'
var vcanvas, ctx;

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

