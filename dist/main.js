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
const gameStatsArea = createGameSection("gameStatsArea");
const gameWordArea = createGameSection("gameWordArea");
const gameTypingArea = createGameSection("gameTypingArea");
const gameResetArea = createGameSection("gameResetArea");
function createGameSection(topic) {
    let elem = document.createElement("section");
    elem.classList.add("gameArea");
    elem.id = topic;
    return elem;
}
const gameProgress = createGameStats("gameProgress");
const gameWPM = createGameStats("gameWPM");
const gameAccuracy = createGameStats("gameAccuracy");
function createGameStats(topic) {
    let elem = document.createElement("span");
    elem.classList.add("gameStat");
    elem.id = topic;
    return elem;
}
const gameTypingField = document.createElement("input");
gameTypingField.classList.add("gameTypingField");
gameTypingField.setAttribute("type", "text");
const gameResetButton = document.createElement("button");
gameResetButton.classList.add("gameResetButton");
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
