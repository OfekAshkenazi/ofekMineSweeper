'use strict'

//// for building the bord and set mines and set how many negs with mine have to all cells
function buildBoard() {

    const board = []
    for (var i = 0; i < gLevel.size; i++) {
        board.push([])
        for (var j = 0; j < gLevel.size; j++) {
            cell = {
                minesAroundCount: null,
                isShown: false,
                isMine: false,
                isMarked: false

            }
            board[i][j] = cell


        }
    }
    // setMinesInBoard(board)
    // setMinesNegsCount(board)

    console.log(board)
    return board
}

function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            const currCell = board[i][j]
            if (currCell.isMine) continue
            currCell.minesAroundCount = NegsCount(i, j, board)
        }
    }
}

//// for rending the board
function renderBoard(board) {

    const elBoard = document.querySelector('.board')
    var strHTML = '<table><tbody>'
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            var className = `cell-${i}-${j}`
            strHTML += `<td  class="${className}" onmousedown="cellClicked(this, ${i}, ${j}, event)"> </td>`

        }

    }
    strHTML += '</tr>'
    '</tbody></table>'
    elBoard.innerHTML = strHTML
}
//// for set mines the function called from buildboard function 
function setMinesInBoard(board) {
    for (var i = 0; i < gLevel.mines; i++) {
        var randomIdxI = getRandomInt(0, board.length)
        var randomIdxJ = getRandomInt(0, board.length)
        board[randomIdxI][randomIdxJ].isMine = true
        board[randomIdxI][randomIdxJ].minesAroundCount = null

        // currMine[i].isMine = true

    }

}
function atFirstClick(board) {
    setMinesInBoard(board)
    setMinesNegsCount(board)

}

