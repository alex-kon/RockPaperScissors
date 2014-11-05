var Player = require('./Player');
var Computer = require('./ComputerPlayer');

var Game = {
	init: function () {
	
		var player1 = new Player('test');
		var Player2 = new Computer('test2');

		this.bindEvents();
	},
	bindEvents : function(){
		document.querySelector('.game-board ul').addEventListener("click",function(){

		});
	}
}

Game.init();

module.exports = Game;











