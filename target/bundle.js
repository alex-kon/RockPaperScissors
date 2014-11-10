(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Game = require('./js/Game');
Game.init();
},{"./js/Game":3}],2:[function(require,module,exports){
var Player = require('./Player');

var config = require('./config');

//use polymorphism to create the ComputerPlayer object
function ComputerPlayer(name){
	Player.call(this,name);
}
ComputerPlayer.prototype.getRandomSelection = function(first_argument) {
	var index = Math.floor(Math.random() * 3);
	return {"index":index,"value":config.options[index]};
};

module.exports = ComputerPlayer;
},{"./Player":4,"./config":5}],3:[function(require,module,exports){
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
		var that = this;

		//set the Player Model vars
		that.setPlayerSelection(userChoice);

		//get random Computer Selection
		var computerSelection = ComputerPlayerOne.getRandomSelection();

		//get Human selection
		var userSelection = HumanPlayer.getSelection();

		//get the Winner
		var result = that.getWinner(userSelection,computerSelection);

		//show the result in the screen
		helpers.startCountDown();
		var countDownEl = helpers.getElement('.countdown');
		var resultEl = helpers.getElement('.result');

		setTimeout(function(){
			countDownEl.style.display="none";
			resultEl.style.display="block";
			that.displayWinner(result);	
		},4000);
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
	displayWinner : function(result){
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
			var playerHeader = helpers.getElement('.header-player');
			playerHeader.style.display = "block";

			//initialize the Game models - one Computer Game and one Human Player
			HumanPlayer=new PlayerModel();
			ComputerPlayerOne =new ComputerModel();

		}else if (type === "computer"){

		}
	}
};

module.exports = Game;












},{"./ComputerPlayer":2,"./Player":4,"./helpers":6}],4:[function(require,module,exports){
var config = require('./config');

/**
* Represents a single Player.
* @constructor
**/
function Player(name){
	this.name = name;
}
Player.prototype.setSelection = function(selection){
	this.selection = selection;
	return selection;
};
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
		var countDownEl = this.getElement('.countdown');
		var resultEl = this.getElement('.result');

		var counter = 3;

		countDownEl.style.display="block";
		resultEl.style.display="none";

		var intervalId = window.setInterval(function(){
			countDownEl.innerHTML=counter;
			counter--;
			if(counter===0){
				clearInterval(intervalId);
			}
		},1000);
	}
};

module.exports = helpers;
},{}]},{},[2,3,4,5,6,1]);