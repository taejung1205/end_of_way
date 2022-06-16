let viewManager;

function preload(){
  mapText = loadStrings('assets/map.txt');
  footstepSound = loadSound('assets/sounds/footstep.mp3');
  kakaotalkSound = loadSound('assets/sounds/kakaotalk.mp3');
  keyboardSound = loadSound('assets/sounds/keyboard.mp3');
  mouseSound = loadSound('assets/sounds/mouse.mp3');
  camera0Sound = loadSound('assets/sounds/camera_0.mp3');
  camera1Sound = loadSound('assets/sounds/camera_1.mp3');
  wrongSound = loadSound('assets/sounds/wrong.mp3');
  clearSound = loadSound('assets/sounds/clear.mp3');
  
  qr_1 = loadImage('assets/images/qr_1.png', img => {
    img.resize(200, 200);
  });
  
  qr_2 = loadImage('assets/images/qr_2.png', img => {
    img.resize(200, 200);
  });
  
  qr_3 = loadImage('assets/images/qr_3.png', img => {
    img.resize(200, 200);
  });
  
  clearScreen_1 = loadImage('assets/images/clear_1.jpg', img => {
    img.resize(120, 240);
  });
  
  clearScreen_2 = loadImage('assets/images/clear_2.jpg', img => {
    img.resize(120, 240);
  });
  
  clearScreen_3 = loadImage('assets/images/clear_3.jpg', img => {
    img.resize(120, 240);
  });
  
  mapClean = loadImage('assets/images/map_clean.jpg', img => {
    img.resize(200, 200);
    img.filter(BLUR, 5);
  });
  
  loadPathImg();
}

function setup() {
  createCanvas(640, 400);
  viewManager =  new ViewManager("Start Menu");
  setupStartMenu();
  startMaze();
  fullscreen();
}

function draw() {
  background(220);
  viewManager.showView();
}

function keyPressed(){
  if(key == "Enter"){
    let fs = fullscreen();
    fullscreen(!fs);
  } else {
    viewManager.viewKeyPressed(key);
  }
}

function mouseClicked(){
  viewManager.mouseClicked(mouseX, mouseY);
}

function loadPathImg(){
  pathLeftImg= loadImage('assets/images/path_left.jpg', img => {
    img.resize(800, 800 * img.height / img.width);
  });
  pathLeftStrImg = loadImage('assets/images/path_left_str.jpg', img => {
    img.resize(800, 800 * img.height / img.width);
  });
  pathRightImg = loadImage('assets/images/path_right.jpg', img => {
    img.resize(800, 800 * img.height / img.width);
  });
  pathRightStrImg = loadImage('assets/images/path_right_str.jpg', img => {
    img.resize(800, 800 * img.height / img.width);
  });
  pathLeftRightImg = loadImage('assets/images/path_left_right.jpg', img => {
    img.resize(800, 800 * img.height / img.width);
  });
  pathStrImg = loadImage('assets/images/path_str.jpg', img => {
    img.resize(800, 800 * img.height / img.width);
  });
  pathLeftRightStrImg = loadImage('assets/images/path_left_right_str.jpg', img => {
    img.resize(800, 800 * img.height / img.width);
  });
}

function resetAll(){
  viewManager.setView("Start Menu");
  setupStartMenu();
  introSceneNum = 0;
  startMaze();
  resetMazeEvent();
  epilogueSceneNum = 0;
}