window.onload = () => {
  const words = ["the", "I", "you"];//function to take stuff
  let inGame = true;
  let Game = new Game(0, 2, words);
}

class GameSettings{
  constructor(type, difficulty, words) {
    this.type = type;
    this.difficulty = difficulty;
    this.words = words;
  }

  get type() { //0 = time, 1 = words
    return this.type;
  }

  get difficulty() { //0 = lowest, 1 = standard, 2 = high
    return this.difficulty;
  }

  set type(value){
    this.type = value;
  }

  set difficulty(value) {
    this.difficulty = value;
  }

  getCalculatedDifficulty(type, words){
    let output = 0;
    let switcher = str(type).concat(str(words));
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

class Game extends gameSettings {
  constructor(type, difficulty, words) {
    super(type);
    super(difficulty);
    super(words);
    this.gameWords = [];
    this.wordErrors = 0;
    this.accuracy = 0;
    this.timeTaken = 0;
    this.characters = 0;
  }

  get gameWords(){
    return this.gameWords;
  }

  get word(){
    return this.gameWords[0];
  }

  get timeTaken(){
    return this.timeTaken;
  }

  get characters(){
    return this.characters;
  }

  set timeTaken(value){
    this.timeTaken = value;
  }

  incrementWordErrors(){
    this.wordErrors += 1;
  }

  incrementKeystrokes(){
    this.characters += 1;
  }

  initialiseArray(words){
    const tempGameWords = []
    for(let i = 0;i < 30; i++){
      let randint = Math.floor(Math.random() * (words.length + 1))
      tempGameWords[i] = words[randint]
    }
    this.gameWords = tempGameWords
  }

  newWord(gameWords, words){
    gameWords.shift()
    let randint = Math.floor(Math.random() * (words.length + 1))
    gameWords.push(words[randint])
  }
}
