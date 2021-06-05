class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    } 
  }

  play(){
    //write code here to hide question elements
    question.hide();
    
    //write code to change the background color here
    background("yellow");
    //write code to show a heading for showing the result of Quiz
    fill("white");
    textSize(30);
    text("result of quiz:", 340, 50)
    //call getContestantInfo( ) here
    Contestant.getPlayerInfo();

    //write condition to check if contestantInfor is not undefined
    if(allContestants!==undefined){
      
    //write code to add a note here
      fill("Blue");
      textSize(20);
      text("Note: Contestant whose answers are correct are highlighted in green color",130, 230);
    //write code to highlight contest who answered correctly
    var display_Answers = 230;

    for(var plr in allContestants){
      debugger;
      var correctAns = "2";
      if (correctAns === allContestants[plr].answer)
        fill("Green")
      else
        fill("red");

      display_Answers+=30;
      textSize(20);
      text(allContestants[plr].name + ": " + allContestants[plr].answer, 250,display_Answers)
    }

    }
  }

}
