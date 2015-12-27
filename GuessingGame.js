/* **** Global Variables **** */

var playersGuess;
var winningNumber;
/*Global Variable 'count' to count guess chances. 
  Global Variable 'changeCount' to set guessing chances given to player.
 Array 'guessNumbers' to save playersGuess numbers. */  
 
var changeCount = 5;
var guessNumbers = [];
var count = changeCount;

/* **** Guessing Game Functions **** */

// Generate the Winning Number
// function generateWinningNumber() generate a random number between 1 to 100.  

function generateWinningNumber(){

	return Math.floor(Math.random()*100) + 1;

}

winningNumber = generateWinningNumber();

// Fetch the Players Guess
/*  function playersGuessSubmission() passes players input to Global variable 
playersGuess, and updates player's guess chances left.  */ 
function playersGuessSubmission(){
    	if(count >= 2) {
    
		playersGuess = +document.getElementById('inputnum').value;
		document.getElementById('inputnum').value = "";
		checkGuess();
		$(".checkleft").text("You have "+count+" chances to guess the number");
    	}
    	else {
    	$(".checknum").text("Game over. You lost! Play again?");
    	$("#inputnum").css({backgroundColor: 'gray'});

    	}
   	
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


/* **** Event Listeners/Handlers */ 
	$(document).ready(function(){
		//pass guessNumber with return key
		$("#inputnum").keydown(function(event){
        
			if (event.which == 13) {
				event.preventDefault();
        		playersGuessSubmission();
        	}
        });
        //pass guessNumber with submit button
		$("#submitnum").click(playersGuessSubmission);
		//click 'hint' button to run function provideHint.
		$("#hint").click(provideHint);
		//click 'newgame' button to run function playAgain.
    	$("#newgame").click(playAgain);
});