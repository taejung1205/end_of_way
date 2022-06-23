let introSceneNum = 0;

function showIntro0() {
  showComputerBackground();
  showHowToGoNext();
  if (introSceneNum >= 0) {
    showKakaoTalk_intro0(introSceneNum);
  }
  if (introSceneNum == 7) {
    showDialogue("...");
  }
  if (introSceneNum == 8) {
    showDialogue("친구들은 다 잘하고 있네...");
  }

  if (introSceneNum == 9) {
    showDialogue("나는 뭐하고 있지...?");
  }

  if (introSceneNum >= 10) {
    showChecklist(200, 30);
  }

  if (introSceneNum == 11) {
    showDialogue("에휴, 할 일은 이렇게 많은데, 도대체 뭐부터 해야하나...");
  }

  if (introSceneNum == 12) {
    showDialogue("왜 이렇게 앞이 안 보이냐... 미로에 갇힌 것만 같아...");
  }

  if (isFadingOut) {
    showAndProgressFadeOut(() => {
      introSceneNum = 0;
      viewManager.setView("Intro1");
      playKakaoSound();
    }, false);
  }
}

function intro0KeyPressed(k) {
  if (isFadingOut == false) {
    introSceneNum++;
    if (introSceneNum >= 0 && introSceneNum <= 5) {
      playKakaoSound();
    }
    if (introSceneNum == 6) {
      playKeyboardSound();
    }
    
    if (introSceneNum == 10) {
      playMouseSound();
    }
    

    if (introSceneNum == 13) {
      startFadeOut(200);
    }
  }
}

function playKakaoSound() {
  kakaotalkSound.play();
}

function playKeyboardSound() {
  keyboardSound.play();
}

function playMouseSound(){
  mouseSound.play();
}

function showKakaoTalk_intro0(s) {
  let kakaoX = 350;
  let kakaoY = 30;
  let kakaoW = 190;
  let kakaoH = 300;

  textAlign(LEFT, CENTER);
  textStyle(NORMAL);

  //카카오톡 큰 네모
  noStroke();
  fill(178, 199, 217);
  rect(kakaoX, kakaoY, kakaoW, kakaoH);

  //입력창
  noStroke();
  fill(255);
  rect(kakaoX, kakaoY + 250, kakaoW, kakaoH - 250);
  //전송버튼
  fill(255, 235, 51);
  rect(kakaoX + 160, kakaoY + 260, 20, 12);
  fill(0);
  textSize(6);
  text("전송", kakaoX + 164, kakaoY + 268);

  //단톡방 이름
  fill(169, 189, 206);
  rect(kakaoX, kakaoY, kakaoW, 35);
  fill(0);
  textSize(9);
  text("내친구들❤️", kakaoX + 40, kakaoY + 15);
  fill(0);
  ellipse(kakaoX + 13, kakaoY + 10, 10, 10);
  fill(102, 100, 200);
  ellipse(kakaoX + 25, kakaoY + 10, 10, 10);
  fill(50, 100, 50);
  ellipse(kakaoX + 13, kakaoY + 23, 10, 10);
  fill(150, 20, 50);
  ellipse(kakaoX + 25, kakaoY + 23, 10, 10);

  //최소화버튼
  fill(0);
  rect(kakaoX + 158, kakaoY + 10, 6, 1);
  noFill();
  stroke(0);
  rect(kakaoX + 170, kakaoY + 8, 5, 5);
  line(kakaoX + 180, kakaoY + 13, kakaoX + 185, kakaoY + 8);
  line(kakaoX + 180, kakaoY + 8, kakaoX + 185, kakaoY + 13);

  //대화
  noStroke();
  textSize(8);
  if (s >= 0) {
    fill(0);
    ellipse(kakaoX + 20, kakaoY + 60, 20, 20);
    fill(255);
    rect(kakaoX + 40, kakaoY + 55, 120, 15);
    fill(0);
    text("얘들아 나 드디어 취업했어!", kakaoX + 45, kakaoY + 63);
  }

  if (s >= 1) {
    fill(102, 100, 200);
    ellipse(kakaoX + 20, kakaoY + 95, 20, 20);
    fill(255);
    rect(kakaoX + 40, kakaoY + 90, 80, 15);
    fill(0);
    text("진짜? 축하해!!!", kakaoX + 45, kakaoY + 98);
  }
  if (s >= 2) {
    fill(50, 100, 50);
    ellipse(kakaoX + 20, kakaoY + 130, 20, 20);
    fill(255);
    rect(kakaoX + 40, kakaoY + 125, 105, 15);
    fill(0);
    text("다들 요즘 뭐하고 지내?", kakaoX + 45, kakaoY + 133);
  }

  if (s >= 3) {
    fill(150, 20, 50);
    ellipse(kakaoX + 20, kakaoY + 165, 20, 20);
    fill(255);
    rect(kakaoX + 40, kakaoY + 160, 150, 15);
    fill(0);
    text("나 임용 합격했잖아. 발령기다리는중!", kakaoX + 45, kakaoY + 168);
  }

  if (s >= 4) {
    fill(200, 100, 100);
    ellipse(kakaoX + 20, kakaoY + 200, 20, 20);
    fill(255);
    rect(kakaoX + 40, kakaoY + 195, 90, 15);
    fill(0);
    text("나는 로스쿨 가려고", kakaoX + 45, kakaoY + 203);
  }

  if (s >= 5) {
    fill(0);
    ellipse(kakaoX + 20, kakaoY + 235, 20, 20);
    fill(255);
    rect(kakaoX + 40, kakaoY + 230, 100, 15);
    fill(0);
    text("ㅇㅇ이는 뭐하고 지내?", kakaoX + 45, kakaoY + 238);
  }

  if (s >= 6) {
    text("아..나는 아직 뭘 해야할지 모르겠어", kakaoX + 10, kakaoY + 265);
  }
}

