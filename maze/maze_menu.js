//let isMazeShowingMenu = false;

//let isShowingPassword = false;
let isShowingChecklist = false;

let isTargetRevealed = false;

let buttonWidth = 180;
let buttonHeight = 40;

let buttonX = 30;
let goToStartButtonY = 100;
let qrListButtonY = 160;
let passwordButtonY = 220;
let closeMenuButtonY = 280;

let menuBackButtonX = 30;
let menuBackButtonY = 340;
let menuBackButtonWidth = 100;
let menuBackButtonHeight = 40;

let menuMapX = 320;
let menuMapY = 50;
let menuMapPixel = 11;

let menuPasswordButtons = [];
//let enteredPassword = [];

function resetMazeMenu() {
  isMazeShowingMenu = false;
  isShowingPassword = false;
  isShowingChecklist = false;
  isMapUnlocked = false;
  isTargetRevealed = false;
  menuPasswordButtons = [];
  enteredPassword = [];
}

function showMazeMenu() {
  background(0, 200);
  if (isShowingChecklist == false && isShowingPassword == false) {
    showMenuInterface();
  } else if (isShowingPassword) {
    showMenuPassword();
  } else {
    showMenuChecklist();
  }
}

function showMenuInterface() {
  textSize(30);
  fill(255);
  textAlign(LEFT, TOP);
  text("MENU", 30, 30);
  showMenuButton(
    buttonX,
    goToStartButtonY,
    buttonWidth,
    buttonHeight,
    "시작 화면으로"
  );
  showMenuButton(
    buttonX,
    qrListButtonY,
    buttonWidth,
    buttonHeight,
    "체크리스트 QR"
  );
  showMenuButton(
    buttonX,
    passwordButtonY,
    buttonWidth,
    buttonHeight,
    "비밀번호 입력"
  );
  showMenuButton(buttonX, closeMenuButtonY, buttonWidth, buttonHeight, "닫기");
}

function showMenuPassword() {
  noStroke();
  rectMode(CORNER);
  fill(255, 102, 128, 255);
  rect(225, 50, 250, 320, 10);
  for (let i = 0; i < 10; i++) {
    menuPasswordButtons[i].show();
  }

  //cancel and enter
  fill(20, 20, 20);
  textSize(15);
  textAlign(LEFT, TOP);
  text("Enter Passcode", 300, 90);

  //password circles
  stroke(100, 100, 100);
  fill(100, 100, 100);
  line(270, 130, 300, 130);
  line(315, 130, 345, 130);
  line(360, 130, 390, 130);
  line(405, 130, 435, 130);

  textSize(20);
  textAlign(CENTER, BOTTOM);
  for (let i = 0; i < enteredPassword.length; i++) {
    text(enteredPassword[i], 285 + i * 45, 130);
  }

  showMenuButton(
    menuBackButtonX,
    menuBackButtonY,
    menuBackButtonWidth,
    menuBackButtonHeight,
    "뒤로"
  );
}

function setupMenuPassword() {
  enteredPassword = [];
  menuPasswordButtons[0] = new PasswordButton(350, 320, 40, "0");
  menuPasswordButtons[1] = new PasswordButton(275, 170, 40, "1");
  menuPasswordButtons[2] = new PasswordButton(350, 170, 40, "2");
  menuPasswordButtons[3] = new PasswordButton(425, 170, 40, "3");
  menuPasswordButtons[4] = new PasswordButton(275, 220, 40, "4");
  menuPasswordButtons[5] = new PasswordButton(350, 220, 40, "5");
  menuPasswordButtons[6] = new PasswordButton(425, 220, 40, "6");
  menuPasswordButtons[7] = new PasswordButton(275, 270, 40, "7");
  menuPasswordButtons[8] = new PasswordButton(350, 270, 40, "8");
  menuPasswordButtons[9] = new PasswordButton(425, 270, 40, "9");
}

function enterPassword(t) {
  enteredPassword.push(t);
  if (enteredPassword.length >= 4) {
    checkMenuPassword();
    enteredPassword = [];
  }
}

function checkMenuPassword() {
  if (
    enteredPassword[0] == "1" &&
    enteredPassword[1] == "7" &&
    enteredPassword[2] == "8" &&
    enteredPassword[3] == "2"
  ) {
    isMapUnlocked = true;
    closeMenu();
    startEvent("Password1");
  } else if (
    enteredPassword[0] == "3" &&
    enteredPassword[1] == "6" &&
    enteredPassword[2] == "1" &&
    enteredPassword[3] == "8"
  ) {
    isTargetRevealed = true;
    maze[3][6] = 1;
    maze[3][8] = 1;
    maze[4][9] = 1;
    maze[4][11] = 1;
    closeMenu();
    startEvent("Password2");
  } else if (
    enteredPassword[0] == "4" &&
    enteredPassword[1] == "6" &&
    enteredPassword[2] == "2" &&
    enteredPassword[3] == "9"
  ) {
    maze[3][2] = 1;
    maze[4][1] = 1;
    closeMenu();
    startEvent("Password3");
  } else {
    wrongSound.play();
    enteredPassword = [];
  }
}

