let epilogueSceneNum = 0;

function showEpilogue(){
  if(epilogueSceneNum <= 3){
    showComputerBackground();
    showHowToGoNext();
  }
  
  if(epilogueSceneNum == 0){
    showDialogue("헉!");
  }
  
  if(epilogueSceneNum == 1){
    showDialogue("휴, 다시 내 방이구나....");
  }
  
  if(epilogueSceneNum >= 2 && epilogueSceneNum <= 3){
    showChecklist(200, 30);
  }
  
  if(epilogueSceneNum == 3){
    showDialogue("그래, 아무리 미로같이 막막해도 하나씩 차근차근 하다면 끝이 보이겠지. 힘내자!");
  }
  
  if(epilogueSceneNum >= 4){
    showEndingScreen();
  }
  
  if (isFadingOut) {
    showAndProgressFadeOut(() => {
      resetAll();
    }, true);
  }
}

function showEndingScreen(){
  background(0);
  textSize(40);
  textAlign(CENTER, CENTER);
  fill(255);
  text("Thank You For Playing!", width/2, height/2- 40);
  
  textSize(15);
  fill(150);
  text("Made By\n\n김태정 이지수 타트아냐 이지수", width/2, height/2 + 50);
  textSize(10);
  text("아무 키를 눌러 시작 화면으로", width/2, height - 30);
}

function epilogueKeyPressed(k){
  epilogueSceneNum++;
  if (epilogueSceneNum == 2) {
      mouseSound.play();
    }
  if (epilogueSceneNum == 5) {
      startFadeOut(100);
  }
}