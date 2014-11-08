var PlayerModel = require('./Player');
var ComputerModel = require('./ComputerPlayer');

/** 
*	static vars 
**/
var rock="rock",
	paper="paper",
	scissors="scissors";

/** 
*	global models 
**/	
var HumanPlayer=null,
	ComputerPlayerOne=null,
	ComputerPlayerTwo=null;

/** 
*	main Game object that contains the logic to determine the winner 
**/
var Game = {
	/** 
	*	init function to bootstrap the app 
	**/
	init: function () {
		this.bindEvents();
	},
	/** 
	*	bind all the event handlers we need 
	**/
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
			that.playGame(classes);
		});

	},
	/**
	* contains the calls to the main functions
	* @param {string} userChoice - classes of the button selected by a user - contains a class with the 
	* selected choice (rock,paper,scissors)
	**/
	playGame : function(userChoice){

		//set the Player Model vars
		this.setPlayerSelection(userChoice);

		//get random Computer Selection
		var computerSelection = ComputerPlayerOne.getRandomSelection();

		//get Human selection
		var userSelection = HumanPlayer.getSelection();

		//get the Winner
		var result = this.getWinner(userSelection,computerSelection);

		//show the result in the screen
		this.displayWinner(result);
	},
	/** 
	*	calls the setter of the Player model
	*	@param {string} userChoice - contains the choice of the user
	**/
	setPlayerSelection : function(userChoice){
		if(userChoice.indexOf(rock) >= 0){
			HumanPlayer.setSelection(rock);
		}else if (userChoice.indexOf(paper) >= 0){
			HumanPlayer.setSelection(paper);
		}else {
			HumanPlayer.setSelection(scissors);
		}	
	},
	/**
	* 	determine the winner of the game based on the choices provided
	*	@param {object} playerOneChoice - contains the choice of the first player {"index":index,"value":this.selection}
	*	@param {object} playerTwoChoice - contains the choice of the second player {"index":index,"value":this.selection}
	*	returns the winning user, player1 or player2, and the result eg. Rock beats Scissors
	**/
	getWinner : function(playerOneChoice,playerTwoChoice){

		var valueOne = playerOneChoice.value,
			valueTwo = playerTwoChoice.value
			result={};

		//if the indexes are the same then it is a tie
		if(valueOne == valueTwo){
			result.value = "Draw";
			result.winner = " Tie, no one wins";
		}else{
			switch(valueOne){
				case "rock":
					if (valueTwo === "scissors"){
						result.value="Rock beats Scissors";
						result.winner="Player One";
					}else{
						result.value="Paper beats Rock";
						result.winner="Player Two";
					}
					break;
				case "scissors":
					if (valueTwo === "paper"){
						result.value="Scissors beats Paper";
						result.winner="Player One";
					}else{
						result.value="Rock beats Scissors";
						result.winner="Player Two"
					}
					break;
				case "paper":
					if (valueTwo == "rock"){
						result.value="Paper beats Rock";
						result.winner="Player One";
					}else{
						result.value="Scissors beats Paper";
						result.winner="Player Two";
					}
			}
		}
		//return the result so we can unit test the function
		return result;
	},
	/**
	*	display the winner on the UI
	*	@param {object} result - contains the winning player and the result
	* 	eg result = {"value":"Scissors beats Paper","winner":"Player One"}
	**/
	displayWinner : function(result){
		var scoreElement = this.getElement('.result'),
			computerResultElement = this.getElement('.player-two-result');
			winningSide = '';

		if(result.value.toLowerCase() === "draw"){
			winningSide = result.winner;
		}else{
		 	winningSide = result.winner.toLowerCase()=="player one" ? "You win" : "Computer Wins";
		}
		scoreElement.innerHTML=result.value + '</br>' + winningSide;
	},
	/**
	*	initialize the game defaults based on the game mode selected 
	*	@param {string} type - sets the player mode - either a player vs computer game or computer vs computer game
	**/
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
	/**
	*	custom fade out function 
	*	@param {node elemt} element - crates the fadeOut effect on the HTML element passed as a param
	**/
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
	/**
	*	shorthand so we don't have to write document.querySelector everywhere 
	*	@param {string} query - used to query the DOM for an html element
	**/
	getElement : function(element){
		return document.querySelector(element);
	}
}

module.exports = Game;











