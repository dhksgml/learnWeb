"use strict";
var vcanvas, ctx;
var sx, sy;
var r_left, r_up, r_right, r_down;
var vel = 8;
var stype = 0;
var fire = 0;
var arrRocket = [];
var arrEnemy = [];

//충돌처리
var jwh14_bboxship; //기본 충돌처리를 위한 변수
var jwh14_bboxship2 //stype이 3일 경우 충돌처리를 하기 위한 변수

//particle
var jwh14_particle = [] //파티클을 위한 변수
var jwh14_nop = 0;      //파티클 개수

//사각형 충돌처리
function jwh14_hitRect(tc, pc) {
  return (tc.x < pc.x + pc.w && tc.x + tc.w > pc.x && tc.y < pc.y + pc.h && tc.y + tc.h > pc.y);
}

//particle
function jwh14_collisionShip() {
  var i;
  jwh14_bboxship = {x: sx - 20, y: sy - 60, w: 40, h: 75}; //비행선의 콜라이더 생성
  
  if(stype > 2){                    
      jwh14_bboxship2 = {x: sx - 30, y: sy - 15, w: 60, h: 20} //비행선 타입에 따라 콜라이더 크기 변경

      for(i = 0; i < arrEnemy.length; i++){               
        if(jwh14_hitRect(arrEnemy[i], jwh14_bboxship2)){   //확장된 콜라이더와 적이 충돌 시
            jwh14_createParticle(arrEnemy[i])             //파티클 생성
            arrEnemy.splice(i,1);                         //적 삭제
        }
    }
  }
  for(i = 0; i < arrEnemy.length; i++){   
      if(jwh14_hitRect(arrEnemy[i], jwh14_bboxship)){   //기본 콜라이더와 적 충돌 시      
          jwh14_createParticle(arrEnemy[i])             //파티클 생성
          arrEnemy.splice(i,1);                         //적 제거
      }
  }
}

function jwh14_collisionRocket(nowR, pos) {           //로켓 충돌 검사 함수
  var i;
  for(i = 0; i < arrEnemy.length; i++){
      if(jwh14_hitRect(arrEnemy[i],nowR)){          //적과 로켓이 충돌했을 경우
          arrEnemy[i].hit += 1;                     //hit를 1 증가

          if(arrEnemy[i].hit == 1){                 //적과 로켓이 충돌 시
              jwh14_createParticle(arrEnemy[i])     //파티클 생성
              arrEnemy.splice(i,1)                  //적 제거
          }
          arrRocket.splice(pos,1);                  //로켓도 같이 제거
      }
  }
}

//a와 b 사이 랜덤 값 반환
function jwh14_b2v(a,b) {
  return a + (b-a) * Math.random();           
}

//파티클 생성 함수
function jwh14_createParticle(a) {            
  var i, jwh14_x, jwh14_y, jwh14_wh, jwh14_colors, jwh14_d1, jwh14_d2, jwh14_velx, jwh14_vely;

  jwh14_particle = []   //파티클 배열 초기화
  jwh14_nop = 250;      //파티클 개수 지정

  for(i=0; i<jwh14_nop; i+=1){      //파티클 개수만큼 반복
    jwh14_x = a.x + jwh14_b2v(0, a.w * 1.2);  // x값과 w 사이에 랜덤 값을 저장
    jwh14_y = a.y + jwh14_b2v(0, a.h * 1.2);  // y와  h 사이 랜덤 값을 저장
    jwh14_wh = jwh14_b2v(1,10);               // 1~10 사이의 랜덤 값을 저장
    jwh14_colors = a.c + Math.round(20 * Math.random()) //a.c에 랜덤으로 더한 값 저장
    jwh14_d1 = jwh14_b2v(30, 120);            //30~120사이 랜덤 값 저장
    jwh14_d2 = jwh14_b2v(30, 120);            //30~120사이 랜덤 값 저장
    jwh14_velx = (7-jwh14_wh)/3 * jwh14_b2v(-1,1); //파티클의 x방향 속도
    jwh14_vely = (7-jwh14_wh)/3 * jwh14_b2v(-1,1);  //파티클의 y방향 속도

    jwh14_particle.push({px:jwh14_x, py: jwh14_y, pw: jwh14_wh, pc: jwh14_colors, pd1: jwh14_d1, pd2: jwh14_d2, pvx: jwh14_velx, pvy: jwh14_vely}); //파티클 객체 추가
  }
}

