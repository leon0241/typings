const gameContainer = document.querySelector(".gameContainer");
const game = document.querySelector(".game");
const gameTypingField = document.querySelector("#gameTypingField");
const gameWordArea = document.querySelector("#gameWordArea");
const gameWPM = document.querySelector("#gameWPM");
const gameAccuracy = document.querySelector("#gameAccuracy");
const gameProgress = document.querySelector("#gameProgress");
const startOverlay = document.querySelector("#startOverlay");
const finishOverlay = document.querySelector("#finishOverlay");
const nameInput = document.querySelector("#finishTypingField");
const hiddenWPMInput = document.querySelector("#hiddenWpm");
const hiddenAccInput = document.querySelector("#hiddenAcc");
const finishForm = document.querySelector("#finishForm");
const settingsButton = document.querySelector("#settingsButton");
const settingsNav = document.querySelector("#settingsNav");
const scoresButton = document.querySelector("#scoresButton");
const scoresNav = document.querySelector("#scoresNav");
const overlay = document.querySelector("#overlay");
const tempscore = document.querySelector("#tempscores");
const scoreboard = document.querySelector("#scoreboard");
// Creates a http request to submit form
function submitFinishForm() {
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
function openSettings() {
    if (openToggle === false) {
        settingsButton.classList.add("open");
        settingsNav.classList.add("open");
        settingsNav.style.display = "inline";
        overlay.classList.add("open");
        openToggle = true;
    }
    else {
        settingsButton.classList.remove("open");
        settingsNav.classList.remove("open");
        settingsNav.style.display = "none";
        overlay.classList.remove("open");
        openToggle = false;
    }
}
function openScores() {
    if (openToggle === false) {
        scoresButton.classList.add("open");
        scoresNav.classList.add("open");
        scoresNav.style.display = "flex";
        overlay.classList.add("open");
        openToggle = true;
    }
    else {
        scoresButton.classList.remove("open");
        scoresNav.classList.remove("open");
        scoresNav.style.display = "none";
        overlay.classList.remove("open");
        openToggle = false;
    }
    //updateScoreboard()
}
function insertionSort(list) {
    console.log(list);
    let max = list.length;
    for (let i = 1; i < max; i++) {
        let j = i;
        while (j > 0 && list[j - 1][1] > list[j][1]) {
            let buffer = list[j - 1][1];
            list[j - 1][1] = list[j][1];
            list[j][1] = buffer;
            j--;
            console.log("do smth");
        }
    }
    console.log(list);
    return list;
}
function bubbleSort(list) {
    let swapped = true;
    let max = list.length;
    while (swapped = true) {
        swapped = false;
        for (let i = 1; i < max; i++) {
            if (list[i - 1][1] > list[i][1]) {
                let buffer = list[i - 1][1];
                list[i - 1][1] = list[i][1];
                list[i][1] = buffer;
                swapped = true;
            }
        }
    }
    return list;
}
class Scoreboard {
    constructor() {
        this._userIndex = localStorage.length;
        this._scores = [];
    }
    get userIndex() {
        return this._userIndex;
    }
    get strIndex() {
        return this._userIndex.toString();
    }
    get strLen() {
        return localStorage.length.toString();
    }
    get scores() {
        return this._scores;
    }
    set scores(value) {
        this._scores = value;
    }
    set newScore(value) {
        this._scores.push(value);
    }
    incrementIndex() {
        this._userIndex += 1;
    }
    submitToLocalStorage(name, wpm) {
        console.log(this.strLen);
        let stat = { name, wpm };
        localStorage.setItem(this.strLen, JSON.stringify(stat));
        console.log(localStorage.key(0));
        console.log(localStorage.getItem(this.strLen));
    }
    parseItem(index) {
        let raw = localStorage.getItem(index.toString());
        let parsed = JSON.parse(raw);
        let score = Object.values(parsed);
        return score;
    }
    initScoreboard() {
        let arr = [];
        for (let i = 0; i < localStorage.length; i++) {
            arr[i] = this.parseItem(i);
        }
        let sortedArr = insertionSort(arr);
        sortedArr.reverse();
        this.scores = sortedArr;
        for (let i = 0; i < sortedArr.length; i++) {
            this.insertRow(sortedArr[i]);
        }
    }
    updateScoreboard() {
        let item = this.parseItem(localStorage.length);
        this.newScore = item;
        let sortedArr = bubbleSort(this._scores);
        sortedArr.reverse();
        this.scores = sortedArr;
        for (let i = 0; i < sortedArr.length; i++) {
            this.insertRow(sortedArr[i]);
        }
    }
    insertRow(array) {
        let newRow = scoreboard.insertRow(-1);
        for (let i = 0; i < 2; i++) {
            let cell = newRow.insertCell(i);
            let text = document.createTextNode(array[i].toString());
            cell.appendChild(text);
        }
    }
}
// Any functions that require DOM manipulation
class DOMManipulation {
    constructor() {
        // How far a word is down a line
        this._position = 0;
        // List of all words
        this._nodeList = document.querySelectorAll(".typingWord");
    }
    // == Class getters==
    get position() {
        return this._position;
    }
    get nodeList() {
        return this._nodeList;
    }
    get area() {
        return gameWordArea;
    }
    // ==Class Setters==
    set position(value) {
        this._position = value;
    }
    // ==Class Functions==
    // updates the node list
    updateNodeList() {
        this._nodeList = gameWordArea.querySelectorAll(".typingWord");
    }
    // Updates the area and puts in the specified word in the array
    // Array gamewords, position i
    updateWords(gameWords, i) {
        let appenderSpan = document.createElement('span');
        appenderSpan.classList.add("typingWord");
        appenderSpan.textContent = `${gameWords[i]} `;
        gameWordArea.appendChild(appenderSpan);
    }
    // Adds 1 to position
    incrementPosition() {
        this._position += 1;
    }
    // Shows the words on screen and sets starting word as highlight
    showArray(gameWords) {
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
    setAnswer(checkedWord, nodeItem) {
        if (checkedWord) {
            nodeItem.classList.add("correctWord");
        }
        else {
            nodeItem.classList.add("wrongWord");
        }
    }
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
    deleteRow(position) {
        let nodeList = this._nodeList;
        // Remove each span less than the position
        for (let i = 0; i < position; i++) {
            let selectedSpan = nodeList.item(i);
            selectedSpan.remove();
        }
    }
    // Display stats to finish screen spans
    displayStats() {
        let wpm = Game.calculatedStats[0];
        let time = Game.calculatedStats[1];
        gameWPM.textContent = wpm.toString();
        gameAccuracy.textContent = time.toString();
    }
    // Sets the timer/word countdown to value
    changeGameProgress(value) {
        if (typeof value === "number") {
            value = value.toString();
        }
        gameProgress.textContent = value;
    }
    // Show starting display
    showStart() {
        startOverlay.style.display = "flex";
    }
    // Show main display
    showBackdrop() {
        startOverlay.style.display = "none";
    }
    // Show finish screen
    showFinish() {
        finishOverlay.style.display = "inline";
        this.displayStats();
    }
    // Hide finish screen
    hideFinish() {
        finishOverlay.style.display = "none";
    }
    // Set hidden field values to WPM and Accuracy
    appendFormData() {
        hiddenWPMInput.value = Game._calculatedStats[0].toString();
        hiddenAccInput.value = Game._calculatedStats[1].toString();
    }
}
