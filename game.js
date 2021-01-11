// DOM Variables


/*================
 *    CLASSES
 ================*/

// Basic game options - type, difficulty, words array
class GameSettings {
  // ==Constructor==
  constructor(type, difficulty, words) {
    // Type of game(time = 0, words = 1)
    this._type = type;
    // Difficulty of game (0,1,2)
    this._difficulty = difficulty;
    // Array of top 200 words
    this._words = words;
  }

  // ==Class Getters==
  // 0 = time, 1 = words
  get type() {
    return this._type;
  }

  // 0 = lowest, 1 = standard, 2 = high
  get difficulty() {
    return this._difficulty;
  }

  // ==Class Setters==
  set type(value) {
    this._type = value;
  }

  set difficulty(value) {
    this._difficulty = value;
  }

  // ==Class Functions==
  // Gets the difficulty in terms of time/number of words
  getCalculatedDifficulty() {
    let output = 0;

    // Concatenates type and difficulty into a string
    let part1 = this._type.toString();
    let part2 = this._difficulty.toString();
    let switcher = part1.concat(part2);

    // Switch statement to go to each option
    switch (switcher) {
      // Time(30s, 60s, 120s)
      case "00": {
        output = 30;
        break;
      }
      case "01": {
        output = 5; // TODO: change this back to 60s
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
        output = 5; //TODO: this too
        break;
      }
      case "12": {
        output = 100;
        break;
      }
    }

    return output;
  }
}

// Game variables of the user's results
class UserGame extends GameSettings {
  // ==Constructor==
  constructor(...args) {
    super(...args);
    // Array of words in the game
    this._gameWords = [];
    // Number of errors made
    this._wordErrors = 0;
    // WPM and Accuracy of player
    this._calculatedStats = [0, 0];
    // Time taken to complete game
    this._timeTaken = 0;
    // Number of characters typed
    this._characters = 0;
    // Number of times spacebar pressed
    this._userWordCount = 0;
  }

  // ==Class Getters==
  get gameWords() {
    return this._gameWords;
  }

  // Returns the current word
  get word() {
    return this._gameWords[this._userWordCount - 1];
  }

  get timeTaken() {
    return this._timeTaken;
  }

  get characters() {
    return this._characters;
  }

  get userWordCount() {
    return this._userWordCount;
  }

  get calculatedStats() {
    return this._calculatedStats;
  }

  // ==Class Setters==
  set timeTaken(value) {
    this._timeTaken = value;
  }

  set calculatedStats(value) {
    this._calculatedStats = value;
  }

  // ==Class Functions==

  incrementWordErrors() {
    this._wordErrors += 1;
  }

  incrementWordCount() {
    this._userWordCount += 1;
  }

  // Adds 1 to the number of characters typed
  // char is the keyCode of the typed character
  incrementCharacters(char){
    // 8: backspace, 16: shift, 17: ctrl, 20: caps, 46: delete
    var options = [8, 16, 17, 20, 46];

    // if the index of char is not in the array then go
    // alternate way of multiple or statements
    if (options.indexOf(char) === -1) {
      this._characters += 1;
    }
  }

  // Changes difficulty and type when settings are edited
  //TODO: Settings DOM to call this function
  editGameData(x, y) {
    let newType = x;
    let newDifficulty = y;
    this._type = newType;
    this._difficulty = newDifficulty;
  }

  // Creates an array of 30 with random words
  initialiseArray() {
    // Creates temp variable, maybe faster to assign to this.gameWords before
    const tempGameWords = [];
    for (let i = 0;i < 50; i++) {
      // Random integer from 0 to length of array and assigns
      let randint = Math.floor(Math.random() * (words.length));
      tempGameWords[i] = this._words[randint];
    }

    this._gameWords = tempGameWords;
  }

  // Appends a new word to the araray
  newWord() {
    console.log("pass")
    let gameWords = this._gameWords;
    // Random number up to the length of total words array
    let randint = Math.floor(Math.random() * (words.length));
    gameWords.push(words[randint]);

    // Goes to updateWords with array gameWords, position length of gameWords - 1 (for 0 counting array)
    DOMFunctions.updateWords(this._gameWords, (this._gameWords.length - 1));
  }

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