function showHowToGoNext() {
  fill(0);
  textSize(12);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  text("아무 키를 눌러 진행하세요", 10, 10);
}

function showComputerBackground() {
  noStroke();
  rectMode(CORNER);
  textAlign(RIGHT, CENTER);
  textStyle(NORMAL);
  // sky
  background(204, 220, 255);

  // sea
  fill(0, 51, 153);
  rect(0, 270, 640, 400);

  // Dock
  fill(0, 110);
  rect(120, 360, 400, 35, 20);

  // sun
  fill(255, 232, 124);
  y = 60;
  x = 600 - y;
  r = 80;
  ellipse(x, y, r, r);

  // google chrome
  fill(255);
  rect(150, 365, 25, 25, 5);

  //chrome inside
  fill(255, 0, 0);
  ellipse(161, 376, 16);
  fill(255, 214, 51);
  ellipse(165, 380, 16);
  fill(0, 179, 60);
  ellipse(161, 381, 15);

  fill(50, 50, 255);
  ellipse(163, 379, 10);

  //메모 icon
  fill(255);
  rect(180, 365, 25, 25, 5);
  fill(240, 184, 0);
  rect(180, 365, 25, 8, 6);

  //music
  fill(255, 102, 102);
  rect(210, 365, 25, 25, 5);
  fill(255);
  textSize(17);
  text("♫", 230, 379);

  //kakao
  fill(255, 255, 50);
  rect(240, 365, 25, 25, 5);
  fill(128, 43, 0);
  ellipse(252.5, 377, 20, 15);
  triangle(242, 388, 250, 380, 248, 370);
  fill(255, 255, 50);
  textSize(6);
  text("TALK", 260, 377);

  //word
  fill(255);
  rect(270, 365, 25, 25, 5);
  fill(0, 82, 204, 255);
  rect(274, 380, 16, 6);
  fill(0, 82, 204, 190);
  rect(274, 376, 16, 6);
  fill(0, 82, 204, 127);
  rect(274, 372, 16, 6);
  fill(0, 82, 204, 60);
  rect(274, 368, 16, 6);

  //excel
  fill(255);
  rect(360, 365, 25, 25, 5);
  fill(0, 51, 0, 255);
  rect(364, 380, 16, 6);
  fill(0, 51, 0, 190);
  rect(364, 376, 16, 6);
  fill(0, 51, 0, 127);
  rect(364, 372, 16, 6);
  fill(0, 51, 0, 60);
  rect(364, 368, 16, 6);

  //calendar
  fill(255);
  rect(300, 365, 25, 25, 5);
  fill(255, 92, 51);
  rect(300, 365, 25, 8, 6);
  fill(0, 0, 0);
  textSize(15);
  text("02", 320, 382);

  //face time
  fill(70, 230, 70);
  rect(330, 365, 25, 25, 5);
  fill(240, 240, 240);
  rect(333, 373, 15, 10, 3);
  triangle(347, 378, 353, 373, 353, 382);

  //zoom
  fill(51, 102, 255);
  rect(390, 365, 25, 25, 5);
  fill(240, 240, 240);
  rect(393, 373, 15, 10, 3);
  triangle(407, 378, 413, 373, 413, 382);

  //adobeeeeee
  fill(0, 0, 65);
  rect(420, 365, 25, 25, 5);
  fill(0, 191, 255);
  textSize(17);
  text("Ps", 442, 378);

  //premier proooo
  fill(102, 0, 102);
  rect(450, 365, 25, 25, 5);
  fill(255, 51, 255);
  textSize(17);
  text("Pr", 470, 378);

  // sails
  fill(255, 180, 150);
  triangle(160, 200, 160, 280, 130, 280);
  triangle(165, 200, 165, 280, 185, 280);

  // hull
  quad(110, 290, 120, 310, 193, 310, 200, 290);

  // speed lines
  fill(0, 0, 0);
  line(180, 220, 200, 220);
  line(190, 250, 210, 250);
  line(200, 280, 220, 280);

  //folders
  showFolder(30, 20);
  showFolder(30, 80);
  showFolder(30, 140);
  showFolder(30, 200);
  showFolder(30, 260);
  showFolder(30, 320);
  showFolder(90, 20);
  showFolder(90, 80);
  showFolder(580, 260);
  showFolder(520, 320);
  showFolder(580, 320);

  fill(255, 255, 255);
  textSize(10);
  text("2021", 59, 60);
  text("2019", 59, 120);
  text("정문기입", 65, 180);
  text("SISA", 60, 240);
  text("docs", 59, 300);
  text("사진", 58, 360);
  text("시험준비", 125, 60);
  text("videos", 123, 120);
  text("대글 2", 552, 360);
  text("books", 612, 360);
  text("downloads", 620, 300);

  strokeWeight(4);
  var min = minute();
  var hrs = hour();
  var mer = hrs < 12 ? "AM" : "PM";

  min = formatting(min);
  hrs = formatting(hrs % 12);
  fill(255);
  textSize(20);
  textAlign(RIGHT, CENTER);
  text(hrs + ":" + min + mer, width / 2, height / 2);
}

function showChecklist(x, y) {
  //체크리스트
  let checklistX1 = x;
  let checklistY1 = y;
  let checklistWidth = 140;
  let checklistHeight = 250;
  noStroke();

  textStyle(BOLD);
  fill(255, 255, 179);
  rect(checklistX1, checklistY1, checklistWidth, checklistHeight, 5);
  fill(102, 51, 0);
  textAlign(CENTER, CENTER);
  textSize(18);
  textFont(nanumDahengFont);
  text("체크리스트", checklistX1 + checklistWidth / 2, checklistY1 + 20);
  textAlign(LEFT, CENTER);
  textSize(15);
  text("1. 영어공부하기", checklistX1 + 10, checklistY1 + 50);
  textSize(15);
  text("2. 봉사활동", checklistX1 + 10, checklistY1 + 80);
  textSize(15);
  text("3. 한국사 시험", checklistX1 + 10, checklistY1 + 110);
  textFont('Noto Sans KR');
}
function formatting(num) {
  if (int(num) < 10) {
    return "0" + num;
  }
  return num;
}

function showFolder(x, y) {
  fill(0, 191, 255);
  rect(x, y, 35, 30, 5);
}
