/*================
 *    CLASSES
 ================*/
// Basic game options - type, length, words array
class GameSettings {
    // ==Constructor==
    constructor(type, length, words) {
        this._name = "";
        // Length of game (0,1,2)
        this._length = length;
        // Type of game(time = 0, words = 1)
        this._type = type;
        // Array of top 200 words
        this._words = words;
    }
    // ==Class Getters==
    get name() {
        return this._name;
    }
    // 0 = lowest, 1 = standard, 2 = high
    get length() {
        return this._length;
    }
    // 0 = time, 1 = words
    get type() {
        return this._type;
    }
    // ==Class Setters==
    set length(value) {
        this._length = value;
    }
    set type(value) {
        this._type = value;
    }
    // ==Class Functions==
    // Gets the Length in terms of time/number of words
    getCalculatedLength() {
        let output;
        // Concatenates type and length into a string
        let part1 = this._type.toString();
        let part2 = this._length.toString();
        let switcher = part1.concat(part2);
        // Switch statement to go to each option
        switch (switcher) {
            // Time(30s, 60s, 120s)
            case "00": {
                output = 30;
                break;
            }
            case "01": {
                output = 60;
                break;
            }
            case "02": {
                output = 120;
                break;
            }
            // Words(25 words, 50 words, 100 words)
            case "10": {
                output = 25; //TODO: yo fix this shit
                break;
            }
            case "11": {
                output = 50;
                break;
            }
            case "12": {
                output = 100;
                break;
            }
        }
        return output;
    }
    setName() {
        let textbox = document.querySelector("#finishTypingField");
        this._name = textbox.value;
    }
}
// Methods used to modify values by the player throughout the game
class UserGame extends GameSettings {
    // ==Constructor==
    constructor(...args) {
        super(...args);
        // WPM and Accuracy of player
        this._calculatedStats = [0, 0];
        // Number of characters typed
        this._characters = 0;
        // Array of words in the game
        this._gameWords = [];
        // Time taken to complete game
        this._timeTaken = 0;
        // Number of times spacebar pressed
        this._userWordCount = 0;
        // Number of errors made
        this._wordErrors = 0;
    }
    // ==Class Getters==
    get characters() {
        return this._characters;
    }
    get calculatedStats() {
        return this._calculatedStats;
    }
    get gameWords() {
        return this._gameWords;
    }
    get timeTaken() {
        return this._timeTaken;
    }
    get userWordCount() {
        return this._userWordCount;
    }
    // Returns the current word
    get word() {
        return this._gameWords[this._userWordCount - 1];
    }
    // ==Class Setters==
    set calculatedStats(value) {
        this._calculatedStats = value;
    }
    set timeTaken(value) {
        this._timeTaken = value;
    }
    // Adds 1 to the number of characters typed
    // char is the keyCode of the typed character
    incrementCharacters(char) {
        // 8: backspace, 16: shift, 17: ctrl, 20: caps, 46: delete
        const options = [8, 16, 17, 20, 46];
        // if the index of char is not in the array then go
        // alternate way of multiple or statements
        if (options.indexOf(char) === -1) {
            this._characters += 1;
        }
    }
    // Adds 1 to word count
    incrementWordCount() {
        this._userWordCount += 1;
    }
    // Adds 1 to errors
    incrementWordErrors() {
        this._wordErrors += 1;
    }
    // ==Class Functions==
    // Calculates WPM and accuracy of the player
    calculateStats() {
        // Variable initialisation
        let chars = this._characters;
        let time = this._timeTaken;
        let errors = this._wordErrors;
        let totalWords = this._userWordCount;
        // netWords: The number of correct words (assuming a word is 5 letters)
        let netWords = (chars / 5) - errors;
        // Value to divide to get words per minute
        let timeFactor = time / 60;
        // Calculate WPM
        let netWPM = (netWords < 0)
            //Account for error where most words that appear are less than 5 letters resulting in negative WPM
            ? ((totalWords - errors) / timeFactor)
            : (netWords / timeFactor);
        // Calculate accuracy
        let accuracy = (totalWords - errors) / totalWords * 100;
        // Rounds each result to the nearest integer
        let tempStats = [netWPM, accuracy];
        let stats = [];
        tempStats.forEach((element) => stats.push(Math.round(element)));
        this._calculatedStats = stats;
    }
    // Changes length and type when settings are edited
    //TODO: Settings DOM to call this function
    editGameData(x, y) {
        let newType = x;
        let newLength = y;
        this._type = newType;
        this._length = newLength;
    }
    // Creates an array of 30 with random words
    initialiseArray() {
        // Creates temp variable, maybe faster to assign to this.gameWords before
        let tempGameWords = [];
        for (let i = 0; i < 50; i++) {
            // Random integer from 0 to length of array and assigns
            let randint = Math.floor(Math.random() * (words.length));
            tempGameWords[i] = this._words[randint];
        }
        this._gameWords = tempGameWords;
    }
    // Appends a new word to the araray
    newWord() {
        let gameWords = this._gameWords;
        // Random number up to the length of total words array
        let randint = Math.floor(Math.random() * (words.length));
        gameWords.push(words[randint]);
        // Goes to updateWords with array gameWords, position length of gameWords - 1 (for 0 counting array)
        DOMFunctions.updateWords(this._gameWords, (this._gameWords.length - 1));
    }
    // Checks if the word is correct or not
    wordCheck() {
        // Removes the spacebar from your input word
        let inputWord = gameTypingField.value.trim();
        let wordComparison = Game.word;
        let position = DOMFunctions.position;
        // Defines the item to change the class of
        let nodeItem = document.getElementById("previousWord");
        // Checks if the input word is the same as the actual word
        if (inputWord === wordComparison) {
            DOMFunctions.setAnswer(true, nodeItem);
        }
        else {
            Game.incrementWordErrors();
            DOMFunctions.setAnswer(false, nodeItem);
        }
        // Checking if next word is on next line, and deletes the first line
        // Sets DOMRect of the next word, will test if it is on the next line or not
        DOMFunctions.checkRow();
    }
    resetStats() {
        this._calculatedStats = [0, 0];
        this._characters = 0;
        this._gameWords = [""];
        this._timeTaken = 0;
        this._userWordCount = 0;
        this._wordErrors = 0;
        DOMFunctions.position = 0;
        let textbox = document.querySelector("#finishTypingField");
        nameInput.value = "";
    }
}
// Methods that are used to control the game
class GameFunctions extends UserGame {
    constructor(...args) {
        super(...args);
    }
    // Starts the game
    startGame() {
        inGame = true;
        let gameType = this._type === 0 ? this.goToTimedGame() : this.goToWordGame(); // TODO: maybe fix this idk
    }
    // Callback function for timed game
    goToTimedGame() {
        DOMFunctions.changeGameProgress(this.getCalculatedLength());
        this.timeTimer(() => {
            this.finishGame();
        });
    }
    // setInterval timer for a timed game
    timeTimer(callback) {
        let duration = this.getCalculatedLength();
        let time = 1;
        // SetInterval - timer
        let gameTimer = setInterval(() => {
            if (inGame === false) {
                clearInterval(gameTimer);
                return;
            }
            // if timer over the max time
            else if (time >= duration) {
                // Stop timer
                clearInterval(gameTimer);
                // Set time taken to the duration
                this._timeTaken = duration;
                // To callback function
                callback();
            }
            // Change the on screen timer
            DOMFunctions.changeGameProgress(duration - time);
            // Add 1 to time
            time++;
        }, 1000);
    }
    // Callback function for word game
    goToWordGame() {
        let gameLength = this.getCalculatedLength();
        DOMFunctions.changeGameProgress(gameLength);
        this.wordTimer(() => {
            this.finishGame();
        });
    }
    // setInterval timer for a word game
    wordTimer(callback) {
        let totalWordCount = this.getCalculatedLength();
        let time = 1;
        // Variable to keep track of timer
        let inGameSeconds = 0;
        // Interval to loop setInterval (1/10 seconds)
        let interval = 100;
        // SetInterval - timer
        let gameTimer = setInterval(() => {
            if (inGame === false) {
                clearInterval(gameTimer);
                return;
            }
            // If word count is above total words
            else if (this._userWordCount >= totalWordCount) {
                // Stop timer
                clearInterval(gameTimer);
                // Set time taken to the duration
                this._timeTaken = time;
                // To callback function
                callback();
            }
            // if time is divisible by 1000 then add a second
            inGameSeconds += interval;
            if (inGameSeconds % 1000 === 0) {
                time++;
            }
        }, interval); // Repeat every 1/10 seconds so there is no delay when finishing game
    }
    finishGame() {
        inGame = false;
        this.calculateStats();
        DOMFunctions.showFinish();
        DOMFunctions.appendFormData();
    }
    // Functions and methods called after a word is typed
    goToNextWord() {
        DOMFunctions.updateNodeList();
        // Increase word count
        this.incrementWordCount();
        // Increase position (this is used for DOM styling)
        DOMFunctions.incrementPosition();
        // Highlights the current word
        DOMFunctions.highlightCurrentWord();
        // Checks: if word is correct, if word is last on its line
        this.wordCheck();
        this.newWord();
        // Clears the value of the field
        gameTypingField.value = "";
        //debugger;
        if (this._type === 1) {
            DOMFunctions.changeGameProgress(this.getCalculatedLength() - this._userWordCount);
        }
    }
}
/*================
 *   Functions
 ================*/
