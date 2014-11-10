var Game = require('../js/Game');
var config = require('../js/config');
var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');

var options = config.options;

describe('test the Game Model', function(){

	describe('tie game',function(){
		it('getWinner function should return draw if both selections are the same', function(){
			var result = Game.getWinner(
				{"index":options.indexOf("rock"),"value":"rock"},
				{"index":options.indexOf("rock"),"value":"rock"}
			);
			expect(result.value).to.equal("Draw");
		});
		it('getWinner function should return draw if both selections are the same', function(){
			var result = Game.getWinner(
				{"index":options.indexOf("scissors"),"value":"scissors"},
				{"index":options.indexOf("scissors"),"value":"scissors"}
			);
			expect(result.value).to.equal("Draw");
		});
		it('getWinner function should return draw if both selections are the same', function(){
			var result = Game.getWinner(
				{"index":options.indexOf("paper"),"value":"paper"},
				{"index":options.indexOf("paper"),"value":"paper"}
			);
			expect(result.value).to.equal("Draw");
		});
	});

	describe('Rock beats Scissors', function(){
		it('getWinner function : Rock beats Scissors player 1 wins', function(){
			var result = Game.getWinner(
				{"index":options.indexOf("rock"),"value":"rock"},
				{"index":options.indexOf("scissors"),"value":"scissors"}
			);
			expect(result.value.toLowerCase()).to.equal("rock beats scissors");
			expect(result.winner.toLowerCase()).to.equal("player one");
		});
		it('getWinner function : Rock beats Scissors player 2 wins', function(){
			var result = Game.getWinner(
				{"index":options.indexOf("scissors"),"value":"scissors"},
				{"index":options.indexOf("rock"),"value":"rock"}
			);
			expect(result.value.toLowerCase()).to.equal("rock beats scissors");
			expect(result.winner.toLowerCase()).to.equal("player two");
		});
	});

	describe('Scissors beats Paper',function(){
		it('getWinner function : Scissors beats Paper player 1 wins ', function(){
			var result = Game.getWinner(
				{"index":options.indexOf("scissors"),"value":"scissors"},
				{"index":options.indexOf("paper"),"value":"paper"}
			);
			expect(result.value.toLowerCase()).to.equal("scissors beats paper");
			expect(result.winner.toLowerCase()).to.equal("player one");
		});
		it('getWinner function : Scissors beats Paper player 2 wins', function(){
			var result = Game.getWinner(
				{"index":options.indexOf("paper"),"value":"paper"},
				{"index":options.indexOf("scissors"),"value":"scissors"}
			);
			expect(result.value.toLowerCase()).to.equal("scissors beats paper");
			expect(result.winner.toLowerCase()).to.equal("player two");
		});
	});
	
	describe('Paper beats Rock',function(){
		it('getWinner function : Paper beats Rock player 1 wins', function(){
			var result = Game.getWinner(
				{"index":options.indexOf("paper"),"value":"paper"},
				{"index":options.indexOf("rock"),"value":"rock"}
			);
			expect(result.value.toLowerCase()).to.equal("paper beats rock");
			expect(result.winner.toLowerCase()).to.equal("player one");
		});
		it('getWinner function : Paper beats Rock player 2 wins', function(){
			var result = Game.getWinner(
				{"index":options.indexOf("rock"),"value":"rock"},
				{"index":options.indexOf("paper"),"value":"paper"}
			);
			expect(result.value.toLowerCase()).to.equal("paper beats rock");
			expect(result.winner.toLowerCase()).to.equal("player two");
		});
	});
});

