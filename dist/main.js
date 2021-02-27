const gameContainer = document.querySelector(".gameContainer");
const game = document.querySelector(".game");
// const gameStatsArea = document.createElement("div")
// gameStatsArea.classList.add("gameStatsArea")
// gameStatsArea.id = "gameStatsArea"
// const gameWordArea = document.createElement("div")
// gameWordArea.classList.add("gameWordArea")
// const gameTypingArea = document.createElement("div")
// gameTypingArea.classList.add("gameTypingArea")
// const gameResetArea = document.createElement("div")
// gameResetArea.classList.add("gameResetButton")
function createElemClassID(topic, element, className) {
    let elem = document.createElement(element);
    elem.classList.add(className);
    elem.id = topic;
    return elem;
}
function createElemClass(element, className) {
    let elem = document.createElement(element);
    elem.classList.add(className);
    return elem;
}
const gameStatsArea = createElemClassID("gameStatsArea", "section", "gameArea");
const gameWordArea = createElemClassID("gameWordArea", "section", "gameArea");
const gameTypingArea = createElemClassID("gameTypingArea", "section", "gameArea");
const gameResetArea = createElemClassID("gameResetArea", "section", "gameArea");
const gameProgress = createElemClassID("gameProgress", "span", "gameStat");
const gameWPM = createElemClassID("gameWPM", "span", "gameStat");
const gameAccuracy = createElemClassID("gameAccuracy", "span", "gameStat");
const gameTypingField = createElemClass("input", "gameTypingField");
gameTypingField.setAttribute("type", "text");
const gameResetButton = createElemClass("button", "gameResetButton");
gameResetButton.type = "button";
gameResetButton.textContent = "Reset";
gameResetButton.onclick = () => resetGame();
const startOverlay = document.createElement("div");
startOverlay.id = "startOverlay";
const startButton = document.createElement("button");
startButton.classList.add("gameStartButton");
startButton.type = "button";
startButton.textContent = "Start";
startButton.onclick = () => initGame();
const finishOverlay = document.createElement("div");
finishOverlay.id = "finishOverlay";
window.onload = () => {
    gameContainer.appendChild(gameStatsArea);
    gameContainer.appendChild(gameWordArea);
    gameContainer.appendChild(gameTypingArea);
    gameContainer.appendChild(gameResetArea);
    gameTypingArea.appendChild(gameTypingField);
    gameStatsArea.appendChild(gameProgress);
    gameStatsArea.appendChild(gameWPM);
    gameStatsArea.appendChild(gameAccuracy);
    gameResetArea.appendChild(gameResetButton);
    game.appendChild(startOverlay);
    startOverlay.appendChild(startButton);
};
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
    // Deletes a row - called from wordCheck
    deleteRow(position) {
        let nodeList = this._nodeList;
        // Remove each span less than the position
        for (let i = 0; i < position; i++) {
            let selectedSpan = nodeList.item(i);
            selectedSpan.remove();
        }
    }
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
    showBackdrop() {
        startOverlay.style.display = "none";
    }
    showFinish() {
    }
}
