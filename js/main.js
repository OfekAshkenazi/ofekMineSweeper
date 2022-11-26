'use strict'
console.log('sprint :)')
window.addEventListener("contextmenu", e => e.preventDefault());
const MINE = '💣'
const flag = '🚩'
var gIntervald
var countClicks = 0  //// no need that.... can put it inside gGame
var gBoard
var cell
var gHints = false
var gHintsCount = 0
// var gHintIsOn = false  not working yet
var gGame = {
    isOn: true,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
    lifes: 0,
}

function initGame() {
    gBoard = buildBoard()
    countClicks = 0
    gHintsCount = 0
    renderBoard(gBoard)
    restTimer()
    clearInterval(gIntervald)
    renderLife()
    renderHints()

}

function cellClicked(elCell, i, j, ev) {

    var currCell = gBoard[i][j]
    if (!gGame.isOn) return
    if (gHints === true) {
        Hints(gBoard, i, j)
        renderHints()
        if (isDarkMode) {
            document.querySelector('.hints').style.color = '#697bf2'
        }
        return
    }
    countClicks++
    if (currCell.isShown || currCell.isMarked) return
    if (ev.button === 2 && countClicks > 1) return cellMarked(elCell, currCell)
    ///// to do need to put inside return for the first num clicked will be with no  string and color becuz its supsot to be zero !'...'
    if (countClicks === 1) {
        showTimer()
        atFirstClick(gBoard)
        ////model
        currCell.isMine = false
        currCell.minesAroundCount = 0
        /// dom 
        magaExpandShown(elCell, gBoard, i, j)
        elCell.innerText = ''
        return
    }

    if (currCell.minesAroundCount === 0) return magaExpandShown(elCell, gBoard, i, j)
    // if (currCell.isMarked) return
    if (currCell.isMine) {
        /// model
        currCell.isShown = true
        gGame.shownCount++
        gGame.lifes++
        //// dom
        elCell.innerText = MINE
        elCell.style.backgroundColor = '#CC0C1F'
        elCell.style.boxShadow = 'none'
        countLifes()
        renderLife()
        showCount()
        checkGameOver()
        // console.log(gGame.lifes)
        return
    }
    currCell.isShown = true
    elCell.innerText = currCell.minesAroundCount
    if (currCell.minesAroundCount === 0) elCell.style.innerText = ''
    gGame.shownCount++
    colorByMinesCount(elCell)
    showCount()
    checkGameOver()
    // console.log(gBoard)


}

function cellMarked(elCell, cell) {
    if (!cell.isMarked) {
        /// model
        cell.isMarked = true
        cell.isShown = true
        gGame.markedCount++
        ///// dom
        elCell.innerHTML = flag
        elCell.style.boxShadow = 'none'

        showCount()
        checkGameOver()
    } else {
        //// model
        cell.isMarked = false
        cell.isShown = false
        gGame.markedCount--
        ///dom
        elCell.innerHTML = ''
        elCell.style.boxShadow = '0 0 5px #074e14, 0px 0px 25px #064306, 0 0 50px #129714, 0 0 100px #0a5715'


        showCount()

    }
}

//// mineswepper algoritem
function expandShown(board, x, y) {
    if (board[x][y].isMine) return
    for (var i = x - 1; i <= x + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = y - 1; j <= y + 1; j++) {
            if (j < 0 || j >= board[i].length) continue;
            if (board[i][j].isShown || board[i][j].isMarked || board[i][j].isMine) continue
            var elCell = document.querySelector(`.cell-${i}-${j}`)
            /// model
            gGame.shownCount++
            board[i][j].isShown = true
            /// dom
            elCell.innerHTML = NegsCount(i, j, board)
            colorByMinesCount(elCell)
            if (!board[i][j].minesAroundCount) expandShown(board, i, j)
            showCount()

        }
        ///// i hate this function have a good day !
    }
}
// function for checking win 
function checkGameOver() {
    if (gGame.shownCount + gGame.markedCount === gLevel.size * gLevel.size) {
        /// model
        gGame.isOn = false
        ///dom
        win()
        clearInterval(gIntervald)
    }

}
//// function that fix some style 
function magaExpandShown(elCell, board, i, j) {
    elCell.style.innerText = ''
    elCell.style.backgroundColor = '#eaa67f54'
    elCell.style.boxShadow = 'none'
    expandShown(board, i, j)
}
