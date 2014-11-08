var Player = require('./Player');

var config = require('./config');

//use polymorphism to create the ComputerPlayer object
function ComputerPlayer(name){
	Player.call(this,name);
}
ComputerPlayer.prototype.getRandomSelection = function(first_argument) {
	var index = Math.floor(Math.random() * (2 - 0) + 0);
	console.log(index,'*******')
	return {"index":index,"value":config.options[index]};
};

module.exports = ComputerPlayer;