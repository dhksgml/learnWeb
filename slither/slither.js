'use strict';

var vcanvas, ctx;
var r_left, r_right, r_up, r_down;
var feedArr = [];
var scl = 10;
var Snake1;

//Snake

var Snake = function() {
    this.x = 0;
    this.y = 0;
    this.xv = 0;
    this.yv = 0;
    this.tailArr = [];

    
    this.updateSnake = function() {
        var i;

        for ( i = this.tailArr.length - 1; i > 0; i -= 1){
            this.tailArr[i] = this.tailArr[i-1];
        }      
        this.tailArr[0] = { x: this.x, y: this.y };

        this.x += this.xv * scl;
        this.y += this.yv * scl;

    
        if( this.x < 0 ) { this.x = 0 }
        if( this.x + scl > vcanvas.width ) { this.x = vcanvas.width - scl }
        if( this.y < 0 ) { this.y = 0 }
        if( this.y + scl > vcanvas.height ) { this.y = vcanvas.height - scl }
    }

    this.dir = function( x, y ) {
        this.xv = x;
        this.yv = y;
    }

    this.addTail = function( x, y ) {
        this.tailArr.push({x:x, y:y})
    }

    this.drawSnake = function() {
        var i;
        for( i = 0; i < this.tailArr.length-1; i+=1 ){
            ctx.beginPath();
            ctx.fillStyle = "rgb(125,125,125)";
            ctx.fillRect(this.tailArr[i].x ,this.tailArr[i].y,scl,scl);
        }

        ctx.fillStyle = 'black';
        ctx.fillRect(this.x, this.y, scl, scl);
    }

    
}
function init() {

    vcanvas = document.getElementById('myCanvas');
    ctx = vcanvas.getContext('2d');

    Snake1 = new Snake();


    setInterval(gameLoop,100);
    setInterval(createFeed,33);
}



//feed
function createFeed() {
    const fx = Math.floor(Math.random() * vcanvas.width - scl)
    const fy = Math.floor(Math.random() * vcanvas.height - scl)
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
        if(feedArr[i].x % scl == 0 && feedArr[i].y % scl == 0){
            ctx.fillStyle = feedArr[i].c;
            ctx.fillRect(feedArr[i].x, feedArr[i].y, scl, scl);
        }
    }
}

function eatFeed( snake ) {
    var i;
    for(i = 0; i < feedArr.length; i++){
        if(feedArr[i].x == snake.x && feedArr[i].y == snake.y ){
            snake.addTail({x:feedArr[i].x, y:feedArr[i].y});
            feedArr.splice(i,1);
        }
    }
}



function clearCanvas() {
    ctx.clearRect(0,0,vcanvas.width,vcanvas.height);
}

function update() {
    if( r_left ) { Snake1.dir (-1, 0)}
    if( r_right ) { Snake1.dir (1, 0)}
    if( r_up ) { Snake1.dir (0, -1)}
    if( r_down ) { Snake1.dir (0, 1)}
}

function gameLoop() {
    clearCanvas();
    update();
    Snake1.updateSnake();

    drawFeed();
    eatFeed(Snake1);
    Snake1.drawSnake();
}




function set_key(event) {
    r_left = 0; r_up = 0; r_down =0; r_right = 0;

    if(event.keyCode === 37 ) { r_left = 1; }
    if(event.keyCode === 38 ) { r_up = 1; }
    if(event.keyCode === 39) {  r_right= 1; }
    if(event.keyCode === 40) { r_down = 1; }
}

document.onkeydown = set_key;