    // Big console table for stats
    //let display1 = [["characters", chars], ["time", time], ["errors", errors], ["total words", totalWords], ["net words", netWords], ["net wpm", netWPM], ["accuracy", accuracy], ]
    //console.table(display1)

    // Rounds each result to the nearest integer
    let tempStats = [netWPM, accuracy];
    let stats = [];
    tempStats.forEach((element) => stats.push(Math.round(element)));
    Game.calculatedStats = stats;

    // console table for rounded stats
    //let display = [["net WPM", stats[0]], ["accuracy", stats[1]]]
    //console.table(display)
  }
}

// Any functions that require DOM manipulation
class DOMManipulation {
  constructor() {
    this._position = 0;
    this._nodeList = document.querySelectorAll(".typingWord");
    this._area = gameWordArea;
  }

  // ==Getter Methods==
  get position() {
    return this._position;
  }

  get nodeList() {
    return this._nodeList;
  }

  get area() {
    return this._area;
  }

  set position(value) {
    this._position = value;
  }

  updateNodeList() {
    this._nodeList = gameWordArea.querySelectorAll(".typingWord");
  }

  // Updates the area and puts in the specified word in the array
  // Array gamewords, position i
  updateWords(gameWords, i) {
    let appenderSpan = document.createElement('span');
    appenderSpan.classList.add("typingWord");
    appenderSpan.textContent = `${gameWords[i]} `;
    this._area.appendChild(appenderSpan);
  }

  incrementPosition() {
    this._position += 1;
  }

  // Shows the words on screen and sets starting word as highlight
  showArray(gameWords) {
    let area = this._area;
    // TODO: rename area
    // Creates new spans with text from gamewords[]
    // Repeats 50 times for some overflow
    for (let i = 0;i < 50; i++) {
      // Goes to updateWords with array gameWords, position i
      this.updateWords(gameWords, i);
    }

    // Set first word with .typingword as the highlight word
    let nodeItem = area.querySelector(".typingWord");
    nodeItem.id = "highlightWord";

    this.updateNodeList();
  }

  // Sets the highlight id to the current word - triggers on spacebar pressed
  highlightCurrentWord() {
    // Setting local variables for each item needed
    let position = this._position;
    // List of words
    let nodeList = this._nodeList;
    // Word just typed
    let nodeItem = nodeList.item(position);

    // Add classes and IDs to each of the items
    nodeItem.id = "highlightWord";

    // Add id for the previous word, and remove the id from the second last word
    // If so the first position doesn't return an error
    if (position > 0) {
      // Last word typed
      let previousItem = nodeList.item(position - 1);
      previousItem.id = "previousWord";
      previousItem.classList.add("completedWord");

      // Second last word typed - If for same reason as above
      if (position > 1) {
        let backItem = nodeList.item(position - 2);
        backItem.removeAttribute("id");
      }
    }
  }

  // Bool in from wordCheck() and changes class if the word was right or wrong
  setAnswer(checkedWord, nodeItem) {
    if (checkedWord) {
      nodeItem.classList.add("correctWord");
    } else {
      nodeItem.classList.add("wrongWord");
    }
  }

  // Deletes a row - called from wordCheck
  deleteRow(position) {
    let nodeList = this._nodeList;
    // Remove each span less than the position
    for (let i = 0; i < position; i++) {
      let selectedSpan = nodeList.item(i);
      selectedSpan.remove();
    }
  }

  displayStats() { // TODO: this is dom stuff
    let wpm = Game.calculatedStats[0];
    let time = Game.calculatedStats[1];

    gameWPM.textContent = wpm;
    gameAccuracy.textContent = time;

  }

  changeGameProgress(value) {
    gameProgress.textContent = value;
  }
}
/*================
 *   FUNCTIONS
 ================*/

