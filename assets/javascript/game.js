//GLOBAL VARIABLES
//**************************************************** */ 
//Arrays and variables that hold data
const wordOptions = ["deer", "monkey", "wolf", "tiger", "moose", "fox", "bear", "pelican"];
//blank array for chosen words
let selectedWord = "";
let lettersInWord =[];
//number of blank spaces on word guessing game
let numBlanks = 0;
let blankandSucGuess = [];
let wrongLetters = [];

//Game Counters
let winCount = 0;
let lossCount = 0;
let guessesLeft = 9;
//FUNCTIONS
//**************************************************** */
//function to random generate word
startGame = () => {
    selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
    //splits arrays and shows them as individual words
    lettersInWord = selectedWord.split("");
    //Shows the number of letters in a word
    numBlanks = lettersInWord.length;

    //Reset Guesses Left
    guessesLeft = 9;
    //Resets wrong letter to zero
    wrongLetters = [];
    //Resets the blanks _ _ _ 
    blankandSucGuess = [];

    //Populate blanks and successes with number of letters in word
    for (let i=0; i<numBlanks; i++) {
        blankandSucGuess.push("_");
    }

    //Functions to write on to HTML and change what the user sees
    //.join removes commas that would appear on the HTML
    document.getElementById("wordToGuess").innerHTML = blankandSucGuess.join("  ");
    document.getElementById("numGuesses").innerHTML = guessesLeft;
    document.getElementById("winCounter").innerHTML = winCount;
    document.getElementById("lossCounter").innerHTML = lossCount;

    //test code as it is being written
    console.log(selectedWord);
    console.log(lettersInWord);
    console.log(numBlanks);
    console.log(blankandSucGuess);
}

checkLetters = (letter) => {
    

   //Checks if letter exists in word 
    let isLetterInWord = false;

    for (var i=0; i<numBlanks; i++) {
        //if the selected word is in the letter then it is true
        if(selectedWord[i] === letter) {
            isLetterInWord = true;
            //Under function use "alert("Letter found");" to test if the function can find the right letter. Alert should say "letter found"
            
        }
    }
//Add correctly guessed letter to blanks
  if(isLetterInWord) {
    for (var i=0; i<numBlanks; i++) {
        if(selectedWord[i] === letter) {
            blankandSucGuess[i] = letter;
        }
    }
}

else {
    wrongLetters.push(letter);
    guessesLeft--
  }
  console.log(blankandSucGuess);

}

//Function to finish the game
//funtion brings the guesses counter down
roundComplete = () => {
    console.log(`Win Count: ${winCount} | Loss Count: ${lossCount}| Gussess Left${guessesLeft}`);

    //Shows the player the stats 
    document.getElementById("numGuesses").innerHTML = guessesLeft;
    //add (" ") to get rid of commas that will populate for the user
    document.getElementById("wordToGuess").innerHTML = blankandSucGuess.join(" ");
    document.getElementById("wrongGuesses").innerHTML = wrongLetters.join(" ");

    //check if user won by seeing if the letter of the words fill up the blanks
if (lettersInWord.toString() === blankandSucGuess.toString()) {
    winCount++;
    alert("You Won!")
//update the win counter
document.getElementById("winCounter").innerHTML = winCount;    
startGame()
}

    //check if user lost
    else if (guessesLeft === 0) {
        lossCount++;
        alert("You Lost!");
        //write to HTML
    document.getElementById("lossCounter").innerHTML = lossCount;    
        //run "startGame():" again to reset the game back to default
        startGame();

    }
}

//MAIN PROCESS WHERE WE CALL THE FUNCTIONS
//**************************************************** */
//Same name as beginning function, without it cant start game
startGame();
//Register key clicks
//can test this code with "alert(letterGuessed); or console.log" to see what key was clicked
//keeps count of letters pressed and turns them to lower case
document.onkeyup = event => {
    const letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    checkLetters(letterGuessed);
    roundComplete();
    console.log("letterGuessed");
}