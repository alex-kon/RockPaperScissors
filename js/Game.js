var PlayerModel = require('./Player');
var ComputerModel = require('./ComputerPlayer');
var helpers = require('./helpers');
var controller = require('./winController');
/** 
*	static vars 
**/
var rock="rock",
	paper="paper",
	scissors="scissors";

/** 
*	global models 
**/	
var PlayerOne=null,
	PlayerTwo=null;

/** 
*	main Game object that contains the logic to determine the winner 
**/
var Game = {
	/** 
	*	init function to bootstrap the app 
	**/
	init: function () {
		this.bindEvents();
	},
	/** 
	*	bind all the event handlers we need 
	**/
	bindEvents : function(){
		var that = this;

		/*** Initialize the game mode ***/

		//bind the event to Player vs Computer button the start panel
		var startPlayerGame = helpers.getElement('.player-vs-computer');
		startPlayerGame.addEventListener("click",function(){
			var gameBoard = helpers.getElement('.game-board').classList;
			gameBoard.add('player-vs-computer-game');
			gameBoard.remove('computer-vs-computer-game');
			//start playing
			that.startGame("player");
		});

		//bind the event to Computer vs Computer button the start panel
		var startComputerGame = helpers.getElement('.computer-vs-computer');
		startComputerGame.addEventListener("click",function(){
			var gameBoard = helpers.getElement('.game-board').classList;
			gameBoard.add('computer-vs-computer-game');
			gameBoard.remove('player-vs-computer-game');
			//start the first game
			that.startGame("computer");
			that.playComputerGame();
		});

		/*** initialize the event handlers for the user game ***/
		var gameBoardPlayer = helpers.getElement('.choices');
		gameBoardPlayer.addEventListener("click",function(event){
			var classes = event.target.className;
			//start the game
			that.playGame(classes);
		});

		/*** initialize the event handlers for the play new game action ***/
		var playAgainEl = helpers.getElement('.play-again');
		playAgainEl.addEventListener("click",function(event){
			//start the game
			that.startNewGame();
		});

		var playAgainSameGameEl = helpers.getElement('.play-again-same-game');
		playAgainSameGameEl.addEventListener("click",function(event){
			//start the game
			that.playComputerGame();
		});
	},
	/**
	* starts a computer vs computer game
	**/
	playComputerGame: function(){

		var playerOneChoice = PlayerOne.getRandomSelection();
		var playerTwoChoice = PlayerTwo.getRandomSelection();
		
		//get the Winner
		var result = controller.getWinner(playerOneChoice,playerTwoChoice);

		//show the result on screen
		this.showResultOnScreen(result,playerOneChoice,playerTwoChoice);		

	},
	/**
	* contains the calls to the main functions
	* @param {string} userChoice - classes of the button selected by a user - contains a class with the 
	* selected choice (rock,paper,scissors)
	**/
	playGame : function(userChoice){

		//set the Player Model vars
		this.setPlayerSelection(userChoice,PlayerOne);

		//get random Computer Selection
		var computerSelection = PlayerTwo.getRandomSelection();

		//get Human selection
		var userSelection = PlayerOne.getSelection();

		//get the Winner
		var result = controller.getWinner(userSelection,computerSelection);

		//show the result on screen
		this.showResultOnScreen(result,userSelection,computerSelection);

	},
	/**
	* Initialize the correct heading based on the game mode
	**/
	initHeading: function(){
		var playerOneHeader = helpers.getElement('.player-one-title');
		var playerTwoHeader = helpers.getElement('.player-two-title');

		var playerOneScore = helpers.getElement('.player-one-selection');
		var playerTwoScore = helpers.getElement('.player-two-selection');
		
		playerOneScore.innerHTML="";
		playerTwoScore.innerHTML="";

		if(PlayerOne instanceof ComputerModel){
			playerOneHeader.innerHTML="Player One Choice";
			playerTwoHeader.innerHTML="Player Two Choice";
		}else{
			console.log('here');
			playerOneHeader.innerHTML="Your choice";
			playerTwoHeader.innerHTML="Computer's Choice";
		}
	},
	showPlayerOneResult: function(userSelection){
		var playerEl = helpers.getElement('.player-one-selection');
		playerEl.innerHTML=userSelection.value;
	},
	showPlayerTwoResult: function(userSelection){
		var playerEl = helpers.getElement('.player-two-selection');
		playerEl.innerHTML=userSelection.value;
	},
	showResultOnScreen: function(result,playerOneChoice,playerTwoChoice){
		var that = this;
		/*
		* show the result in the screen
		**/
		//start the countdown animation
		helpers.startCountDown();
		var countDownEl = helpers.getElement('.countdown');
		var resultEl = helpers.getElement('.result');
		var gameTitleEl = helpers.getElement('.game-title');

		gameTitleEl.style.display="none";

		//increase the score for the winner
		that.setScore(result.winner);

		setTimeout(function(){
			
			//display the actual score in the HTML
			that.displayScore(result.winner);

			//end the countdown animation
			countDownEl.style.display="none";
			countDownEl.innerHTML="";

			//show the result on screen
			resultEl.style.display="block";

			//show the winning message on screen
			that.displayMessage(result);

			//show player one choice on the screen
			that.showPlayerOneResult(playerOneChoice);
			//show player two choice
			that.showPlayerTwoResult(playerTwoChoice);

		},3000);
	},
	/** 
	*	calls the setter of the Player model
	*	@param {string} userChoice - contains the choice of the user
	**/
	setPlayerSelection : function(userChoice,player){
		if(userChoice.indexOf(rock) >= 0){
			player.setSelection(rock);
		}else if (userChoice.indexOf(paper) >= 0){
			player.setSelection(paper);
		}else {
			player.setSelection(scissors);
		}	
	},
	/**
	*	display the winner on the UI
	*	@param {object} result - contains the winning player and the result
	* 	eg result = {"value":"Scissors beats Paper","winner":"Player One"}
	**/
	displayMessage : function(result){
		var scoreElement = helpers.getElement('.result'),
			resultValue = result.value.toLowerCase(),
			resultWinner = result.winner.toLowerCase(),
			winningSide = resultWinner;

		//if the result is not draw change the message accordignly
		if(resultValue !== "draw"){
		 	winningSide = resultWinner == "player one" ? "You win" : "Computer Wins";
		}

		scoreElement.innerHTML = resultValue + '</br>' + winningSide;
	},
	/**
	*	initialize the game defaults based on the game mode selected 
	*	@param {string} type - sets the player mode - either a player vs computer game or computer vs computer game
	**/
	startGame : function(type){
		
		var element = helpers.getElement('.start-game-panel');
		helpers.fadeOut(element);
		
		var gameTitleEl = helpers.getElement('.game-title');
		gameTitleEl.style.display = "table-cell";

		if(type === "player"){
			//initialize the Game models - one Computer Game and one Human Player
			PlayerOne = new PlayerModel(0);
			PlayerTwo = new ComputerModel(0);

		}else if (type === "computer"){
			//initialize the Game models - one Computer Game and one Human Player
			PlayerOne = new ComputerModel(0);
			PlayerTwo = new ComputerModel(0);
		}

		//show different heading if game is Computer vs Human or Computer vs Computer
		this.initHeading();

	},
	/**
	* increase the score for the winner
	* @param {string} winner - represents the winning player
	**/
	setScore: function(winner){
		if(winner==="Player One"){
			PlayerOne.setScore(parseInt(PlayerOne.getScore())+1);
		}else if(winner==="Player Two"){
			PlayerTwo.setScore(PlayerTwo.getScore()+1);
		}
	},
	/**
	* display the score for of the current Game
	**/
	displayScore: function(){
		//Player one score
		var scoreEl = helpers.getElement('.score');
		scoreEl.innerHTML = PlayerOne.getScore() + ' / ' + PlayerTwo.getScore();
		scoreEl.style.display="block";
	},
	/**
	* start a new game
	**/
	startNewGame: function(){
		
		//set the initial objects to null
		PlayerOne = null;
		PlayerTwo = null;
		console.log('reset : ',PlayerOne);
		//display the start panel
		var startPanel = helpers.getElement('.start-game-panel');
		startPanel.style.display="block";
		startPanel.style.opacity="1";
		
		var resultPanelEl = helpers.getElement('.result');
		resultPanelEl.style.display="none";

		var scorePanelEl = helpers.getElement('.score');
		scorePanelEl.style.display="none";

	}
};

module.exports = Game;











