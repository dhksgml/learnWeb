'use strict'

var vcanvas, ctx;
var key = [0,0,0,0,0,0,0,0];
var upKey = [0,0,0,0,0];
var sound = ["piano_mp3/sound1.mp3","piano_mp3/sound2.mp3","piano_mp3/sound3.mp3","piano_mp3/sound4.mp3","piano_mp3/sound5.mp3","piano_mp3/sound6.mp3","piano_mp3/sound7.mp3","piano_mp3/sound8.mp3"]
//var AudioArr = [new Audio("piano_mp3/sound1.mp3"), new Audio("piano_mp3/sound2.mp3"),new Audio("piano_mp3/sound3.mp3"),new Audio("piano_mp3/sound4.mp3"),new Audio("piano_mp3/sound5.mp3"),new Audio("piano_mp3/sound6.mp3"),new Audio("piano_mp3/sound7.mp3"),new Audio("piano_mp3/sound8.mp3"),]
// var AudioArr = []
// for(let i = 1; i <= 13; i++){
//     AudioArr[i-1] = new Audio("piano_mp3/sound"+i+".mp3")
// }


var newSound = []
var upSound = []


function init() {
    vcanvas = document.getElementById('myCanvas')
    ctx = vcanvas.getContext('2d')
    setInterval(gameLoop,100)
}

function clearCanvas() {
    ctx.clearRect(0,0,vcanvas.width,vcanvas.height)
}

function play() {
    let i;
    for(i = 0; i < 8; i ++)
    {
        if(key[i]) {
            ctx.fillStyle = "black"
            ctx.fillRect(i*50 + 50 + 50,100,50,200);
            newSound[i] = document.createElement("audio");
            newSound[i].src = sound[i]
            newSound[i].volume = 0.3
            newSound[i].play()
            // AudioArr[i].play()
        }
    }

    if(upKey[0]){
        ctx.fillStyle = "gray"
        ctx.fillRect(50 + 75, 100, 45, 100)  
        upSound[0] = document.createElement("audio");
        upSound[0].src = "piano_mp3/sound9.mp3";
        upSound[0].volume = 0.3
        upSound[0].play()
    }

    if(upKey[1]){
        ctx.fillStyle = "gray"
        ctx.fillRect(2*50 + 75, 100, 45, 100)
        upSound[1] = document.createElement("audio");
        upSound[1].src = "piano_mp3/sound10.mp3";
        upSound[1].volume = 0.3
        upSound[1].play()
    }

    if(upKey[2]){
        ctx.fillStyle = "gray"
        ctx.fillRect(4*50 + 75, 100, 45, 100)
        upSound[2] = document.createElement("audio");
        upSound[2].src = "piano_mp3/sound11.mp3";
        upSound[2].volume = 0.3
        upSound[2].play()
    }

    if(upKey[3]){
        ctx.fillStyle = "gray"
        ctx.fillRect(5*50 + 75, 100, 45, 100)
        upSound[3] = document.createElement("audio");
        upSound[3].src = "piano_mp3/sound12.mp3";
        upSound[3].volume = 0.3
        upSound[3].play()
    }

    if(upKey[4]){
        ctx.fillStyle = "gray"
        ctx.fillRect(6*50 + 75, 100, 45, 100)
        upSound[4] = document.createElement("audio");
        upSound[4].src = "piano_mp3/sound13.mp3";
        upSound[4].volume = 0.3
        upSound[4].play()
    }

}

function drawPiano() {

    ctx.fillStyle = "black"
    ctx.font = "15pt arial"
    ctx.fillText("흰 건반: 1~8, 검은 건반: y~p",50,50)

    for(let i = 0; i < 8; i ++)
    {   
        ctx.fillStyle = "black"
        if( i == 1 || i == 2 || i == 4 || i == 5 || i == 6){
            ctx.fillRect(i*50 + 75, 100, 45, 100)
        }
        ctx.strokeRect(i*50 + 100,100,50,200);
    }

    // ctx.strokeRect(rc1.x,rc1.y,rc1.w,rc1.h)
    // ctx.strokeRect(rc2.x,rc2.y,rc2.w,rc2.h)
    // ctx.strokeRect(rc3.x,rc3.y,rc3.w,rc3.h)
    // ctx.strokeRect(rc4.x,rc4.y,rc4.w,rc4.h)
}


function gameLoop() {
    clearCanvas()
    drawPiano();
    play() 
}

function set_key(event) {
    if(event.keyCode > 48 && event.keyCode < 57){
        key[event.keyCode - 49] = 1
    }


    if(event.keyCode == 89){
        //검은 1번째 건반
        upKey[0] = 1
    }

    if(event.keyCode == 85){
        //검은 2번째 건반
        upKey[1] = 1
    }

    if(event.keyCode == 73){
        //검은 3번째 건반
        upKey[2] = 1
    }

    if(event.keyCode == 79){
        //검은 4번째 건반
        upKey[3] = 1
    }

    if(event.keyCode == 80){
        //검은 5번째 건반
        upKey[4] = 1
    }


    // if(event.keyCode === 49) { key[0] = 1 }
    // if(event.keyCode === 50) { key[1] = 1 }
    // if(event.keyCode === 51) { key[2] = 1 }
    // if(event.keyCode === 52) { key[3] = 1 }
    // if(event.keyCode === 53) { key[4] = 1 }
    // if(event.keyCode === 54) { key[5] = 1 }
    // if(event.keyCode === 55) { key[6] = 1 }
    // if(event.keyCode === 56) { key[7] = 1 }
}

function stop_key(event) {
    
    key[event.keyCode - 49] = 0

    if(event.keyCode == 89){
        //검은 1번째 건반
        upKey[0] = 0
    }

    if(event.keyCode == 85){
        //검은 2번째 건반
        upKey[1] = 0
    }

    if(event.keyCode == 73){
        //검은 3번째 건반
        upKey[2] = 0
    }

    if(event.keyCode == 79){
        //검은 4번째 건반
        upKey[3] = 0
    }

    if(event.keyCode == 80){
        //검은 5번째 건반
        upKey[4] = 0
    }

    // if(event.keyCode === 49) { key[0] = 0 }
    // if(event.keyCode === 50) { key[1] = 0 }
    // if(event.keyCode === 51) { key[2] = 0 }
    // if(event.keyCode === 52) { key[3] = 0 }
    // if(event.keyCode === 53) { key[4] = 0 }
    // if(event.keyCode === 54) { key[5] = 0 }
    // if(event.keyCode === 55) { key[6] = 0 }
    // if(event.keyCode === 56) { key[7] = 0 }
}

document.onkeydown = set_key;
document.onkeyup = stop_key;