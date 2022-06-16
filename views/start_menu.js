let introMazeW = [];
let introMazeH = [];
let introMazeWidth = 560;
let introMazeHeight = 360;
let mazeSolution = [];
let solutionMove = 0;
let logoPop;

function showStartMenu() {
  background(0);
  for (let i = 0; i < introMazeH.length; i++) {
    for (let j = 0; j < introMazeH[i].length; j++) {
      stroke(255);
      strokeWeight(3);
      line(
        40 + i * 20,
        introMazeH[i][j] * 20 + 20,
        40 + i * 20,
        (introMazeH[i][j] + 1) * 20 + 20
      );
    }
  }

  for (let a = 0; a < introMazeW.length; a++) {
    for (let b = 0; b < introMazeW[a].length; b++) {
      stroke(255);
      strokeWeight(3);
      line(
        40 + introMazeW[a][b] * 20,
        20 + 20 * a,
        40 + (introMazeW[a][b] + 1) * 20,
        20 + 20 * a
      );
    }
  }
  solutionDisplay();
  if (frameCount % 5 == 0 && mazeSolution.length < solutionLocation.length) {
    solutionAdd();
  }

  if (mazeSolution.length == solutionLocation.length) {
    let triPointX = mazeSolution[mazeSolution.length - 1][0] * 20 + 50;
    let triPointY = mazeSolution[mazeSolution.length - 1][1] * 20 + 30;
    noStroke();
    fill(255, 0, 0, 200);
    triangle(
      triPointX,
      triPointY,
      triPointX - 8,
      triPointY - 10,
      triPointX + 8,
      triPointY - 10
    );
    logoPop = true;
  }

  if (logoPop == true) {
    for (let i = 0; i < 50; i++) {
      noStroke();
      fill(255, 255 - 5 * i);
      ellipse(width / 2, height / 2, 6 * i, 6 * i);
    }

    textAlign(CENTER, CENTER);
    textSize(40);
    textStyle(BOLD);
    strokeWeight(2);
    stroke(255);
    fill(0);
    text("길의 끝", width / 2, height / 2 - 30);

    textAlign(CENTER, CENTER);
    textSize(15);
    fill(0);
    text("Press any key to start", width / 2, height / 2 + 40);
  }
}

