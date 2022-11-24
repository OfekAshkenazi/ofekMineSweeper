var isDarkMode = false
var gLevel = {
    size: 5,
    mines: 5
}

function lvlUpdate(elBtn) {
    if (elBtn.innerText === 'easy') {
        gLevel = {
            size: 4,
            mines: 2
        }

    } else if (elBtn.innerText === 'hard') {
        gLevel = {
            size: 8,
            mines: 14
        }
    } else if (elBtn.innerText === 'super') {
        gLevel = {
            size: 12,
            mines: 32
        }
    }

    restGame()

}

function Hints() {
    var randomIdxI = getRandomInt(0, board.length)
    var randomIdxJ = getRandomInt(0, board.length)
    
}