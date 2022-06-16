let epilogueSceneNum = 0;

function showEpilogue(){
  showComputerBackground();
  showHowToGoNext();
  
  if(epilogueSceneNum == 0){
    showDialogue("헉!");
  }
  
  if(epilogueSceneNum == 1){
    showDialogue("휴, 다시 내 방이구나....");
  }
  
  if(epilogueSceneNum >= 2){
    showChecklist(200, 30);
  }
  
  if(epilogueSceneNum == 3){
    showDialogue("그래, 아무리 미로같이 막막해도 하나씩 차근차근 하다면 끝이 보이겠지. 힘내자!");
  }
  
  if (isFadingOut) {
    showAndProgressFadeOut(() => {
      resetAll();
    }, true);
  }
}

function epilogueKeyPressed(k){
  epilogueSceneNum++;
  if (epilogueSceneNum == 2) {
      mouseSound.play();
    }
  if (epilogueSceneNum == 4) {
      startFadeOut(100);
  }
}