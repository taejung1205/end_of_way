// let hasCheckedQR2 = false;
// let hasCheckedQR3 = false;

let checkingQR = 0; // 4 is final door
let isShowingPassword = false;

let hasClearedPassword1 = false;
let hasClearedPassword2 = false;
let hasClearedPassword3 = false;
let isFinalDoorOpened = false;

let isMazeShowingEvent = true;

let mazeSceneNum = 0;
let mazeCurrentEvent = "Start";
let checkingClearScreen = 1;

let passwordButtons = [];
let enteredPassword = [];

let clearScreen1ButtonX1 = 55;
let clearScreen2ButtonX1 = 120;
let clearScreen3ButtonX1 = 185;
let clearScreen4ButtonX1 = 250;
let clearScreenButtonY1 = 300;
let clearScreenButtonWidth = 60;
let clearScreenButtonHeight = 25;

function resetMazeEvent() {
  print('reset');
  checkingQR = 0;
  hasClearedPassword1 = false;
  hasClearedPassword2 = false;
  hasClearedPassword3 = false;
  isFinalDoorOpened = false;

  isMazeShowingEvent = true;
  mazeSceneNum = 0;
  mazeCurrentEvent = "Start";

  passwordButtons = [];
  enteredPassword = [];
}

function showMazeEvent() {
  switch (mazeCurrentEvent) {
    case "Start":
      showMazeStartEvent();
      break;
    case "QR1":
      showQR1Event();
      break;
    case "QR2":
      showQR2Event();
      break;
    case "QR3":
      showQR3Event();
      break;
    case "Password1":
      showPassword1Event();
      break;
    case "Password2":
      showPassword2Event();
      break;
    case "Password3":
      showPassword3Event();
      break;
    case "Final Door":
      showFinalDoorEvent(isFinalDoorOpened);
      break;
    case "Final Door Opened":
      showFinalDoorOpenedEvent();
      break;
    case "Clear":
      showClearEvent();
      break;
  }

  if (isFadingOut) {
    showAndProgressFadeOut(() => {
      introSceneNum = 0;
      viewManager.setView("Epilogue");
      setupStartMenu();
    }, true);
  }
}

function mazeEventMouseClicked(x, y) {
  if (!isShowingPassword) {
    mazeEventKeyPressed("mouse");
  } else {
    for (let i = 0; i < 10; i++) {
      if (passwordButtons[i].isClicked()) {
        enterPassword(passwordButtons[i].t);
        return;
      }
    }

    if (mazeCurrentEvent == "Final Door") {
      if (
        isButtonClicked(
          clearScreen1ButtonX1,
          clearScreenButtonY1,
          clearScreenButtonWidth,
          clearScreenButtonHeight
        )
      ) {
        checkingClearScreen = 1;
      }

      if (
        isButtonClicked(
          clearScreen2ButtonX1,
          clearScreenButtonY1,
          clearScreenButtonWidth,
          clearScreenButtonHeight
        )
      ) {
        checkingClearScreen = 2;
      }

      if (
        isButtonClicked(
          clearScreen3ButtonX1,
          clearScreenButtonY1,
          clearScreenButtonWidth,
          clearScreenButtonHeight
        )
      ) {
        checkingClearScreen = 3;
      }

      if (
        isButtonClicked(
          clearScreen4ButtonX1,
          clearScreenButtonY1,
          clearScreenButtonWidth,
          clearScreenButtonHeight
        )
      ) {
        checkingClearScreen = 4;
      }
    }
  }
}

function mazeEventKeyPressed(k) {
  if (!isShowingPassword) {
    mazeSceneNum++;
  }

  switch (mazeCurrentEvent) {
    case "Start":
      if (mazeSceneNum >= 8) {
        mazeSceneNum = 0;
        isMazeShowingEvent = false;
      }
      break;
    case "QR1":
      if (mazeSceneNum == 4) {
        isShowingPassword = true;
        checkingQR = 1;
      }
      break;
    case "QR2":
      if (mazeSceneNum == 1) {
        isShowingPassword = true;
        checkingQR = 2;
      }
      break;
    case "QR3":
      if (mazeSceneNum == 1) {
        isShowingPassword = true;
        checkingQR = 3;
      }
      break;
    case "Password1":
      isMazeShowingEvent = false;
      hasClearedPassword1 = true;
      break;
    case "Password2":
      isMazeShowingEvent = false;
      hasClearedPassword2 = true;
      break;
    case "Password3":
      isMazeShowingEvent = false;
      hasClearedPassword3 = true;
      break;
    case "Final Door":
      if (mazeSceneNum == 1) {
        isShowingPassword = true;
        checkingQR = 4;
      }
      break;
    case "Final Door Opened":
      isFinalDoorOpened = true;
      mazeSceneNum = 0;
      isMazeShowingEvent = false;
      break;
    case "Clear":
      if (mazeSceneNum >= 1) {
        startFadeOut(200);
      }
      break;
  }
}

