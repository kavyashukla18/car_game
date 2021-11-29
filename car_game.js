var x;
var y;
var speed;
var uniformDisplacement;
var miles;
var stage;
var cx, cy;
var x1, y1;
var obsCount;
var s;
var totalObsCount;
var life;
var l, d, s;

function create_track(){
  rect(100,0, 200, 400);  
}

function create_car(){

  if (keyIsDown(LEFT_ARROW)) {
    x -= 1;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    x += 1;
  }
  
  fill('green');
  rect(x,y, 20, 30);
}

function obs_coor(){
  
  for(var count = 1; count <= totalObsCount; count++){
      x1[count] = random(100, 280);
      y1[count] = random(0, 250);
    }
}

function create_obstacle(){ 
  if(x1.length > 0 && y1.length > 0){
    for(var count = 1; count <= totalObsCount; count++){
      rect(x1[count], y1[count], 20, 30);
    }
  }
}

function increase_car_speed(){
  if(miles >= 400){
    uniformDisplacement += speed; 
    stage += 1;
    miles = 0;
    totalObsCount -= 1;
  }
}

function change_stage(){
   if(stage > 5){
    init_content();
    clear();
  }
}

function out_of_track(){
  if(x <= 100 || x >= 280){
    life -= 1;
    x = 150;
    y = 400;
  }
}

function detect_obs(){
  
  var w = 20;
  var h = 30;
  
  var intersection_x, intersection_x1, collide_x, intersection_y, intersection_y1, collide_y;
  
  for(var count = 1; count <= totalObsCount; count++){
    
    intersection_y1 = min(y1[count]+h, y+h);
    intersection_y = max(y1[count], y);
    intersection_x = max(x1[count], x);
    intersection_x1 = min(x1[count]+w, x+w);
    collide_x = intersection_x1 - intersection_x;
    collide_y = intersection_y1 - intersection_y;
    if(collide_x > 0 && collide_y>0){
      life -= 1;
      y = 400;
      obs_coor();
      create_obstacle();
    }
  }
}

function init_content(){
  x = 150;
  y = 400;
  speed = 1;
  uniformDisplacement = 1;
  miles = 400;
  stage = 1;
  x1 = [];
  y1 = [];
  totalObsCount = 6;
  obsCount = 0;
  life = 3;
  obs_coor();
  create_obstacle();
  l = createDiv('');
  s = createDiv('');
  d = createDiv('');
}

function setup() {
  createCanvas(400, 400);
  init_content();
}

function draw() {
  noFill();
  background(220);
  
  l.html("Life : "+life);
  d.html("Miles : "+miles);
  s.html("Speed : "+speed);
  
  if(life <= 0){
    textSize(32);
    stroke('red');
    text('You Are Dead !!!', 120, 200);
    noLoop();
  }
  
  y -= uniformDisplacement;
  miles += 1;
  obsCount++;
  out_of_track();
  create_track();
  create_obstacle();
  create_car();
  detect_obs();
  increase_car_speed();
  change_stage();
  if(y <= 0){
    y = 400;
    obs_coor();
  }
  
}
