const words = ['ANTEATERS', 'AGGIES', 'COUGARS', 'BUCKEYES', 'AZTECS', 'REBELS', 'GEODUCKS', 'JACKRABBITS', 'SHOCKERS', 'BRUINS']
const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
let compWord = []
compWord = randomWord ()
let hiddenWord = []
hiddenWord = hideWord ()
let gameState = true
let alreadyGuessed = []
let wins = 0
let losses = 0
let guessesRemaining = 8
let winningPicture = document.querySelector("#picture").src
let lettersRemaining = compWord.length

console.log(compWord)
console.log(lettersRemaining)
console.log(hiddenWord)
document.querySelector('#hidden-word').innerHTML = hiddenWord
document.querySelector('#wins').innerHTML = "Wins: " + wins
document.querySelector('#losses').innerHTML = "Losses: " + losses

function randomWord () {
    let tempWord = words[Math.floor(Math.random()*words.length)]
    setPicture (tempWord)
    let wordArray = tempWord.split('')
    return wordArray
    }

function hideWord () {
    let tempWord = []
    for (var i=0; i < compWord.length; i++) {
        tempWord.push(" _ ");
    }
    return tempWord.join("");
}

function setPicture(tempWord) {
    switch (tempWord) {
        case 'ANTEATERS':
            document.querySelector('#picture').src = "assets/Images/uci.jpg"
            break
        case 'AGGIES':
            document.querySelector('#picture').src = "assets/Images/ucd.png"
            break
        case 'COUGARS':
            document.querySelector('#picture').src = "assets/Images/byu.gif"
            break
        case 'BUCKEYES':
            document.querySelector('#picture').src = "assets/Images/ohio.png"
            break
        case 'AZTECS':
            document.querySelector('#picture').src = "assets/Images/sdsu.png"
            break
        case 'REBELS':
            document.querySelector('#picture').src = "assets/Images/unlv.jpg"
            break
        case 'GEODUCKS':
            document.querySelector('#picture').src = "assets/Images/evergreen.png"
            break
        case 'JACKRABBITS':
            document.querySelector('#picture').src = "assets/Images/south dakota.jpg"
            break
        case 'SHOCKERS':
            document.querySelector('#picture').src = "assets/Images/wichita.jpg"
            break
        case 'BRUINS':
            document.querySelector('#picture').src = "assets/Images/ucla.png"
            break
    }
    document.querySelector('#picture').style.visibility = "hidden"
}

function reset () {
    compWord = randomWord ()
    gameState = true
    alreadyGuessed = []
    document.querySelector('#guessed').innerHTML = alreadyGuessed
    guessesRemaining = 8
    document.querySelector('#remaining').innerHTML = "You have " + guessesRemaining + " more guesses"
    winningPicture = document.querySelector("#picture").src
    lettersRemaining = compWord.length
    document.querySelector('#picture').style.visibility = "hidden"
    document.querySelector('#remaining').style.visibility = "visible"
    document.querySelector('#hidden-word').innerHTML = hiddenWord
    document.querySelector('#message').innerHTML = "Pick a Letter."
}

function show (letter) {
    document.querySelector('#message').innerHTML = "You got a match!"
            document.querySelector('#hidden-word').innerHTML = hiddenWord
            console.log(hiddenWord)
}

function win () {
    gameState = false
    wins++
    document.querySelector('#message').innerHTML = "You guessed my word! Way to Go!"
    document.querySelector('#remaining').style.visibility = "hidden"
    document.querySelector('#picture').style.visibility = "visible"
    document.querySelector('#wins').innerHTML = "Wins: " + wins
    setTimeout(function() {
        reset()
        }, 4000);
}

function wrong () {
    guessesRemaining--
    if (guessesRemaining > 0) {
    document.querySelector('#message').innerHTML = "Wrong, guess again.";
    document.querySelector('#remaining').innerHTML = "You have " + guessesRemaining + " more guesses"
    } else {
        lose();
    }
}

function lose () {
    gameState = false
    losses++
    document.querySelector('#message').innerHTML = "You didn't get my word. Try again."
    document.querySelector('#remaining').innerHTML = "You have " + guessesRemaining + " more guesses"
    document.querySelector('#remaining').style.visibility = "hidden "
    document.querySelector('#picture').style.visibility = "visible"       
    document.querySelector('#losses').innerHTML = "Losses: " + losses
    setTimeout(function() {
        reset()
        }, 4000);    
}

function alphaCheck (letter) {
    let result = false
    for (let i=0; i < alphabet.length; i++) {
        if (letter === alphabet[i]){
            if (gameState === true) {
                return Guessed(letter)            
            } else {
                return false
            }           
        }
    }
    return result
}

function Guessed (letter) {
    let result = true
    for (let i=0; i < alreadyGuessed.length; i++) {
        if (letter === alreadyGuessed[i]) {
            document.querySelector('#message').innerHTML = "You already chose that letter."
            return false        
        }
    }
     return result
}


document.onkeyup = function (event) {
    let letter = event.key.toLocaleUpperCase()
    let match = false
    if (alphaCheck(letter)) {
        alreadyGuessed.push(letter);
        document.querySelector('#guessed').innerHTML = alreadyGuessed
        for (i=0; i < compWord.length; i++){
            if (letter === compWord[i]){
                hiddenWord[i] = letter
                match = true
            }
            
        }
        match === true ? show(letter): (guessesRemaining>0 ? wrong(): lose())
    }
}

