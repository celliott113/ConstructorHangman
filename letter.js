var Letter = function (ltr) {
    // Store the letter.
    this.letter = ltr;
    // Property & Boolean if the letter can be shown.
    this.appear = false;

    this.letterRender = function () {
        if (this.letter == ' ') {
            // Ensures blank space isn't read as 'false'.
            this.appear = true;
            return '  ';
        }
        if (this.appear === false) {
            return ' _ ';
        } else {
            return this.letter;
        }

    };
};

// Export to use in word.js
module.exports = Letter;