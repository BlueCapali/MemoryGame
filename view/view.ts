/// <reference path="../typings/globals/jquery/index.d.ts" />
import * as $ from "jquery";
import gameState from "../gameState";

export default class View {
    private html: any;
    public static $game: any;
    public static $gameSet: any;
    public static $gameSetModal: any;
	private static $modal: any;
	private static $overlay: any;
	public $restartButton: any;
    public $playButton: any;
	public $cards: any;
	private $memoryCards: any;
    private guess: any;
    private $guesses: any;
    private $bestScore: any;
    
    constructor() {
        View.$game = $(".game");
        View.$gameSet = $(".game-set");
        View.$gameSetModal = $(".game-set-modal");
		View.$modal = $(".modal");
		View.$overlay = $(".modal-overlay");
		this.$restartButton = $("button.restart");
        this.$playButton = $("button.play");
    }
    
    public setup() {
        this.html = this.buildCardElements();
		View.$gameSet.fadeOut();
		View.$gameSetModal.fadeOut();
        View.$game.html(this.html);
		View.$game.fadeIn("slow");
		this.$memoryCards = $(".card");
        this.binding();
    }
    
    public start() {
        View.$gameSet.show();
        View.$gameSetModal.fadeIn("slow");
    }
    
    private buildCardElements() {
        var elements = '';
		this.$cards.each(function(e: any, card: any){
			elements += '<div class="card" data-id="'+ card.id +'"><div class="inside">\
			<div class="front"><img src="'+ card.img +'"\
			alt="'+ card.name +'" /></div>\
			<div class="back"><img src="img/sw.png"\
			alt="Codepen" /></div></div>\
			</div>';
		});
		return elements;
    }
    
    private binding() {
		this.$memoryCards.on("click", this.cardClicked);
	};
    
    public hideModal() {
		View.$overlay.hide();
		View.$modal.hide();
	};
    
    private cardClicked() {
		let $card = $(this);
		
		if(!$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")){
			$card.find(".inside").addClass("picked");
			if(!gameState.guess){
				gameState.guess = $(this).attr("data-id");
			} else if(gameState.guess == $(this).attr("data-id") && !$(this).hasClass("picked")){
                $(".guesses").html("Guesses: " + String(gameState.guessCounter++));
                $(".picked").addClass("matched");
				gameState.guess = null;
			} else {
                $(".guesses").html("Guesses: " + String(gameState.guessCounter++));
				gameState.guess = null;
				setTimeout(function(){
					$(".picked").removeClass("picked");
				}, 600);
			}
			if($(".matched").length == $(".card").length){
				View.win();
			}
		}
	};
    
    static win() {
		setTimeout(function(){
		View.$game.fadeOut();
		View.$overlay.show();
		View.$modal.fadeIn("slow");
		}, 1000);
	};
 }