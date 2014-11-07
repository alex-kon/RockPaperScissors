var Player = require('./Player');
var Computer = require('./ComputerPlayer');

var Game = {
	init: function () {
	
		this.bindEvents();
	},
	/*** bind all the event handlers we need ***/
	bindEvents : function(){
		var that = this;

		//bind the event to Player vs Computer button the start panel
		var startPlayerGame = this.getElement('.player-vs-computer')
		startPlayerGame.addEventListener("click",function(){
			that.startGame("computer");
		});

		//bind the event to Computer vs Computer button the start panel
		var startComputerGame = this.getElement('.computer-vs-computer');
		startComputerGame.addEventListener("click",function(){
			that.startGame("player");
		});

	},
	/*** initialize the game defaults based on the game mode selected ***/
	startGame : function(type){

		var element = this.getElement('.start-game-panel');
		this.fadeOut(element);

		if(type === "player"){
			var playerHeader = this.getElement('.header-player');
			playerHeader.style.display = "block";
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











