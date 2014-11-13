var PlayerModel = require('./Player');
var ComputerModel = require('./ComputerPlayer');
var helpers = require('./helpers');

/** 
*	static vars 
**/
var rock="rock",
	paper="paper",
	scissors="scissors";

/** 
*	global models 
**/	
var PlayerOne=null,
	PlayerTwo=null;

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
		var startPlayerGame = helpers.getElement('.player-vs-computer');
		startPlayerGame.addEventListener("click",function(){
			that.startGame("player");
		});

		//bind the event to Computer vs Computer button the start panel
		var startComputerGame = helpers.getElement('.computer-vs-computer');
		startComputerGame.addEventListener("click",function(){
			that.startGame("computer");
		});

		/*** initialize the event handlers for the user seelctions ***/
		var gameBoardPlayer = helpers.getElement('.game-board_player1');
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
		this.setPlayerSelection(userChoice,PlayerOne);

		//get random Computer Selection
		var computerSelection = PlayerTwo.getRandomSelection();

		//get Human selection
		var userSelection = PlayerOne.getSelection();

		//get the Winner
		var result = this.getWinner(userSelection,computerSelection);

		//show the result on screen
		this.showResultOnScreen(result,userSelection,computerSelection);

	},
	showPlayerOneResult: function(userSelection){
		var playerEl = helpers.getElement('.player-one-selection');
		playerEl.innerHTML=userSelection.value;
	},
	showPlayerTwoResult: function(userSelection){
		var playerEl = helpers.getElement('.player-two-selection');
		playerEl.innerHTML=userSelection.value;
	},
	showResultOnScreen: function(result,playerOneChoice,playerTwoChoice){
		var that = this;
		/*
		* show the result in the screen
		**/
		//start the countdown animation
		helpers.startCountDown();
		var countDownEl = helpers.getElement('.countdown');
		var resultEl = helpers.getElement('.result');
		var gameTitleEl = helpers.getElement('.game-title');

		gameTitleEl.style.display="none";
		//increase the score for the winner
		that.setScore(result.winner);

		setTimeout(function(){
			
			//display the actual score in the HTML
			that.displayScore(result.winner);

			//end the countdown animation
			countDownEl.style.display="none";
			countDownEl.innerHTML="";

			//show the result on screen
			resultEl.style.display="block";

			//show the winning message on screen
			that.displayMessage(result);

			//show player one choice on the screen
			that.showPlayerOneResult(playerOneChoice);
			//show player two choice
			that.showPlayerTwoResult(playerTwoChoice);

		},3000);
	},
	/** 
	*	calls the setter of the Player model
	*	@param {string} userChoice - contains the choice of the user
	**/
	setPlayerSelection : function(userChoice,player){
		if(userChoice.indexOf(rock) >= 0){
			player.setSelection(rock);
		}else if (userChoice.indexOf(paper) >= 0){
			player.setSelection(paper);
		}else {
			player.setSelection(scissors);
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
			valueTwo = playerTwoChoice.value;

		//if the indexes are the same then it is a tie
		if(valueOne == valueTwo){
			return {"value":"Draw","winner":"Tie, no one wins"};
		//else find the winner
		}else{
			return this.getWinningCombination(valueOne,valueTwo);
		}

	},
	/**
	*	@param {string} playerOneChoice
	*	@param {string} playerTwoChoice
	**/
	getWinningCombination: function(valueOne,valueTwo){
		if(valueOne=="rock"){
			return this.findRockWinner(valueTwo);
		}else if(valueOne=="scissors"){
			return this.findScissorsWinner(valueTwo);
		}else{
			return this.findPaperWinner(valueTwo);
		}
	},
	/**
	*	Find the winner if the first value is scissors
	*	@param {string} playerOneChoice
	**/
	findRockWinner : function(value){
		var result={};
		if (value === "scissors"){
			result.value="Rock beats Scissors";
			result.winner="Player One";
		}else{
			result.value="Paper beats Rock";
			result.winner="Player Two";
		}
		return result;
	},
	/**
	*	Find the winner if the first value is paper
	*	@param {string} playerOneChoice
	**/
	findScissorsWinner: function(value){
		var result={};
		if (value === "paper"){
			result.value="Scissors beats Paper";
			result.winner="Player One";
		}else{
			result.value="Rock beats Scissors";
			result.winner="Player Two";
		}
		return result;
	},
	/**
	*	Find the winner if the first value is rock
	*	@param {string} playerOneChoice
	**/
	findPaperWinner: function(value){
		var result={};
		if (value == "rock"){
			result.value="Paper beats Rock";
			result.winner="Player One";
		}else{
			result.value="Scissors beats Paper";
			result.winner="Player Two";
		}
		return result;
	},
	/**
	*	display the winner on the UI
	*	@param {object} result - contains the winning player and the result
	* 	eg result = {"value":"Scissors beats Paper","winner":"Player One"}
	**/
	displayMessage : function(result){
		var scoreElement = helpers.getElement('.result'),
			resultValue = result.value.toLowerCase(),
			resultWinner = result.winner.toLowerCase(),
			winningSide = resultWinner;

		//if the result is not draw change the message accordignly
		if(resultValue !== "draw"){
		 	winningSide = resultWinner == "player one" ? "You win" : "Computer Wins";
		}

		scoreElement.innerHTML = resultValue + '</br>' + winningSide;
	},
	/**
	*	initialize the game defaults based on the game mode selected 
	*	@param {string} type - sets the player mode - either a player vs computer game or computer vs computer game
	**/
	startGame : function(type){

		var element = helpers.getElement('.start-game-panel');
		helpers.fadeOut(element);

		if(type === "player"){
			var gameTitleEl = helpers.getElement('.game-title');
			gameTitleEl.style.display = "table-cell";

			//initialize the Game models - one Computer Game and one Human Player
			PlayerOne = new PlayerModel(0);
			PlayerTwo = new ComputerModel(0);

		}else if (type === "computer"){

		}
	},
	/**
	* increase the score for the winner
	* @param {string} winner - represents the winning player
	**/
	setScore: function(winner){
		if(winner==="Player One"){
			PlayerOne.setScore(parseInt(PlayerOne.getScore())+1);
		}else if(winner==="Player Two"){
			PlayerTwo.setScore(PlayerTwo.getScore()+1);
		}
	},
	/**
	* display the score for of the current Game
	**/
	displayScore: function(){
		//Player one score
		var scoreEl = helpers.getElement('.score');
		scoreEl.innerHTML = PlayerOne.getScore() + ' / ' + PlayerTwo.getScore();
		scoreEl.style.display="block";
	},
	/**
	* start a new game
	**/
	startNewGame: function(){
		
		//set the initial objects to null
		PlayerOne = null;
		PlayerTwo = null;

		//display the start panel
		var startPanel = helpers.getElement('.start-game-panel');
		helpers.fadeIn(startPanel);

		//reset the old html

	},
	/**
	* reset the html elements that contain the game title and the score board.
	**/
	resetGamePanel : function(){
		
		
	}

};

module.exports = Game;