function showMenuChecklist() {
  rectMode(CORNER);
  imageMode(CORNER);
  textAlign(CENTER, CENTER);
  textSize(20);
  fill(100);
  if (hasCheckedQR1) {
    image(qr_1, 20, 20, 180, 180);
  } else {
    rect(20, 20, 180, 180);
  }

  if (hasCheckedQR2) {
    image(qr_2, 230, 20, 180, 180);
  } else {
    rect(230, 20, 180, 180);
  }

  if (hasCheckedQR3) {
    image(qr_3, 440, 20, 180, 180);
  } else {
    rect(440, 20, 180, 180);
  }

  fill(230);

  text("영어공부하기", 110, 225);
  text("봉사활동하기", 320, 225);
  text("한국사시험 신청", 530, 225);

  showMenuButton(
    menuBackButtonX,
    menuBackButtonY,
    menuBackButtonWidth,
    menuBackButtonHeight,
    "뒤로"
  );
}

function mazeMenuMouseClicked(x, y) {
  if (isShowingChecklist == false && isShowingPassword == false) {
    if (isButtonClicked(buttonX, goToStartButtonY, buttonWidth, buttonHeight)) {
      resetAll();
    }

    if (isButtonClicked(buttonX, qrListButtonY, buttonWidth, buttonHeight)) {
      isShowingChecklist = true;
    }

    if (isButtonClicked(buttonX, passwordButtonY, buttonWidth, buttonHeight)) {
      setupMenuPassword();
      isShowingPassword = true;
    }

    if (isButtonClicked(buttonX, closeMenuButtonY, buttonWidth, buttonHeight)) {
      //TODO: close the menu
      closeMenu();
    }
  } else if (isShowingPassword) {
    for (let i = 0; i < 10; i++) {
      if (menuPasswordButtons[i].isClicked()) {
        enterPassword(menuPasswordButtons[i].t);
      }
    }
    if (
      isButtonClicked(
        menuBackButtonX,
        menuBackButtonY,
        menuBackButtonWidth,
        menuBackButtonHeight
      )
    ) {
      isShowingPassword = false;
    }
  } else {
    if (
      isButtonClicked(
        menuBackButtonX,
        menuBackButtonY,
        menuBackButtonWidth,
        menuBackButtonHeight
      )
    ) {
      isShowingChecklist = false;
    }
  }
}


function showLockedMap() {
  rectMode(CORNER);
  noStroke();
  fill(100);
  rect(menuMapX, menuMapY, menuMapPixel * mazeSize, menuMapPixel * mazeSize);
  fill(230);
  circle(menuMapX + (menuMapPixel * mazeSize) / 2, menuMapY + 80, 60);
  fill(100);
  circle(menuMapX + (menuMapPixel * mazeSize) / 2, menuMapY + 80, 40);
  fill(230);
  rectMode(CENTER);
  rect(menuMapX + (menuMapPixel * mazeSize) / 2, menuMapY + 120, 80, 80, 10);
  fill(100);
  circle(menuMapX + (menuMapPixel * mazeSize) / 2, menuMapY + 110, 20);
  triangle(
    menuMapX + (menuMapPixel * mazeSize) / 2,
    menuMapY + 110,
    menuMapX + (menuMapPixel * mazeSize) / 2 - 10,
    menuMapY + 140,
    menuMapX + (menuMapPixel * mazeSize) / 2 + 10,
    menuMapY + 140
  );

  fill(230);
  textSize(20);
  textAlign(CENTER, CENTER);
  textSize(30);
  text("MAP", menuMapX + (menuMapPixel * mazeSize) / 2, menuMapY + 190);
  textSize(20);
  text(
    "비밀번호 해독 필요",
    menuMapX + (menuMapPixel * mazeSize) / 2,
    menuMapY + 250
  );
}

function mazeMenuKeyPressed(k) {
  if (isShowingChecklist == false && isShowingPassword == false) {
    if (k == "m") {
      closeMenu();
    }
  }
}

function closeMenu() {
  isMazeShowingMenu = false;
  isShowingPassword = false;
  isShowingChecklist = false;
}
