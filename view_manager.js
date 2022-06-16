class ViewManager{
  constructor(startView){
    this.curView = startView;
  }
  
  showView(){
    if(this.curView == "Start Menu"){
      showStartMenu();
    }
    
    if(this.curView == "Intro0"){
      showIntro0();
    }
    
    if(this.curView == "Intro1"){
      showIntro1();
    }
    
    if(this.curView == "Maze"){
      showMaze();
    }
    
    if(this.curView == "Epilogue"){
      showEpilogue();
    }
  }
  
  setView(str){
    this.curView = str;
  }
  
  viewKeyPressed(k){
    switch(this.curView){
        case "Start Menu":
        startMenuKeyPressed(key);
        break;
        case "Intro0":
        intro0KeyPressed(key);
        break;
        case "Intro1":
        intro1KeyPressed(key);
        break;
        case "Maze": 
        mazeKeyPressed(key);
        break;
        case "Epilogue": 
        epilogueKeyPressed(key);
        break;
    }
  }
  
  mouseClicked(x, y){
    if(this.curView == 'Maze'){
      mazeMouseClicked(x,y);
    } else {
      this.viewKeyPressed('Mouse');
    }
  }
}