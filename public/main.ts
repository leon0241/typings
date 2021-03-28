// Setting DOM variable stuff

// Body
const body: HTMLElement = document.querySelector('body');
const overlay: HTMLElement = document.getElementById("overlay");

const settingsButton: HTMLElement = document.getElementById("settingsButton");
const scoresButton: HTMLElement = document.getElementById("scoresButton");

// Game
const game: HTMLElement = document.getElementById("game");
const gameProgress: HTMLElement = game.querySelector("#gameProgress");
const gameWordArea: HTMLElement = game.querySelector("#gameWordArea");
const gameTypingField: HTMLInputElement = game.querySelector(
  "#gameTypingField"
);

// Start
const startOverlay: HTMLElement = document.getElementById("startOverlay");

// Finish
const finishOverlay: HTMLElement = document.getElementById("finishOverlay");
const finishForm: HTMLFormElement = finishOverlay.querySelector("#finishForm");
const nameInput: HTMLInputElement = finishForm.querySelector(
  "#finishTypingField"
);
const gameWPM: HTMLElement = finishForm.querySelector("#gameWPM");
const gameAccuracy: HTMLElement = finishForm.querySelector("#gameAccuracy");

const hiddenWPMInput: HTMLInputElement = finishForm.querySelector("#hiddenWpm");
const hiddenAccInput: HTMLInputElement = finishForm.querySelector("#hiddenAcc");


// Settings

const settingsNav: HTMLElement = document.getElementById("settingsNav");

const wordSelector: HTMLElement = settingsNav.querySelector("#wordSelector");
const timeSelector: HTMLElement = settingsNav.querySelector("#timeSelector");

// Scores
const scoresNav: HTMLElement = document.getElementById("scoresNav");

const scoreboard: HTMLTableElement = scoresNav.querySelector("#scoreboard");
const scorebody: HTMLTableSectionElement = scoreboard.querySelector("#scorebody");

// Modal
const modal: HTMLElement = document.getElementById("wordModal");
const modalWords: HTMLElement = modal.querySelector("#modalWords");

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

let openToggle = false;

settingsButton.onclick = () => {
  if (openToggle === false) {
    sidebarDOM(settingsButton, settingsNav, scoresButton, "open");
    openToggle = true;
  } else {
    sidebarDOM(settingsButton, settingsNav, scoresButton, "close");
    openToggle = false;
  }
}

scoresButton.onclick = () => {
  if (openToggle === false) {
    sidebarDOM(scoresButton, scoresNav, settingsButton, "open");
    openToggle = true;
  } else {
    sidebarDOM(scoresButton, scoresNav, settingsButton, "close");
    openToggle = false;
  }
}

document.getElementById("lightButton").onclick = () => {
  setTheme("light")
}

document.getElementById("darkButton").onclick = () => {
  setTheme("dark")
}

function setTheme(theme: string): void {
  switch (theme) {
    case "light": {
      body.classList.replace("dark", "light")
      DOMFunctions.theme = "light"
      localStorage.setItem("theme", "light")
      break
    }
    case "dark": {
      body.classList.replace("light", "dark")
      DOMFunctions.theme = "dark"
      localStorage.setItem("theme", "dark")
      break
    }
  }
}

document.getElementById("startButton").onclick = () => {
  DOMFunctions.showBackdrop();
}

function sidebarDOM(button, nav, button2, state): void {
  let elementList = [button, nav, overlay]
  if (state === "open") {
    elementList.forEach(element => {
      element.classList.add("open")
    })
    button2.style.zIndex = "2";
  } else {
    elementList.forEach(element => {
      element.classList.remove("open")
    })
    button2.style.zIndex = "4";
  }
}

document.getElementById("openModal").onclick = () => {
  modal.style.display = "flex";
};

document.getElementById("radiotime").onclick = () => {
  chooseTimeWords(wordSelector, timeSelector);
};

document.getElementById("radiowords").onclick = () => {
  chooseTimeWords(timeSelector, wordSelector);
};

function chooseTimeWords(a: HTMLElement, b: HTMLElement) {
  a.classList.add("deselected");
  let group = a.querySelectorAll(".lengthRadio");
  group.forEach((element: any) => {
    element.disabled = true;
    element.checked = false;
  });

  if (b.classList.contains("deselected")) {
    b.classList.remove("deselected");
    let group = b.querySelectorAll(".lengthRadio");
    group.forEach((element: any) => {
      element.disabled = false;
    });
  }
}

document.getElementById("modalExit").onclick = () => {
  modal.style.display = "none";
}

document.getElementById("freqSort").onclick = () => {
  let arr = words;
  writeWords(arr);
}

document.getElementById("lengthSort").onclick = () => {
  let arr = sortWordsByLength();
  writeWords(arr);
}

document.getElementById("alphaSort").onclick = () => {
  let wordDummy = [...words];
  let arr = wordDummy.sort((a, b) => {
    return a.toLowerCase().localeCompare(b.toLowerCase());
  });
  writeWords(arr);
}

function writeWords(arr: string[]): void {
  modalWords.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    let appenderSpan = document.createElement("span");
    appenderSpan.classList.add("modalWord");
    appenderSpan.textContent = arr[i];
    modalWords.appendChild(appenderSpan);
  }
}

