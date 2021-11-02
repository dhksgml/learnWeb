'use strict';

var vcanvas, ctx;
var sx, sy, sv;
var r_left, r_right, r_up, r_down;
var feedArr = [];
var Snake1;

function init() {

    vcanvas = document.getElementById('myCanvas');
    ctx = vcanvas.getContext('2d');

    Snake1 = new Snake();
    sx = Snake1.x;
    sy = Snake1.y;
    sv = Snake1.v;

    setInterval(gameLoop,100);
    setInterval(createFeed,33);
}



//feed
function createFeed() {
    const fx = Math.floor(Math.random() * vcanvas.width - 10)
    const fy = Math.floor(Math.random() * vcanvas.height - 10)
    const fc = "#" + parseInt(Math.random() * 0xffffff).toString(16)
    const findX = feedArr.indexOf(fx);
    const findY = feedArr.indexOf(fy);
    if(findX != -1 && findY != -1)
    {
        return;
    }
    feedArr.push({ x:fx, y:fy, c:fc })
}

function drawFeed() {
    var i;
    for(i = 0; i < feedArr.length; i++){
        if(feedArr[i].x % 10 == 0 && feedArr[i].y % 10 == 0){
            ctx.fillStyle = feedArr[i].c;
            ctx.fillRect(feedArr[i].x, feedArr[i].y, 10, 10);
        }
    }
}

function eatFeed() {
    var i;
    for(i = 0; i < feedArr.length; i++){
        if(feedArr[i].x == sx && feedArr[i].y == sy ){
            feedArr.splice(i,1);
            return true;
        }
    }
}

//tail
function addTail() {
    if(r_left){Snake1.tail.push({x:sx+10, y:sy})}
    if(r_right){Snake1.tail.push({x:sx-10, y:sy})}
    if(r_up){Snake1.tail.push({x:sx, y:sy+10})}
    if(r_down){Snake1.tail.push({x:sx, y:sy-10})}
} 

function updateTail() {
    let i;
    for(i=0; i < Snake1.tail; i++){
        Snake1.tail[i].x = sx;
        Snake1.tail[i].y = sy;
    }
}

function drawTail() {
    ctx.fillStyle = "rgb(122,122,122)";
    let i;
    for(i=1; i <= Snake1.tail-1; i++){
        ctx.fillRect(Snake1[i].x,Snake1[i].y)
    }
}

//Snake
function drawSnake() {
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.fillRect(sx,sy,10,10);
}

function updateSnake() {
    if (r_left) { sx -= sv }
    else if (r_right) { sx += sv }
    else if (r_up) { sy -= sv }
    else if (r_down) { sy += sv }

    if( sx < 0 ) { sx = 0 }
    if( sx + 10 > vcanvas.width ) { sx = vcanvas.width - 10 }
    if( sy < 0 ) { sy = 0 }
    if( sy + 10 > vcanvas.height ) { sy = vcanvas.height - 10 }
}
 
function clearCanvas() {
    ctx.clearRect(0,0,vcanvas.width,vcanvas.height);
}

function gameLoop() {
    clearCanvas();
    updateSnake();
    drawSnake();

    drawFeed();
    if(eatFeed()){
        addTail();
    };

    updateTail();
    drawTail();
}

var Snake = function() {
    this.x = 0;
    this.y = 0;
    this.v = 10;
    this.tail = [];
    
}


function set_key(event) {
    if(event.keyCode === 37 ) { r_left = 1; r_up = 0; r_down =0; r_right = 0 }
    if(event.keyCode === 38 ) { r_up = 1; r_left = 0; r_down =0; r_right = 0 }
    if(event.keyCode === 39) {  r_right= 1; r_up = 0; r_down =0; r_left = 0 }
    if(event.keyCode === 40) { r_down = 1; r_up = 0; r_left =0; r_right = 0 }
}

document.onkeydown = set_key;