function setupStartMenu() {
  logoPop = false;
  introMazeH[0] = [0, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
  introMazeH[1] = [1, 2, 3, 4, 6, 7, 14, 15, 16];
  introMazeH[2] = [0, 1, 3, 5, 8, 9, 10, 12, 13, 14];
  introMazeH[3] = [2, 3, 4, 6, 7, 8, 11];
  introMazeH[4] = [3, 4, 5, 7, 10, 12];
  introMazeH[5] = [1, 3, 4, 6, 9, 13, 15];
  introMazeH[6] = [2, 3, 7, 10, 11, 12, 13, 14];
  introMazeH[7] = [1, 2, 5, 6, 12, 13, 14, 16, 17];
  introMazeH[8] = [0, 3, 4, 6, 10, 11, 14, 15, 17];
  introMazeH[9] = [1, 5, 8, 9, 11, 12];
  introMazeH[10] = [3, 6, 8, 10, 13, 14, 15];
  introMazeH[11] = [0, 4, 6, 7, 9, 10, 14, 17];
  introMazeH[12] = [3, 10, 11, 12, 14, 15];
  introMazeH[13] = [1, 4, 5, 6, 13, 15, 16];
  introMazeH[14] = [2, 5, 7, 8, 10, 11, 15, 16, 17];
  introMazeH[15] = [1, 5, 6, 10, 13];
  introMazeH[16] = [0, 2, 4, 7, 9, 12, 14, 15];
  introMazeH[17] = [1, 3, 5, 6, 8, 10, 13, 16];
  introMazeH[18] = [0, 2, 3, 4, 5, 10, 11, 12, 13, 14, 15, 17];
  introMazeH[19] = [3, 6, 8, 9, 10];
  introMazeH[20] = [2, 3, 5, 7, 12, 13, 14, 16, 17];
  introMazeH[21] = [0, 1, 4, 6, 7, 8, 11, 12, 13];
  introMazeH[22] = [1, 2, 3, 4, 5, 6, 9, 10, 11, 12, 14];
  introMazeH[23] = [0, 7, 9, 10, 15];
  introMazeH[24] = [1, 2, 3, 4, 6, 10, 11, 14, 15, 16];
  introMazeH[25] = [5, 7, 10, 12, 13, 15];
  introMazeH[26] = [1, 3, 4, 5, 6, 9, 10, 11, 14];
  introMazeH[27] = [6, 8, 11, 13, 14, 15, 16];
  introMazeH[28] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16, 17];

  introMazeW[0] = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
  ];
  introMazeW[1] = [2, 3, 5, 6, 9, 11, 12, 13, 14, 18, 19, 26];
  introMazeW[2] = [3, 4, 7, 8, 9, 10, 11, 13, 16, 17, 18, 19, 20, 23, 24, 27];
  introMazeW[3] = [2, 4, 8, 10, 11, 12, 15, 21, 22, 26];
  introMazeW[4] = [6, 7, 79, 12, 13, 14, 15, 16, 19, 20, 22, 27];
  introMazeW[5] = [
    0,
    1,
    2,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    17,
    18,
    19,
    23,
    24,
    25,
    26,
    27,
  ];
  introMazeW[6] = [4, 6, 10, 11, 14, 15, 20, 21, 22, 23];
  introMazeW[7] = [1, 2, 5, 8, 9, 12, 13, 15, 16, 17, 18, 24, 27];
  introMazeW[8] = [
    0,
    4,
    5,
    6,
    7,
    8,
    10,
    11,
    12,
    14,
    16,
    19,
    21,
    23,
    24,
    25,
    26,
  ];
  introMazeW[9] = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    11,
    12,
    13,
    14,
    15,
    17,
    18,
    20,
    22,
    23,
    24,
    25,
  ];
  introMazeW[10] = [0, 3, 7, 9, 10, 12, 13, 14, 16, 19, 20, 24, 26, 27];
  introMazeW[11] = [0, 2, 4, 5, 6, 8, 12, 15, 20];
  introMazeW[12] = [
    1,
    3,
    5,
    7,
    10,
    11,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    23,
    24,
    25,
    26,
  ];
  introMazeW[13] = [0, 2, 3, 4, 8, 9, 10, 11, 12, 13, 14, 19, 21, 23, 24, 26];
  introMazeW[14] = [3, 4, 8, 11, 13, 16, 18, 22, 23, 25];
  introMazeW[15] = [2, 4, 5, 6, 9, 12, 14, 16, 19, 20, 21, 25];
  introMazeW[16] = [
    1,
    2,
    3,
    4,
    6,
    7,
    8,
    10,
    11,
    14,
    15,
    17,
    18,
    19,
    20,
    21,
    22,
    26,
  ];
  introMazeW[17] = [1, 2, 3, 4, 5, 9, 10, 12, 15, 16, 21, 22, 23, 24, 25, 26];
  introMazeW[18] = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
  ];

  mazeSolution = [
    [-1, 2],
    [0, 2],
  ];
  solutionLocation = [
    [-1, 2],
    [0, 2],
    [0, 1],
    [0, 0],
    [1, 0],
    [1, 1],
    [1, 2],
    [2, 2],
    [2, 1],
    [3, 1],
    [4, 1],
    [4, 0],
    [5, 0],
    [6, 0],
    [7, 0],
    [7, 1],
    [8, 1],
    [8, 0],
    [9, 0],
    [10, 0],
    [10, 1],
    [11, 1],
    [12, 1],
    [12, 2],
    [13, 2],
    [13, 3],
    [14, 3],
    [15, 3],
    [16, 3],
    [16, 2],
    [17, 2],
    [17, 3],
    [17, 4],
    [16, 4],
    [16, 5],
    [15, 5],
    [15, 4],
    [14, 4],
    [13, 4],
    [13, 5],
    [13, 6],
    [14, 6],
    [14, 7],
    [15, 7],
    [15, 8],
    [16, 8],
    [16, 9],
    [17, 9],
    [18, 9],
    [18, 10],
    [18, 11],
    [19, 11],
    [20, 11],
    [20, 12],
    [20, 13],
    [20, 14],
    [21, 14],
    [21, 13],
    [22, 13],
    [23, 13],
    [24, 13],
    [24, 14],
    [24, 15],
    [24, 16],
    [25, 16],
    [25, 15],
    [26, 15],
    [26, 14],
    [26, 13],
    [25, 13],
    [25, 12],
    [26, 12],
    [27, 12],
    [27, 13],
    [27, 14],
    [28, 14],
  ];
}

function startMenuKeyPressed(k) {
  if (logoPop == true) {
    kakaotalkSound.play();
    viewManager.setView("Intro0");
  } else {
    while (mazeSolution.length < solutionLocation.length) {
      solutionAdd();
    }
  }
}

function solutionDisplay() {
  for (let i = 0; i < mazeSolution.length - 1; i++) {
    strokeWeight(2);
    stroke(255, 0, 0);
    line(
      mazeSolution[i][0] * 20 + 50,
      mazeSolution[i][1] * 20 + 30,
      mazeSolution[i + 1][0] * 20 + 50,
      mazeSolution[i + 1][1] * 20 + 30
    );
  }
}
function solutionAdd() {
  mazeSolution.push(solutionLocation[mazeSolution.length]);
}
