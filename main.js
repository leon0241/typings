const gameContainer = document.querySelector('.gameContainer')

const gameStatsArea = document.createElement('div')
const gameWordArea = document.createElement('div')
const gameTypingArea = document.createElement('div')
const gameResetButton = document.createElement('div')
gameStatsArea.classList.add("gameStatsArea")
gameWordArea.classList.add("gameWordArea")
gameTypingArea.classList.add("gameTypingArea")
gameResetButton.classList.add("gameResetButton")

window.onload = () => {
  gameContainer.appendChild(gameStatsArea)
  gameContainer.appendChild(gameWordArea)
  gameContainer.appendChild(gameTypingArea)
  gameContainer.appendChild(gameResetButton)
}
