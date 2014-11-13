var Player = require('../js/Player');
var HumanPlayer = new Player(0);

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');

// tests.js
describe('test the Player Model', function(){
	it('seting a selection for the Player model should set the correct value', function(){
		var selection = HumanPlayer.setSelection("rock");
	  	expect(selection).to.equal("rock");
	});
	it('calling the Player model getter should return the correct value', function(){
		HumanPlayer.setSelection("paper");
		var selection = HumanPlayer.getSelection();
	  	expect(selection.value).to.equal("paper");
	});
	it('when a Player object is initialized score should be 0',function(){
		var initialScore = 	HumanPlayer.getScore();
		expect(initialScore).to.equal(0);
	});
	it('calling the set score function should increase the score of the player by 1',function(){
		HumanPlayer.setScore(HumanPlayer.getScore()+1);
		var newScore = 	HumanPlayer.getScore();
		expect(newScore).to.equal(1);
	});
	
});

