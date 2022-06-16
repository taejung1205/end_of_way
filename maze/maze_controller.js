let mazeSize;
let maze;
let direction = ["W", "E", "N", "S"];
let playerX;
let playerY;
let nextPlayerX;
let nextPlayerY;
let playerDir;
let nextPlayerDir;
let mapText;



function startMaze() {
  mazeSize =  mapText.length;
  //nextPlayerX = playerX =  3;
  //nextPlayerY = playerY = 9;
  nextPlayerX = playerX =  mazeSize - 2;
  nextPlayerY = playerY = mazeSize - 3;
  playerDir = "N";
  nextPlayerDir = "N";
  maze = new Array(mazeSize);
  
  for(let i =0 ; i < mazeSize; i++){
    maze[i] = new Array(mazeSize);
    for(let j = 0; j < mazeSize; j++){
      maze[i][j] =  mapText[j][i];
    }
  }
  
  isMapUnlocked = false;
}



function tryMoveFront(){
  moveDir = "straight";  
  switch(playerDir){
    case 'W': 
      if(isRoad(playerX-2, playerY)){
        moveOn = true;
        footstepSound.play();
        nextPlayerX -= 2;
      }
      break;
    case 'E':
      if(isRoad(playerX+2, playerY)){
        moveOn = true;
        footstepSound.play();
        nextPlayerX += 2;
      }
      break;
    case 'N':
      if(isRoad(playerX, playerY-2)){
        moveOn = true;
        footstepSound.play();
        nextPlayerY -= 2;
      }
      break;
    case 'S':
      case 'N':
      if(isRoad(playerX, playerY+2)){
         moveOn = true;
        footstepSound.play();
        nextPlayerY += 2;
      }
  }
}

function tryMoveLeft(){
  moveDir = "left";   
  switch(playerDir){
    case 'W': 
      if(isRoad(playerX-1, playerY+1)){
        moveOn = true;
        footstepSound.play();
        nextPlayerX -= 1;
        nextPlayerY += 1;
        nextPlayerDir = 'S';
      }
      break;
    case 'E':
      if(isRoad(playerX+1, playerY-1)){
        moveOn = true;
        footstepSound.play();
        nextPlayerX += 1;
        nextPlayerY -= 1;
        nextPlayerDir = 'N';
      }
      break;
    case 'N':
      if(isRoad(playerX-1, playerY-1)){
        moveOn = true;
        footstepSound.play();
        nextPlayerX -= 1;
        nextPlayerY -= 1;
        nextPlayerDir = 'W';
      }
      break;
    case 'S':
      if(isRoad(playerX+1, playerY+1)){
        moveOn = true;
        footstepSound.play();
        nextPlayerX += 1;
        nextPlayerY += 1;
        nextPlayerDir = 'E';
      }
      break;
  }
}

function tryMoveRight(){
   moveDir = "right";  
  switch(playerDir){
    case 'W': 
      if(isRoad(playerX-1, playerY-1)){
        moveOn = true;
        footstepSound.play();
        nextPlayerX -= 1;
        nextPlayerY -= 1;
        nextPlayerDir = 'N';
      }
      break;
    case 'E':
      if(isRoad(playerX+1, playerY+1)){
        moveOn = true;
        footstepSound.play();
        nextPlayerX += 1;
        nextPlayerY += 1;
        nextPlayerDir = 'S';
      }
      break;
    case 'N':
      if(isRoad(playerX+1, playerY-1)){
        moveOn = true;
        footstepSound.play();
        nextPlayerX += 1;
        nextPlayerY -= 1;
        nextPlayerDir = 'E';
      }
      break;
    case 'S':
      if(isRoad(playerX-1, playerY+1)){
        moveOn = true;
        footstepSound.play();
        nextPlayerX -= 1;
        nextPlayerY += 1;
        nextPlayerDir = 'W';
      }
      break;
  }
}

function isRoad(x, y){
  if(maze[x][y] == 1) return true;
  else return false;
}