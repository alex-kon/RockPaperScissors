var helpers = {
	/**
	*	custom fade out function 
	*	@param {node elemt} element - crates the fadeOut effect on the HTML element passed as a param
	**/
	fadeOut : function(element){

		element.style.opacity=1;
		var intervalID = window.setInterval(function(){
			if(element.style.opacity<=0.1){
				element.style.display = "none";
				window.clearInterval(intervalID);
			}
			element.style.opacity -= 0.1;
		},50);

	},
	/**
	*	shorthand so we don't have to write document.querySelector everywhere 
	*	@param {string} query - used to query the DOM for an html element
	**/
	getElement : function(element){
		return document.querySelector(element);
	},
	/**
	*	crate a count down for each game
	*
	**/
	startCountDown: function(){
		var countDownEl = this.getElement('.countdown'),
			resultEl = this.getElement('.result'),
			that = this,
			scoreEl = this.getElement('.score');

		var counter = 3;

		countDownEl.style.display="block";
		resultEl.style.display="none";
		scoreEl.style.display="none";

		that.countDownAimation(countDownEl,counter);

		var intervalId = window.setInterval(function(){
			counter--;
			if(counter===0){
				clearInterval(intervalId);
			}else{
				that.countDownAimation(countDownEl,counter);
			}
		},1000);
	},
	countDownAimation: function(countDownEl,counter){
		countDownEl.innerHTML=counter;
	},
};

module.exports = helpers;