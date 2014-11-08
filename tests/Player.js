var Player = require('../js/Player');
var HumanPlayer = new Player();

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
	
});

