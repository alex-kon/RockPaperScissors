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
		var result = this.getWinner(userSelection,computerSelection);

		//show the result in the screen
		this.displayWinner(result);
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
	getWinner : function(playerOneChoice,playerTwoChoice){

		var playerOneIndex = playerOneChoice.index,
			playerTwoIndex = playerTwoChoice.index,
			valueOne = playerOneChoice.value,
			valueTwo = playerTwoChoice.value
			result={};

		//if the indexes are the same then it is a tie
		//Note the indexes start 0 in an Array, that is why we compare up to 2 : file config.js
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
	displayWinner : function(result){
		var scoreElement = this.getElement('.result'),
			winningSide = '';

		if(result.value.toLowerCase() === "draw"){
			winningSide = result.winner;
		}else{
		 	winningSide = result.winner.toLowerCase()=="player one" ? "You win" : "Computer Wins";
		}
		scoreElement.innerHTML=result.value + '</br>' + winningSide;
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

module.exports = Game;












},{"./ComputerPlayer":2,"./Player":4}],4:[function(require,module,exports){
var config = require('./config');

/*** constructor function for Human Player ***/
function Player(name){
	this.name = name;
}
Player.prototype.setSelection = function(selection){
	this.selection = selection;
	return selection;
}
Player.prototype.getSelection = function(){
	var index = config.options.indexOf(this.selection);
	return {"index":index,"value":this.selection};
}
module.exports = Player;
},{"./config":5}],5:[function(require,module,exports){
var options = ["rock","paper","scissors"];

var defaults = {
	"options" : options
}
module.exports = defaults
},{}]},{},[2,3,4,5,1]);