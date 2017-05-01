import Cards from "../model/model";
import View from "../view/view";
import gameState from "../gameState";

"use strict";

let view = new View();
let model = new Cards();
let deckSize = 0;
let allTimeBestScore = 0;

export default class Game {
	public init() {
        view.start();
        deckSize = Number($("#decksize option:first").text());
        $(".size").change(function() {
           deckSize = Number($("#decksize option:selected").text());
        });
        
        view.$playButton.on("click", function() {
            allTimeBestScore = Number(window.localStorage.getItem(String(deckSize)));
            $(".footerAllTimeBest").html("Best Score for this deck: " + allTimeBestScore);
            Game.setCards();
		    view.setup();
        });
        view.$restartButton.on("click", $.proxy(this.restart, View));
	};
    
    private restart() {
        Game.setLocalStorage();

		view.hideModal();
        gameState.guessCounter = 0;
        $(".footerGuesses").html("");
        $(".footerAllTimeBest").html("");
		let newGame = new Game().init();
	};
    
    private static setLocalStorage() {
        let localStorageDeckSize = Number(window.localStorage.getItem(String(deckSize)));
        if(localStorageDeckSize == 0 || isNaN(localStorageDeckSize)) {
          window.localStorage.setItem(String(deckSize), String(gameState.guessCounter));  
        } else if(localStorageDeckSize > gameState.guessCounter && gameState.guessCounter > 0){
            window.localStorage.setItem(String(deckSize), String(gameState.guessCounter)); 
        }
    }

	private static setCards() {
		view.$cards = $(this.shuffleCards(this.setDeckSize(deckSize / 2)));
	};
    
    private static setDeckSize(size: number) {
        let deck: any = [];
        for(let i = 0; i < size; i++) {
            deck.push(Cards.cards[i]);
        }
        
        return deck;
    }
    
    private static shuffleCards(deck: any[]) {
        let cards = deck.concat(deck);
		let counter = cards.length;
		while (counter > 0) {
			let index = Math.floor(Math.random() * counter);
			counter--;
			let temp = cards[counter];
			cards[counter] = cards[index];
			cards[index] = temp;
		}
		return cards;
    };
}