const gameContainer: HTMLElement = document.querySelector(".gameContainer")
const game: HTMLElement = document.querySelector(".game")

const gameTypingField: HTMLInputElement = document.querySelector(".gameTypingField")
const gameWordArea: HTMLElement = document.querySelector("#gameWordArea")
const gameWPM: HTMLElement = document.querySelector("#gameWPM")
const gameAccuracy: HTMLElement = document.querySelector("#gameAccuracy")
const gameProgress: HTMLElement = document.querySelector("#gameProgress")
const startOverlay: HTMLElement = document.querySelector("#startOverlay")
const finishOverlay: HTMLElement = document.querySelector("#finishOverlay")



// Any functions that require DOM manipulation
class DOMManipulation {
  _position: number
  _nodeList: NodeListOf<HTMLElement>

  constructor() {
    // How far a word is down a line
    this._position = 0;

    // List of all words
    this._nodeList = document.querySelectorAll(".typingWord");
  }

  // == Class getters==
  get position(): number {
    return this._position;
  }

  get nodeList() {
    return this._nodeList;
  }

  get area() {
    return gameWordArea;
  }

  // ==Class Setters==

  set position(value: number) {
    this._position = value;
  }

  // ==Class Functions==

  // updates the node list
  updateNodeList(): void {
    this._nodeList = gameWordArea.querySelectorAll(".typingWord");
  }

  // Updates the area and puts in the specified word in the array
  // Array gamewords, position i
  updateWords(gameWords: string[], i: number): void {
    let appenderSpan = document.createElement('span');
    appenderSpan.classList.add("typingWord");
    appenderSpan.textContent = `${gameWords[i]} `;
    gameWordArea.appendChild(appenderSpan);
  }

  // Adds 1 to position
  incrementPosition(): void {
    this._position += 1;
  }

  // Shows the words on screen and sets starting word as highlight
  showArray(gameWords: string[]): void {
    let area = gameWordArea;
    area.innerHTML = "";
    // TODO: rename area
    // Creates new spans with text from gamewords[]
    // Repeats 50 times for some overflow
    for (let i = 0; i < 50; i++) {
      // Goes to updateWords with array gameWords, position i
      this.updateWords(gameWords, i);
    }

    // Set first word with .typingword as the highlight word
    let nodeItem = area.querySelector(".typingWord");
    nodeItem.id = "highlightWord";

    this.updateNodeList();
  }

  // Sets the highlight id - triggers on spacebar pressed
  highlightCurrentWord(): void {
    // Setting local variables for each item needed
    let position = this._position;
    // List of words
    let nodeList = this._nodeList;
    // Word just typed
    let nodeItem = nodeList.item(position);

    // Add classes and IDs to each of the items
    nodeItem.id = "highlightWord";

    // Add id for the previous word, and remove the id from the second last word
    // If statement so the first position doesn't return an error
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
  setAnswer(checkedWord: boolean, nodeItem: HTMLElement): void {
    if (checkedWord) {
      nodeItem.classList.add("correctWord");
    } else {
      nodeItem.classList.add("wrongWord");
    }
  }

  // Deletes a row - called from wordCheck
  deleteRow(position: number): void {
    let nodeList = this._nodeList;
    // Remove each span less than the position
    for (let i = 0; i < position; i++) {
      let selectedSpan = nodeList.item(i);
      selectedSpan.remove();
    }
  }

  displayStats(): void {
    let wpm = Game.calculatedStats[0];
    let time = Game.calculatedStats[1];

    gameWPM.textContent = wpm.toString();
    gameAccuracy.textContent = time.toString();

  }

  // Sets the timer/word countdown to value
  changeGameProgress(value: any): void {
    if (typeof value === "number") {
      value = value.toString()
    }
    gameProgress.textContent = value;
  }

  showStart(): void {
    startOverlay.style.display = "inline"
  }

  showBackdrop(): void {
    startOverlay.style.display = "none";
  }

  showFinish(): void {
    finishOverlay.style.display = "grid"
    this.displayStats();
  }

  hideFinish(): void {
    finishOverlay.style.display = "none"
  }
}