import './game.scss'

const div = document.querySelector('div')
const game = document.querySelector('canvas#game')
import { resizeCanvas } from '../utils'

const CTX = game.getContext('2d')
const CELL_WIDTH = 20

div.addEventListener('mousemove', function(event) {
    let {x, y} = event

    x = x - (x % CELL_WIDTH)
    y = y - (y % CELL_WIDTH)
    aliveCells.add([x, y].toString())
    // setTimeout(() => {
    //     console.log(aliveCells.delete([x, y].toString()))
    // }, 1000)
})

// console.log(world)
let aliveCells = new Set()

function fillCell(x, y) {
    CTX.beginPath()
    CTX.lineWidth = 1
    CTX.strokeStyle = "transparent"
    CTX.fillStyle = "#00c269"
    CTX.rect(x, y, CELL_WIDTH-2, CELL_WIDTH-2)
    CTX.stroke()
    CTX.fill()
}

function getNeighbours(x, y) {
    let top    = [[x - CELL_WIDTH, y - CELL_WIDTH], [x, y - CELL_WIDTH], [x + CELL_WIDTH, y - CELL_WIDTH]]
    let middle = [[x - CELL_WIDTH, y],                   [x + CELL_WIDTH, y]]
    let bottom = [[x - CELL_WIDTH, y + CELL_WIDTH], [x, y + CELL_WIDTH], [x + CELL_WIDTH, y + CELL_WIDTH]]
    return [...top, ...middle, ...bottom]
}


window.addEventListener("resize", () => {
    resizeCanvas(game, div)
})

// CTX.font = '48px Helvetica'
// CTX.fillText('1', 50, 50)
function updateCells() {
    // const dead = new Set()
    const newAliveCells = new Set()
    aliveCells.forEach(v => {

        const liveNeighbours = []
        const deadNeighbours = []

        let [x, y] = JSON.parse(`[${v}]`)
        let neighbours = getNeighbours(x, y)
        
        for (const neighbour of neighbours) {
            const alive = aliveCells.has(neighbour.toString()) 
            if (alive) {
                liveNeighbours.push(neighbour)
            } else {
                deadNeighbours.push(neighbour)
            }
        }

        if (!(liveNeighbours.length < 2 || liveNeighbours.length > 3)) {
            newAliveCells.add(v)
        }

        for (const cell of deadNeighbours) {
            const neighbours = getNeighbours(...cell)
            if (neighbours.filter(n => aliveCells.has(n.toString())).length === 3) {
                newAliveCells.add(cell.toString())
            }
        }
        
        
    })
    aliveCells = newAliveCells
}


setInterval(updateCells, 2000)

// world.cells.forEach((row, y) => row.forEach((doa, x) => drawRect(x, y, doa)))
function animate() {
    requestAnimationFrame(animate)
    CTX.clearRect(0, 0, game.width, game.height)
    // console.log(aliveCells)
    aliveCells.forEach((v) => {
        let [x, y] = JSON.parse(`[${v}]`)
        fillCell(x, y)
    })
}

// setInterval(animate, 500)
resizeCanvas(game, div)
animate()