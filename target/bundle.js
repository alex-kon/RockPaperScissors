(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Game = require('./js/Game');
Game.init();
},{"./js/Game":3}],2:[function(require,module,exports){
var Player = require('./Player');

var config = require('./config');

//use polymorphism to create the ComputerPlayer object
function ComputerPlayer(score){
	Player.call(this,score);
}
/**
* inherit from parent class
**/
ComputerPlayer.prototype=new Player();

ComputerPlayer.prototype.getRandomSelection = function(first_argument) {
	var index = Math.floor(Math.random() * 3);
	return {"index":index,"value":config.options[index]};
};

module.exports = ComputerPlayer;
},{"./Player":4,"./config":5}],3:[function(require,module,exports){
var PlayerModel = require('./Player');
var ComputerModel = require('./ComputerPlayer');
var helpers = require('./helpers');
var controller = require('./winController');
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
			var gameBoard = helpers.getElement('.game-board').classList;
			gameBoard.add('player-vs-computer-game');
			gameBoard.remove('computer-vs-computer-game');
			//start playing
			that.startGame("player");
		});

		//bind the event to Computer vs Computer button the start panel
		var startComputerGame = helpers.getElement('.computer-vs-computer');
		startComputerGame.addEventListener("click",function(){
			var gameBoard = helpers.getElement('.game-board').classList;
			gameBoard.add('computer-vs-computer-game');
			gameBoard.remove('player-vs-computer-game');
			//start the first game
			that.startGame("computer");
			that.playComputerGame();
		});

		/*** initialize the event handlers for the user game ***/
		var gameBoardPlayer = helpers.getElement('.choices');
		gameBoardPlayer.addEventListener("click",function(event){
			var classes = event.target.className;
			//start the game
			that.playGame(classes);
		});

		/*** initialize the event handlers for the play new game action ***/
		var playAgainEl = helpers.getElement('.play-again');
		playAgainEl.addEventListener("click",function(event){
			//start the game
			that.startNewGame();
		});

		var playAgainSameGameEl = helpers.getElement('.play-again-same-game');
		playAgainSameGameEl.addEventListener("click",function(event){
			//start the game
			that.playComputerGame();
		});
	},
	/**
	* starts a computer vs computer game
	**/
	playComputerGame: function(){

		var playerOneChoice = PlayerOne.getRandomSelection();
		var playerTwoChoice = PlayerTwo.getRandomSelection();
		
		//get the Winner
		var result = controller.getWinner(playerOneChoice,playerTwoChoice);

		//show the result on screen
		this.showResultOnScreen(result,playerOneChoice,playerTwoChoice);		

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
		var result = controller.getWinner(userSelection,computerSelection);

		//show the result on screen
		this.showResultOnScreen(result,userSelection,computerSelection);

	},
	/**
	* Initialize the correct heading based on the game mode
	**/
	initHeading: function(){
		var playerOneHeader = helpers.getElement('.player-one-title');
		var playerTwoHeader = helpers.getElement('.player-two-title');

		var playerOneScore = helpers.getElement('.player-one-selection');
		var playerTwoScore = helpers.getElement('.player-two-selection');
		
		playerOneScore.innerHTML="";
		playerTwoScore.innerHTML="";

		if(PlayerOne instanceof ComputerModel){
			playerOneHeader.innerHTML="Player One Choice";
			playerTwoHeader.innerHTML="Player Two Choice";
		}else{
			console.log('here');
			playerOneHeader.innerHTML="Your choice";
			playerTwoHeader.innerHTML="Computer's Choice";
		}
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
		
		var gameTitleEl = helpers.getElement('.game-title');
		gameTitleEl.style.display = "table-cell";

		if(type === "player"){
			//initialize the Game models - one Computer Game and one Human Player
			PlayerOne = new PlayerModel(0);
			PlayerTwo = new ComputerModel(0);

		}else if (type === "computer"){
			//initialize the Game models - one Computer Game and one Human Player
			PlayerOne = new ComputerModel(0);
			PlayerTwo = new ComputerModel(0);
		}

		//show different heading if game is Computer vs Human or Computer vs Computer
		this.initHeading();

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
		console.log('reset : ',PlayerOne);
		//display the start panel
		var startPanel = helpers.getElement('.start-game-panel');
		startPanel.style.display="block";
		startPanel.style.opacity="1";
		
		var resultPanelEl = helpers.getElement('.result');
		resultPanelEl.style.display="none";

		var scorePanelEl = helpers.getElement('.score');
		scorePanelEl.style.display="none";

	}
};

module.exports = Game;












},{"./ComputerPlayer":2,"./Player":4,"./helpers":6,"./winController":7}],4:[function(require,module,exports){
var config = require('./config');
/**
* Represents a single Player.
* @constructor
**/
function Player(score){
	this.score = score;
}
/**
* set the new score for a sigle Player 
* @param {number} score
**/
Player.prototype.setScore = function(score){
	this.score = score;
};
/**
* get the current score for a sigle Player 
**/
Player.prototype.getScore = function(){
	return this.score;
};
/** 
* set the player selection
**/
Player.prototype.setSelection = function(selection){
	this.selection = selection;
	return selection;
};
/** 
* get the players selection
*/
Player.prototype.getSelection = function(){
	var index = config.options.indexOf(this.selection);
	return {"index":index,"value":this.selection};
};
module.exports = Player;
},{"./config":5}],5:[function(require,module,exports){
var options = ["rock","paper","scissors"];

var defaults = {
	"options" : options
};
module.exports = defaults;
},{}],6:[function(require,module,exports){
var helpers = {
	/**
	*	custom fade out function 
	*	@param {node elemt} element - crates the fadeOut effect on the HTML element passed as a param
	**/
	fadeOut : function(element){

		element.style.opacity=1;
		var intervalID = window.setInterval(function(){
			if(element.style.opacity<=0.1){
				element.style.display = "none";
				window.clearInterval(intervalID);
			}
			element.style.opacity -= 0.1;
		},50);

	},
	/**
	*	shorthand so we don't have to write document.querySelector everywhere 
	*	@param {string} query - used to query the DOM for an html element
	**/
	getElement : function(element){
		return document.querySelector(element);
	},
	/**
	*	crate a count down for each game
	*
	**/
	startCountDown: function(){
		var countDownEl = this.getElement('.countdown'),
			resultEl = this.getElement('.result'),
			that = this,
			scoreEl = this.getElement('.score');

		var counter = 3;

		countDownEl.style.display="block";
		resultEl.style.display="none";
		scoreEl.style.display="none";

		that.countDownAimation(countDownEl,counter);

		var intervalId = window.setInterval(function(){
			counter--;
			if(counter===0){
				clearInterval(intervalId);
			}else{
				that.countDownAimation(countDownEl,counter);
			}
		},1000);
	},
	countDownAimation: function(countDownEl,counter){
		countDownEl.innerHTML=counter;
	},
};

module.exports = helpers;
},{}],7:[function(require,module,exports){


var winController = {
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
	}
};

module.exports = winController;
},{}]},{},[2,3,4,5,6,7,1]);