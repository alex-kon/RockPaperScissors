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
	var index = config.options.indexOf(this.selection)
	return {"index":index,"value":this.selection};
}
module.exports = Player;