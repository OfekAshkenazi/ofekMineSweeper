function getRandomColor() {
    const letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getEmptyCellLocation() {
    var listOfEmptyCells = []
    for (var i = 0; i < gBoard.length; i++) {  //// !!!!

        for (var j = 0; j < gBoard[0].length; j++) { //// !!!!
            var currCell = gBoard[i][j]
            if (currCell === WALL || currCell === FOOD || currCell === GHOST || currCell === powerFood || currCell === PACMAN) continue
            listOfEmptyCells.push({ i, j })  //// !!!!


        }
    }
    var randomCell = getRandomInt(0, listOfEmptyCells.length)
    return listOfEmptyCells.splice(randomCell, 1)[0]

}

//// with the min withot the max 
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

//// with both
function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
//// rnding board to a table at html
function renderBoard(board) {

    const elBoard = document.querySelector('.board') //// !!!!
    var strHTML = ''
    for (var i = 0; i < board.length; i++) { //// !!!!
        strHTML += '<tr>\n'
        for (var j = 0; j < board[0].length; j++) {
            const currCell = board[i][j]

            var cellClass = getClassName({ i: i, j: j }) //// !!!!
            /// short if :)
            cellClass += (currCell.type === WALL) ? ' wall' : ' floor' //// !!!!
            //// of this  
            // if (currCell.gameElement === glue) cellClass += ' glue'  //// try to render the board also but not working as i thougt
            // else if (currCell.type === FLOOR) cellClass += ' floor'
            // else if (currCell.type === WALL) cellClass += ' wall'
            //// !!!!
            strHTML += `\t<td class="cell ${cellClass}"  onclick="moveTo(${i},${j})" >\n`
            //// !!!!
            

            strHTML += '\t</td>\n'
        }
        strHTML += '</tr>\n'
    }

    elBoard.innerHTML = strHTML
}
///// rnding cell 
function renderCell(location, value) {
    const cellSelector = '.' + getClassName(location)
    const elCell = document.querySelector(cellSelector)
    elCell.innerHTML = value

}
//// more way
function renderCell(location, value) {
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

//// bulding board for arrays 
function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            }
        }
    }

    return board
}
//// function that take empty cell and put in something 
function addCherry() {
    var emptyLocation = getEmptyCellLocation()
    if (!emptyLocation) return
    gBoard[emptyLocation.i][emptyLocation.j] = CHERRY
    renderCell(emptyLocation, CHERRY)
    gcherryCount++
    if (gcherryCount === 10) clearInterval(gIntervalOfCherrySpawn)
    console.log(gcherryCount)
}
//// function for drawing nums each time one !
function drawNum(nums) {
    var idx = getRandomInt(0, nums.length)
    var num = nums[idx]
    nums.splice(idx, 1)
    return num
}
///// negs find loop 
function countNegs(cellI, cellJ, mat) {
    var negsCount = 0
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= mat[i].length) continue
            if (mat[i][j].gameElement === BALL) negsCount++
            if (mat[i][j].gameElement === glue) negsCount++
        }
    }
    return negsCount
}

function createGhosts(board) {
    // TODO: 3 ghosts and an interval
    for (var i = 0; i < ghostOnMap; i++) {

        createGhost(board)


    }
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function createGhost(board) {
    // DONE
    const ghost = {
        location: {
            i: 6,
            j: 8
        },
        currCellContent: FOOD,
        
    }

    gGhosts.push(ghost)


    board[ghost.location.i][ghost.location.j] = GHOST
}
function moveGhost(ghost) {
    // DONE: figure out moveDiff, nextLocation, nextCell
    const moveDiff = getMoveDiff()
    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j,
    }
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // DONE: return if cannot move
    if (nextCell === WALL) return
    if (nextCell === GHOST) return

    // DONE: hitting a pacman? call gameOver
    if (nextCell === PACMAN && !gPacman.isSuper) {
        gameOver()
        return
    }
    if (nextCell === PACMAN && gPacman.isSuper) {
        killGhost(ghost.location)
        gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
        renderCell(ghost.location, ghost.currCellContent)
        return
    }

    // DONE: moving from current location:
    // DONE: update the model (restore prev cell contents)
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // DONE: update the DOM
    renderCell(ghost.location, ghost.currCellContent)

    // DONE: Move the ghost to new location:
    // DONE: update the model (save cell contents so we can restore later)
    ghost.currCellContent = nextCell
    ghost.location = nextLocation
    gBoard[nextLocation.i][nextLocation.j] = GHOST
    // DONE: update the DOM
    renderCell(nextLocation, getGhostHTML(ghost))
}
function killGhost(locationOfDeadGhost) {
    for (var i = 0; i < gGhosts.length; i++) {
        var currGhostLocation = gGhosts[i].location
        if (locationOfDeadGhost.i === currGhostLocation.i && locationOfDeadGhost.j === currGhostLocation.j) {
            var deadGhost = gGhosts.splice(i, 1)[0]
            gGame.deadGhosts.push(deadGhost)
        }
    }
    console.log(gGame.deadGhosts)

}
function getGhostHTML(ghost) {
    // console.log(ghost)
    return `<span>${GHOST}</span>`
}
function onInit() {
    gGhosts = []
    gGame.deadGhosts = []
    countFood = 0
    gGame.score = 0
    gcherryCount = 0
    gBoard = buildBoard()
    createGhosts(gBoard)
    createPacman(gBoard)
    renderBoard(gBoard, '.board-container')
    gGame.isOn = true
    gIntervalOfCherrySpawn = setInterval(addCherry,15000)
}
function restGame() {
    onInit()
    //// for rest score in span 
    document.querySelector('.btn').style.display = 'none'
    document.querySelector('h2 span').innerText = gGame.score
    document.querySelector('.gameOver-modal').style.display = 'none'
}
function updateScore(diff) {
    // TODO: update model and dom
    // Model
    gGame.score += diff
    // DOM
    document.querySelector('h2 span').innerText = gGame.score

}