function sortWordsByLength(): string[] {
  let lengthArr: [string, number][] = [];

  for (let i = 0; i < words.length; i++) {
    let element = words[i];
    lengthArr[i] = [element, element.length];
  }
  let sortedArr = insertionSort2d(lengthArr);
  sortedArr.reverse;

  let finalArr: string[] = [];
  for (let i = 0; i < words.length; i++) {
    finalArr[i] = sortedArr[i][0];
  }
  return finalArr;
}

function insertionSort2d(list: [string, number][]) {
  let max = list.length;
  for (let i = 1; i < max; i++) {
    let j = i;
    while (j > 0 && list[j - 1][1] > list[j][1]) {
      let buffer = list[j - 1];
      list[j - 1] = list[j];
      list[j] = buffer;
      j--;
    }
  }
  return list;
}

function bubbleSort2d(list: [string, number][]) {
  let swapped = true;
  let max = list.length;
  while (swapped === true) {
    swapped = false;
    for (let i = 1; i < max; i++) {
      if (list[i - 1][1] > list[i][1]) {
        let buffer = list[i - 1];
        list[i - 1] = list[i];
        list[i] = buffer;
        swapped = true;
      }
    }
  }
  return list;
}

class Scoreboard {
  _scores: [string, number][];
  _index: number;
  //TODO: ADD INDEX IT RELIES ON LOCALSTORAGELENGTH AND THAT IS BEING INCREASED BY 3

  constructor() {
    this._scores = [];
    this._index = 0;
  }

  get strLen(): string {
    return this._index.toString();
  }

  get scores(): [string, number][] {
    return this._scores;
  }

  set scores(value: [string, number][]) {
    this._scores = value;
  }

  initIndex(offset) {
    this._index = localStorage.length - offset
  }

  addNewScore(value: [string, number]) {
    this._scores.push(value);
  }

  submitToLocalStorage(name: string, wpm: number): void {
    let stat = { name, wpm };

    localStorage.setItem(this.strLen, JSON.stringify(stat));
    this._index += 1;
  }

  parseItem(index: number) {
    let raw = localStorage.getItem(index.toString());
    let parsed = JSON.parse(raw);
    console.log(parsed)
    let score: any = Object.values(parsed);
    return score;
  }

  initScoreboard() {
    let arr = [];
    let len = this._index
    for (let i = 0; i < len; i++) {
      arr[i] = this.parseItem(i);
    }
    let sortedArr = insertionSort2d(arr);
    sortedArr.reverse();
    this._scores = sortedArr;

    scorebody.innerHTML = "";
    for (let i = 0; i < sortedArr.length; i++) {
      this.insertRow(sortedArr[i]);
    }
  }

  updateScoreboard() {
    let item = this.parseItem(this._index - 1);
    this.addNewScore(item);

    let sortedArr = bubbleSort2d(this._scores);
    sortedArr.reverse();
    this.scores = sortedArr;

    scorebody.innerHTML = "";

    for (let i = 0; i < sortedArr.length; i++) {
      this.insertRow(sortedArr[i]);
    }
  }

  insertRow(array: [string, number]) {
    let newRow = scorebody.insertRow(-1);
    for (let i = 0; i < 2; i++) {
      let cell = newRow.insertCell(i);
      let text = document.createTextNode(array[i].toString());
      cell.appendChild(text);
    }
  }
}

// Any functions that require DOM manipulation
class DOMManipulation {
  _position: number;
  _nodeList: NodeListOf<HTMLElement>;
  _theme: string;

  constructor() {
    // How far a word is down a line
    this._position = 0;

    // List of all words
    this._nodeList = document.querySelectorAll(".typingWord");

    this._theme = "dark";
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

  get theme() {
    return this._theme
  }

  // ==Class Setters==

  set position(value: number) {
    this._position = value;
  }

  set theme(value: string) {
    this._theme = value;
  }

  // ==Class Functions==

  // updates the node list

  updateNodeList(): void {
    this._nodeList = gameWordArea.querySelectorAll(".typingWord");
  }

  // Updates the area and puts in the specified word in the array
  // Array gamewords, position i
  updateWords(gameWords: string[], i: number): void {
    let appenderSpan = document.createElement("span");
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

  // Check if the word is on the second row, and delete the first row if it is
  checkRow() {
    let nodeList = this.nodeList;
    let item = nodeList.item(this.position);
    let offset = item.offsetTop;
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
      value = value.toString();
    }
    gameProgress.textContent = value;
  }

  // Show starting display
  showStart(): void {
    startOverlay.classList.remove("hide");
  }

  // Show main display
  showBackdrop(): void {
    startOverlay.classList.add("hide");
  }

  // Show finish screen
  showFinish(): void {
    finishOverlay.style.display = "inline";
    this.displayStats();
  }

  // Hide finish screen
  hideFinish(): void {
    finishOverlay.style.display = "none";
  }

  // Set hidden field values to WPM and Accuracy
  appendFormData(): void {
    hiddenWPMInput.value = Game._calculatedStats[0].toString();
    hiddenAccInput.value = Game._calculatedStats[1].toString();
  }

  // idk if this works or not
  setSettings(type, length): void {
    localStorage.setItem("type", type)
    localStorage.setItem("length", length)
    localStorage.setItem("theme", this._theme)
  }

  getSettings(): string[] {
    let type = localStorage.getItem("type")
    let length = localStorage.getItem("length")
    let theme = localStorage.getItem("theme")
    return [type, length, theme]
  }
}
