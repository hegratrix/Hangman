const words = ['ANTEATERS', 'AGGIES', 'COUGARS', 'BUCKEYES', 'AZTECS', 'REBELS', 'GEODUCKS', 'JACKRABBITS', 'SHOCKERS']
const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
let compWord = []
compWord = randomWord ()
let hiddenWord = []
hiddenWord = hideWord ()
let GameState = true

console.log(compWord)
document.querySelector('#hidden-word').innerHTML = hiddenWord

function randomWord () {
    let tempWord = words[Math.floor(Math.random()*words.length)]
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

function show () {
    console.log("show")
}

function wrong () {
    console.log("wrong")
}

function lose () {
    console.log("lose")
}

document.onkeyup = function (event) {
    let letter = event.key.toLocaleUpperCase()
    let match = false
    for (i=0; i < compWord.length; i++) {
        if (letter === compWord[i]){
            match = true
        }
    console.log(match)
    }
}

