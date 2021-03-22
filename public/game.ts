/*================
 *    CLASSES
 ================*/

// Basic game options - type, length, words array
class GameSettings {
  _name: string;
  _type: number;
  _length: number;
  readonly _words: string[];

  // ==Constructor==
  constructor(type: number, length: number, words: string[]) {
    this._name = "";
    // Length of game (0,1,2)
    this._length = length;
    // Type of game(time = 0, words = 1)
    this._type = type;
    // Array of top 200 words
    this._words = words;
  }
  // ==Class Getters==
  get name(): string {
    return this._name;
  }
  // 0 = lowest, 1 = standard, 2 = high
  get length(): number {
    return this._length;
  }

  // 0 = time, 1 = words
  get type(): number {
    return this._type;
  }

  // ==Class Setters==
  set name(value: string) {
    this._name = value;
  }

  set length(value: number) {
    this._length = value;
  }

  set type(value: number) {
    this._type = value;
  }

  // ==Class Functions==
  // Gets the Length in terms of time/number of words
  getCalculatedLength(): number {
    let output: number;

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
  }

  // Reads the name from the input box and stores it
  setName(): void {
    // Read input element
    let textbox: HTMLInputElement = document.querySelector(
      "#finishTypingField"
    );

    // If name is empty, set name to "Anon"
    let name = textbox.value;
    if (name === "") {
      name = "Anon";
    }
    this._name = name;
  }

  // idk if this works or not
  setCookies(): void {
    let date = new Date();
    let currentTime = date.getTime();
    let expire = currentTime + 1000 * 60 * 60 * 24 * 365;
    date.setTime(expire);
    let expireStr = "expires=" + date.toUTCString();

    let type = "type=" + this._type;
    let length = "length=" + this._length.toString();
    document.cookie = type + ";" + length + ";" + expireStr;

    console.log(expireStr);
    console.log(type, length);
    console.log(type + ";" + length + ";" + expireStr);
    console.log(document.cookie);
  }

  getCookies(): void {}
}

// Methods used to modify values by the player throughout the game
class UserGame extends GameSettings {
  _calculatedStats: number[];
  _characters: number;
  _gameWords: string[];
  _timeTaken: number;
  _userWordCount: number;
  _wordErrors: number;

  // ==Constructor==
  constructor(...args: [number, number, string[]]) {
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
  get characters(): number {
    return this._characters;
  }

  get calculatedStats(): number[] {
    return this._calculatedStats;
  }

  get gameWords(): string[] {
    return this._gameWords;
  }

  get timeTaken(): number {
    return this._timeTaken;
  }

  get userWordCount(): number {
    return this._userWordCount;
  }

  // Returns the current word
  get word(): string {
    return this._gameWords[this._userWordCount - 1];
  }

  // ==Class Setters==
  set calculatedStats(value: number[]) {
    this._calculatedStats = value;
  }

  set timeTaken(value: number) {
    this._timeTaken = value;
  }

  // Adds 1 to the number of characters typed
  // char is the keyCode of the typed character
  incrementCharacters(char: number): void {
    // 8: backspace, 16: shift, 17: ctrl, 20: caps, 46: delete
    const options = [8, 16, 17, 20, 46];

    // if the index of char is not in the array then go
    // alternate way of multiple or statements
    if (options.indexOf(char) === -1) {
      this._characters += 1;
    }
  }

  // Adds 1 to word count
  incrementWordCount(): void {
    this._userWordCount += 1;
  }

  // Adds 1 to errors
  incrementWordErrors(): void {
    this._wordErrors += 1;
  }

  // ==Class Functions==

  // Changes length and type when settings are edited
  //TODO: Settings DOM to call this function
  editGameData(x: number, y: number): void {
    let newType = x;
    let newLength = y;
    this._type = newType;
    this._length = newLength;
  }

  // Creates an array of 30 with random words
  initialiseArray(): void {
    // Creates temp variable, maybe faster to assign to this.gameWords before
    let tempGameWords = [];

    for (let i = 0; i < 50; i++) {
      // Random integer from 0 to length of array and assigns
      let randint = Math.floor(Math.random() * words.length);
      tempGameWords[i] = this._words[randint];
    }

    this._gameWords = tempGameWords;
  }

  // Checks if the word is correct or not
  wordCheck(): void {
    // Removes the spacebar from your input word
    let inputWord = gameTypingField.value.trim();
    let wordComparison = Game.word;
    // Defines the item to change the class of
    let nodeItem = document.getElementById("previousWord");

    // Checks if the input word is the same as the actual word
    if (inputWord === wordComparison) {
      DOMFunctions.setAnswer(true, nodeItem);
    } else {
      Game.incrementWordErrors();
      DOMFunctions.setAnswer(false, nodeItem);
    }

    // Checking if next word is on next line, and deletes the first line
    // Sets DOMRect of the next word, will test if it is on the next line or not
    DOMFunctions.checkRow();
  }

  // Appends a new word to the araray
  newWord(): void {
    let gameWords = this._gameWords;
    // Random number up to the length of total words array
    let randint = Math.floor(Math.random() * words.length);
    gameWords.push(words[randint]);

    // Goes to updateWords with array gameWords, position length of gameWords - 1 (for 0 counting array)
    DOMFunctions.updateWords(this._gameWords, this._gameWords.length - 1);
  }

  // Calculates WPM and accuracy of the player
  calculateStats(): void {
    // Variable initialisation
    let chars = this._characters;
    let time = this._timeTaken;
    let errors = this._wordErrors;
    let totalWords = this._userWordCount;

    // netWords: The number of correct words (assuming a word is 5 letters)
    let netWords = chars / 5 - errors;
    // Value to divide to get words per minute
    let timeFactor = time / 60;

    // Calculate WPM
    let netWPM =
      netWords < 0
        ? //Account for error where most words that appear are less than 5 letters resulting in negative WPM
          (totalWords - errors) / timeFactor
        : netWords / timeFactor;

    // Calculate accuracy
    let accuracy = ((totalWords - errors) / totalWords) * 100;

    // Rounds each result to the nearest integer
    let tempStats = [netWPM, accuracy];
    let stats = [];
    tempStats.forEach((element) => stats.push(Math.round(element)));
    this._calculatedStats = stats;
  }

  resetStats(): void {
    this._calculatedStats = [0, 0];
    this._characters = 0;
    this._gameWords = [""];
    this._timeTaken = 0;
    this._userWordCount = 0;
    this._wordErrors = 0;
    DOMFunctions.position = 0;
    gameTypingField.value = "";
  }
}

// Methods that are used to control the game
class GameFunctions extends UserGame {
  constructor(...args: [number, number, string[]]) {
    super(...args);
  }

