var ComputerModel = require('../js/ComputerPlayer');
var ComputerPlayer = new ComputerModel();

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');

// tests.js
describe('test the ComputerPlayer Model', function(){
	it('calling the Computer model getter should set a random value of rock,paper or scissors', function(){
		var selection = ComputerPlayer.getRandomSelection();
	  	expect(selection.value).to.match(/(paper)|(rock)|(scissors)/);
	});
	
});

