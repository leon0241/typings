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
    // Accuracy of player
    this._accuracy = 0;
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

  // ==Class Setters==
  set timeTaken(value) {
    this._timeTaken = value;
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
    let gameWords = this._gameWords;
    let randint = Math.floor(Math.random() * (words.length));
    gameWords.push(words[randint]);
  }
}

// Any functions that require DOM manipulation
class DOMManipulation {
  constructor() {
    this._position = 0
  }

  // ==Getter Methods==
  get position() {
    return this._position;
  }

  set position(value) {
    this._position = value;
  }

  incrementPosition() {
    this._position += 1;
  }

  // Shows the words on screen and sets starting word as highlight
  showArray(gameWords) {
    let area = gameWordArea;

    // Creates new spans with text from gamewords[]
    // Repeats 50 times for some overflow
    for (let i = 0;i < 50; i++) {
      let appenderSpan = document.createElement('span');
      appenderSpan.classList.add("typingWord");
      appenderSpan.textContent = `${gameWords[i]} `;
      area.appendChild(appenderSpan);
    }

    // Set first word with .typingword as the highlight word
    let nodeItem = area.querySelector(".typingWord")
    nodeItem.id = "highlightWord"
  }

  // Sets the highlight id to the next word - triggers on spacebar pressed
  highlightNextWord(wordCount) {
    // Setting local variables for each item needed
    let position = this._position
    // List of words
    let nodeList = document.querySelectorAll(".typingWord");
    // Word just typed
    let nodeItem = nodeList.item(position);

    // Add classes and IDs to each of the items
    nodeItem.id = "highlightWord";

    // Remove ID from second last typed word - if to stop an error with the first word
    if (position > 1) {
      // Last word typed
      let previousItem = nodeList.item(position - 1);
      previousItem.id = "previousWord";
      previousItem.classList.add("completedWord");
    } else if (position > 2) {
      let backItem = nodeList.item(position - 2)
      backItem.removeAttribute("id")
    }
  }

  // Gets bool in from wordCheck() and changes the class if the word was right or wrong
  setAnswer(checkedWord, nodeItem) {
    if (checkedWord) {
      nodeItem.classList.add("correctWord");
    } else {
      nodeItem.classList.add("wrongWord");
    }
  }

  deleteRow(position) {
    let nodeList = document.querySelectorAll(".typingWord");
    for (let i = 0; i < position; i++) {
      let selectedSpan = nodeList.item(i)
      selectedSpan.remove()
    }
  }
}
/*================
 *   FUNCTIONS
 ================*/

// TODO: DOM Read buttons to get values
// Activates on save button press
function editGameData() {
  let newType = 0;
  let newDifficulty = 0;
  Game.type = newType;
  Game.difficulty = newDifficulty;
}

function startGame() {
  //Game.initialiseArray();
  //DOMFunctions.showArray(Game.gameWords)
  //DOMFunctions.highlightFirstWord()
  type = Game.type;
  inGame = true;
  //TODO: figure out how tf async works
  //async function countCharacters()?
  type === 1 ? timedGame() : wordGame();
}

function timedGame() {
  console.log("yes")
}

function wordGame() {
  console.log("a")
  let totalWordCount = Game.getCalculatedDifficulty();
  let timeTaken = 0;
  while(totalWordCount > 0) {
    // TODO: timer
  }
}

function wordCheck() {
  // Removes the spacebar from your input word
  let inputWord = gameTypingField.value.trim()
  let wordComparison = Game.word

  let nodeItem = document.getElementById("previousWord")

  if (inputWord === wordComparison) {
    DOMFunctions.setAnswer(true, nodeItem)
  } else {
    DOMFunctions.setAnswer(false, nodeItem)
  }


  DOMFunctions.incrementPosition();
  let position = DOMFunctions.position;
  let nodeList = document.querySelectorAll(".typingWord");
  let futureDomRect = nodeList.item(position).getBoundingClientRect()
  console.log(futureDomRect.top)

  if (futureDomRect.top > 107){
    DOMFunctions.deleteRow(position);
    DOMFunctions.position = 0;
  }
}

function goToNextWord() {
  console.log("%cnext word", "color: yellow")
  Game.incrementWordCount()
  DOMFunctions.highlightNextWord()
  wordCheck()
  gameTypingField.value = ""
}

/*================
 *     GAME
 ================*/

const words = ["the", "I", "you"];
let inGame = false;
let Game = new UserGame(1, 1, words);
let DOMFunctions = new DOMManipulation();
Game.initialiseArray();
DOMFunctions.showArray(Game.gameWords);
//startGame()

// On character pressed in the typing field
gameTypingField.onkeydown = (e) => {
  //console.log(e.keyCode)
  // Increment the character count with keycode of typed letter
  Game.incrementCharacters(e.keyCode)
  //console.log(Game.characters)
  // If spacebar is pressed => function go to next word
  if (e.keyCode == 32) {
    goToNextWord()
  }
}
