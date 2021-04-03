/*=====================
|    DOM Variables    |
=====================*/

// Body
const body: HTMLElement = document.querySelector("body");
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

// Start overlay
const startOverlay: HTMLElement = document.getElementById("startOverlay");

// Finish overlay
const finishOverlay: HTMLElement = document.getElementById("finishOverlay");
const finishForm: HTMLFormElement = finishOverlay.querySelector("#finishForm");
const nameInput: HTMLInputElement = finishForm.querySelector(
  "#finishTypingField"
);
const gameWPM: HTMLElement = finishForm.querySelector("#gameWPM");
const gameAccuracy: HTMLElement = finishForm.querySelector("#gameAccuracy");

const hiddenWPMInput: HTMLInputElement = finishForm.querySelector("#hiddenWpm");
const hiddenAccInput: HTMLInputElement = finishForm.querySelector("#hiddenAcc");

// Settings navbar

const settingsNav: HTMLElement = document.getElementById("settingsNav");

const wordSelector: HTMLElement = settingsNav.querySelector("#wordSelector");
const timeSelector: HTMLElement = settingsNav.querySelector("#timeSelector");

// Scores navbar
const scoresNav: HTMLElement = document.getElementById("scoresNav");

const scoreboard: HTMLTableElement = scoresNav.querySelector("#scoreboard");
const scorebody: HTMLTableSectionElement = scoreboard.querySelector(
  "#scorebody"
);

// View words modal
const modal: HTMLElement = document.getElementById("wordModal");
const modalWords: HTMLElement = modal.querySelector("#modalWords");

// Creates a http request to submit form (NOT IN USE)
// function submitFinishForm(): void {
//   // // Gets form with the new data
//   // let newFinishForm: HTMLFormElement = document.querySelector("#finishForm")
//   // // Sets up new http request
//   // let http = new XMLHttpRequest();
//   // // Setup variable with form data object
//   // const formData = new FormData(newFinishForm);
//   // // Open request method: post, route: finish, true idk
//   // http.open("POST", "/finish", true);
//   // // Send form data
//   // http.send(formData);
// }

/*==================
|  Onclick events  |
===================*/

let openToggle = false;

// Settings button onclick
settingsButton.onclick = () => {
  if (openToggle === false) {
    sidebarDOM(settingsButton, settingsNav, scoresButton, "open");
    openToggle = true;
  } else {
    sidebarDOM(settingsButton, settingsNav, scoresButton, "close");
    openToggle = false;
  }
};

// Scores button onclick
scoresButton.onclick = () => {
  if (openToggle === false) {
    sidebarDOM(scoresButton, scoresNav, settingsButton, "open");
    openToggle = true;
  } else {
    sidebarDOM(scoresButton, scoresNav, settingsButton, "close");
    openToggle = false;
  }
};

// Set dom of sidebar
function sidebarDOM(button, nav, button2, state): void {
  // List of elements to add class
  let elementList = [button, nav, overlay];
  // Check if state is open
  if (state === "open") {
    // Add open class to each element in list
    elementList.forEach((element) => {
      element.classList.add("open");
    });
    // Set the z index of the opposite button so it gets hidden by overlay
    button2.style.zIndex = "2";

    // If state is closed
  } else {
    // Remove open class to each element in the list
    elementList.forEach((element) => {
      element.classList.remove("open");
    });
    // Set the z index of the opposite button back to normal
    button2.style.zIndex = "4";
  }
}

// Light mode button onclick
document.getElementById("lightButton").onclick = () => {
  setTheme("light");
};

// Dark mode button onclick
document.getElementById("darkButton").onclick = () => {
  setTheme("dark");
};

// Set theme to either light or dark
function setTheme(theme: string): void {
  switch (theme) {
    case "light": {
      // Change theme key in localStorage
      localStorage.setItem("theme", "light");
      // Replace body class
      body.classList.replace("dark", "light");
      // Set class theme
      DOMFunctions.theme = "light";
      break;
    }
    case "dark": {
      // Change theme key in localStorage
      body.classList.replace("light", "dark");
      // Replace body class
      DOMFunctions.theme = "dark";
      // Set class theme
      localStorage.setItem("theme", "dark");
      break;
    }
  }
}

