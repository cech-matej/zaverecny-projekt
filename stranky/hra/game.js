//Array of pokemon objects each with words (name), image1 (Pokemon Silhouettes), image2 (Pokemon Reveal)
var pokemonArray = [
    {
        word: "crabominable",
        image1: "img/crabominable-b.png",
        image2: "img/crabominable.png"
    },
    {
        word: "caterpie",
        image1: "img/caterpie-b.png",
        image2: "img/caterpie.png"
    },
    {
        word: "mew",
        image1: "img/mew-b.png",
        image2: "img/mew.png"
    },
    {
        word: "glaceon",
        image1: "img/glaceon-b.png",
        image2: "img/glaceon.png"
    },
    {
        word: "hydreigon",
        image1: "img/hydreigon-b.png",
        image2: "img/hydreigon.png"
    },
    {
        word: "pidgeotto",
        image1: "img/pidgeotto-b.png",
        image2: "img/pidgeotto.png"
    },
    {
        word: "reshiram",
        image1: "img/reshiram-b.png",
        image2: "img/reshiram.png"
    },
    {
        word: "smeargle",
        image1: "img/smeargle-b.png",
        image2: "img/smeargle.png"
    },
    {
        word: "sudowoodo",
        image1: "img/sudowoodo-b.png",
        image2: "img/sudowoodo.png"
    },
    {
        word: "weedle",
        image1: "img/weedle-b.png",
        image2: "img/weedle.png"
    },
    {
        word: "wobbuffet",
        image1: "img/wobbuffet-b.png",
        image2: "img/wobbuffet.png"
    },
    {
        word: "wurmple",
        image1: "img/wurmple-b.png",
        image2: "img/wurmple.png"
    },
    {
        word: "cacnea",
        image1: "img/cacnea-b.png",
        image2: "img/cacnea.png"
    },
    {
        word: "grumpig",
        image1: "img/grumpig-b.png",
        image2: "img/grumpig.png"
    },
    {
        word: "regice",
        image1: "img/regice-b.png",
        image2: "img/regice.png"
    },
    {
        word: "gorebyss",
        image1: "img/gorebyss-b.png",
        image2: "img/gorebyss.png"
    },
    {
        word: "misdreavus",
        image1: "img/misdreavus-b.png",
        image2: "img/misdreavus.png"
    },
    {
        word: "exeggutor",
        image1: "img/exeggutor-b.png",
        image2: "img/exeggutor.png"
    },
    {
        word: "unfezant",
        image1: "img/unfezant-b.png",
        image2: "img/unfezant.png"
    },
    {
        word: "pidove",
        image1: "img/pidove-b.png",
        image2: "img/pidove.png"
    },
    {
        word: "bagon",
        image1: "img/bagon-b.png",
        image2: "img/bagon.png"
    },
    {
        word: "taillow",
        image1: "img/taillow-b.png",
        image2: "img/taillow.png"
    },
    {
        word: "dunsparce",
        image1: "img/dunsparce-b.png",
        image2: "img/dunsparce.png"
    },
    {
        word: "plusle",
        image1: "img/plusle-b.png",
        image2: "img/plusle.png"
    },
    {
        word: "lanturn",
        image1: "img/lanturn-b.png",
        image2: "img/lanturn.png"
    }]

//gameStatus is my start/stop controller between questions    
var gameStatus = false;

//Generate randomNumber
var randomNumber = Math.floor(Math.random() * pokemonArray.length);

//Apply randomNumber to obtain random word (answer), and related images.
var pokemon = pokemonArray[randomNumber].word;
var pokemonImage1 = pokemonArray[randomNumber].image1
var pokemonImage2 = pokemonArray[randomNumber].image2

//Establish lettersRemaining (for win);
var lettersRemaining = pokemon.length;

//Set up the answer array to store word (answer) as an array for indexing.
var answerArray = []; 

/* LISTENERS
 ----------------------------------------------------------------------------------------------------------------*/

//Use key events to listen for the letters that your players will type.
document.addEventListener("keyup", function(event){
    //If gameStatus (or game round) has been initialized, then proceed to playing.
    if(gameStatus) {
        letterCheck(event);
    } else {
        //If gameStatus (or game round) has completed, re-initialize (or reset) the game.
        init();
    }
});

//Setup alphabet array for letter checking
var alphabetArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

function letterCheck(guess) {
    //If letter key is press, check if the letter pressed is in the answer.
    if (alphabetArray.indexOf(guess.key) > -1) {
        correctGuessCheck(guess);
    }
}

//Check whether the guess is correct
var winScore = 0;
function correctGuessCheck(guess) {
    if (pokemon.indexOf(guess.key) > -1) {
        //if guess is correct, run correctGuess function.
        correctGuess(guess);
    } else {
        //If guess is incorrect, run incorrectGuess function.
        incorrectGuess(guess);
    }
}

function correctGuess(guess) {
    if (answerArray.indexOf(guess.key.toUpperCase()) < 0) {
        //If the correctGuess doesn't exist in the answerArray, run addCorrectLetter function.
        addCorrectLetter(guess);
    }
}

