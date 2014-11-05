var Player = require('./Player');

//use polymorphism to create the ComputerPlayer object
function ComputerPlayer(name){
	Player.call(this,name);
}


module.exports = ComputerPlayer;