  // Starts the game
  startGame(): void {
    inGame = true;
    let gameType =
      this._type === 0 ? this.goToTimedGame() : this.goToWordGame(); // TODO: maybe fix this idk
  }

  // Callback function for timed game
  goToTimedGame(): void {
    DOMFunctions.changeGameProgress(this.getCalculatedLength());
    this.timeTimer(() => {
      this.finishGame();
    });
  }

  // setInterval timer for a timed game
  timeTimer(callback: any): void {
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
  goToWordGame(): void {
    let gameLength = this.getCalculatedLength();
    DOMFunctions.changeGameProgress(gameLength);
    this.wordTimer(() => {
      this.finishGame();
    });
  }
  // setInterval timer for a word game
  wordTimer(callback: any): void {
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

  finishGame(): void {
    inGame = false;
    this.calculateStats();
    DOMFunctions.showFinish();
    DOMFunctions.appendFormData();
  }

  // Functions and methods called after a word is typed
  goToNextWord(): void {
    DOMFunctions.updateNodeList();
    // Increase word count
    this.incrementWordCount();

    this.newWord();

    // Increase position (this is used for DOM styling)
    DOMFunctions.incrementPosition();

    // Highlights the current word
    DOMFunctions.highlightCurrentWord();

    // Checks: if word is correct, if word is last on its line
    this.wordCheck();

    // Clears the value of the field
    gameTypingField.value = "";

    //debugger;
    if (this._type === 1) {
      DOMFunctions.changeGameProgress(
        this.getCalculatedLength() - this._userWordCount
      );
    }
  }
}

/*================
 *   Functions
 ================*/

function newGame(that: any) {
  let type: string = that.test_type.value;
  let length: string =
    type === "0" ? that.time_length.value : that.word_length.value;
  let newType: number = parseInt(type, 10);
  let newLength: number = parseInt(length, 10);

  Game.resetStats;
  Game.editGameData(newType, newLength);
  Game.setCookies();
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

function finishedReset(exit) {
  Game.setName();
  DOMFunctions.hideFinish();
  Scores.submitToLocalStorage(Game.name, Game.calculatedStats[0]);
  Scores.updateScoreboard();
  resetGame();
  if (exit === true) {
    DOMFunctions.showStart();
  }
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
let Scores = new Scoreboard();

window.onload = (event) => {
  console.log(localStorage.length)
  if (localStorage.length > 0) {
    Scores.initScoreboard();
  }
  Game.initialiseArray();
  DOMFunctions.showArray(Game.gameWords);
};

//TODO: reset needs to clear input box
