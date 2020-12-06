class GameSettings{
  constructor(type, difficulty, words) {
    this._type = type;
    this._difficulty = difficulty;
    this._words = words;
  }

  get type() { //0 = time, 1 = words
    return this._type;
  }

  get difficulty() { //0 = lowest, 1 = standard, 2 = high
    return this._difficulty;
  }

  set type(value){
    this._type = value;
  }

  set difficulty(value) {
    this._difficulty = value;
  }

  getCalculatedDifficulty(){
    let output = 0;
    let switcher = this._type.toString().concat(this._difficulty.toString());
    console.log(switcher)
    switch (switcher) {
      case "00":
        output = 30;
        break;
      case "01":
        output = 60;
        break;
      case "02":
        output = 120;
        break;
      case "10":
        output = 25;
        break;
      case "11":
        output = 50;
        break;
      case "12":
        output = 100;
        break;
    }
    return output
  }
}

class UserGame extends GameSettings {
  constructor(type, difficulty, words) {
    super(type, difficulty, words);
    this._gameWords = [];
    this._wordErrors = 0;
    this._accuracy = 0;
    this._timeTaken = 0;
    this._characters = 0;
  }

  get gameWords(){
    return this._gameWords;
  }

  get word(){
    return this._gameWords[0];
  }

  get timeTaken(){
    return this._timeTaken;
  }

  get characters(){
    return this._characters;
  }

  set timeTaken(value){
    this._timeTaken = value;
  }

  incrementWordErrors(){
    this._wordErrors += 1;
  }

  incrementKeystrokes(){
    this._characters += 1;
  }

  initialiseArray(){
    const tempGameWords = []
    for(let i = 0;i < 30; i++){
      let randint = Math.floor(Math.random() * (words.length))
      tempGameWords[i] = this._words[randint]
    }
    this._gameWords = tempGameWords
  }

  newWord(gameWords, words){
    _gameWords.shift()
    let randint = Math.floor(Math.random() * (words.length + 1))
    _gameWords.push(words[randint])
  }
}

const words = ["the", "I", "you"];//function to take stuff
let inGame = true;
let Game = new UserGame(0, 1, words);

Game.initialiseArray()
console.log(Game.gameWords)
