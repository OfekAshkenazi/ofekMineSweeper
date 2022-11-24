
var gLevel = {
    size: 3,
    mines: 1
}

function easyLevel() {
    gLevel = {
        size: 4,
        mines: 2
    }
    restGame()

}
function HardLevel() {
    gLevel = {
        size: 8,
        mines: 14
    }
    restGame()

}
function superHardLevel() {
    gLevel = {
        size: 12,
        mines: 30
    }
    restGame()

}
