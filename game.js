var suits = ["spades", "hearts", "clubs", "diams"];
var cardFace = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
var cards = [];
var players = [[], []];

var fightButton = document.querySelector("#battleButton");
var firstRun = true;
var gameOver = false;

var p1 = document.querySelector("#player .hand");
var p2 = document.querySelector("#comp .hand");

//event listeners

fightButton.addEventListener('click', battle);

// functions

function battle() {
	if(firstRun){
		firstRun = false;
		buildCards();
		shuffle(cards);
		dealCards(cards);
	}
	attack();
	// console.log('working');
}

function buildCards(){
	cards = [];
	for(s in suits){
		var suit = suits[s][0].toUpperCase();
		for(n in cardFace){
			var card = {
				suit: suits[s],
				num: cardFace[n],
				cardValue: parseInt(n) +2,
				icon: suit
			}
			cards.push(card);
		}
	}
	console.log(cards);
}

function dealCards(arr){
	for(var i = 0; i < arr.length; i++){
		var m = i % 2;
		players[m].push(arr[i]);
	}
	console.log(players);
}


function shuffle(array){
	for(var x = array.length - 1; x > 0; x--){
		var i = Math.floor(Math.random() * (x+1));
		var temp = array[x];
		array[x] = array[i];
		array[i] = temp;
	}
	console.log(cards);
	return array
}

function attack(){
	if(!gameOver){
		var card1 = players[0].shift();
		var card2 = players[1].shift();
		var pot = [card1, card2];
		// update html
		p1.innerHTML = showCard(card1, 0);
		p2.innerHTML = showCard(card2, 0);
		// check for winner
		// update scores

	}
}

function showCard(c, p){
	var move = p * 40;
	// var backgroundColor = (c.icon == "H" || c.icon == "D") ? "red" : "black";
	var bCard = '<div class="icard '+c.suit+' " style="left:'+move+'px">'+ c.num + ' &' + c.suit + ';</div>';
	console.log(c, move);
	return bCard;
}









