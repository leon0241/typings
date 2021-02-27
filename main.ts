const gameContainer = document.querySelector(".gameContainer")

const gameStatsArea = document.createElement("div")
gameStatsArea.classList.add("gameStatsArea")
const gameWordArea = document.createElement("div")
gameWordArea.classList.add("gameWordArea")
const gameTypingArea = document.createElement("div")
gameTypingArea.classList.add("gameTypingArea")
const gameResetArea = document.createElement("div")
gameResetArea.classList.add("gameResetButton")

const gameProgress = document.createElement("span")
gameProgress.classList.add("gameProgress")
const gameWPM = document.createElement("span")
gameWPM.classList.add("gameWPM")
const gameAccuracy = document.createElement("span")
gameAccuracy.classList.add("gameAccuracy")

const gameTypingField = document.createElement("input")
gameTypingField.classList.add("gameTypingField")
gameTypingField.setAttribute("type", "text")

const gameResetButton = document.createElement("button")
gameResetButton.classList.add("gameResetButton")
gameResetButton.type = "button"
gameResetButton.textContent = "Reset"
gameResetButton.onclick = () => resetGame()

const startOverlay = document.createElement("div")

window.onload = () => {
  gameContainer.appendChild(gameStatsArea)
  gameContainer.appendChild(gameWordArea)
  gameContainer.appendChild(gameTypingArea)
  gameContainer.appendChild(gameResetArea)

  gameTypingArea.appendChild(gameTypingField)

  gameStatsArea.appendChild(gameProgress)
  gameStatsArea.appendChild(gameWPM)
  gameStatsArea.appendChild(gameAccuracy)

  gameResetArea.appendChild(gameResetButton)
}
