// NPM Requirements
var inquirer = require('inquirer');
var isLetter = require('is-letter');

// JS Requirements
var Word = require('./word.js');
var Game = require('./game.js');

// Hangman graphic
var hangManDisplay = Game.newWord.hangman;

// Set the maxListener
require('events').EventEmitter.prototype._maxListeners = 100;


var hangman = {
    wordBank: Game.newWord.wordList,
    guessesRemaining: 10,
    // An array to hold guessed letters and validate already guessed letters.
    guessedLetters: [],
    display: 0,
    currentWord: null,
    // Will ask user if they're ready to play.
    startGame: function () {
        var that = this;
        // Will clear guessedLetters before a new game starts.
        if (this.guessedLetters.length > 0) {
            this.guessedLetters = [];
        }

        inquirer.prompt([{
            name: "play",
            type: "confirm",
            message: "Ready to play?"
        }]).then(function (answer) {
            if (answer.play) {
                that.newGame();
            } else {
                console.log("Piss off wanker! I didn't want to play with you anyway!");
            }
        })
    },
    // Starts new game.
    newGame: function () {
        if (this.guessesRemaining === 10) {
            console.log("Alright, time's up. Let's do this!");
            console.log("Leeeerrrrrooooyyyy Jeeennnkkkiiinnnsss!!!");
            console.log('*****************************************');
            // Generates a random number based on the wordBank.
            var randNum = Math.floor(Math.random() * this.wordBank.length);
            this.currentWord = new Word(this.wordBank[randNum]);
            this.currentWord.getLets();
            // Displays the current word as blanks.
            console.log(this.currentWord.wordRender());
            this.keepPromptingUser();
        } else {
            this.resetGuessesRemaining();
            this.newGame();
        }
    },
    resetGuessesRemaining: function () {
        this.guessesRemaining = 10;
    },
    keepPromptingUser: function () {
        var that = this;
        // Asks player for a letter to guess.
        inquirer.prompt([{
            name: "chosenLtr",
            type: "input",
            message: "Choose a letter: ",
            validate: function (value) {
                if (isLetter(value)) {
                    return true;
                } else {
                    return false;
                }
            }
        }]).then(function (ltr) {
            // Changes all guessed letters to toUpperCase since words in bank are all upperCase.
            var letterReturned = (ltr.chosenLtr).toUpperCase();
            // Adds guessedLetters array if it isn't already there.
            var guessedAlready = false;
            for (var i = 0; i < that.guessedLetters.length; i++) {
                if (letterReturned === that.guessedLetters[i]) {
                    guessedAlready = true;
                }
            }
            // If the letter wasn't guessed already run through entire function.
            if (guessedAlready === false) {
                that.guessedLetters.push(letterReturned);

                var found = that.currentWord.checkIfLetterFound(letterReturned);
                // If none were found tell user they were wrong.
                if (found === 0) {
                    console.log('Haha! Nope! ');
                    that.guessesRemaining--;
                    that.display++;
                    console.log('You have ' + that.guessesRemaining + 'guesses remaining.');
                    console.log(hangManDisplay[(that.display) - 1]);

                    console.log('\n*******************');
                    console.log(that.currentWord.wordRender());
                    console.log('\n*******************');

                    console.log("Letters guessed: " + that.guessedLetters);
                } else {
                    console.log('You got one! Well aren\'t you a smart cookie?!');
                    // Checks if user won.
                    if (that.currentWord.didWeFindTheWord() === true) {
                        console.log(that.currentWord.wordRender());
                        console.log('Fuck yeah! You won!!!');
                    } else {
                        // display the user how many guesses remaining
                        console.log('You have ' + that.guessesRemaining + 'guesses remaining.');
                        console.log(that.currentWord.wordRender());
                        console.log('\n*******************');
                        console.log("Letters guessed: " + that.guessedLetters);
                    }
                }
                if (that.guessesRemaining > 0 && that.currentWord.wordFound === false) {
                    that.keepPromptingUser();
                } else if (that.guessesRemaining === 0) {
                    console.log('Whomp! Whomp! You lost!');
                    console.log('The word you were guessing was: ' + that.currentWord.word);
                }
            } else {
                console.log("You already guessed that letter dummy! Try again!")
                that.keepPromptingUser();
            }
        });
    }
}

hangman.startGame();