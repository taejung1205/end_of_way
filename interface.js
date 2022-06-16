let currentFadeFrame = 0;
let fadeFrame = 60;
let isFadingOut = false;

function showDialogue(dialogue){
  let boxX = 20;
  let boxY = (height * 3) / 4;
  rectMode(CORNER);
  textAlign(LEFT, TOP);
  //바깥 박스
  stroke(0,150);
  fill(255,220);
  rect(boxX, boxY, width-boxX*2, 80); 
  //안쪽 박스
  noFill();
  rect(boxX+5, boxY+5, width-boxX*2-10, 70);
  
  //대사
  textStyle(BOLD);
  fill(0);
  strokeWeight(1);
  textSize(12);
  text(dialogue, boxX+20, boxY+25);
}

function startFadeOut(f){
  fadeFrame = f;
  currentFadeFrame = 0;
  isFadingOut = true;
}

function showAndProgressFadeOut(fadeEndCallback, isWhite){
  let c = currentFadeFrame / fadeFrame * 255;
  rectMode(CORNER);
  if(isWhite){
    fill(255, c);
  } else {
    fill(0, c);
  }
  rect(0, 0, width, height);
  currentFadeFrame++;
  if(currentFadeFrame >= fadeFrame){
    isFadingOut = false;
    fadeEndCallback();
  }
}

function showMenuButton(x, y, w, h, t, fs){
  rectMode(CORNER);
  if(mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h){
    fill(130);
  } else {
    fill(200);
  }
  strokeWeight(2);
  stroke(100);
  rect(x, y, w, h);
  textAlign(CENTER, CENTER);
  textSize(fs);
  strokeWeight(1);
  fill(0);
  text(t, x + w / 2, y + h / 2);
}

function isButtonClicked(x, y, w, h){
  if(mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h){
    return true;
  } else {
    return false;
  }
}

class PasswordButton {
  constructor(x, y, d, t) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.t = t;
  }
  show() {
    noStroke();
    fill(255, 179, 193);
    ellipse(this.x, this.y, this.d);
    fill(20, 20, 20);
    textSize(15);
    textAlign(CENTER, CENTER);
    text(this.t, this.x, this.y);
  }
  
  isClicked(){
    if(dist(this.x, this.y, mouseX, mouseY) < this.d/2){
    return true;
  } else {
    return false;
  }
  }
}
