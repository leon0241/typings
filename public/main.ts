const gameContainer: HTMLElement = document.querySelector(".gameContainer")
const game: HTMLElement = document.querySelector(".game")

const gameTypingField: HTMLInputElement = document.querySelector("#gameTypingField")
const gameWordArea: HTMLElement = document.querySelector("#gameWordArea")
const gameWPM: HTMLElement = document.querySelector("#gameWPM")
const gameAccuracy: HTMLElement = document.querySelector("#gameAccuracy")
const gameProgress: HTMLElement = document.querySelector("#gameProgress")
const startOverlay: HTMLElement = document.querySelector("#startOverlay")
const finishOverlay: HTMLElement = document.querySelector("#finishOverlay")
const nameInput: HTMLInputElement = document.querySelector("#finishTypingField")
const hiddenWPMInput: HTMLInputElement = document.querySelector("#hiddenWpm")
const hiddenAccInput: HTMLInputElement = document.querySelector("#hiddenAcc")
const finishForm: HTMLFormElement = document.querySelector("#finishForm")

const settingsButton: HTMLElement = document.querySelector("#settingsButton");
const settingsNav: HTMLElement = document.querySelector("#settingsNav");

const scoresButton: HTMLElement = document.querySelector("#scoresButton");
const scoresNav: HTMLElement = document.querySelector("#scoresNav");
const overlay: HTMLElement = document.querySelector("#overlay");

const tempscore: HTMLElement = document.querySelector("#tempscores")
const scoreboard: HTMLTableElement = document.querySelector("#scoreboard")
const scorebody: HTMLTableSectionElement = document.querySelector("#scorebody")

const modal: HTMLElement = document.querySelector("#wordModal")
const openModal: HTMLButtonElement = document.querySelector("#openModal")
const modalWords: HTMLElement = document.querySelector("#modalWords")

// Creates a http request to submit form
function submitFinishForm(): void {
  // // Gets form with the new data
  // let newFinishForm: HTMLFormElement = document.querySelector("#finishForm")
  
  // // Sets up new http request
  // let http = new XMLHttpRequest();

  // // Setup variable with form data object
  // const formData = new FormData(newFinishForm);

  // // Open request method: post, route: finish, true idk
  // http.open("POST", "/finish", true);

  // // Send form data
  // http.send(formData);
}

let openToggle = false

function openSettings(): void {
  if (openToggle === false) {
     settingsButton.classList.add("open");
     settingsNav.classList.add("open");
     settingsNav.style.display = "inline";
     overlay.classList.add("open");
     scoresButton.style.zIndex = "2"
     openToggle = true;
  } else {
     settingsButton.classList.remove("open")
     settingsNav.classList.remove("open");
     settingsNav.style.display = "none";
     overlay.classList.remove("open");
     scoresButton.style.zIndex = "4"
     openToggle = false;
  }
}

function openScores(): void {
  if (openToggle === false) {
    scoresButton.classList.add("open");
    scoresNav.classList.add("open");
    scoresNav.style.display = "flex";
    overlay.classList.add("open");
    settingsButton.style.zIndex = "2"
    openToggle = true;
  } else {
    scoresButton.classList.remove("open")
    scoresNav.classList.remove("open");
    scoresNav.style.display = "none";
    overlay.classList.remove("open");
    settingsButton.style.zIndex = "4"
    openToggle = false;
  }
}

openModal.onclick = (event) => {
  modal.style.display = "flex"
}

function freqSortf(): void {
  let arr = words
  writeWords(arr)
}

function lengthSortf(): void {
  let arr = sortWordsByLength()
  writeWords(arr)
}

function alphaSortf(): void {
  let arr = words.sort((a, b) => {
    return a.toLowerCase().localeCompare(b.toLowerCase());
});
  writeWords(arr)
}

function writeWords(arr: string[]): void {
  modalWords.innerHTML = ""
  for (let i = 0; i < arr.length; i++) {
    let appenderSpan = document.createElement('span');
    appenderSpan.classList.add("modalWord");
    appenderSpan.textContent = arr[i]
    modalWords.appendChild(appenderSpan);
  }
}

