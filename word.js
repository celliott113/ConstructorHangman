// Require letter objects.
var Letter = require('./letter.js');

function Word(wrd) {
    var that = this;
    // Store the string word.
    this.word = wrd;
    // A collection of letter objects.
    this.letters = [];
    this.wordFound = false;

    this.getLets = function () {
        // Populate the collection above with new Letter objects
        for (var i = 0; i < that.word.length; i++) {
            var newLetter = new Letter(that.word[i]);
            this.letters.push(newLetter);
        }
    };

    // Current word found.
    this.didWeFindTheWord = function () {
        if (this.letters.every(function (lttr) {
                return lttr.appear === true;
            })) {
            this.wordFound = true;
            return true;
        }

    };

    this.checkIfLetterFound = function (guessedLetter) {
        var whatToReturn = 0;
        // Will iterate through each letter to see if it matches the guessed letter.
        this.letters.forEach(function (lttr) {
            if (lttr.letter === guessedLetter) {
                lttr.appear = true;
                whatToReturn++;
            }
        })
        // If guessLetter matches Letter property, the letter object will be shown.
        return whatToReturn;
    };

    this.wordRender = function () {
        var display = '';
        // Render the word based on if letters are found.
        that.letters.forEach(function (lttr) {
            var currentLetter = lttr.letterRender();
            display += currentLetter;
        });

        return display;
    };
}

module.exports = Word;