function showMazeStartEvent() {
  if (mazeSceneNum == 0) {
    showDialogue("...?");
  }

  if (mazeSceneNum == 1) {
    showDialogue("여기는 어디지? 방금까지 집에 있었는데...");
  }

  if (mazeSceneNum == 2) {
    showDialogue("누구 없어요? 사람 살려요!");
  }

  if (mazeSceneNum == 3) {
    showDialogue("핸드폰... 그래 핸드폰으로 누군가 연락해보자");
  }

  if (mazeSceneNum >= 4 && mazeSceneNum <= 5) {
    showPhone(mazeSceneNum);
  }

  if (mazeSceneNum == 4) {
    showDialogue("뭐야... 이거 먹통인데? 그리고 왜 체크리스트가 내 폰에 있지?");
  }

  if (mazeSceneNum == 5) {
    showDialogue("이건 또 뭐야? 미로를 탈출하라고...?");
  }

  if (mazeSceneNum == 6) {
    showDialogue("...무슨 상황인지는 모르겠지만, 일단 여기를 벗어나보자.");
  }

  if (mazeSceneNum == 7) {
    showDialogue(
      "* 키보드 방향키 / W,A,D 또는 마우스 조작을 통해 이동할 수 있습니다."
    );
  }
}

function checkEvent(x, y, d) {
  print("X: " + playerX + " Y: " + playerY);
  if (x == 9 && y == 8 && !hasClearedPassword1) {
    setupPassword(360, 25);
    startEvent("QR1");
  }

  if (x == 1 && y == 4 && !hasClearedPassword2) {
    setupPassword(360, 25);
    startEvent("QR2");
  }

  if (x == 2 && y == 11 && !hasClearedPassword3) {
    setupPassword(360, 25);
    startEvent("QR3");
  }

  if (
    ((x == 3 && y == 2 && d == "N") || (x == 4 && y == 1 && d == "W")) &&
    !isFinalDoorOpened
  ) {
    setupPassword(360, 25);
    startEvent("Final Door");
  }

  if (x == 2 && y == 1) {
    startEvent("Clear");
  }
}

function startEvent(event) {
  isMazeShowingEvent = true;
  mazeSceneNum = 0;
  mazeCurrentEvent = event;
}

function showFinalDoorEvent(isOpened) {
  if (!isOpened) {
    if (mazeSceneNum == 0) {
      showDialogue(
        "앞에 입력장치가 있는 벽이 있다. 비밀번호를 입력해야 지나갈 수 있는 것 같다.\n(* 마우스 클릭으로 번호를 입력하세요)"
      );
    } else {
      showPassword(360, 25);
      showClearScreens();
    }
  }
}

function showFinalDoorOpenedEvent() {
  showDialogue("문이 열렸다!");
}

function showQR1Event() {
  if (mazeSceneNum == 0) {
    showDialogue("근데 길도 모르는데 어떻게 여길 탈출하지... ");
  }

  if (mazeSceneNum == 1) {
    showDialogue("음, 이건 뭐지? 또다른 QR코드?");
  }

  if (mazeSceneNum == 2) {
    showDialogue(
      "* 미로를 돌아다니다 보면 QR 코드를 발견할 수 있습니다. \nQR 코드 안에는 주인공의 체크리스트를 바탕으로 한 미니게임이 담겨 있습니다."
    );
  }

  if (mazeSceneNum == 3) {
    showDialogue(
      "* 미로를 탈출하기 위해선 체크리스트를 완수하고, 비밀번호와 그 안에 담긴 힌트를 알아내야 합니다. \n지금 QR코드를 찍어서 확인하세요."
    );
  }

  if (mazeSceneNum == 4) {
    showPassword(360, 25);
    showQR(qr_1, 88, 30);
    showQRText();
    //showClearScreens();
  }
}

function showQR2Event() {
  //showQR(qr_2);
  if (mazeSceneNum == 0) {
    showDialogue("새로운 QR 코드를 발견하였다.");
  } else {
    showPassword(360, 25);
    showQR(qr_2, 88, 30);
    showQRText();
  }
}

