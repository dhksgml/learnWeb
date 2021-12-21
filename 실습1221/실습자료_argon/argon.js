"use strict";
var vcanvas, ctx;
var sx, sy;
var r_left, r_up, r_right, r_down;
var vel = 8;
var stype = 0;
var fire = 0;
var arrRocket = [];
var arrEnemy = [];
var particle = [];

var count = 0;

//추가되는 것
var ratio;
var vcanvas0 = {width: 900, height: 400}
var joystick = { x: 0, y: 0, r: 70, tx: 0, ty: 0, tr: 30};

function clearCanvas() {
  ctx.clearRect(0, 0, vcanvas.width, vcanvas.height);
}

// particle
function b2v(a, b) {
  return a + (b - a) * Math.random();
}

function createParticle(a) {
  var i, nop, x, y, d1, d2, wh, velx, vely, colors;

  nop = 100; // Number of pieces 조각 갯수
  // { x: tx, y: ty, w: twh, h: twh, c: tc, v: tv, hit: 0 }
  for (i = 0; i < nop; i += 1) {
    x = a.x + b2v(0, a.w * 1.2);
    y = a.y + b2v(0, a.h * 1.2);
    d1 = b2v(30, 120);
    d2 = b2v(30, 120);
    wh = b2v(1, 5); //조각의 가로 세로 크기
    colors = a.c + Math.round(10 * Math.random());
    velx = ((7 - wh) / 3) * b2v(-1, 1);
    vely = ((7 - wh) / 3) * b2v(-1, 1);

    particle.push({
      px: x,
      py: y,
      pw: wh,
      pc: colors,
      vx: velx,
      vy: vely,
      d1: d1,
      d2: d2,
    });
  }
}

function updateParticle() {
  var i,
    K = 1;

  for (i = 0; i < particle.length; i += 1) {
    particle[i].px -= K * particle[i].vx;
    particle[i].py -= K * particle[i].vy;
    particle[i].d1 -= K * 2;
    if (particle[i].d1 < 0) {
      particle.splice(i, 1);
    }
  }
}

function drawParticle(tp) {
  var i, hue, saturation, lightness;

  for (i = 0; i < tp.length; i += 1) {
    hue = tp[i].pc;
    saturation = 100;
    lightness = (80 * tp[i].d1) / tp[i].d2;
    ctx.fillStyle = "hsl(" + hue + "," + saturation + "%," + lightness + "%)";
    ctx.fillRect(tp[i].px*ratio, tp[i].py*ratio, tp[i].pw*ratio, tp[i].pw*ratio);
  }
}

// collision
function hitRect(p, t) {
  var x0 = t.x;
  var x1 = t.x + t.w;
  var y0 = t.y;
  var y1 = t.y + t.h;
  var a0 = p.x;
  var a1 = p.x + p.w;
  var b0 = p.y;
  var b1 = p.y + p.h;

  return x0 < a1 && x1 > a0 && y0 < b1 && y1 > b0;
}

function collisionShip() {
  var i;
  var p = { x: sx - 10, y: sy - 7, w: 40, h: 14 };
  for (i = 0; i < arrEnemy.length; i += 1) {
    if (hitRect(p, arrEnemy[i])) {
      createParticle(arrEnemy[i]);
      arrEnemy.splice(i, 1);
      count+=1;
    }
  }
}

function collisionRocket(p) {
  var i;

  for (i = 0; i < arrEnemy.length; i += 1) {
    if (hitRect(p, arrEnemy[i])) {
      arrEnemy[i].hit += 1;
      if (arrEnemy[i].hit > 50) {
        createParticle(arrEnemy[i]);
        arrEnemy.splice(i, 1);
        count+=1;
      }
    }
  }
}

// Enemy
function createEnemy() {
  var tx, ty, twh, tc, tv;

  tx = vcanvas0.width;
  twh = Math.floor(Math.random() * 31) + 10;
  ty = Math.floor(Math.random() * vcanvas0.height);
  //tc = "#" + parseInt(Math.random() * 0xffffff, 10).toString(16);
  tc = Math.round(360 * Math.random());
  tv = Math.floor(Math.random() * 2) + 1;

  if (ty + twh < vcanvas0.height) {
    arrEnemy.push({ x: tx, y: ty, w: twh, h: twh, c: tc, v: tv, hit: 0 });
  }
}

function updateEnemy() {
  var i;
  for (i = 0; i < arrEnemy.length; i += 1) {
    arrEnemy[i].x -= arrEnemy[i].v;
  }
}

function deleteEnemy() {
  var i;
  for (i = 0; i < arrEnemy.length; i += 1) {
    if (arrEnemy[i].x < arrEnemy[i].w * -1) {
      arrEnemy.splice(i, 1);
    }
  }
}

function drawEnemy() {
  var i;
  for (i = 0; i < arrEnemy.length; i += 1) {
    ctx.fillStyle = "hsl(" + arrEnemy[i].c + ", 100%, 50%)";
    ctx.fillRect(arrEnemy[i].x*ratio, arrEnemy[i].y*ratio, arrEnemy[i].w*ratio, arrEnemy[i].h*ratio);
  }
}

// Rocket
function createRocket() {
  if (fire) {
    if (stype != 1) {
      arrRocket.push({ x: sx + 60, y: sy - 2, w: 5, h: 4, c: "yellow", v: 5 });
    }
    if (stype === 1) {
      arrRocket.push({ x: sx + 60, y: sy - 5, w: 5, h: 4, c: "yellow", v: 5 });
      arrRocket.push({ x: sx + 60, y: sy + 1, w: 5, h: 4, c: "yellow", v: 5 });
    }
    if (stype > 1) {
      arrRocket.push({ x: sx + 20, y: sy - 15, w: 5, h: 4, c: "yellow", v: 5 });
      arrRocket.push({ x: sx + 20, y: sy + 11, w: 5, h: 4, c: "yellow", v: 5 });
    }
    if (stype > 2) {
      arrRocket.push({ x: sx + 10, y: sy - 19, w: 5, h: 4, c: "yellow", v: 5 });
      arrRocket.push({ x: sx + 10, y: sy + 15, w: 5, h: 4, c: "yellow", v: 5 });
    }
  }
}

