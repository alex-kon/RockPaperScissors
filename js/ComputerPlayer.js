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