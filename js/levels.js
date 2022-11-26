var gLevel = {
    size: 5,
    mines: 5
}
var GhintCells
//// function that fixing game lvl changes //// last option for upgrade to do: switch look more butiful
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
///// working but i need to more work on it done!!! done! : give only 3 clues and render them like life :)
function Hints(board, x, y) {
    console.log(gHintsCount)
    
    if (countClicks === 0) {
        alert('you cant use a clue on the start!')
        return
    }
    if (gHintsCount > 6) {
        alert('you dont have any more clues')
        return
        
    } 
    gHintsCount++
    GhintCells = []
    gHints = true
    for (var i = x - 1; i <= x + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = y - 1; j <= y + 1; j++) {
            if (j < 0 || j >= board[i].length) continue;
            var elCell = document.querySelector(`.cell-${i}-${j}`)
            if (board[i][j].isShown || board[i][j].isMarked) continue
            var currCell = board[i][j]
            currCell.isShown = true
            if (currCell.isMine) {
                elCell.innerText = MINE
                elCell.backgroundColor = '#eaa67f4f'

            } else {
                elCell.innerText = NegsCount(i, j, board)
                elCell.backgroundColor = '#eaa67f54'
            }
            GhintCells.push(currCell)
        }
    }
    setTimeout(RemoveHint, 1000)
}
//// done : figure how to cath this cells in more ways..
function RemoveHint() {
    // console.log(hintCells)
    for (var i = 0; i < GhintCells.length; i++) {
        var currCell = GhintCells[i]
        var elCell = document.querySelector(`.cell-${currCell.locationI}-${currCell.locationJ}`)        /// model
        currCell.isShown = false
        /// dom
        elCell.innerText = ''
        elCell.backgroundColor = '#eaa67'


    }

    gHints = false
    // hintCells.forEach(hintCells.isShown = null)



}
/// working , for rendin the clues innerText
function renderHints() {
    const elHintsbar = document.querySelector('.hints')
    elHintsbar.innerText ='No More'
    elHintsbar.style.color = '#191A1C'
    if (gHintsCount === 4) elHintsbar.innerText = '💡'
    else if (gHintsCount === 2) elHintsbar.innerText = '💡💡'
    else if (gHintsCount === 0) elHintsbar.innerText = '💡💡💡'
}