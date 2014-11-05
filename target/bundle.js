(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Player = require('./Player');

//use polymorphism to create the ComputerPlayer object
function ComputerPlayer(name){
	Player.call(this,name);
}


module.exports = ComputerPlayer;
},{"./Player":3}],2:[function(require,module,exports){
var Player = require('./Player');
var Computer = require('./ComputerPlayer');

var Game = {
	init: function () {
	
		var player1 = new Player('test');
		var Player2 = new Computer('test2');

		this.bindEvents();
	},
	bindEvents : function(){
		document.querySelector('.game-board ul').addEventListener("click",function(){

		});
	}
}

Game.init();

module.exports = Game;












},{"./ComputerPlayer":1,"./Player":3}],3:[function(require,module,exports){
function Player(name){
	this.name = name;
}

module.exports = Player;
},{}],4:[function(require,module,exports){
// Add a getElementsByClassName function if the browser doesn't have one
// Limitation: only works with one class name
// Copyright: Eike Send http://eike.se/nd
// License: MIT License

if (!document.getElementsByClassName) {
  document.getElementsByClassName = function(search) {
    var d = document, elements, pattern, i, results = [];
    if (d.querySelectorAll) { // IE8
      return d.querySelectorAll("." + search);
    }
    if (d.evaluate) { // IE6, IE7
      pattern = ".//*[contains(concat(' ', @class, ' '), ' " + search + " ')]";
      elements = d.evaluate(pattern, d, null, 0, null);
      while ((i = elements.iterateNext())) {
        results.push(i);
      }
    } else {
      elements = d.getElementsByTagName("*");
      pattern = new RegExp("(^|\\s)" + search + "(\\s|$)");
      for (i = 0; i < elements.length; i++) {
        if ( pattern.test(elements[i].className) ) {
          results.push(elements[i]);
        }
      }
    }
    return results;
  }
}

},{}]},{},[1,2,3,4]);