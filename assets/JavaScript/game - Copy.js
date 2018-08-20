let wins = 0
let losses = 0
let guessesLeft = 10
let wrongLetters = []
let remainingLetters = compWord.length+1
let answerArray = []

function show (letter) {
    for (i=0; i<compWord.length; i++) {
            if (compWord[i] === letter) {
                hiddenWord.push(i)
            }
        }
    console.log(hiddenWord)
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
    answerArray = []
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
        if (alphaCheck(letter) === true) {
            document.querySelector('#hidden-word').innerHTML = updatedWord
            wrongLetters.push(letter)
            document.querySelector('#guessed').innerHTML = wrongLetters
            guessesLeft--
            document.querySelector('#remaining').innerHTML = "Guesses Left: " + guessesLeft
            letter ===  compWord[i] ? show(letter): (guessesLeft>0 ? wrong(): lose()) 
        }
}
