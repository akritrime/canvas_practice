import { drawLine, CartesianSystem, resizeCanvas } from '../utils'

const canvas = document.querySelector('canvas')
const CTX = canvas.getContext('2d')
const colors = [
    "#87A8C7",
    "#5D8CB7",
    "#1C5E92",
    "#003D73",
    "#001D4F"
]

const mouse = {
    x: 0,
    y: 0,
    clicked: false
}

function walker() {
    
    const x = canvas.width / 2
    const y = canvas.height / 2
    const color = colors[Math.round(Math.random() * 5)]
    return {
        x,
        y,
        color
    }
}

function drawWalker(w) {
    const {x, y, color} = w
    w = walk(w)

    CTX.strokeStyle = color
    drawLine(x, y, w.x, w.y, CTX)
    return w
}

function walk(w) {
    let {x, y, color} = w
    let dx = mouse.clicked && Math.random() > 0.5 ? mouse.x > x && 1 || -1 : Math.random() * 2 - 1
    let dy = mouse.clicked && Math.random() > 0.5 ? mouse.y > y && 1 || -1 : Math.random() * 2 - 1
    x += dx
    y += dy
    // if (dx < 0) {
    //     x += dx
    // }

    // if (dy < 0) {
    //     y += dy
    // }
    return {x, y, color}
}
let w
let c = new CartesianSystem(canvas.width / 2, canvas.height / 2, CTX)

function init() {
    resizeCanvas(canvas)
    w = Array(100).fill(0).map(_ => walker())
    c = new CartesianSystem(canvas.width / 2, canvas.height / 2, CTX)
    CTX.strokeStyle = "grey"
    c.drawAxes(canvas.height / 2, canvas.width / 2, 25, 0)
}

window.addEventListener('resize', init)
canvas.addEventListener('mousemove', function (event) {
    mouse.x = event.x
    mouse.y = event.y
})

canvas.addEventListener('click', function(event) {
    mouse.clicked = !mouse.clicked
})


function animate() {
    requestAnimationFrame(animate)
    w = w.map(w => drawWalker(w))
    // console.log(drawWalker(w))
    
}

init()
animate()