var PlayerModel = require('./Player');
var ComputerModel = require('./ComputerPlayer');

/** static vars ***/
var rock="rock",
	paper="paper",
	scissors="scissors";

/*** global models ***/	
var HumanPlayer=null,
	ComputerPlayerOne=null,
	ComputerPlayerTwo=null;

var Game = {
	init: function () {
		this.bindEvents();
	},
	/*** bind all the event handlers we need ***/
	bindEvents : function(){
		var that = this;

		/*** Initialize the game mode ***/

		//bind the event to Player vs Computer button the start panel
		var startPlayerGame = this.getElement('.player-vs-computer')
		startPlayerGame.addEventListener("click",function(){
			that.startGame("player");
		});

		//bind the event to Computer vs Computer button the start panel
		var startComputerGame = this.getElement('.computer-vs-computer');
		startComputerGame.addEventListener("click",function(){
			that.startGame("computer");
		});

		/*** initialize the event handlers for the user seelctions ***/
		var gameBoardPlayer = this.getElement('.game-board_player1');
		gameBoardPlayer.addEventListener("click",function(event){
			var classes = event.target.className;
			//start the game
			that.PlayGame(classes);
		});

	},
	PlayGame : function(userChoice){

		//set the Player Model vars
		this.setHumanSelection(userChoice);

		//get random Computer Selection
		var computerSelection = ComputerPlayerOne.getRandomSelection();

		//get Human selection
		var userSelection = HumanPlayer.getSelection();

		//get the Winner
		this.getWinner(computerSelection,userSelection);

	},
	setHumanSelection : function(userChoice){
		if(userChoice.indexOf(rock) >= 0){
			HumanPlayer.setSelection(rock);
		}else if (userChoice.indexOf(paper) >= 0){
			HumanPlayer.setSelection(paper);
		}else {
			HumanPlayer.setSelection(scissors);
		}	
	},
	//determine the winner of the game based on the choices provided
	getWinner : function(computerSelection,userSelection){
		var computerIndex = computerSelection.index,
			userIndex = userSelection.index;

		if(computerSelection.index === userSelection.index){
			this.displayWinner("draw")
		}else{
			console.log(computerIndex,'-----',userIndex)
			var result =  computerIndex > userSelection ? "Computer wins" : "You won";
			this.displayWinner(result);
		}
	},
	displayWinner : function(result){
		var scoreElement = this.getElement('.result');
		scoreElement.innerHTML=result;
	},
	/*** initialize the game defaults based on the game mode selected ***/
	startGame : function(type){

		var element = this.getElement('.start-game-panel');
		this.fadeOut(element);

		if(type === "player"){
			var playerHeader = this.getElement('.header-player');
			playerHeader.style.display = "block";

			//initialize the Game models - one Computer Game and one Human Player
			HumanPlayer=new PlayerModel();
			ComputerPlayerOne =new ComputerModel();

		}else if (type === "computer"){

		}
	},
	/*** custom fade out function ***/
	fadeOut : function(element){

		element.style.opacity=1;
		var intervalID = window.setInterval(function(){
			if(element.style.opacity<=.1){
				element.style.display = "none";
				window.clearInterval(intervalID);
			}
			element.style.opacity -= .1;
		},50);

	},
	/*** shorthand so we don't have to write document.querySelector everywhere ***/
	getElement : function(element){
		return document.querySelector(element);
	}
}

Game.init();

module.exports = Game;