function addCorrectLetter(guess) {
    for (var j = 0; j < pokemon.length; j++) {
        //If guess matches an existing letter in the answer.
        if (guess.key === pokemon[j]) {
            //Push correct letter to answerArray as upperCase.
            answerArray[j] = guess.key.toUpperCase();
            displayCurrentWord();
            //Reduce letters remaining for win by one.
            lettersRemaining--;
            //If letters left has reached 0, user wins. 
            if (lettersRemaining === 0) {
                //Add 1 to win score.
                winScore++;
                //Display new win score.
                displayWins();
                //Reveal the Pokemon's identiy.
                changeImage();
                //Turn correct answer green.
                addCorrect();
                //display currentWord with new green font.
                displayCurrentWord();
            }
        }
    }
}

//Set up an incorrect answer array
var incorrectGuessesMade = [];
//Establish the number of guesses.
var guessesLeft = 9;

function incorrectGuess(guess) {
    if (incorrectGuessesMade.indexOf(guess.key.toUpperCase()) < 0) {
        //If the inCorrectGuess doesn't exist in the answerArray, run addIncorrectLetter function.
        addIncorrectLetter(guess);
    }
}

function addIncorrectLetter(guess) {
    //Push incorrect guess into the incorrectGuessesMade array
    incorrectGuessesMade.push(guess.key.toUpperCase());
    //Inform user of incorrectGuessesMade
    displayGuessesMade();
    //Lower guessesLeft by 1
    guessesLeft--;
    //Inform user of guessesLeft
    displayGuessesLeft();
    if (guessesLeft === 0) {
        //If guesses left reaches equals 0, then Game Over.
        changeImage();
        //Display corrent answer.
        displayAnswer();
    }
}

/* HANDLERS
----------------------------------------------------------------------------------------------------------------*/

//Displays the number of wins user has obtains.
function displayWins() {
    var winsDisplay = document.querySelector("#winsDisplay");
    winsDisplay.textContent = winScore;
}

//Displays the letters the user has guessed.
function displayGuessesMade() {
    var guessesMadeDisplay = document.querySelector("#guessesMadeDisplay");
    guessesMadeDisplay.textContent = incorrectGuessesMade.join(", ");
}

//Displays how many user guesses are left.
function displayGuessesLeft() {
    var guessesLeftDisplay = document.querySelector("#guessesLeftDisplay");
    guessesLeftDisplay.textContent = guessesLeft;
}

//Displays current solve status of answerArray.
function displayCurrentWord() {
    var currentWordDisplay = document.querySelector("#currentWordDisplay");
    currentWordDisplay.innerHTML = answerArray.join(" ");
}

//Displays silhouette of Pokemon when game initalizes.
function displayImage() {
    var pictureDisplay = document.querySelector("#pictureDisplay");
    pictureDisplay.src = pokemonImage1;
}

//Reveals Pokemon identiy regardless of whether user was able to solve. 
function changeImage() {
    var pictureDisplay = document.querySelector("#pictureDisplay");
    pictureDisplay.src = pokemonImage2;
    gameStatus = false;
}

//Reveals answer if user is unable to solve.
function displayAnswer() {
    var revealedAnswerDisplay = document.querySelector("#revealedAnswerDisplay");
    revealedAnswerDisplay.textContent = pokemon.toUpperCase();
}

//Turns current word green (to indicate correctness)
function addCorrect() {
    var currentWordDisplay = document.querySelector("#currentWordDisplay");
    currentWordDisplay.classList.add('correct');
}

//Removes green color of current word (for re-initalizing purposes)
function removeCorrect() {
    var currentWordDisplay = document.querySelector("#currentWordDisplay");
    currentWordDisplay.classList.remove('correct');
}


/* Initalize (or re-initialize) the game.
----------------------------------------------------------------------------------------------------------------*/

function init() {
    //Changes gameStatus to ready.
    gameStatus = true;
    
    //Generate a new random number
    randomNumber = Math.floor(Math.random() * pokemonArray.length);
    
    //Apply new randomNumber to obtain random word (answer), and related images.
    pokemon = pokemonArray[randomNumber].word;
    pokemonImage1 = pokemonArray[randomNumber].image1
    pokemonImage2 = pokemonArray[randomNumber].image2

    //Re-establish lettersRemaining (for win);
    lettersRemaining = pokemon.length;

    //Re-establish answer array.
     answerArray = []; 

    //Convert word answer into an array.
    for (var i = 0; i < pokemon.length; i++) {
        //If an answer has more than one word, use + as a separator. A space will be displayed when currentWord is displayed. Not applicable for this particlar Pokemon game, but here for flexibility.
        if (pokemon[i] === "+") {
            answerArray[i] = "&nbsp;";
        } else {
            //Replace word answer with "_"s
            answerArray[i] = "_";
        }
    }

    //Re-establish lettersRemaining (for win)
    lettersRemaining = pokemon.length;

    //Re-establish guessesLeft for user.
    guessesLeft = 9;
    displayGuessesLeft()

    //Re-establish guessesMade array.
    incorrectGuessesMade = [];
    displayGuessesMade()
    
    //Display current word.
    displayCurrentWord();

    //Display Pokemon silhouette.
    displayImage();

    //Empty revealedAnswer display if user was unsuccessful previously.
    revealedAnswerDisplay.textContent = "";

    //Remove greenColor from currentWord if user was successful previously.
    removeCorrect();
}