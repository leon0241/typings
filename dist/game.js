// DOM Variables
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*================
 *    CLASSES
 ================*/
// Basic game options - type, length, words array
var GameSettings = /** @class */ (function () {
    // ==Constructor==
    function GameSettings(type, length, words) {
        // Type of game(time = 0, words = 1)
        this._type = type;
        // Length of game (0,1,2)
        this._length = length;
        // Array of top 200 words
        this._words = words;
    }
    Object.defineProperty(GameSettings.prototype, "type", {
        // ==Class Getters==
        // 0 = time, 1 = words
        get: function () {
            return this._type;
        },
        // ==Class Setters==
        set: function (value) {
            this._type = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameSettings.prototype, "length", {
        // 0 = lowest, 1 = standard, 2 = high
        get: function () {
            return this._length;
        },
        set: function (value) {
            this._length = value;
        },
        enumerable: false,
        configurable: true
    });
    // ==Class Functions==
    // Gets the Length in terms of time/number of words
    GameSettings.prototype.getCalculatedLength = function () {
        var output = 0;
        // Concatenates type and length into a string
        var part1 = this._type.toString();
        var part2 = this._length.toString();
        var switcher = part1.concat(part2);
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
                output = 25;
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
    };
    return GameSettings;
}());
// Methods used to modify values by the player throughout the game
var UserGame = /** @class */ (function (_super) {
    __extends(UserGame, _super);
    // ==Constructor==
    function UserGame() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.apply(this, args) || this;
        // Array of words in the game
        _this._gameWords = [];
        // Number of errors made
        _this._wordErrors = 0;
        // WPM and Accuracy of player
        _this._calculatedStats = [0, 0];
        // Time taken to complete game
        _this._timeTaken = 0;
        // Number of characters typed
        _this._characters = 0;
        // Number of times spacebar pressed
        _this._userWordCount = 0;
        return _this;
    }
    Object.defineProperty(UserGame.prototype, "gameWords", {
        // ==Class Getters==
        get: function () {
            return this._gameWords;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserGame.prototype, "word", {
        // Returns the current word
        get: function () {
            return this._gameWords[this._userWordCount - 1];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserGame.prototype, "timeTaken", {
        get: function () {
            return this._timeTaken;
        },
        // ==Class Setters==
        set: function (value) {
            this._timeTaken = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserGame.prototype, "characters", {
        get: function () {
            return this._characters;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserGame.prototype, "userWordCount", {
        get: function () {
            return this._userWordCount;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserGame.prototype, "calculatedStats", {
        get: function () {
            return this._calculatedStats;
        },
        set: function (value) {
            this._calculatedStats = value;
        },
        enumerable: false,
        configurable: true
    });
    // ==Class Functions==
    // Adds 1 to errors
    UserGame.prototype.incrementWordErrors = function () {
        this._wordErrors += 1;
    };
    // Adds 1 to word count
    UserGame.prototype.incrementWordCount = function () {
        this._userWordCount += 1;
    };
    // Adds 1 to the number of characters typed
    // char is the keyCode of the typed character
    UserGame.prototype.incrementCharacters = function (char) {
        // 8: backspace, 16: shift, 17: ctrl, 20: caps, 46: delete
        var options = [8, 16, 17, 20, 46];
        // if the index of char is not in the array then go
        // alternate way of multiple or statements
        if (options.indexOf(char) === -1) {
            this._characters += 1;
        }
    };
    // Changes length and type when settings are edited
    //TODO: Settings DOM to call this function
    UserGame.prototype.editGameData = function (x, y) {
        var newType = x;
        var newLength = y;
        this._type = newType;
        this._length = newLength;
    };
    // Creates an array of 30 with random words
    UserGame.prototype.initialiseArray = function () {
        // Creates temp variable, maybe faster to assign to this.gameWords before
        var tempGameWords = [];
        for (var i = 0; i < 50; i++) {
            // Random integer from 0 to length of array and assigns
            var randint = Math.floor(Math.random() * (words.length));
            tempGameWords[i] = this._words[randint];
        }
        this._gameWords = tempGameWords;
    };
    // Appends a new word to the araray
    UserGame.prototype.newWord = function () {
        console.log("pass");
        var gameWords = this._gameWords;
        // Random number up to the length of total words array
        var randint = Math.floor(Math.random() * (words.length));
        gameWords.push(words[randint]);
        // Goes to updateWords with array gameWords, position length of gameWords - 1 (for 0 counting array)
        DOMFunctions.updateWords(this._gameWords, (this._gameWords.length - 1));
    };
    // Calculates WPM and accuracy of the player
    UserGame.prototype.calculateStats = function () {
        // Variable initialisation
        var chars = this._characters;
        var time = this._timeTaken;
        var errors = this._wordErrors;
        var totalWords = this._userWordCount;
        // netWords: The number of correct words (assuming a word is 5 letters)
        var netWords = (chars / 5) - errors;
        // Value to divide to get words per minute
        var timeFactor = time / 60;
        // Calculate WPM
        var netWPM = (netWords < 0)
            //Account for error where most words that appear are less than 5 letters resulting in negative WPM
            ? ((totalWords - errors) / timeFactor)
            : (netWords / timeFactor);
        // Calculate accuracy
        var accuracy = (totalWords - errors) / totalWords * 100;
        // Big console table for stats
        //let display1 = [["characters", chars], ["time", time], ["errors", errors], ["total words", totalWords], ["net words", netWords], ["net wpm", netWPM], ["accuracy", accuracy], ]
        //console.table(display1)
        // Rounds each result to the nearest integer
        var tempStats = [netWPM, accuracy];
        var stats = [];
        tempStats.forEach(function (element) { return stats.push(Math.round(element)); });
        Game.calculatedStats = stats;
        // console table for rounded stats
        //let display = [["net WPM", stats[0]], ["accuracy", stats[1]]]
        //console.table(display)
    };
    // Checks if the word is correct or not
    UserGame.prototype.wordCheck = function () {
        // Removes the spacebar from your input word
        var inputWord = gameTypingField.value.trim();
        var wordComparison = Game.word;
        var position = DOMFunctions.position;
        // Defines the item to change the class of
        var nodeItem = document.getElementById("previousWord");
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
        var nodeList = DOMFunctions.nodeList;
        var offset = nodeList.item(position).offsetTop;
        console.log(offset);
        /* Checks if the y coordinate of the span relative to the div is more than 107(next row) and deletes the row */
        if (offset > 5) {
            DOMFunctions.deleteRow(position);
            //Set the position back to 0
            DOMFunctions.position = 0;
        }
    };
    return UserGame;
}(GameSettings));
// Methods that are used to control the game
var GameFunctions = /** @class */ (function (_super) {
    __extends(GameFunctions, _super);
    function GameFunctions() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return _super.apply(this, args) || this;
    }
    // Starts the game
    GameFunctions.prototype.startGame = function () {
        inGame = true;
        var gameType = this._type === 0 ? this.goToTimedGame() : this.goToWordGame(); // TODO: maybe fix this idk
    };
    // setInterval timer for a timed game
    GameFunctions.prototype.timeTimer = function (callback) {
        var _this = this;
        var duration = this.getCalculatedLength();
        var time = 1;
        // SetInterval - timer
        var gameTimer = setInterval(function () {
            // if timer over the max time
            if (time >= duration) {
                // Stop timer
                clearInterval(gameTimer);
                // Set time taken to the duration
                _this._timeTaken = duration;
                // To callback function
                callback();
            }
            // Change the on screen timer
            DOMFunctions.changeGameProgress(time);
            // Add 1 to time
            time++;
        }, 1000);
    };
    // setInterval timer for a word game
    GameFunctions.prototype.wordTimer = function (callback) {
        var _this = this;
        var totalWordCount = this.getCalculatedLength();
        var time = 1;
        // Variable to keep track of timer
        var inGameSeconds = 0;
        // Interval to loop setInterval (1/10 seconds)
        var interval = 100;
        // SetInterval - timer
        var gameTimer = setInterval(function () {
            // If word count is above total words
            if (_this._userWordCount >= totalWordCount) {
                // Stop timer
                clearInterval(gameTimer);
                // Set time taken to the duration
                _this._timeTaken = time;
                // To callback function
                callback();
            }
            // if time is divisible by 1000 then add a second
            inGameSeconds += interval;
            if (inGameSeconds % 1000 === 0) {
                time++;
                console.log("time: ", time);
                console.log("userWordCount: ", _this._userWordCount, "totalWordCount: ", totalWordCount);
            }
        }, interval); // Repeat every 1/10 seconds so there is no delay when finishing game
        console.log("wc: ", this._userWordCount);
    };
    // Callback function for timed game
    GameFunctions.prototype.goToTimedGame = function () {
        var _this = this;
        DOMFunctions.changeGameProgress("0");
        this.timeTimer(function () {
            console.log("test");
            inGame = false;
            _this.calculateStats();
            DOMFunctions.displayStats();
        });
    };
    // Callback function for word game
    GameFunctions.prototype.goToWordGame = function () {
        var _this = this;
        var gameLength = this.getCalculatedLength();
        DOMFunctions.changeGameProgress(gameLength);
        this.wordTimer(function () {
            console.log("test2");
            inGame = false;
            _this.calculateStats();
            DOMFunctions.displayStats();
        });
    };
    // Functions and methods called after a word is typed
    GameFunctions.prototype.goToNextWord = function () {
        console.log("%cnext word", "color: yellow");
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
        //
        console.log(typeof (this._type));
        if (this._type === 1) {
            DOMFunctions.changeGameProgress(this.getCalculatedLength() - this._userWordCount);
        }
    };
    return GameFunctions;
}(UserGame));
// Any functions that require DOM manipulation
var DOMManipulation = /** @class */ (function () {
    function DOMManipulation() {
        // How far a word is down a line
        this._position = 0;
        // List of all words
        this._nodeList = document.querySelectorAll(".typingWord");
        // Div of words
        this._area = gameWordArea;
    }
    Object.defineProperty(DOMManipulation.prototype, "position", {
        // == Class getters==
        get: function () {
            return this._position;
        },
        // ==Class Setters==
        set: function (value) {
            this._position = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DOMManipulation.prototype, "nodeList", {
        get: function () {
            return this._nodeList;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DOMManipulation.prototype, "area", {
        get: function () {
            return this._area;
        },
        enumerable: false,
        configurable: true
    });
    // ==Class Functions==
    // updates the node list
    DOMManipulation.prototype.updateNodeList = function () {
        this._nodeList = gameWordArea.querySelectorAll(".typingWord");
    };
    // Updates the area and puts in the specified word in the array
    // Array gamewords, position i
    DOMManipulation.prototype.updateWords = function (gameWords, i) {
        var appenderSpan = document.createElement('span');
        appenderSpan.classList.add("typingWord");
        appenderSpan.textContent = gameWords[i] + " ";
        this._area.appendChild(appenderSpan);
    };
    // Adds 1 to position
    DOMManipulation.prototype.incrementPosition = function () {
        this._position += 1;
    };
    // Shows the words on screen and sets starting word as highlight
    DOMManipulation.prototype.showArray = function (gameWords) {
        var area = this._area;
        area.innerHTML = "";
        // TODO: rename area
        // Creates new spans with text from gamewords[]
        // Repeats 50 times for some overflow
        for (var i = 0; i < 50; i++) {
            // Goes to updateWords with array gameWords, position i
            this.updateWords(gameWords, i);
        }
        // Set first word with .typingword as the highlight word
        var nodeItem = area.querySelector(".typingWord");
        nodeItem.id = "highlightWord";
        this.updateNodeList();
    };
    // Sets the highlight id - triggers on spacebar pressed
    DOMManipulation.prototype.highlightCurrentWord = function () {
        // Setting local variables for each item needed
        var position = this._position;
        // List of words
        var nodeList = this._nodeList;
        // Word just typed
        var nodeItem = nodeList.item(position);
        // Add classes and IDs to each of the items
        nodeItem.id = "highlightWord";
        // Add id for the previous word, and remove the id from the second last word
        // If statement so the first position doesn't return an error
        if (position > 0) {
            // Last word typed
            var previousItem = nodeList.item(position - 1);
            previousItem.id = "previousWord";
            previousItem.classList.add("completedWord");
            // Second last word typed - If for same reason as above
            if (position > 1) {
                var backItem = nodeList.item(position - 2);
                backItem.removeAttribute("id");
            }
        }
    };
    // Bool in from wordCheck() and changes class if the word was right or wrong
    DOMManipulation.prototype.setAnswer = function (checkedWord, nodeItem) {
        if (checkedWord) {
            nodeItem.classList.add("correctWord");
        }
        else {
            nodeItem.classList.add("wrongWord");
        }
    };
    // Deletes a row - called from wordCheck
    DOMManipulation.prototype.deleteRow = function (position) {
        var nodeList = this._nodeList;
        // Remove each span less than the position
        for (var i = 0; i < position; i++) {
            var selectedSpan = nodeList.item(i);
            selectedSpan.remove();
        }
    };
    DOMManipulation.prototype.displayStats = function () {
        var wpm = Game.calculatedStats[0];
        var time = Game.calculatedStats[1];
        gameWPM.textContent = wpm;
        gameAccuracy.textContent = time;
    };
    // Sets the timer/word countdown to value
    DOMManipulation.prototype.changeGameProgress = function (value) {
        gameProgress.textContent = value;
    };
    return DOMManipulation;
}());
/*================
 *     GAME
 ================*/
var words = ["the", "I", "you"];
var inGame = false;
var clicked = false;
var Game = new GameFunctions(1, 0, words); // Words = 1, time = 0
var DOMFunctions = new DOMManipulation();
Game.initialiseArray();
DOMFunctions.showArray(Game.gameWords);
function newGame(that) {
    var type = that.test_type.value;
    type = parseInt(type, 10);
    var length = that.test_length.value;
    length = parseInt(length, 10);
    Game.editGameData(type, length);
    Game.initialiseArray();
    DOMFunctions.showArray(Game.gameWords);
}
// On mouse click on typing field
gameTypingField.onclick = function () {
    // Sets condition to true so if a key is pressed the game will start
    if (inGame === false) {
        clicked = true;
    }
};
// On character pressed in the typing field
gameTypingField.onkeydown = function (e) {
    // Check if clicked is true, and start game if met
    if (clicked === true) {
        Game.startGame();
        clicked = false;
    }
    // Check if inGame is true before doing any calculations
    if (inGame === true) {
        //console.log(e.keyCode)
        // Increment the character count with keycode of typed letter
        Game.incrementCharacters(e.keyCode);
        //console.log(Game.characters);
        // If spacebar is pressed => function go to next word
        if (e.keyCode == 32) {
            Game.goToNextWord();
        }
    }
};