//파티클 그리는 함수
function jwh14_drawParticle(tp) {             
  var i;
  var ln;
  for(i=0; i<tp.length; i+=1){
      ln = 80 * tp[i].pd1 / tp[i].pd2;
      ctx.fillStyle = "hsl(" + tp[i].pc + ", 100%," + ln +"%)";
      ctx.fillRect(tp[i].px, tp[i].py, tp[i].pw, tp[i].pw);
      ctx.strokeStyle = "white"
      ctx.strokeRect(tp[i].px, tp[i].py, tp[i].pw, tp[i].pw);
  }
}


//파티클 업데이트(점점 사라지거나 색 변하는 거 적용)
function jwh14_updateParticle() {
  var i;
  var jwh14_K = 1;
  for(i=0; i<jwh14_particle.length; i+=1){
      jwh14_particle[i].px -= jwh14_K * jwh14_particle[i].pvx;
      jwh14_particle[i].py -= jwh14_K * jwh14_particle[i].pvy;

      jwh14_particle[i].pd1 -= jwh14_K * 2;
      if(jwh14_particle[i].pd1 < 0) { jwh14_particle.splice(i,1);}
  }
}

function clearCanvas() {
  ctx.clearRect(0, 0, vcanvas.width, vcanvas.height);
}

// Enemy
function createEnemy() {
  var jwh14_tx, jwh14_ty, jwh14_twh, jwh14_tc, jwh14_tv;

  jwh14_tx = Math.floor(Math.random() * vcanvas.width);
  jwh14_twh = Math.floor(Math.random() * 31) + 10;
  jwh14_ty = 0
  // tc = "#" + parseInt(Math.random() * 0xffffff, 10).toString(16);
  jwh14_tc = Math.round(360*Math.random());
  jwh14_tv = Math.floor(Math.random() * 2) + 1;

  arrEnemy.push({ x: jwh14_tx, y: jwh14_ty, w: jwh14_twh, h: jwh14_twh, c: jwh14_tc, v: jwh14_tv, hit:0 });
}

function updateEnemy() {
  var i;
  for (i = 0; i < arrEnemy.length; i += 1) {
    arrEnemy[i].y += arrEnemy[i].v;
  }
}

function deleteEnemy() {
  var i;
  for (i = 0; i < arrEnemy.length; i += 1) {
    // if (arrEnemy[i].x < arrEnemy[i].w * -1) {
    //   arrEnemy.splice(i, 1);
    // }
    if(arrEnemy[i].y - arrEnemy[i].h > vcanvas.height){
      arrEnemy.splice(i,1);
    }
  }
}

