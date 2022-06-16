
let moveEffectTimer = 0;
let moveOn = false;
let moveDir = "straight";
let MOVE_FRAME = 120;
let moveZoom = 1;

let fpImgX1 = 0;
let fpImgY1 = 0;

let isMapUnlocked = false;

let strButtonX1 = 300;
let strButtonY1 = 100;
let strButtonWidth = 40;
let strButtonHeight = 15;

let leftButtonX1 = 150;
let leftButtonY1 = 150;
let leftButtonWidth = 40;
let leftButtonHeight = 25;

let rightButtonX1 = 450;
let rightButtonY1 = 150;
let rightButtonWidth = 40;
let rightButtonHeight = 25;

let homeButtonX1 = 10;
let homeButtonY1 = 10;
let homeButtonWidth = 100;
let homeButtonHeight = 20;

function showMaze() {
  background(100);
  showMazeFirstPerson();
  if(moveEffectTimer == 0 && !isMazeShowingEvent){
    showMazeInterface();
  }
  // if (isMazeShowingMenu) {
  //   showMazeMenu();
  // } else 
  if(isMazeShowingEvent) {
    showMazeEvent();
  }
  //showMazeMap(0, 0, 10, true);
}

function showMazeInterface(){
  if(isMapUnlocked){
    showMinimap(width - 10 * maze.length, 0, 10);
    showMinimapIndicator();
  }
  
  //home button
  showMenuButton(homeButtonX1, homeButtonY1, homeButtonWidth, homeButtonHeight, "시작 화면으로", 10);
}

function mazeKeyPressed(k) {
  if (moveEffectTimer == 0) {
    if (isMazeShowingEvent == false) {
      switch (k) {
        case "w":
        case "ArrowUp":
          tryMoveFront();
          break;
        case "a":
        case "ArrowLeft":
          tryMoveLeft();
          break;
        case "d":
        case "ArrowRight":
          tryMoveRight();
          break;
        case "m":
          isMazeShowingMenu = true;
          break;
      }
    }  else {
      mazeEventKeyPressed(k);
    }
  }
}

function mazeMouseClicked(x, y) {
  if (moveEffectTimer == 0) {
    if (isMazeShowingEvent == false) {
      if (
        x > strButtonX1 &&
        x < strButtonX1 + strButtonWidth &&
        y > strButtonY1 &&
        strButtonY1 + strButtonHeight
      ) {
        tryMoveFront();
      }

      if (
        x > leftButtonX1 &&
        x < leftButtonX1 + leftButtonWidth &&
        y > leftButtonY1 &&
        leftButtonY1 + leftButtonHeight
      ) {
        tryMoveLeft();
      }

      if (
        x > rightButtonX1 &&
        x < rightButtonX1 + rightButtonWidth &&
        y > rightButtonY1 &&
        rightButtonY1 + rightButtonHeight
      ) {
        tryMoveRight();
      }
      
      if(isButtonClicked(homeButtonX1, homeButtonY1, homeButtonWidth, homeButtonHeight)){
        resetAll();
      }
    } else if (isMazeShowingEvent == true) {
      mazeEventMouseClicked(x, y);
    } else {
      mazeMenuMouseClicked(x, y);
    }
  }
}

function showMazeFirstPerson() {
  let img;
  img = currentFP();
  translate(width / 2, height / 2);
  imageMode(CENTER);
  rectMode(CORNER);
  scale(moveZoom);
  image(img, fpImgX1, fpImgY1);
  translate(-width / 2, -height / 2);
  if (!isMazeShowingEvent  && moveEffectTimer == 0) {
    showDirectionButton(img);
  }
  if (moveOn) {
    moveZoom += 0.01;
    moveEffectTimer++;
    if (int(moveEffectTimer / 20) % 2 == 0) {
      fpImgY1 -= 2;
    } else {
      fpImgY1 += 2;
    }
    if (moveDir == "left") {
      fpImgX1 += 1.5;
    } else if (moveDir == "right") {
      fpImgX1 -= 1.5;
    }
    fill(0, 0, 0, moveEffectTimer * 3);
    rect(0, 0, width, height);
  }
  if (moveEffectTimer > MOVE_FRAME) {
    moveOn = false;
    moveEffectTimer = 0;
    moveZoom = 1;
    fpImgY1 = 0;
    fpImgX1 = 0;
    playerX = nextPlayerX;
    playerY = nextPlayerY;
    playerDir = nextPlayerDir;
    checkEvent(playerX, playerY, playerDir);
  }
}

