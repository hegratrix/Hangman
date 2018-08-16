const words = ['ANTEATERS', 'AGGIES', 'COUGARS', 'BUCKEYES', 'AZTECS', 'REBELS', 'GEODUCKS', 'JACKRABBITS', 'SHOCKERS']
const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
let wins = 0
let losses = 0
let guessesLeft = 10
let compWord = randWord()
let gameState = true
let wrongLetters = []
let hiddenWord = hideWord()

console.log(compWord)
document.querySelector('#hidden-word').innerHTML = hiddenWord

function randWord() {
    let tempWord = words[Math.floor(Math.random()*words.length)]
    let wordArray = tempWord.split('')
    document.querySelector('#hidden-word').innerHTML = wordArray
    return wordArray
    }

function hideWord () {
    let tempWord = [];
    for (i=0; i<compWord.length; i++) {
        tempWord.push(" _ ")
    }
    return tempWord.join("");
}

function show () {
    for (i=0; i<compWord.length; i++) {
        
    }

}

function lose () {
    gameState = false
    losses++
    document.querySelector('#losses').innerHTML = 'Losses: ' + losses 
    document.querySelector('#message').innerHTML = "You Lose!"
}

function win () {
    gameState = false
    wins++
    document.querySelector('#wins').innerHTML = 'Wins: ' + wins
    document.querySelector('#message').innerHTML = "You Win!"
}

function wrong () {
    document.querySelector('#message').innerHTML = "Wrong! Try again"
}

function reset () {
    gameState = true
    compWord = randWord()
    hiddenWord = hideWord()
    console.log(compWord)
    guessesLeft = 10
    wrongLetters = []
    document.querySelector('#guessed').innerHTML = wrongLetters
    document.querySelector('#remaining').innerHTML = "Guesses Left: " + guessesLeft
}

function alphaCheck (letter) {
    let result = false
    for (let i=0; i < letters.length; i++) {
        if (letter === letters[i]){
            if (gameState === true) {
                return alreadyGuessed (letter)            
            } else {
                return false
            }           
        }
    }
    return result
}

function alreadyGuessed (letter) {
    let result = true
    for (let i=0; i < wrongLetters.length; i++) {
        if (letter === wrongLetters[i]) {
            document.querySelector('#message').innerHTML = "You already chose that letter."
            return false        
        }
    }
    return result
}

document.onkeyup = function (event) {
    const letter = event.key
        if (alphaCheck(letter)) {
            wrongLetters.push(letter)
            document.querySelector('#guessed').innerHTML = wrongLetters
            guessesLeft--
            document.querySelector('#remaining').innerHTML = "Guesses Left: " + guessesLeft
            letter ===  compWord[i] ? show(): (guessesLeft>0 ? wrong(): lose())
        }
    else {
        reset()
    }
}
