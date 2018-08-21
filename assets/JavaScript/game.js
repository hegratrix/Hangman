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
let lettersRemaining = compWord.length
let alphaButtons = []
alphaButtons = makeButtons ()

console.log(compWord)
console.log(lettersRemaining)
console.log(hiddenWord)
document.querySelector('#hidden-word').innerHTML = hiddenWord
document.querySelector('#wins').innerHTML = "Wins: " + wins
document.querySelector('#losses').innerHTML = "Losses: " + losses
document.querySelector('#picture').src = "assets/Images/guesses/8 balloons.png"

//picks word from array
function randomWord () {
    let tempWord = words[Math.floor(Math.random()*words.length)]
    let wordArray = tempWord.split('')
    return wordArray
    }

//turns words into dashes
function hideWord () {
    let tempWord = []
    for (var i=0; i < compWord.length; i++) {
        tempWord.push("_");
    }
    return tempWord.join("");
}

//matches word to picture to show when you win/lose
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
}

//sets picture to match number of guesses remaining
function guessPic (guessesRemaining) {
    switch (guessesRemaining) {
        case 7:
            document.querySelector('#picture').src = "assets/Images/guesses/7 balloons.png"
            break 
        case 6:
            document.querySelector('#picture').src = "assets/Images/guesses/6 balloons.png"
            break
        case 5:
            document.querySelector('#picture').src = "assets/Images/guesses/5 balloons.png"
            break
        case 4:
            document.querySelector('#picture').src = "assets/Images/guesses/4 balloons.png"
            break
        case 3:
            document.querySelector('#picture').src = "assets/Images/guesses/3 balloons.png"
            break
        case 2:
            document.querySelector('#picture').src = "assets/Images/guesses/2 balloons.png"
            break
        case 1:
            document.querySelector('#picture').src = "assets/Images/guesses/1 balloons.png"
            break
    }  
}

//resets game when you win/lose
function reset () {
    compWord = randomWord ()
    hiddenWord = hideWord ()
    gameState = true
    alreadyGuessed = []
    document.querySelector('#guessed').innerHTML = alreadyGuessed
    guessesRemaining = 8
    document.querySelector('#remaining').innerHTML = "You have " + guessesRemaining + " more guesses"
    document.querySelector('#picture').src = "assets/Images/guesses/8 balloons.png"
    lettersRemaining = compWord.length
    document.querySelector('#hidden-word').innerHTML = hiddenWord
    document.querySelector('#remaining').style.visibility = "visible"
    document.querySelector('#message').innerHTML = "Pick a Letter."
    alphaButtons = makeButtons ()
}

//when you guess correctly, replaces the dash with the letter
function show (letter, tempWord) {
    console.log(tempWord)
    document.querySelector('#message').innerHTML = "You got a match!"
    for (i=0; i < compWord.length; i++){
        if (letter === compWord[i]){
            tempWord[i] = letter
            lettersRemaining--
            hiddenWord = tempWord.join('')
            document.querySelector('#hidden-word').innerHTML = hiddenWord
            console.log(hiddenWord)
        }
    }
    if (lettersRemaining === 0 ) {
        win()
    }
}

//if you win
function win () {
    gameState = false
    wins++
    setPicture (hiddenWord)
    document.querySelector('#message').innerHTML = "You guessed my word! Way to Go!"
    document.querySelector('#remaining').style.visibility = "hidden"
    document.querySelector('#wins').innerHTML = "Wins: " + wins
    setTimeout(function() {
        reset()
        }, 3000);
}

//when the letter isn't in the word
function wrong () {
    guessesRemaining--
    guessPic (guessesRemaining)
    if (guessesRemaining > 0) {
    document.querySelector('#message').innerHTML = "Wrong, guess again.";
    document.querySelector('#remaining').innerHTML = "You have " + guessesRemaining + " more guesses"
    } else {
        lose();
    }
}

//you lose
function lose () {
    gameState = false
    losses++
    document.querySelector('#message').innerHTML = "You didn't get my word. Try again."
    document.querySelector('#remaining').innerHTML = "You have " + guessesRemaining + " more guesses"
    tempWord = compWord.join('')
    setPicture (tempWord)      
    document.querySelector('#remaining').style.visibility = "hidden"
    document.querySelector('#losses').innerHTML = "Losses: " + losses
    setTimeout(function() {
        reset()
        }, 3000);    
}

// makes alphabet butons
function makeButtons () {
    for (let i=0; i < alphabet.length; i++) {
        let c = alphabet[i]
        let btn = document.createElement('button')
        btn.setAttribute("id", c)
        btn.setAttribute("onClick", "clicked(this.id)" )
        let t = document.createTextNode(c)
        btn.appendChild(t)
        let btnLetter = document.querySelector('#guessed')
        btnLetter.appendChild(btn)
    }
}

//make sure you guesseed a letter
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

//makes sure you haven't already guessed it
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

//game play when you use keyboard
document.onkeyup = function (event) {
    let letter = event.key.toLocaleUpperCase()
    document.querySelector('#'+letter).style.opacity =".3"
    let match = false
    let tempWord = []
    if (alphaCheck(letter)) {
        alreadyGuessed.push(letter);
        for (i=0; i < compWord.length; i++){
            if (letter === compWord[i]){
                tempWord = hiddenWord.split('');
                tempWord[i] = letter
                console.log(hiddenWord)
                match = true
            }
            
        }
        match === true ? show(letter, tempWord): (guessesRemaining>0 ? wrong(): lose())
    }
}

//game play when you use button
function clicked (event) {
    let letter = event
    document.querySelector('#'+letter).style.opacity =".3"
    let match = false
    let tempWord = []
    if (alphaCheck(letter)) {
        alreadyGuessed.push(letter);
        for (i=0; i < compWord.length; i++){
            if (letter === compWord[i]){
                tempWord = hiddenWord.split('');
                tempWord[i] = letter
                console.log(hiddenWord)
                match = true
            }
            
        }
        match === true ? show(letter, tempWord): (guessesRemaining>0 ? wrong(): lose())
    }
}