function newGame(that) {
    let type = that.test_type.value;
    let length = (type === "0") ? that.time_length.value : that.word_length.value;
    let newType = parseInt(type, 10);
    let newLength = parseInt(length, 10);
    Game.resetStats;
    Game.editGameData(newType, newLength);
    Game.initialiseArray();
    DOMFunctions.showArray(Game.gameWords);
    DOMFunctions.changeGameProgress("");
}
function resetGame() {
    inGame = false;
    clicked = false;
    Game.resetStats();
    Game.initialiseArray();
    DOMFunctions.showArray(Game.gameWords);
    DOMFunctions.changeGameProgress("");
}
function initGame() {
    DOMFunctions.showBackdrop();
}
function finishedReset() {
    Game.setName();
    DOMFunctions.submitToLocalStorage(Game.name, Game.calculatedStats[0]);
    DOMFunctions.hideFinish();
    resetGame();
}
function finishedExit() {
    Game.setName();
    DOMFunctions.submitToLocalStorage(Game.name, Game.calculatedStats[0]);
    DOMFunctions.hideFinish();
    resetGame();
    DOMFunctions.showStart();
}
function getWordList() {
}
// On mouse click on typing field
gameTypingField.onclick = () => {
    // Sets condition to true so if a key is pressed the game will start
    if (inGame === false) {
        clicked = true;
    }
};
// On character pressed in the typing field
gameTypingField.onkeydown = (e) => {
    // Check if clicked is true, and start game if met
    if (clicked === true) {
        Game.startGame();
        clicked = false;
    }
    // Check if inGame is true before doing any calculations
    if (inGame === true) {
        // Increment the character count with keycode of typed letter
        Game.incrementCharacters(e.keyCode);
        // If spacebar is pressed => function go to next word
        if (e.keyCode == 32) {
            Game.goToNextWord();
        }
    }
};
/*================
 *     GAME
 ================*/
let inGame = false;
let clicked = false;
let Game = new GameFunctions(1, 0, words); // Words = 1, time = 0
let DOMFunctions = new DOMManipulation();
Game.initialiseArray();
DOMFunctions.showArray(Game.gameWords);
window.onload = (event) => {
    let len = localStorage.length;
    console.log(len);
    DOMFunctions.userIndex = len + 1;
    console.log(DOMFunctions.userIndex);
};