function drawEnemy() {
  var i;
  for (i = 0; i < arrEnemy.length; i += 1) {
    ctx.fillStyle = "hsl(" + arrEnemy[i].c + ", 100%, 50%)";
    ctx.beginPath();
    ctx.arc(arrEnemy[i].x, arrEnemy[i].y, arrEnemy[i].w/2, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Rocket
function createRocket() {
  if (fire) {
    if(stype == 0){
      arrRocket.push({x:sx-2, y:sy - 65, v:5, w:4, h:5, c:"white"});
  }
  if(stype >= 1){
      arrRocket.push({x:sx - 14 , y:sy - 20, v:5, w:4, h:5, c:"orange"});
      arrRocket.push({x:sx + 10 , y:sy - 20, v:5, w:4, h:5, c:"orange"});
  }
  if(stype > 1){
      arrRocket.push({x:sx - 2 , y:sy - 60, v:5, w:4, h:5, c:"red"});
  }
  if(stype > 2){
      arrRocket.push({x:sx - 26 , y:sy - 20, v:5, w:4, h:5, c:"yellow"});
      arrRocket.push({x:sx + 22 , y:sy - 20, v:5, w:4, h:5, c:"yellow"});
  }
  }
}

function updateRocket() {
  var i;
  for (i = 0; i < arrRocket.length; i += 1) {
    arrRocket[i].y -= arrRocket[i].v;
  }
  for(i=0;i<arrRocket.length; i+=1){
    jwh14_collisionRocket(arrRocket[i],i)
  }
}

function deleteRocket() {
  var i;
  for (i = 0; i < arrRocket.length; i += 1) {
    if (arrRocket[i].y < 0) {
      arrRocket.splice(i, 1);
    }
  }
}

function drawRocket() {
  var i;
  for (i = 0; i < arrRocket.length; i += 1) {
    ctx.fillStyle = arrRocket[i].c;
    ctx.fillRect(
      arrRocket[i].x,
      arrRocket[i].y,
      arrRocket[i].w,
      arrRocket[i].h
    );
  }
}

// ship
function updateShip() {
  var h = 20;

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

  if(stype == 3){
    h = 30
  }
  // 보정
  if (sx + h > vcanvas.width) {
    sx = vcanvas.width - h;
  }
  if (sx - h < 0) {
    sx = h;
  }
  if (sy + 15 > vcanvas.height) {
    sy = vcanvas.height - 15;
  }
  if (sy - 60 < 0) {
    sy = 60;
  }


}

function drawShip() {
  ctx.fillStyle = "red"
  ctx.beginPath();
  ctx.moveTo(sx, sy + 15);
  ctx.lineTo(sx + 5, sy);
  ctx.lineTo(sx + 20, sy);
  ctx.lineTo(sx + 10, sy - 10);
  ctx.lineTo(sx + 5, sy - 5);
  ctx.lineTo(sx, sy - 60);
  ctx.lineTo(sx - 5, sy - 5);
  ctx.lineTo(sx - 10, sy - 10);
  ctx.lineTo(sx -20, sy);
  ctx.lineTo(sx - 5, sy);
  ctx.lineTo(sx, sy + 15);
  ctx.fill();

  if(stype >= 1){
      ctx.fillStyle = "orange"
      ctx.fillRect(sx - 15, sy - 15, 5, 10);
      ctx.fillRect(sx + 10, sy - 15, 5, 10);
  }
  if(stype > 1){
      ctx.fillStyle = "red"
      ctx.fillRect(sx - 5, sy - 60, 10, 10);
  }
  if(stype > 2){
      ctx.fillStyle = "yellow"
      ctx.fillRect(sx + 20, sy - 15, 10, 20);
      ctx.fillRect(sx - 30, sy - 15, 10, 20);
  }

  //콜라이더
  ctx.strokeStyle = "white"
  ctx.strokeRect(jwh14_bboxship.x, jwh14_bboxship.y, jwh14_bboxship.w, jwh14_bboxship.h);

  if(stype>2){
    ctx.strokeRect(jwh14_bboxship2.x, jwh14_bboxship2.y, jwh14_bboxship2.w, jwh14_bboxship2.h);
  }
}

function stateInfo() {
  ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.font = "15pt arial";
    ctx.fillText("무기타입: "+stype+
    " 적수: "+arrEnemy.length+
    " 로켓수: "+arrRocket.length+
    " 조각수: "+jwh14_particle.length
    ,10,870);
}

function gameLoop() {
  clearCanvas();

  jwh14_collisionShip();

  drawShip();
  updateShip();

  updateEnemy();
  deleteEnemy();
  drawEnemy();

  

  jwh14_updateParticle();
  jwh14_drawParticle(jwh14_particle);

  updateRocket();
  deleteRocket();
  drawRocket();

  stateInfo();

  
}

function init() {
  vcanvas = document.getElementById("myCanvas");
  ctx = vcanvas.getContext("2d");

  sx = 200;
  sy = 700;

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
