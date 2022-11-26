'use strict'
var isDarkMode = false



//// get random 
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
//// count how many negs with mine have to a certin cell
function NegsCount(cellI, cellJ, mat) {
    var negsCount = 0
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue

        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= mat[i].length) continue

            if (mat[i][j].isMine) negsCount++

        }
    }
    return negsCount
}
//// timer
function showTimer() {
    var elTimer = document.querySelector('.timer')
    var [milliseconds, seconds, minutes] = [0, 0, 0];
    var newTime = Date.now()
    gIntervald = setInterval(() => {
        var time = Date.now() - newTime + 0
        // milliseconds = parseInt((time % 1000) / 1)
        seconds = parseInt((time / 1000) % 60)
        minutes = parseInt((time / (1000 * 60)) % 60)
        elTimer.innerText = `Time: 0${minutes}:${seconds}`

    }), 10
}
/// for fixing innerText
function restTimer() {
    var elTimer = document.querySelector('.timer')
    elTimer.innerText = `Time: 00:00`
    document.querySelector('.btnRest').innerText = '🤔'



}
//// for show SHOWNCOUNT OF gGAME
function showCount() {
    const elScore = document.querySelector('.score')
    elScore.innerText = `Your Score: ${gGame.shownCount + gGame.markedCount}`

}

//// REST THE GAME AND INNERTEXT very like like inint but for every single lvl
function restGame() {
    document.querySelector('.score').innerText = `Your Score: 0`
    document.querySelector('h3').innerText = `copyRight or coffy right 😫`
    gGame = {
        isOn: true,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0,
        lifes: 0
    }
    initGame()

}
//// FOR FIXING INNERTEXT OF LIFE
function renderLife() {
    const elLifeBar = document.querySelector('.lifes')
    elLifeBar.innerText = 'you lost!'
    elLifeBar.style.color = '#697bf2'
    if (gGame.lifes === 2) elLifeBar.innerText = '💖'
    else if (gGame.lifes === 1) elLifeBar.innerText = '💖💖'
    else if (gGame.lifes === 0) elLifeBar.innerText = '💖💖💖'
}
/// FOR LOSE GAME.
function countLifes() {
    if (gGame.lifes === 3) {
        gGame.isOn = false
        if (!gGame.isOn) clearInterval(gIntervald)
        lost()
    }
}
/// INNERTEXT FOR WIN
function win() {
    document.querySelector('.btnRest').innerText = '🥳'
    document.querySelector('h3').innerText = `yayay you win`
}
/// INNERTEXT FOR LOSE
function lost() {
    document.querySelector('.btnRest').innerText = '🤯'
    document.querySelector('h3').innerText = `hmmmm you lost`
    showAllMinsOnMap(gBoard)

}

/// TOGGLE DARK MODE . done: MAKE THE TD CHANGE COLOR ALSO to do: to know how to conenct it right to boolean
function toggleDarkMode() {
    const blackIsColor = '#191A1C'
    const whiteColor = 'white'
    const blueIsColor = '#697bf2'
    const btnColorBefore = '#325661'
    // const elCells = document.querySelectorAll('.tdCells') /// the rnder board 
    var elContainer = document.querySelector('.gameContainer')
    const elHintsbar = document.querySelector('.hints')

    if (isDarkMode === false) {
        elContainer.style.backgroundColor = `${blackIsColor}`
        elContainer.style.border = `${blackIsColor}`
        elContainer.style.boxShadow = '0 0 5px #294A52, 0 0 25px #294A52, 0 0 50px #294A52, 0 0 100px #294A52'
        elContainer.style.border = `5.5px solid #f5efe8`
        elHintsbar.style.color = '#697bf2'
        // elCells.forEach(changeBackGroundColorToDarkMode) no looking good render board
        document.querySelector('body').style.backgroundColor = `${blackIsColor}`
        document.querySelector('.timer').style.color = `${whiteColor}`
        document.querySelector('.score').style.color = `${whiteColor}`
        document.querySelector('.darkMode').innerText = 'LightMode'
        document.querySelector('.darkMode').style.backgroundColor = `${blueIsColor}`
        document.querySelector('.btn1').style.backgroundColor = `${blueIsColor}`
        document.querySelector('.btn2').style.backgroundColor = `${blueIsColor}`
        document.querySelector('.btn3').style.backgroundColor = `${blueIsColor}`
        document.querySelector('footer').style.color = `${blueIsColor}`
        isDarkMode = true


    } else {
        elContainer.style.backgroundColor = 'rgb(193, 141, 79)'
        elContainer.style.border = 'rgb(242, 176, 96)'
        elContainer.style.boxShadow = '0 0 5px #E3A835, 0 0 25px #E3A835, 0 0 50px #E3A835, 0 0 100px #E3A835'
        elContainer.style.border = `5.5px solid #f2b060`
        elHintsbar.style.color = '#191A1C'

        // elCells.forEach(changeBackGroundColorToLightMode) /// no looking good rnder board...
        document.querySelector('body').style.backgroundColor = 'rgb(147, 91, 24)'
        document.querySelector('.timer').style.color = '#051538'
        document.querySelector('.score').style.color = '#051538'
        document.querySelector('.darkMode').innerText = 'DarkMode'
        document.querySelector('.darkMode').style.backgroundColor = 'rgb(50, 86, 97)'
        document.querySelector('.btn1').style.backgroundColor = `${btnColorBefore}`
        document.querySelector('.btn2').style.backgroundColor = `${btnColorBefore}`
        document.querySelector('.btn3').style.backgroundColor = `${btnColorBefore}`
        document.querySelector('footer').style.color = `${blackIsColor}`
        isDarkMode = false

    }

}
/// THIS FUNCTION JUST SHOWING ALL MINES ON BOARD. ACTIVATED WHEN USER LOSE :) LIKE IN THE REAL GAME
function showAllMinsOnMap(board) {
    // var minesOnMap = 0
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j]
            if (currCell.isMine) {
                // minesOnMap++
                var elCell = document.querySelector(`.cell-${i}-${j}`)
                elCell.innerText = MINE
                elCell.style.backgroundColor = '#CC0C1F'

            }
        }
    }

}

//// bring color to the td by minescount like in the game 1 blue 2 green 3 red 4 pruple i think... :)))
function colorByMinesCount(elCell) {
    elCell.style.boxShadow = 'none'
    if (elCell.innerText === '1') elCell.style.color = 'blue'
    else if (elCell.innerText === '2') elCell.style.color = 'green'
    else if (elCell.innerText === '3') elCell.style.color = 'red'
    else if (elCell.innerText === '4') elCell.style.color = 'purple'
    else if (elCell.innerText === '5') elCell.style.color = 'yellow'
    else if (elCell.innerText === '0') {
        elCell.style.backgroundColor = '#eaa67f54'
        elCell.innerText = ''

    }

}

function changeBackGroundColorToDarkMode(element) {
    element.style.backgroundColor = '#093148'
}
/// vary ty to web dev simplifles
function changeBackGroundColorToLightMode(element) {
    element.style.backgroundColor = '#eaa67f'
}
console.log(isDarkMode)