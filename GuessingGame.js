/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

var playersGuess;
var winningNumber;
var changeCount = 5;
var guessNumbers = [];
var count = changeCount;

/* **** Guessing Game Functions **** */

// Generate the Winning Number
winningNumber = generateWinningNumber();

function generateWinningNumber(){
	// add code here
	return Math.floor(Math.random()*100) + 1;

}

// Fetch the Players Guess

function playersGuessSubmission(){
   
    if(count >= 1) {
	playersGuess = +document.getElementById('inputnum').value;
	document.getElementById('inputnum').value = "";
	checkGuess();
	$(".checkleft").text("You have "+count+" chances to guess the number");

    }
    else {
    	$(".checknum").text("Game over. You lost! Play again?");
    	$("#inputnum").css({backgroundColor: 'gray'});

    }
	// add code here	
}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(){
	// add code here
	if (playersGuess > winningNumber) {
		return "Your guess is higher.\n";
	}
	else {
		return "Your guess is lower.\n";
	}
}
function guessMessage(){
    var diffNumber = Math.abs(playersGuess-winningNumber);
    var feadbackMessage = "";
    if (diffNumber < 15) {
    	feadbackMessage = lowerOrHigher() + "And your guess is really hot!";
    }
    else if(diffNumber <50){
    	feadbackMessage = lowerOrHigher() + "And your guess is hot!";
    } 
    else if (diffNumber <85) {
    	feadbackMessage = lowerOrHigher() + "And your guess is cold!";

    }
    else {
    	feadbackMessage = lowerOrHigher() + "And your guess is  really cold!";
    }
	return feadbackMessage;
}

// Check if the Player's Guess is the winning number 

function checkGuess(){

	var returnmessage ="";
	
	
	//check if playersGuess has already been in guessNumbers.
	function checkredulication() {
	   
	    for (var i = guessNumbers.length-1 ;i>=0;i--) {
	       if (playersGuess==guessNumbers[i]) {
	           return false;
	       }
	    }   
	    return true;
	 }

	if (checkredulication()){
		count--;
		guessNumbers.push(playersGuess);
		
		if (playersGuess === winningNumber) {
			returnmessage = "Concratulations! You won!";
			$("#inputnum").css({backgroundColor: 'red'});
		}
		else {
            returnmessage = guessMessage();
		}
	}
	else {
		returnmessage = "You already tried this, Guess a new number.";
	}
	
    $(".checknum").text(returnmessage);
}

//suffle an array 
function shuffleArray(hintNumber) {
    for (var i = hintNumber.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = hintNumber[i];
        hintNumber[i] = hintNumber[j];
        hintNumber[j] = temp;
    }
    return hintNumber;
}
// Create a provide hint button that provides additional clues to the "Player"


function provideHint(){
	// add code here
	var hintMessage = "";
	var hintNumber = [];
	if (guessNumbers.length === changeCount) {
		hintMessage = "Game Over!\n" + 
		 "The number was "+ winningNumber + 
		 ",\nYour guess were "+guessNumbers.join(",")+ ".";
       
	}
	else {
		var hintNums = changeCount - guessNumbers.length;
        for (;hintNums > 1;  hintNums--) {
        	hintNumber.push(generateWinningNumber());
        }
        hintNumber.push(winningNumber);
        
	    hintNumber = shuffleArray(hintNumber);
	    hintMessage = "One of them is the secret number "+ hintNumber.join(",")+".";
     }
     $(".checknum").text(hintMessage);
}

// Allow the "Player" to Play Again

function playAgain(){
	// add code here
	guessNumbers = [];
	winningNumber = generateWinningNumber();
	count = changeCount;
	$(".checknum").text("What is your guess?");
	$(".checkleft").text("You have 5 chances to guess the number");
    $("#inputnum").css({backgroundColor: 'white'});
}


/* **** Event Listeners/Handlers$(document).ready(function(){
	/*$("#inputnum").keydown(function(event){
        event.preventDefault();
		if (event.which == 13) {
        playersGuessSubmission();
    }
	});*/
	$(document).ready(function(){
		$("#submitnum").click(playersGuessSubmission);
		$("#hint").click(provideHint);
    	$("#newgame").click(playAgain);
});