// DOM Variables

// Basic game options - type, difficulty, words array
class GameSettings {
  // Constructor function
  constructor(type, difficulty, words) {
    this._type = type; // Type of game(time = 0, words = 1)
    this._difficulty = difficulty; // Difficulty of game (0,1,2)
    this._words = words; // Array of top 200 words
  }

  // Class Getters
  // 0 = time, 1 = words
  get type() {
    return this._type;
  }

  // 0 = lowest, 1 = standard, 2 = high
  get difficulty() {
    return this._difficulty;
  }

  // Class Setters
  set type(value) {
    this._type = value;
  }

  set difficulty(value) {
    this._difficulty = value;
  }

  // Class Functions
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
  constructor(...args) {
    super(...args);
    this._gameWords = []; // Array of words in the game
    this._wordErrors = 0; // Number of errors made
    this._accuracy = 0; //   Accuracy of player
    this._timeTaken = 0; //  Time taken to complete game
    this._characters = 0; // Number of characters typed
    this._userWordCount = 0; // Number of times spacebar pressed
  }

  // Class Getters

  get gameWords() {
    return this._gameWords;
  }

  get word() {
    return this._gameWords[0];
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

  // Class Setters

  set timeTaken(value) {
    this._timeTaken = value;
  }

  // Class Functions
  // Adds 1 to the word errors
  incrementWordErrors() {
    this._wordErrors += 1;
  }

  incrementWordCount() {
    this._userWordCount += 1;
  }

  // Adds 1 to the number of characters typed
  // TODO: Filter for backspace/shift/del
  incrementKeystrokes(typedChar){
    this._characters += 1;
  }

  // Creates an array of 30 with random words
  initialiseArray() {
    // Creates temp variable, could be faster to assign to this.gameWords before
    const tempGameWords = [];
    for(let i = 0;i < 50; i++){
      // Random integer from 0 to length of array and assigns
      let randint = Math.floor(Math.random() * (words.length));
      tempGameWords[i] = this._words[randint];
    }

    this._gameWords = tempGameWords;
  }

  // Drops the first word of the array and appends a new one on the end
  newWord() {
    let gameWords = this._gameWords;
    let randint = Math.floor(Math.random() * (words.length));
    gameWords.push(words[randint]);
  }
}

class DOMManipulation {
  constructor() {}

  showArray(gameWords) {
    let area = gameWordArea;
    for(let i = 0;i < 50; i++) {
      let appenderSpan = document.createElement('span');
      appenderSpan.classList.add("typingWord");
      appenderSpan.textContent = `${gameWords[i]} `;
      area.appendChild(appenderSpan);

    }

    let nodeItem = area.querySelector(".typingWord")
    nodeItem.id = "highlightWord"
  }

  highlightNextWord() {
    let wordCount = Game.userWordCount;
    let nodeList = document.querySelectorAll(".typingWord");
    let nodeItem = nodeList.item(wordCount);
    let previousItem = nodeList.item(wordCount - 1);
    nodeItem.id = "highlightWord";
    previousItem.removeAttribute("id");
  }

}

const words = ["the", "I", "you"];
let inGame = false;
let Game = new UserGame(1, 1, words);
let DOMFunctions = new DOMManipulation();
Game.initialiseArray();
DOMFunctions.showArray(Game.gameWords);
//DOMFunctions.highlightFirstWord();
//startGame()

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
  let wordCount = Game.getCalculatedDifficulty();
  let timeTaken = 0;
  while(wordCount > 0) {
    // TODO: timer
  }
}

function wordCheck() {
  let inputWord = gameTypingField.value
  let wordComparison = Game.word
  if(inputWord === wordComparison) {

  } else {

  }
}

function textColor() {
  //change text color of current word
}

gameTypingField.onkeyup = (e) => {
  if(e.keyCode == 32) {
    console.log("yo")
    //change wordcount and go to the function that highlights word see if it works or not TODO
    //word check
    Game.incrementWordCount()
    DOMFunctions.highlightNextWord()
  }
}
