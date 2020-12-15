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
    DOMFunctions.updateWords(this._gameWords, (this._gameWords.length - 1))
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
      this.updateWords(gameWords, i)
    }

    // Set first word with .typingword as the highlight word
    let nodeItem = area.querySelector(".typingWord")
    nodeItem.id = "highlightWord"

    this.updateNodeList()
  }

  // Sets the highlight id to the current word - triggers on spacebar pressed
  highlightCurrentWord() {
    // Setting local variables for each item needed
    let position = this._position
    // List of words
    let nodeList = this._nodeList;
    // Word just typed
    let nodeItem = nodeList.item(position);

    // Add classes and IDs to each of the items
    nodeItem.id = "highlightWord";
    console.log(position)

    // Add id for the previous word, and remove the id from the second last word
    // If so the first position doesn't return an error
    if (position > 0) {
      // Last word typed
      let previousItem = nodeList.item(position - 1);
      previousItem.id = "previousWord";
      previousItem.classList.add("completedWord");

      // Second last word typed - If for same reason as above
      if (position > 1) {
        let backItem = nodeList.item(position - 2)
        backItem.removeAttribute("id")
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

function startGame() {
  Game.initialiseArray();
  DOMFunctions.showArray(Game.gameWords);
  inGame = true;
  //TODO: figure out how tf async works
  //async function countCharacters()?
  Game.type === 1 ? timedGame() : wordGame();
}

function timedGame() {
  let duration = Game.getCalculatedDifficulty()
  // setInterval(() => {
  //   console.log("timer at ", "a" ," seconds")
  // }, 1000)
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
  // Checking if the word is correct or not
  // Removes the spacebar from your input word
  let inputWord = gameTypingField.value.trim()
  let wordComparison = Game.word
  let position = DOMFunctions.position;
  // Defines the item to change the class of
  let nodeItem = document.getElementById("previousWord")

  // Checks if the input word is the same as the actual word
  if (inputWord === wordComparison) {
    DOMFunctions.setAnswer(true, nodeItem)
  } else {
    DOMFunctions.setAnswer(false, nodeItem)
  }

  // Checking if next word is on next line, and deletes the first line
  // Sets DOMRect of the next word, will test if it is on the next line or not
  let nodeList = DOMFunctions.nodeList;
  let futureDomRect = nodeList.item(position).getBoundingClientRect()
  console.log("domrect y: ", futureDomRect.top)
  /* Checks if the y coordinate of the span relative to the div is more than 107(next row) and deletes the row */
  if (futureDomRect.top > 107) {
    DOMFunctions.deleteRow(position);
    //Set the position back to 0
    DOMFunctions.position = 0;
  }
}

// All the functions that happen when a word is pressed
function goToNextWord() {
  console.log("%cnext word", "color: yellow")
  DOMFunctions.updateNodeList()
  // Increase word count
  Game.incrementWordCount()

  // Increase position (this is used for DOM styling)
  DOMFunctions.incrementPosition();

  // Highlights the current word
  DOMFunctions.highlightCurrentWord()

  // Checks - if word is correct, if word is last on its line
  wordCheck()

  Game.newWord()

  //Clears the value of the field
  gameTypingField.value = ""
}

/*================
 *     GAME
 ================*/

const words = ["the", "I", "you"];
let inGame = false;
let Game = new UserGame(1, 1, words);
let DOMFunctions = new DOMManipulation();
startGame()

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
