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