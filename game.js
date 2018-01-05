var suits = ["spades", "hearts", "clubs", "diams"];
var cardFace = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
var cards = [];
var players = [[], []];
var timer;
var r = 0;

var fightButton = document.querySelector("#battleButton");
var fightButton10 = document.querySelector("#battleButton10");
var fightButton50 = document.querySelector("#battleButton50");

var firstRun = true;
var gameOver = false;

var p1 = document.querySelector("#player .hand");
var p2 = document.querySelector("#comp .hand");

var s1 = document.querySelector("#player .score");
var s2 = document.querySelector("#comp .score");

// var message = document.getElementById("message");

//event listeners

fightButton.addEventListener('click', battle);
fightButton10.addEventListener('click', function() {
	rounds(10);
});

fightButton50.addEventListener('click', function() {
	rounds(50);
});


// functions

function rounds(a){
	r = a;
	timer = setInterval(function(){
		battle();
	},100);
}

function battle() {
	if(timer){
		r--;
		changeMessage("Rounds Left " + r);
		if(r < 1){
			window.clearInterval(timer);
		}
	}
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

		p1.innerHTML = showCard(card1, 0);
		p2.innerHTML = showCard(card2, 0);

		checkWinner(card1, card2, pot);

		s1.innerHTML = players[0].length;
		s2.innerHTML = players[1].length;

	}
}

function changeMessage(message){
	document.getElementById("message").innerHTML = message;
}

function checkWinner(card1, card2, pot){
	console.log(card1, card2);
	if(card1.cardValue > card2.cardValue){
		changeMessage("Player Wins")
		players[0] = players[0].concat(pot);
	} else if(card1.cardValue < card2.cardValue){
		changeMessage("Computer Wins")
		players[1] = players[1].concat(pot);
	} else {
		changeMessage("WARRRRRRRRRRR");
		war(pot);
	}
}

function war(pot){
	var card1, card2;
	var pos = (pot.length/2);
	if((players[0].length <= 4) || (players[1].length <= 4)){
		console.log("GAME OVER");
		gameOver = true;
		return;
	} else {
		for(var i = 0; i < 4; i++){
			card1 = players[0].shift();
			pot = pot.concat(card1);
			p1.innerHTML += showCard(card1, (pos+i));
		}
		for(var i = 0; i < 4; i++){
			card2 = players[1].shift();
			pot = pot.concat(card2);
			p2.innerHTML += showCard(card2, (pos+i));
		}
		checkWinner(card1, card2, pot);
	}
}

function showCard(c, p){
	var move = p * 40;
	var bCard = '<div class="icard '+c.suit+' " style="left:'+move+'px">';
	bCard += '<div class="cardTop suit">' + c.num + '<br></div>';
	bCard += '<div class="cardMid suit"></div>';
	bCard += '<div class="cardBottom suit">' + c.num + '<br></div></div>';
	return bCard;
}