function sortWordsByLength(): string[] {
  let lengthArr: [string, number][] = []

  for (let i = 0; i < words.length; i++) {
    let element = words[i];
    lengthArr[i] = [element, element.length]
  }
  let sortedArr = insertionSort2d(lengthArr)
  sortedArr.reverse

  let finalArr: string[] = []
  for (let i = 0; i < words.length; i++) {
    finalArr[i] = sortedArr[i][0]
  }
  return finalArr
}

function insertionSort2d(list: [string, number][]) {
  console.log(list)
  let max = list.length
  for(let i = 1;i < max;i++){
    let j = i
    while(j > 0 && list[j - 1][1] > list[j][1]){
      let buffer = list[j - 1]
      list[j - 1] = list[j]
      list[j] = buffer
      j--
    }
  }
  console.log(list)
  return list
}

function bubbleSort2d(list: [string, number][]) {
  let swapped = true
  let max = list.length
  while (swapped === true) {
    swapped = false
    for (let i = 1; i < max; i++) {

      if (list[i - 1][1] > list[i][1]) {
        let buffer = list[i - 1]
        list[i - 1] = list[i]
        list[i] = buffer
        swapped = true
      }
    }
  }
  return list
}



class Scoreboard {
  _scores: [string, number][]

  constructor() {
    this._scores = []
  }

  get strLen(): string {
    return localStorage.length.toString()
  }

  get scores(): [string, number][] {
    return this._scores;
  }

  set scores(value: [string, number][]) {
    this._scores = value
  }

  addNewScore(value: [string, number]) {
    this._scores.push(value)
  }

  submitToLocalStorage(name: string, wpm: number): void{
    console.log(this.strLen)
    let stat = {name, wpm}

    localStorage.setItem(this.strLen, JSON.stringify(stat));
    console.log(localStorage.key(0))
    console.log(localStorage.getItem(this.strLen))
  }

  parseItem(index: number) {
    let raw = localStorage.getItem(index.toString())
    let parsed = JSON.parse(raw)
    let score: any = Object.values(parsed)
    return score
  }

  initScoreboard() {
    let arr = []
    for (let i = 0; i < localStorage.length; i++) {
      arr[i] = this.parseItem(i)
    }
    let sortedArr = insertionSort2d(arr)
    sortedArr.reverse();
    this._scores = sortedArr

    scorebody.innerHTML = ""
    for (let i = 0; i < sortedArr.length; i++) {
      this.insertRow(sortedArr[i])
    }
  }

  updateScoreboard() {

    console.log(localStorage.getItem((localStorage.length-1).toString()))
    let item = this.parseItem(localStorage.length - 1)
    this.addNewScore(item)

    let sortedArr = bubbleSort2d(this._scores)
    sortedArr.reverse();
    this.scores = sortedArr

    console.log(scorebody)
    scorebody.innerHTML = ""
    console.log(scorebody.innerHTML);

    for (let i = 0; i < sortedArr.length; i++) {
      this.insertRow(sortedArr[i])
    }
  }

  insertRow(array: [string, number]) {
    let newRow = scorebody.insertRow(-1)
    for (let i = 0;i < 2; i++) {
      let cell = newRow.insertCell(i)
      let text = document.createTextNode(array[i].toString())
      cell.appendChild(text)
    }
  }
}

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

  checkRow() {
    let nodeList = this.nodeList;
    let item = nodeList.item(this.position)
    let offset = item.offsetTop
    /* Checks if the y coordinate of the span relative to the div is more than 107(next row) and deletes the row */
    if (offset > item.offsetHeight) {
      this.deleteRow(this.position);
      //Set the position back to 0
      this.position = 0;
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

  // Display stats to finish screen spans
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

  // Show starting display
  showStart(): void {
    startOverlay.style.display = "flex"
  }

  // Show main display
  showBackdrop(): void {
    startOverlay.style.display = "none";
  }

  // Show finish screen
  showFinish(): void {
    finishOverlay.style.display = "inline"
    this.displayStats();
  }

  // Hide finish screen
  hideFinish(): void {
    finishOverlay.style.display = "none"
  }

  // Set hidden field values to WPM and Accuracy
  appendFormData(): void {
    hiddenWPMInput.value = Game._calculatedStats[0].toString()
    hiddenAccInput.value = Game._calculatedStats[1].toString()
  }
}