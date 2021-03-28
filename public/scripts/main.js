// Setting DOM variable stuff
// Body
const body = document.querySelector('body');
const overlay = document.getElementById("overlay");
const settingsButton = document.getElementById("settingsButton");
const scoresButton = document.getElementById("scoresButton");
// Game
const game = document.getElementById("game");
const gameProgress = game.querySelector("#gameProgress");
const gameWordArea = game.querySelector("#gameWordArea");
const gameTypingField = game.querySelector("#gameTypingField");
// Start
const startOverlay = document.getElementById("startOverlay");
// Finish
const finishOverlay = document.getElementById("finishOverlay");
const finishForm = finishOverlay.querySelector("#finishForm");
const nameInput = finishForm.querySelector("#finishTypingField");
const gameWPM = finishForm.querySelector("#gameWPM");
const gameAccuracy = finishForm.querySelector("#gameAccuracy");
const hiddenWPMInput = finishForm.querySelector("#hiddenWpm");
const hiddenAccInput = finishForm.querySelector("#hiddenAcc");
// Settings
const settingsNav = document.getElementById("settingsNav");
const wordSelector = settingsNav.querySelector("#wordSelector");
const timeSelector = settingsNav.querySelector("#timeSelector");
// Scores
const scoresNav = document.getElementById("scoresNav");
const scoreboard = scoresNav.querySelector("#scoreboard");
const scorebody = scoreboard.querySelector("#scorebody");
// Modal
const modal = document.getElementById("wordModal");
const modalWords = modal.querySelector("#modalWords");
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
settingsButton.onclick = () => {
    if (openToggle === false) {
        sidebarDOM(settingsButton, settingsNav, scoresButton, "open");
        openToggle = true;
    }
    else {
        sidebarDOM(settingsButton, settingsNav, scoresButton, "close");
        openToggle = false;
    }
};
scoresButton.onclick = () => {
    if (openToggle === false) {
        sidebarDOM(scoresButton, scoresNav, settingsButton, "open");
        openToggle = true;
    }
    else {
        sidebarDOM(scoresButton, scoresNav, settingsButton, "close");
        openToggle = false;
    }
};
document.getElementById("lightButton").onclick = () => {
    setTheme("light");
};
document.getElementById("darkButton").onclick = () => {
    setTheme("dark");
};
function setTheme(theme) {
    switch (theme) {
        case "light": {
            body.classList.replace("dark", "light");
            DOMFunctions.theme = "light";
            localStorage.setItem("theme", "light");
            break;
        }
        case "dark": {
            body.classList.replace("light", "dark");
            DOMFunctions.theme = "dark";
            localStorage.setItem("theme", "dark");
            break;
        }
    }
}
document.getElementById("startButton").onclick = () => {
    DOMFunctions.showBackdrop();
};
function sidebarDOM(button, nav, button2, state) {
    let elementList = [button, nav, overlay];
    if (state === "open") {
        elementList.forEach(element => {
            element.classList.add("open");
        });
        button2.style.zIndex = "2";
    }
    else {
        elementList.forEach(element => {
            element.classList.remove("open");
        });
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
function chooseTimeWords(a, b) {
    a.classList.add("deselected");
    let group = a.querySelectorAll(".lengthRadio");
    group.forEach((element) => {
        element.disabled = true;
        element.checked = false;
    });
    if (b.classList.contains("deselected")) {
        b.classList.remove("deselected");
        let group = b.querySelectorAll(".lengthRadio");
        group.forEach((element) => {
            element.disabled = false;
        });
    }
}
document.getElementById("modalExit").onclick = () => {
    modal.style.display = "none";
};
document.getElementById("freqSort").onclick = () => {
    let arr = words;
    writeWords(arr);
};
document.getElementById("lengthSort").onclick = () => {
    let arr = sortWordsByLength();
    writeWords(arr);
};
document.getElementById("alphaSort").onclick = () => {
    let wordDummy = [...words];
    let arr = wordDummy.sort((a, b) => {
        return a.toLowerCase().localeCompare(b.toLowerCase());
    });
    writeWords(arr);
};
function writeWords(arr) {
    modalWords.innerHTML = "";
    for (let i = 0; i < arr.length; i++) {
        let appenderSpan = document.createElement("span");
        appenderSpan.classList.add("modalWord");
        appenderSpan.textContent = arr[i];
        modalWords.appendChild(appenderSpan);
    }
}
function sortWordsByLength() {
    let lengthArr = [];
    for (let i = 0; i < words.length; i++) {
        let element = words[i];
        lengthArr[i] = [element, element.length];
    }
    let sortedArr = insertionSort2d(lengthArr);
    sortedArr.reverse;
    let finalArr = [];
    for (let i = 0; i < words.length; i++) {
        finalArr[i] = sortedArr[i][0];
    }
    return finalArr;
}
function insertionSort2d(list) {
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
function bubbleSort2d(list) {
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
    //TODO: ADD INDEX IT RELIES ON LOCALSTORAGELENGTH AND THAT IS BEING INCREASED BY 3
    constructor() {
        this._scores = [];
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
    addNewScore(value) {
        this._scores.push(value);
    }
    submitToLocalStorage(name, wpm) {
        let stat = { name, wpm };
        localStorage.setItem(this.strLen, JSON.stringify(stat));
    }
    parseItem(index) {
        let raw = localStorage.getItem(index.toString());
        let parsed = JSON.parse(raw);
        console.log(parsed);
        let score = Object.values(parsed);
        return score;
    }
    initScoreboard() {
        let arr = [];
        for (let i = 0; i < localStorage.length; i++) {
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
        let item = this.parseItem(localStorage.length - 1);
        this.addNewScore(item);
        let sortedArr = bubbleSort2d(this._scores);
        sortedArr.reverse();
        this.scores = sortedArr;
        scorebody.innerHTML = "";
        for (let i = 0; i < sortedArr.length; i++) {
            this.insertRow(sortedArr[i]);
        }
    }
    insertRow(array) {
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
    constructor() {
        // How far a word is down a line
        this._position = 0;
        // List of all words
        this._nodeList = document.querySelectorAll(".typingWord");
        this._theme = "dark";
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
    get theme() {
        return this._theme;
    }
    // ==Class Setters==
    set position(value) {
        this._position = value;
    }
    set theme(value) {
        this._theme = value;
    }
    // ==Class Functions==
    // updates the node list
    updateNodeList() {
        this._nodeList = gameWordArea.querySelectorAll(".typingWord");
    }
    // Updates the area and puts in the specified word in the array
    // Array gamewords, position i
    updateWords(gameWords, i) {
        let appenderSpan = document.createElement("span");
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
        startOverlay.classList.remove("hide");
    }
    // Show main display
    showBackdrop() {
        startOverlay.classList.add("hide");
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
    // idk if this works or not
    setSettings(type, length) {
        localStorage.setItem("type", type);
        localStorage.setItem("length", length);
        localStorage.setItem("theme", this._theme);
    }
    getSettings() {
        let type = localStorage.getItem("type");
        let length = localStorage.getItem("length");
        let theme = localStorage.getItem("theme");
        return [type, length, theme];
    }
}
