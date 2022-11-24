'use strict'
console.log('sprint :)')
// window.addEventListener("contextmenu", e => e.preventDefault());
const MINE = '💣'
const flag = '🚩'
var gIntervald
var countClicks = 0
var gBoard
var cell
var gGame = {
    isOn: true,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
    lifes: 0
}

function initGame() {
    gBoard = buildBoard()
    countClicks = 0
    renderBoard(gBoard)
    restTimer()
    clearInterval(gIntervald)
    renderLife()
}

function cellClicked(elCell, i, j, ev) {
    var currCell = gBoard[i][j]
    if (!gGame.isOn) return
    countClicks++
    if (ev.which === 3) return cellMarked(elCell, currCell)

    if (countClicks === 1) {
        elCell.innerText = '0'
        showTimer()
        atFirstClick(gBoard)
    }
    if (currCell.isShown || currCell.isMarked) return
    if (currCell.minesAroundCount === 0) return expandShown(gBoard, i, j)

    // if (currCell.isMarked) return
    if (currCell.isMine) {
        currCell.isShown = true
        elCell.innerText = MINE
        gGame.shownCount++
        gGame.lifes++
        countLifes()
        renderLife()
        showCount()
        checkGameOver()
        console.log(gGame.lifes)
        return
    }
    gGame.shownCount++
    currCell.isShown = true
    elCell.innerText = currCell.minesAroundCount
    showCount()
    checkGameOver()
    // console.log(gBoard)


}
// console.log(cellMarked(elCell))

function cellMarked(elCell, cell) {
    if (!cell.isMarked) {
        cell.isMarked = true
        cell.isShown = true
        elCell.innerText = flag
        gGame.markedCount++
        showCount()
        checkGameOver()
    } else {
        cell.isMarked = false
        cell.isShown = false
        elCell.innerText = ''
        gGame.markedCount--
        showCount()

    }
}

function expandShown(board, x, y) {
    if (board[x][y].isMine) return
    for (var i = x - 1; i <= x + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = y - 1; j <= y + 1; j++) {
            if (j < 0 || j >= board[i].length) continue;
            if (i === x && j === y) continue;
            if (board[i][j].isShown || board[i][j].isMarked || board[i][j].isMine) continue
            // if (board[i][j].minesAroundCount >= 2) continue
            var elCell = document.querySelector(`.cell-${i}-${j}`)

            board[i][j].isShown = true
            gGame.shownCount++

            elCell.innerHTML = NegsCount(i, j, board)
            if (!board[i][j].minesAroundCount) expandShown(board, i, j)
            showCount()

        }
        ///// i hate this function have a good day !
    }
}

function checkGameOver() {
    if (gGame.shownCount + gGame.markedCount === gLevel.size * gLevel.size) {
        document.querySelector('.btnRest').innerText = '😎'
        document.querySelector('h3').innerText = `yayay you win`
        gGame.isOn = false
        clearInterval(gIntervald)
    }
    // }
}