// On start button onclick
document.getElementById("startButton").onclick = () => {
  DOMFunctions.showBackdrop();
};

// Open modal button onclick
document.getElementById("openModal").onclick = () => {
  modal.style.display = "flex";
};

// Type radio, time button onclick
document.getElementById("radiotime").onclick = () => {
  chooseTimeWords(wordSelector, timeSelector);
};

// Type radio, word button onclick
document.getElementById("radiowords").onclick = () => {
  chooseTimeWords(timeSelector, wordSelector);
};

// Disable the length for the type not in use
function chooseTimeWords(a: HTMLElement, b: HTMLElement) {
  // Add deselcted class
  a.classList.add("deselected");
  // Selects all radio buttons inside the group with
  let group = a.querySelectorAll(".lengthRadio");
  // Disable each element
  group.forEach((element: any) => {
    element.disabled = true;
    element.checked = false;
  });

  // If the other class is deselected
  if (b.classList.contains("deselected")) {
    // Remove class
    b.classList.remove("deselected");
    // Undisable each element in group
    let group = b.querySelectorAll(".lengthRadio");
    group.forEach((element: any) => {
      element.disabled = false;
    });
  }
}

// Modal exit onclick
document.getElementById("modalExit").onclick = () => {
  modal.style.display = "none";
};

// Modal Frequency sort onclick
document.getElementById("freqSort").onclick = () => {
  let arr = words;
  writeWords(arr);
};

// Modal Length sort onclick
document.getElementById("lengthSort").onclick = () => {
  // Sort words by length
  let arr = sortWordsByLength();
  writeWords(arr);
};

// Modal alphabetical sort onclick
document.getElementById("alphaSort").onclick = () => {
  // Copy array - pass by value
  let wordDummy = [...words];

  // Sorting algorithm
  let arr = wordDummy.sort((a, b) => {
    return a.toLowerCase().localeCompare(b.toLowerCase());
  });
  writeWords(arr);
};

/*=================
|    Functions    |
==================*/

//Write modal words with providedarray
function writeWords(arr: string[]): void {
  // Clear inner html of field
  modalWords.innerHTML = "";
  // Repeats for all words
  for (let i = 0; i < arr.length; i++) {
    // Insert span and append to field
    let appenderSpan = document.createElement("span");
    appenderSpan.classList.add("modalWord");
    appenderSpan.textContent = arr[i];
    modalWords.appendChild(appenderSpan);
  }
}

// Sort words by length function
function sortWordsByLength(): string[] {
  let lengthArr: [string, number][] = [];

  // Define array with [word, word length]
  for (let i = 0; i < words.length; i++) {
    let element = words[i];
    lengthArr[i] = [element, element.length];
  }
  // Insertion sort the array
  let sortedArr = insertionSort2d(lengthArr);
  // Reverse array
  sortedArr.reverse;

  // Redefine array as word only
  let finalArr: string[] = [];
  for (let i = 0; i < words.length; i++) {
    finalArr[i] = sortedArr[i][0];
  }
  return finalArr;
}

// Insertion sort
function insertionSort2d(list: [string, number][]) {
  // Sorting algoritm
  let max = list.length;
  for (let i = 1; i < max; i++) {
    let j = i;

    //While list[j - 1] is larger than list[j]
    while (j > 0 && list[j - 1][1] > list[j][1]) {
      // Swap values
      let buffer = list[j - 1];
      list[j - 1] = list[j];
      list[j] = buffer;

      // Decrement J
      j--;
    }
  }
  return list;
}

// Bubble sort
function bubbleSort2d(list: [string, number][]) {
  // Swapped check
  let swapped = true;

  let max = list.length;
  while (swapped === true) {
    // Preset swap check
    swapped = false;

    // Repeat all items in list
    for (let i = 1; i < max; i++) {
      // If list[i - 1] is larger than list[i]
      if (list[i - 1][1] > list[i][1]) {
        // Swap items
        let buffer = list[i - 1];
        list[i - 1] = list[i];
        list[i] = buffer;

        // Swapped condition to true
        swapped = true;
      }
    }
  }
  return list;
}