function currentFP() {
  let x = playerX;
  let y = playerY;
  let fpSight = new Array(3);
  for (let i = 0; i < 3; i++) {
    fpSight[i] = new Array(3);
  }

  switch (playerDir) {
    case "W":
      for (let i = 0; i <= 2; i++) {
        fpSight.push(new Array(3));
        for (let j = 0; j <= 2; j++) {
          fpSight[i][j] = maze[x - 2 + j][y + 1 - i];
        }
      }
      break;
    case "E":
      for (let i = 0; i <= 2; i++) {
        fpSight.push(new Array(3));
        for (let j = 0; j <= 2; j++) {
          fpSight[i][j] = maze[x + 2 - j][y - 1 + i];
        }
      }
      break;
    case "N":
      for (let i = 0; i <= 2; i++) {
        fpSight.push(new Array(3));
        for (let j = 0; j <= 2; j++) {
          fpSight[i][j] = maze[x - 1 + i][y - 2 + j];
        }
      }
      break;
    case "S":
      for (let i = 0; i <= 2; i++) {
        fpSight.push(new Array(3));
        for (let j = 0; j <= 2; j++) {
          fpSight[i][j] = maze[x + 1 - i][y + 2 - j];
        }
      }
      break;
  }

  for (let i = 0; i <= 2; i++) {
    fpSight.push(new Array(3));
    for (let j = 0; j <= 2; j++) {
      fill(fpSight[i][j] * 255);
      rect(i * 20, 340 + j * 20, 20, 20);
    }
  }

  if (fpSight[1][0] != 1) {
    if (fpSight[0][1] != 1) {
      return pathRightImg;
    } else if (fpSight[2][1] != 1) {
      return pathLeftImg;
    } else {
      return pathLeftRightImg;
    }
  } else {
    if (fpSight[0][1] != 1 && fpSight[2][1] != 1) {
      return pathStrImg;
    } else if (fpSight[2][1] != 1) {
      return pathLeftStrImg;
    } else if (fpSight[0][1] != 1) {
      return pathRightStrImg;
    } else {
      return pathLeftRightStrImg;
    }
  }
}

function showDirectionButton(img) {
  fill(200, 200, 0);
  noStroke();
  if (
    img == pathStrImg ||
    img == pathLeftStrImg ||
    img == pathLeftRightStrImg ||
    img == pathRightStrImg
  ) {
    triangle(
      strButtonX1,
      strButtonY1 + strButtonHeight,
      strButtonX1 + strButtonWidth / 2,
      strButtonY1,
      strButtonX1 + strButtonWidth,
      strButtonY1 + strButtonHeight
    );
  }

  if (
    img == pathLeftImg ||
    img == pathLeftStrImg ||
    img == pathLeftRightImg ||
    img == pathLeftRightStrImg
  ) {
    triangle(
      leftButtonX1,
      leftButtonY1 + leftButtonHeight,
      leftButtonX1 + (leftButtonWidth / 5) * 1,
      leftButtonY1,
      leftButtonX1 + leftButtonWidth,
      leftButtonY1
    );
  }

  if (
    img == pathRightImg ||
    img == pathRightStrImg ||
    img == pathLeftRightImg ||
    img == pathLeftRightStrImg
  ) {
    triangle(
      rightButtonX1,
      rightButtonY1,
      rightButtonX1 + (rightButtonWidth / 5) * 4,
      rightButtonY1,
      rightButtonX1 + rightButtonWidth,
      rightButtonY1 + rightButtonHeight
    );
  }
}


function showMinimap(x, y, pixel) {
  noStroke();

  //draw minimap with (x,y) as left-top corner
  //each block size is pixel
  for (let i = 0; i < mazeSize; i++) {
    for (let j = 0; j < mazeSize; j++) {
      if (maze[i][j] == 0) fill(0);
      else if (maze[i][j] == 1) fill(255);
      else if (maze[i][j] == 2) fill(100);
      //fill(maze[i][j] * 255);
      rect(x + i * pixel, y + j * pixel, pixel, pixel);
    }
  }

  //draw player position
  let cx = x + playerX * pixel + pixel / 2;
  let cy = y + playerY * pixel + pixel / 2;

  fill(200, 0, 0);
  switch (playerDir) {
    case "N":
      triangle(
        cx,
        cy - pixel / 3,
        cx - pixel / 3,
        cy + pixel / 3,
        cx + pixel / 3,
        cy + pixel / 3
      );
      break;
    case "S":
      triangle(
        cx,
        cy + pixel / 3,
        cx - pixel / 3,
        cy - pixel / 3,
        cx + pixel / 3,
        cy - pixel / 3
      );
      break;
    case "W":
      triangle(
        cx - pixel / 3,
        cy,
        cx + pixel / 3,
        cy - pixel / 3,
        cx + pixel / 3,
        cy + pixel / 3
      );
      break;
    case "E":
      triangle(
        cx + pixel / 3,
        cy,
        cx - pixel / 3,
        cy - pixel / 3,
        cx - pixel / 3,
        cy + pixel / 3
      );
      break;
  }
  
  //draw exit
  fill(0, 200, 0);
  rect(x, y + pixel, pixel / 2, pixel);
  
  //draw qr pos
  fill(0, 200, 200);
  if(!hasClearedPassword2){
    circle(x + 1 * pixel + pixel/2, y + 4 * pixel + pixel/2, pixel / 1.2);
  }
  
  if(hasClearedPassword2 && !hasClearedPassword3){
    circle(x + 2 * pixel + pixel/2, y + 11 * pixel + pixel/2, pixel / 1.2);
  }
  
  //draw final door
  if(hasClearedPassword3){
    fill(200, 100, 200);
    rect(x + 2 * pixel, y + 1 * pixel, pixel, pixel);
  }
}

function showMinimapIndicator(){
  //player pos
  fill(255);
  textSize(10);
  textStyle(BOLD);
  textAlign(RIGHT, CENTER);
  text("현위치", width - 27, 140);
  fill(200, 0, 0);
  circle(width - 15, 140, 10);
  
  //exit
  fill(255);
  text("출구", width - 27, 155);
  fill(0, 200, 0);
  circle(width - 15, 155, 10);
  
  //qr location OR final door
  if(!hasClearedPassword3){
    fill(255);
    text("힌트 QR", width - 27, 170);
    fill(0, 200, 200);
    circle(width - 15, 170, 10);
  } else {
    fill(255);
    text("최종 관문", width - 27, 170);
    fill(200, 100, 200);
    circle(width - 15, 170, 10);
  }
  
}