function updateRocket() {
  var i;
  for (i = 0; i < arrRocket.length; i += 1) {
    arrRocket[i].x += arrRocket[i].v;
    collisionRocket(arrRocket[i]);
  }
}

function deleteRocket() {
  var i;
  for (i = 0; i < arrRocket.length; i += 1) {
    if (arrRocket[i].x > vcanvas0.width) {
      arrRocket.splice(i, 1);
    }
  }
}

function drawRocket() {
  var i;
  for (i = 0; i < arrRocket.length; i += 1) {
    ctx.fillStyle = arrRocket[i].c;
    ctx.fillRect(
      arrRocket[i].x*ratio,
      arrRocket[i].y*ratio,
      arrRocket[i].w*ratio,
      arrRocket[i].h*ratio
    );
  }
}

// ship
function updateShip() {
  //touch
  
    var dx, dy, vx, vy;
    var jst = joystick;
    
    dx = jst.tx - jst.x;
    dy = jst.ty - jst.y;
    vx = (dx / (jst.r - jst.tr)) * vel;
    vy = (dy / (jst.r - jst.tr)) * vel;
    
    sx += vx;
    sy += vy;
  
  
  //key
  var h = 15;

  if (r_left) {
    sx -= vel;
  }
  if (r_right) {
    sx += vel;
  }
  if (r_up) {
    sy -= vel;
  }
  if (r_down) {
    sy += vel;
  }

  // 보정
  if (sx + 60 > vcanvas0.width) {
    sx = vcanvas0.width - 60;
  }
  if (sx - 15 < 0) {
    sx = 15;
  }
  if (stype === 3) {
    h = 19;
  }
  if (sy + h > vcanvas0.height) {
    sy = vcanvas0.height - h;
  }
  if (sy - h < 0) {
    sy = h;
  }

  if(count > 10) {stype = 1;}
  if(count > 20) {stype = 2;}
  if(count > 30) {stype = 3;}
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

  if (stype === 1) {
    ctx.fillRect((sx + 42)*ratio, (sy - 5)*ratio, 10*ratio, 10*ratio);
  }
  if (stype > 1) {
    ctx.fillRect((sx + 10)*ratio, (sy - 15)*ratio, 10*ratio, 30*ratio);
  }
  if (stype > 2) {
    ctx.fillRect(sx*ratio, (sy - 19)*ratio, 10*ratio, 38*ratio);
  }
}

function stateInfo() {
  ctx.fillStyle = "white";
  ctx.font = 20*ratio +"px Arial";
  ctx.fillText(
    "Stype: " +
      stype +
      "   Enemy: " +
      arrEnemy.length +
      "   Rocket: " +
      arrRocket.length +
      "   particle: " +
      particle.length,
    10,
    20
  );
}

function gameLoop() {
  clearCanvas();

  updateEnemy();
  deleteEnemy();
  drawEnemy();

  updateShip();
  drawShip();

  updateRocket();
  deleteRocket();
  drawRocket();

  collisionShip();

  updateParticle();
  drawParticle(particle);

  stateInfo();
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
  vcanvas = document.getElementById("myCanvas");
  ctx = vcanvas.getContext("2d");

  sx = 200;
  sy = 200;

  resizeCanvas();

  vcanvas.addEventListener("touchstart",function (e) {
     var touchobj = e.touches[0];
    
     joystick.x = joystick.tx = parseInt(touchobj.clientX, 10);
     joystick.y = joystick.ty = parseInt(touchobj.clientY, 10);
     fire = 1;
     },
     false
     );
    
  vcanvas.addEventListener("touchmove",function (e) {
     var touchobj = e.touches[0];
     joystick.tx = parseInt(touchobj.clientX, 10);
     joystick.ty = parseInt(touchobj.clientY, 10);
     fire = 0;
     },
     false
     );
    
  vcanvas.addEventListener("touchend",function (e) {
    joystick.x = joystick.tx = joystick.y = joystick.ty = 0;
  },false);

  setInterval(createEnemy, 1000);
  setInterval(createRocket, 100);
  setInterval(gameLoop, 20);
}

// key control
function set_key(event) {
  if (event.keyCode === 37) {
    r_left = 1;
  }
  if (event.keyCode === 38) {
    r_up = 1;
  }
  if (event.keyCode === 39) {
    r_right = 1;
  }
  if (event.keyCode === 40) {
    r_down = 1;
  }

  if (event.keyCode === 48) {
    stype = 0;
  }
  if (event.keyCode === 49) {
    stype = 1;
  }
  if (event.keyCode === 50) {
    stype = 2;
  }
  if (event.keyCode === 51) {
    stype = 3;
  }

  if (event.keyCode === 32) {
    fire = 1;
  }
}

function stop_key(event) {
  if (event.keyCode === 37) {
    r_left = 0;
  }
  if (event.keyCode === 38) {
    r_up = 0;
  }
  if (event.keyCode === 39) {
    r_right = 0;
  }
  if (event.keyCode === 40) {
    r_down = 0;
  }

  if (event.keyCode === 32) {
    fire = 0;
  }
}
document.onkeydown = set_key;
document.onkeyup = stop_key;