// TODO: DOM Read buttons to get values
// Activates on save button press

// Starts the game
function startGame() {
  inGame = true;
  //TODO: figure out how tf async works
  //async function countCharacters()?
  Game.type === 0 ? goToTimedGame() : goToWordGame(); // TODO: maybe fix this idk
}

// Code for timer for both modes
function inGameTimer(callback) {
  let gameDifficulty = Game.getCalculatedDifficulty();
  let time = 1;
  let type = Game.type;

  // DOM for timer depending on the type
  const testVar = (type === 0)
    // Count up from 0 if time
    ? DOMFunctions.changeGameProgress("0")
    //Count down from words remaining if words
    : DOMFunctions.changeGameProgress(gameDifficulty);

  // If timer
  if (type === 0) {
    let duration = gameDifficulty;
    let gameTimer = setInterval(() => {
      if (time >= duration) {
        clearInterval(gameTimer);
        Game.timeTaken = duration;
        callback();
      }

      DOMFunctions.changeGameProgress(time);
      time++;
    }, 1000)
  } else {
    let userWordCount = 0;
    let totalWordCount = gameDifficulty;
    let gameTimer = setInterval (() => {
      if (totalWordCount <= 0) {
        clearInterval(gameTimer)
        Game.timeTaken = time;
        Game.userWordCount = userWordCount;
        callback();
      }
      console.log("time: ", time);
      time++;
    }, 1000)

    console.log("wc: ", totalWordCount);
    DOMFunctions.changeGameProgress(totalWordCount);
    totalWordCount--;
  }
}

function wordGame() {
  console.log("a");
  let totalWordCount = Game.getCalculatedDifficulty();
  let timeTaken = 0;
  while(totalWordCount > 0) {
    // TODO: timer
  }
}

// Callback function for timed game
function goToTimedGame() {
  inGameTimer(() => {
    console.log("test");
    inGame = false;
    Game.calculateStats();
    DOMFunctions.displayStats();
  })
}

// Callback function for word game
function goToWordGame() {
  inGameTimer(() => {
    console.log("test2");
  })
}

function wordCheck() {
  // Checking if the word is correct or not
  // Removes the spacebar from your input word
  let inputWord = gameTypingField.value.trim();
  let wordComparison = Game.word;
  let position = DOMFunctions.position;
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
  let nodeList = DOMFunctions.nodeList;
  let futureDomRect = nodeList.item(position).getBoundingClientRect();
  console.log("domrect y: ", futureDomRect.top);
  /* Checks if the y coordinate of the span relative to the div is more than 107(next row) and deletes the row */
  if (futureDomRect.top > 107) {
    DOMFunctions.deleteRow(position);
    //Set the position back to 0
    DOMFunctions.position = 0;
  }
}

// All the functions that happen when a word is pressed
function goToNextWord() {
  console.log("%cnext word", "color: yellow");
  DOMFunctions.updateNodeList();
  // Increase word count
  Game.incrementWordCount();

  // Increase position (this is used for DOM styling)
  DOMFunctions.incrementPosition();

  // Highlights the current word
  DOMFunctions.highlightCurrentWord();

  // Checks - if word is correct, if word is last on its line
  wordCheck();

  Game.newWord();

  //Clears the value of the field
  gameTypingField.value = "";
}

/*================
 *     GAME
 ================*/

const words = ["the", "I", "you"];
let inGame = false;
let Game = new UserGame(0, 1, words);
let DOMFunctions = new DOMManipulation();
Game.initialiseArray();
DOMFunctions.showArray(Game.gameWords);

gameTypingField.onclick = () => {
  startGame();
}


// On character pressed in the typing field
gameTypingField.onkeydown = (e) => {
  if (inGame === true) {
    //console.log(e.keyCode)
    // Increment the character count with keycode of typed letter
    Game.incrementCharacters(e.keyCode);
    console.log(Game.characters);
    // If spacebar is pressed => function go to next word
    if (e.keyCode == 32) {
      goToNextWord();
    }
  }
}