/*===============
|    Classes    |
================*/

// Scoreboard and any functions related to it
class Scoreboard {
  _scores: [string, number][];
  _index: number;

  constructor() {
    // Users scores
    this._scores = [];
    // localStorage index
    this._index = 0;
  }

  // Getter methods
  get strLen(): string {
    return this._index.toString();
  }

  get scores(): [string, number][] {
    return this._scores;
  }

  // Setter methods
  set scores(value: [string, number][]) {
    this._scores = value;
  }

  // Other methods

  // Initialise index with length - offset(stored settings)
  initIndex(offset) {
    this._index = localStorage.length - offset;
  }

  // Add new score to scores array
  addNewScore(value: [string, number]) {
    this._scores.push(value);
  }

  // Submit wpm and acc to a new localStorage value
  submitToLocalStorage(name: string, wpm: number): void {
    // Define object
    let stat = { name, wpm };

    // Set item with index, and string format of the object
    localStorage.setItem(this.strLen, JSON.stringify(stat));

    // Increase index
    this._index += 1;
  }

  // Parse an item from json string to dictionary
  parseItem(index: number): [string, number] {
    // Get value from the index
    let raw = localStorage.getItem(index.toString());

    // Get parsed value
    let parsed = JSON.parse(raw);

    // Store parsed values into array
    let score: any = Object.values(parsed);

    // Return array
    return score;
  }

  // Initialise scoreboard DOM on startup
  initScoreboard() {
    let arr = [];

    // Set array with parsed items of all localStorage values
    let len = this._index;
    for (let i = 0; i < len; i++) {
      // Format: [string, number]
      arr[i] = this.parseItem(i);
    }

    // Insertion sort the values
    let sortedArr = insertionSort2d(arr);

    // Reverse values from high to low
    sortedArr.reverse();

    // Set scores variable to the sorted array
    this._scores = sortedArr;

    // Empty scoreboard table
    scorebody.innerHTML = "";

    // Insert row for each value in array
    for (let i = 0; i < sortedArr.length; i++) {
      this.insertRow(sortedArr[i]);
    }
  }

  // Update scoreboard when a test is done
  updateScoreboard() {
    // Parse item of index - 1(zero-based)
    let item = this.parseItem(this._index - 1);

    // Add new score with item
    this.addNewScore(item);

    // Bubble sort the values (partially sorted)
    let sortedArr = bubbleSort2d(this._scores);

    // Reverse the array
    sortedArr.reverse();

    //Set scores variable to the sorted array
    this.scores = sortedArr;

    // Empty scoreboard table
    scorebody.innerHTML = "";

    // Insert row for each value in array
    for (let i = 0; i < sortedArr.length; i++) {
      this.insertRow(sortedArr[i]);
    }
  }

  // Insert a row into the table
  insertRow(array: [string, number]) {
    // Set new row in the table
    let newRow = scorebody.insertRow(-1);
    // create new node for each column
    for (let i = 0; i < 2; i++) {
      // InsertCell at i
      let cell = newRow.insertCell(i);

      // Text element
      let text = document.createTextNode(array[i].toString());

      // Append text element to the cell
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

    // User theme
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
    return this._theme;
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
    // If type is number, convert to string
    if (typeof value === "number") {
      value = value.toString();
    }

    // Set game progress span text content to the value
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

  // Set the settings into variables in localStorage
  setSettings(type, length): void {
    localStorage.setItem("type", type);
    localStorage.setItem("length", length);
    localStorage.setItem("theme", this._theme);
  }

  // Get the settings from localStorage and return an array with them
  getSettings(): string[] {
    let type = localStorage.getItem("type");
    let length = localStorage.getItem("length");
    let theme = localStorage.getItem("theme");
    return [type, length, theme];
  }
}
