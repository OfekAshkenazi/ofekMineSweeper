'use strict'

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

function restTimer() {
    var elTimer = document.querySelector('.timer')
    elTimer.innerText = `Time: 00:00`
    document.querySelector('.btnRest').innerText = '🤔'



}

function showCount() {
    const elScore = document.querySelector('.score')
    elScore.innerText = `Your Score: ${gGame.shownCount+gGame.markedCount}`

}
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
function renderLife() {
    const elLifeBar = document.querySelector('.lifes')
    elLifeBar.innerText = 'you lost!'
    if (gGame.lifes === 2) elLifeBar.innerText = '💖'
    else if (gGame.lifes === 1) elLifeBar.innerText = '💖💖'
    else if (gGame.lifes === 0) elLifeBar.innerText = '💖💖💖'

}

function countLifes() {
    if (gGame.lifes === 3) {
        gGame.isOn = false
        if (!gGame.isOn) clearInterval(gIntervald)
        document.querySelector('.btnRest').innerText = '💥'
        document.querySelector('h3').innerText = `hmmmm you lost`
    }
}


