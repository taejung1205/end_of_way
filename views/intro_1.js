function showIntro1(){
  showComputerBackground();
  showHowToGoNext();
  showChecklist(200, 30);
  showKakaoTalk_intro1(introSceneNum);
  
  if(introSceneNum == 3){
    showDialogue("웬 QR코드?... 한 번 찍어볼까?");
  }
  
  if (isFadingOut) {
    showAndProgressFadeOut(() => {
      introSceneNum = 0;
      viewManager.setView("Maze");
      camera1Sound.play();
      print("callback");
    }, true);
  }
}

function intro1KeyPressed(k){
  introSceneNum++;
  if (introSceneNum >= 0 && introSceneNum <= 2) {
      playKakaoSound();
    }
  if (introSceneNum == 4) {
      camera0Sound.play();
      startFadeOut(100);
  }
}

function showKakaoTalk_intro1(s) {
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
  text("드림이", kakaoX + 40, kakaoY + 15);
  fill(0);
  ellipse(kakaoX + 18, kakaoY + 18, 20, 20);

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
  imageMode(CORNER);
  if (s >= 0) {
    fill(0);
    ellipse(kakaoX + 20, kakaoY + 60, 20, 20);
    fill(255);
    rect(kakaoX + 40, kakaoY + 50, 110, 30);
    fill(0);
    text("OO아, 잘 지내니?\n단톡에서 말이 없길래...", kakaoX + 45, kakaoY + 65);
  }

  if (s >= 1) {
    fill(0);
    ellipse(kakaoX + 20, kakaoY + 95, 20, 20);
    fill(255);
    rect(kakaoX + 40, kakaoY + 90, 115, 15);
    fill(0);
    text("시간 나면 이 QR코드 찍어봐.", kakaoX + 45, kakaoY + 98);
  }
  if (s >= 2) {
    fill(0);
    ellipse(kakaoX + 20, kakaoY + 130, 20, 20);
    image(mapClean, kakaoX + 40, kakaoY + 125, 100, 100);
  }
}