function showQR3Event() {
  //showQR(qr_2);
  if (mazeSceneNum == 0) {
    showDialogue("새로운 QR 코드를 발견하였다.");
  } else {
    showPassword(360, 25);
    showQR(qr_3, 88, 30);
    showQRText();
  }
}

function showPassword1Event() {
  showDialogue(
    "* 지도가 해금되었습니다. 다음 QR 코드의 위치를 확인할 수 있습니다."
  );
}

function showPassword2Event() {
  showDialogue("* 다음 QR코드의 위치가 드러납니다. 막혀 있던 길이 열렸습니다.");
}

function showPassword3Event() {
  showDialogue(
    "마지막 관문의 위치가 지도 상에 드러나고, 막힌 길이 열렸습니다.\n\n* 마지막 관문의 힌트: 각 체크리스트의 비밀번호 중 특이한 숫자, 그리고 지도"
  );
}

function showClearEvent() {
  if (mazeSceneNum == 0) {
    showDialogue("드디어 탈출이다!! \n");
  }
}

function showQR(img, x, y) {
  imageMode(CORNER);
  image(img, x, y);
}

function setupPassword(x, y) {
  enteredPassword = [];
  passwordButtons[0] = new PasswordButton(x + 125, y + 270, 40, "0");
  passwordButtons[1] = new PasswordButton(x + 50, y + 120, 40, "1");
  passwordButtons[2] = new PasswordButton(x + 125, y + 120, 40, "2");
  passwordButtons[3] = new PasswordButton(x + 200, y + 120, 40, "3");
  passwordButtons[4] = new PasswordButton(x + 50, y + 170, 40, "4");
  passwordButtons[5] = new PasswordButton(x + 125, y + 170, 40, "5");
  passwordButtons[6] = new PasswordButton(x + 200, y + 170, 40, "6");
  passwordButtons[7] = new PasswordButton(x + 50, y + 220, 40, "7");
  passwordButtons[8] = new PasswordButton(x + 125, y + 220, 40, "8");
  passwordButtons[9] = new PasswordButton(x + 200, y + 220, 40, "9");
}

function enterPassword(t) {
  enteredPassword.push(t);
  if (enteredPassword.length >= 4) {
    checkPassword();
    enteredPassword = [];
  }
}

function checkPassword() {
  if (
    checkingQR == 1 &&
    enteredPassword[0] == "1" &&
    enteredPassword[1] == "7" &&
    enteredPassword[2] == "8" &&
    enteredPassword[3] == "2"
  ) {
    clearSound.play();
    isMapUnlocked = true;
    isShowingPassword = false;
    startEvent("Password1");
  } else if (
    checkingQR == 2 &&
    enteredPassword[0] == "3" &&
    enteredPassword[1] == "6" &&
    enteredPassword[2] == "1" &&
    enteredPassword[3] == "8"
  ) {
    clearSound.play();
    isShowingPassword = false;
    startEvent("Password2");
    maze[3][6] = 1;
    maze[3][8] = 1;
    maze[4][9] = 1;
    maze[4][11] = 1;
  } else if (
    checkingQR == 3 &&
    enteredPassword[0] == "4" &&
    enteredPassword[1] == "6" &&
    enteredPassword[2] == "2" &&
    enteredPassword[3] == "9"
  ) {
    clearSound.play(); 
    isShowingPassword = false;
    startEvent("Password3");
    maze[3][2] = 1;
    maze[4][1] = 1;
  } else if (
    checkingQR == 4 &&
    enteredPassword[0] == "2" &&
    enteredPassword[1] == "3" &&
    enteredPassword[2] == "2" &&
    enteredPassword[3] == "7"
  ) {
    clearSound.play(); 
    isShowingPassword = false;
    maze[2][1] = 1;
    startEvent("Final Door Opened");
  } else {
    wrongSound.play();
    enteredPassword = [];
  }
}

function showPassword(x, y) {
  //origin: 250, 50
  //x: 375, y: 25 (+125, -25)
  noStroke();
  rectMode(CORNER);
  background(0, 200);
  fill(255, 102, 128, 255);
  rect(x, y, 250, 320, 10);
  for (let i = 0; i < 10; i++) {
    passwordButtons[i].show();
  }

  fill(20, 20, 20);
  textSize(15);
  textAlign(CENTER, CENTER);
  text("Enter Password", x + 125, y + 40);

  //entered password blocks
  stroke(100, 100, 100);
  fill(100, 100, 100);
  line(x + 50, y + 80, x + 80, y + 80);
  line(x + 90, y + 80, x + 120, y + 80);
  line(x + 130, y + 80, x + 160, y + 80);
  line(x + 170, y + 80, x + 200, y + 80);

  textSize(20);
  textAlign(CENTER, BOTTOM);
  for (let i = 0; i < enteredPassword.length; i++) {
    text(enteredPassword[i], x + 65 + i * 40, y + 80);
  }
}

