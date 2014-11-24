

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