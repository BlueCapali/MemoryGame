/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    guess: null,
    guessCounter: 0
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var model_1 = __webpack_require__(3);
var view_1 = __webpack_require__(4);
var gameState_1 = __webpack_require__(0);
"use strict";
var view = new view_1.default();
var model = new model_1.default();
var deckSize = 0;
var allTimeBestScore = 0;
var Game = (function () {
    function Game() {
    }
    Game.prototype.init = function () {
        view.start();
        deckSize = Number($("#decksize option:first").text());
        $(".size").change(function () {
            deckSize = Number($("#decksize option:selected").text());
        });
        view.$playButton.on("click", function () {
            allTimeBestScore = Number(window.localStorage.getItem(String(deckSize)));
            $(".bestScore").html("Best Score for this deck: " + allTimeBestScore);
            Game.setCards();
            view.setup();
        });
        view.$restartButton.on("click", $.proxy(this.restart, view_1.default));
    };
    ;
    Game.prototype.restart = function () {
        Game.setLocalStorage();
        view.hideModal();
        gameState_1.default.guessCounter = 0;
        $(".guesses").html("");
        $(".bestScore").html("");
        var newGame = new Game().init();
    };
    ;
    Game.setLocalStorage = function () {
        var localStorageDeckSize = Number(window.localStorage.getItem(String(deckSize)));
        if (localStorageDeckSize == 0 || isNaN(localStorageDeckSize)) {
            window.localStorage.setItem(String(deckSize), String(gameState_1.default.guessCounter));
        }
        else if (localStorageDeckSize > gameState_1.default.guessCounter && gameState_1.default.guessCounter > 0) {
            window.localStorage.setItem(String(deckSize), String(gameState_1.default.guessCounter));
        }
    };
    Game.setCards = function () {
        view.$cards = $(this.shuffleCards(this.setDeckSize(deckSize / 2)));
    };
    ;
    Game.setDeckSize = function (size) {
        var deck = [];
        for (var i = 0; i < size; i++) {
            deck.push(model_1.default.cards[i]);
        }
        return deck;
    };
    Game.shuffleCards = function (deck) {
        var cards = deck.concat(deck);
        var counter = cards.length;
        while (counter > 0) {
            var index = Math.floor(Math.random() * counter);
            counter--;
            var temp = cards[counter];
            cards[counter] = cards[index];
            cards[index] = temp;
        }
        return cards;
    };
    ;
    return Game;
}());
exports.default = Game;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var presenter_1 = __webpack_require__(1);
var game = new presenter_1.default().init();


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Cards = (function () {
    function Cards() {
    }
    return Cards;
}());
Cards.cards = [
    {
        name: "angular",
        img: "img/angular.png",
        id: 1,
    },
    {
        name: "d3",
        img: "img/d3.png",
        id: 2
    },
    {
        name: "jenkins",
        img: "img/jenkins.png",
        id: 3
    },
    {
        name: "postcss",
        img: "img/postcss.png",
        id: 4
    },
    {
        name: "react",
        img: "img/react.png",
        id: 5
    },
    {
        name: "redux",
        img: "img/redux.png",
        id: 6
    },
    {
        name: "sass",
        img: "img/sass.png",
        id: 7
    },
    {
        name: "supercharge",
        img: "img/supercharge.png",
        id: 8
    },
    {
        name: "ts",
        img: "img/ts.png",
        id: 9
    },
    {
        name: "webpack",
        img: "img/webpack.png",
        id: 10
    }
];
exports.default = Cards;
;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../typings/globals/jquery/index.d.ts" />
var $ = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var gameState_1 = __webpack_require__(0);
var View = (function () {
    function View() {
        View.$game = $(".game");
        View.$gameSet = $(".game-set");
        View.$gameSetModal = $(".game-set-modal");
        View.$modal = $(".modal");
        View.$overlay = $(".modal-overlay");
        this.$restartButton = $("button.restart");
        this.$playButton = $("button.play");
    }
    View.prototype.setup = function () {
        this.html = this.buildCardElements();
        View.$gameSet.fadeOut();
        View.$gameSetModal.fadeOut();
        View.$game.html(this.html);
        View.$game.fadeIn("slow");
        this.$memoryCards = $(".card");
        this.binding();
    };
    View.prototype.start = function () {
        View.$gameSet.show();
        View.$gameSetModal.fadeIn("slow");
    };
    View.prototype.buildCardElements = function () {
        var elements = '';
        this.$cards.each(function (e, card) {
            elements += '<div class="card" data-id="' + card.id + '"><div class="inside">\
			<div class="front"><img src="' + card.img + '"\
			alt="' + card.name + '" /></div>\
			<div class="back"><img src="img/sw.png"\
			alt="Codepen" /></div></div>\
			</div>';
        });
        return elements;
    };
    View.prototype.binding = function () {
        this.$memoryCards.on("click", this.cardClicked);
    };
    ;
    View.prototype.hideModal = function () {
        View.$overlay.hide();
        View.$modal.hide();
    };
    ;
    View.prototype.cardClicked = function () {
        var $card = $(this);
        if (!$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")) {
            $card.find(".inside").addClass("picked");
            if (!gameState_1.default.guess) {
                gameState_1.default.guess = $(this).attr("data-id");
            }
            else if (gameState_1.default.guess == $(this).attr("data-id") && !$(this).hasClass("picked")) {
                $(".guesses").html("Guesses: " + String(gameState_1.default.guessCounter++));
                $(".picked").addClass("matched");
                gameState_1.default.guess = null;
            }
            else {
                $(".guesses").html("Guesses: " + String(gameState_1.default.guessCounter++));
                gameState_1.default.guess = null;
                setTimeout(function () {
                    $(".picked").removeClass("picked");
                }, 600);
            }
            if ($(".matched").length == $(".card").length) {
                View.win();
            }
        }
    };
    ;
    View.win = function () {
        setTimeout(function () {
            View.$game.fadeOut();
            View.$overlay.show();
            View.$modal.fadeIn("slow");
        }, 1000);
    };
    ;
    return View;
}());
exports.default = View;


/***/ })
/******/ ]);