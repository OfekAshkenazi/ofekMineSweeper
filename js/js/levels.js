var gLevel = {
    size: 5,
    mines: 5
}
//// function that fixing game lvl changes //// to do: switch look more butiful
function lvlUpdate(elBtn) {
    if (elBtn.innerText === 'easy') {
        gLevel = {
            size: 5,
            mines: 3
        }
    } else if (elBtn.innerText === 'hard') {
        gLevel = {
            size: 8,
            mines: 14
        }
    } else if (elBtn.innerText === 'super') {
        gLevel = {
            size: 12,
            mines: 28
        }
    }
    restGame()

}

///// working but i need to more work on it
function Hints(board, x, y) {
    var hintCells = []
    for (var i = x - 1; i <= x + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = y - 1; j <= y + 1; j++) {
            if (j < 0 || j >= board[i].length) continue;
            if (i === x && j === y) continue;
            var elCell = document.querySelector(`.cell-${i}-${j}`)
            if (board[i][j].isShown || board[i][j].isMarked) continue
            board[i][j].isShown = true
            elCell.style.backgroundColor = '#E3A835'
            elCell.innerText = NegsCount(i, j, board)
            hintCells.push(board[i][j])
            // hintCells.push({i: board[i], j: board[j]})



        }
    }
    setTimeout(removeHint, 4000, hintCells)
}
//// to do : figure how to cath this cells in more ways..
function removeHint(hintCells) {
    for (var i = 0; i < hintCells.length; i++) {
        const currCell = hintCells[i]
        gBoard[currCell.i][currCell.j].isShown = true
        const elCell = document.querySelector(currCell)
        elCell.innerText = ''
    }
}