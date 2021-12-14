'use strict'

var vcanvas, ctx;
var rect, sp, kz;
var particle = [];


//Particle
function b2v(a, b){
    return a + (b-a) * Math.random();
}


function dist(x0,y0,x1,y1){
    return Math.sqrt( (x0 - x1) * (x0 - x1) + (y0 - y1) * (y0 - y1) )
}

function createPaticle(a) {
    var i = 0, nop, x, y, wh, colors, d1, d2, velx, vely, ex, ey;

    particle = [];
    nop = 500;


    // for(i = 0; i < nop; i += 1){
    //     x = a.x + b2v(0, a.w * 1.2);
    //     y = a.y + b2v(0, a.h * 1.2);
    //     wh = b2v(1,10);
    //     //2단계
    //     colors = a.c + Math.round( 20* Math.random() );

    //     //3단계
    //     d1 = b2v(30, 120);
    //     d2 = b2v(30, 120);

    //     //4단계
    //     velx = (7 - wh) / 3 * b2v(-1, 1);
    //     vely = (7 - wh) / 3 * b2v(-1, 1);

    //     particle.push({px: x, py: y, pw: wh, pc: colors, pd1: d1, pd2: d2, pvx: velx, pvy: vely});
    // }

    x = a.x + a.w/2;
    y = a.y + a.h/2;

    while(i < nop){
        ex = x + b2v(-a.w,a.w);
        ey = y + b2v(-a.w,a.h);
        wh = b2v(1,10);
        colors = a.c + Math.round( 20 * Math.random());
        d1 = b2v(30,120);
        d2 = b2v(30,120);
        velx = (7 - wh) / 3 * b2v(-1, 1);
        vely = (7 - wh) / 3 * b2v(-1, 1);
        
        if(dist(ex, ey, x, y) < (a.w/2) ){
            particle.push({px: ex, py: ey, pw: wh, pc: colors, pd1: d1, pd2: d2, pvx: velx, pvy: vely})
            i+=1;
        }
        
    }
}

//3단계
function updateParticle() {
    var i;
    var K = 1;
    for(i = 0; i < particle.length; i++){
        //4단계
        particle[i].px -= K * particle[i].pvx;
        particle[i].py -= K * particle[i].pvy;
        //3단계
        particle[i].pd1 -= K * 2;
        if(particle[i].pd1 < 0) { particle.splice(i, 1); }
    }
}

function drawParticle(tp) {
    var i, ln;
    for(i = 0; i < tp.length ; i += 1){
        //1단계
        // ctx.fillStyle = "black";

        //2단계, 3단계
        ln = 80 * particle[i].pd1 / particle[i].pd2;
        ctx.fillStyle = "hsl(" + tp[i].pc + ", 100%, "  + ln + "%)";
        // ctx.fillRect(tp[i].px + 300, tp[i].py, tp[i].pw, tp[i].pw);
        ctx.beginPath();
        ctx.arc(tp[i].px + 300, tp[i].py, tp[i].pw/2, 0,Math.PI*2);
        ctx.fill();
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.arc(tp[i].px + 300, tp[i].py, tp[i].pw/2, 0,Math.PI*2);
        ctx.stroke();
    }
}

//Block
function createBlock() {
    var c;

    c = Math.round(360 * Math.random());
    rect = {x: 200, y: 200, w: 100, h: 100, c: c, state: 1}
}

function drawBlock() {
    var hue, saturation, lightness;

    hue = rect.c;
    saturation = 100;
    lightness = 50;

    if(rect.state){
        ctx.fillStyle = "hsl(" + hue + "," + saturation + "%," + lightness+"%)";
        ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
    }
    
}


function clearCanvas() {
    ctx.clearRect(0,0,vcanvas.width,vcanvas.height);
}

function stateInfo() {
    ctx.beginPath();
    ctx.font = '20pt arial';
    ctx.fillStyle = 'black';
    ctx.fillText('스페이스 바를 눌러보세요',15,50);
}

function gameLoop() {
    clearCanvas();

    stateInfo();

    if(sp){
        createBlock();
        createPaticle(rect);
    }
    if(kz){
        createPaticle(rect);
        rect.state = 0;
    }
    
    drawBlock()
    updateParticle();
    drawParticle(particle);
}

function init() {
    vcanvas = document.getElementById("myCanvas")
    ctx = vcanvas.getContext('2d')

    createBlock();
    setInterval(gameLoop,33);
}

//key controls

function set_key(event) {
    if(event.keyCode === 32){ sp = 1}
    if(event.keyCode === 90){ kz = 1}
}

function stop_key(event) {
    if(event.keyCode === 32){ sp = 0 }
    if(event.keyCode === 90){ kz = 0 }
}

document.onkeydown = set_key          
document.onkeyup = stop_key 