function showQRText() {
  textSize(20);
  fill(170);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text("QR 코드 속 미니게임을 풀고\n비밀번호를 획득하세요", 188, 290);
  textSize(10);
  textStyle(NORMAL);
  text(
    "정상적인 실행을 위해 Chrome 브라우저로 실행해주시기 바랍니다.",
    188,
    340
  );
}

//show clear screens of each minigames.
function showClearScreens() {
  //Buttons to switch between each hints
  showMenuButton(
    clearScreen1ButtonX1,
    clearScreenButtonY1,
    clearScreenButtonWidth,
    clearScreenButtonHeight,
    "Hint 1",
    15
  );

  showMenuButton(
    clearScreen2ButtonX1,
    clearScreenButtonY1,
    clearScreenButtonWidth,
    clearScreenButtonHeight,
    "Hint 2",
    15
  );

  showMenuButton(
    clearScreen3ButtonX1,
    clearScreenButtonY1,
    clearScreenButtonWidth,
    clearScreenButtonHeight,
    "Hint 3",
    15
  );

  showMenuButton(
    clearScreen4ButtonX1,
    clearScreenButtonY1,
    clearScreenButtonWidth,
    clearScreenButtonHeight,
    "Hint 4",
    15
  );

  //each clear screens
  imageMode(CORNER);

  if (checkingClearScreen == 1) {
    image(clearScreen_1, 120, 30);
  }

  if (checkingClearScreen == 2) {
    image(clearScreen_2, 120, 30);
  }

  if (checkingClearScreen == 3) {
    image(clearScreen_3, 120, 30);
  }

  if (checkingClearScreen == 4) {
    showMinimap(50, 30, 20);
  }

  fill(170);
  textSize(10);
  textStyle(NORMAL);
  text("세 비밀번호와 지도를 유심히 살펴보자.", 188, 340);
}

function showPhone() {
  let phoneSizeX = 150;
  let phoneSizeY = 280;
  let phoneYStart = 30;
  let phoneXStart = 145;

  strokeWeight(3);
  stroke(70, 80, 225);
  fill(0);
  rect(
    width / 2 - phoneSizeX / 2,
    phoneYStart,
    phoneSizeX,
    phoneSizeY,
    5,
    5,
    5,
    5
  );

  strokeWeight(1);
  stroke(200);
  noFill();
  ellipse(width / 2, phoneYStart + 10, 10, 10);

  textSize(8);
  textAlign(CENTER, CENTER);
  fill(255);
  let time = "?:??";
  text(time, width / 2 - 50, phoneYStart + 10);
  let battery = "50%";
  text(battery, width / 2 + 48, phoneYStart + 10);

  strokeWeight(1);
  stroke(255);
  noFill();
  rect(width / 2 + 60, phoneYStart + 5, 5, 10);
  fill(255);
  rect(width / 2 + 60, phoneYStart + 10, 5, 5);
  noFill();
  ellipse(width / 2 + 32, phoneYStart + 10, 8, 8);
  arc(
    width / 2 + 32,
    phoneYStart + 10,
    8,
    8,
    QUARTER_PI,
    PI + QUARTER_PI,
    CHORD
  );

  fill(255);
  if (mazeSceneNum == 4) {
    let checklistX1 = 250;
    let checklistY1 = 70;
    let checklistWidth = 140;
    let checklistHeight = 250;
    noStroke();

    textStyle(BOLD);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(18);
    text("체크리스트", checklistX1 + checklistWidth / 2, checklistY1 + 20);
    textAlign(LEFT, CENTER);
    textSize(15);
    text("1. 영어공부하기", checklistX1 + 10, checklistY1 + 50);
    textSize(15);
    text("2. 봉사활동", checklistX1 + 10, checklistY1 + 80);
    textSize(15);
    text("3. 한국사 시험", checklistX1 + 10, checklistY1 + 110);
  } else if (mazeSceneNum == 5) {
    textSize(20);
    textAlign(CENTER, CENTER);
    text("미로를", width / 2, phoneYStart + 100);
    text("탈출하세요", width / 2, phoneYStart + 140);
  }
}
