/*Tic-Tac-Toe Game*/

(function(){
	var numberOfMove = 0; // Number of Move;
	var moves1 = []; // Moves of the Player 1;
	var moves2 = []; // Mover of the Player 2;
	var movesAi = []; // Moves of the AI;
	var vsOrAi = 0;  // 0 - one vs one && 1 - one vs ai.

	var toWinArr = [];     //// Array with winning combinations;
	toWinArr[0] = [0,1,2];
	toWinArr[1] = [3,4,5];
	toWinArr[2] = [6,7,8];
	toWinArr[3] = [3,4,5];
	toWinArr[4] = [0,3,6];
	toWinArr[5] = [1,4,7];
	toWinArr[6] = [2,5,8];
	toWinArr[7] = [0,4,8];
	toWinArr[8] = [2,4,6];

	var toWin = [];      // Array for defining winning combinations written in regular expressions;
	toWin[0] = /0|1|2/g;
	toWin[1] = /3|4|5/g;
	toWin[2] = /6|7|8/g;
	toWin[3] = /3|4|5/g;
	toWin[4] = /0|3|6/g;
	toWin[5] = /1|4|7/g;
	toWin[6] = /2|5|8/g;
	toWin[7] = /0|4|8/g;
	toWin[8] = /2|4|6/g;

	var fieldsContainer = document.getElementById('main_field');

	fieldsContainer.addEventListener('click', function(event) {
		var field = event.target;
		tick(parseInt(field.id));
	});

	var button1 = document.getElementById('button1');
	var button2 = document.getElementById('button2');

	button1.addEventListener('click', function(event) {
		vsOrAiButtons(this.id);
	});
	
	button2.addEventListener('click', function(event) {	
		vsOrAiButtons(this.id);
	});

	function vsOrAiButtons(button){
		reset();
		document.getElementById(button).className = 'button_clicked';
		if (button == "button1" ) {
			document.getElementById("button2").className = 'button';
			vsOrAi = 0;
		}
		if (button == "button2" ) {
			document.getElementById("button1").className = 'button';
			vsOrAi = 1;
		}
	}

	function tick(field) {          
		numberOfMove++;
		if (numberOfMove % 2) {
			player1(field);
			return
		} else {
			if (vsOrAi == 0) {
				player2(field);
				return		
			}
		}
	}


	function reset() {
		numberOfMove = 0; 
		moves1 = []; 
		moves2 = []; 
		movesAi = [];
		for (var j = 0; j <= 8; j++) {
			document.getElementById(j).className = 'fields';
		}
	}

	function chekcDraw() {      
		setTimeout(function() {
			reset();
			alert("DRAW");
		}, 200);
	}

	function checkWin(movesArr, playerId) {                          
		var playerStr = movesArr.toString();
		for (var i = 0; i < toWin.length; i++) {
			if (playerStr.match(toWin[i]) != null && playerStr.match(toWin[i]).length == 3) {
				setTimeout(function(){
					reset();
					if (playerId == "player1") {
						alert("Player1 Win");
					}
					if (playerId == "player2") {
						alert("Player2 Win");
					}
					if (playerId == "ai") {
						alert("You Lose");
					}
				}, 200);
			}
		}
		return false
	}

	function checkAndTickField(field, playerId) {                                    
		if (document.getElementById(field).className == 'fields') {
			if (playerId == "player1" ) {
				moves1.push(field);
				document.getElementById(field).className = 'fields player1';
			}
			if (playerId == "player2" ) {
				moves2.push(field);
				document.getElementById(field).className = 'fields player2';
			}
			if (playerId == "ai" ) {
				movesAi.push(field);
				document.getElementById(field).className = 'fields ai';
			}
			return true
		} else {
			return false
		}
	}

	function player1(field) {
		if (checkAndTickField(field, "player1")) { 
			checkWin(moves1, "player1");
			if (numberOfMove == 9 ) { 
				chekcDraw();
			}
			if (vsOrAi) {
				ai();
			}
		} else {
			numberOfMove--;
		}
	}

	function player2(field) {
		if (checkAndTickField(field, "player2")) { 
			checkWin(moves2, "player2");
		} else {
			numberOfMove--;
		}
	}

	function moveAi(movesArr) {
		if (movesArr.length != 0 && movesArr != null && movesArr[0] != undefined) {
			for (var j = 0; j < movesArr.length; j++) {
				var move = movesArr[j];
				if (checkAndTickField(move, "ai")) { 
					checkWin(movesAi, "ai");
					return true
				}
			}
		}
		return false
	}

	function ai() {
		numberOfMove++;
		switch(numberOfMove) {
			case 2:
			    moveAi(tickOf5());
			    return
    
			case 4:
			    if (moveAi(preventLoseOrWin("preventLose"))) {
			    	return
			    } else {
			    	moveAi(tickOf5());
			    	return
			    }

			case 6:
			    if (moveAi(preventLoseOrWin("tryToWin"))) {
			    	return
			    }
			    if (moveAi(preventLoseOrWin("preventLose"))) {
			    	return
			    }
			    if (moveAi(tickOf5())) {
			    	return
			    }

			case 8:
			    if (moveAi(preventLoseOrWin("tryToWin"))) {
			    	return
			    }
			    if (moveAi(preventLoseOrWin("preventLose"))) {
			    	return
			    }
			    if (moveAi(tickOf5())) {
			    	return
			    }
			    if (moveAi(tickOf4())) { 
			    	return
			    }
		}
	}

	function tickOf5() {
		var gold5 = [4,0,2,6,8];
		return gold5
	}

	function tickOf4() {
		var silver4 = [1,3,5,7];
		return silver4
	}


	function preventLoseOrWin(preventOrWin) {
		var nextMove = [],
		movesArr,
		playerStr;

		if (preventOrWin == "preventLose") {
			movesArr = moves1;
		}
		if (preventOrWin == "tryToWin") {
			movesArr = movesAi;
		}
		
		playerStr = movesArr.toString();

		for (var i = 0; i < toWin.length; i++) {
			if (playerStr.match(toWin[i]) != null && playerStr.match(toWin[i]).length >= 2) {
				var forNextMove = toWinArr[i].slice(0);                                                       
				for (var j = 0; j < movesArr.length; j++) {
					indexOfElement = forNextMove.indexOf(movesArr[j]);
					if (indexOfElement != -1) {
						forNextMove.splice(indexOfElement,1) 
					}
				}
				nextMove.push(forNextMove[0]);
			}
		}
		return nextMove 
	}

})()