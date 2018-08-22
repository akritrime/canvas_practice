import { drawLine, resizeCanvas, CartesianSystem } from "../utils";

const canvas = document.querySelector('canvas');
const CTX = canvas.getContext('2d')

const MOUSE = {
    x: 0,
    y: 0
}

const COLORS = [ 
    "#4c5b5c", 
    "#ff715b",
    "#f9cb40",
    "#bced09",
    "#2f52e0"
]



let x = - canvas.width / 2
let y = 0
let y1 = 0
// let y3 = 0
let c = new CartesianSystem(canvas.width / 2, canvas.height / 2, CTX)
// starts and continuees the animation per frame
let angle = 0

function init() {

    resizeCanvas(canvas)
    x = - canvas.width / 2
    y = 50 * Math.cos( 2 * Math.PI / 250 * x)
    y1 = 50 * Math.sin( 2 * Math.PI / 250 * x)
    // y3 = 0
    c = new CartesianSystem(canvas.width / 2, canvas.height / 2, CTX)
    CTX.strokeStyle = "grey"
    c.drawAxes(canvas.height / 2, canvas.width / 2, 25, 0)
    c.drawGrid(canvas.height, canvas.width, 50)
}

function animate() {
    requestAnimationFrame(animate)
    // CTX.clearRect(0, 0, canvas.width, canvas.height)
    // circles =  circles.map(c => drawCircle(updateCircle(c)))
    
    let x1 = x + 1
    let y_ =  50 * Math.cos( 2 * Math.PI / 250 * x1)

    CTX.strokeStyle = "black"
    drawLine(...c.toCoordinates(x, y, 1), ...c.toCoordinates(x1, y1, 1), CTX)
    
    y = y_

    y_ = 50 * Math.sin( 2 * Math.PI / 250 * x)
    drawLine(...c.toCoordinates(x, y1, 1), ...c.toCoordinates(x1, y_, 1), CTX)

    y1 = y_

    x = x1
    

}



canvas.addEventListener("mousemove", function(event) {
    MOUSE.x = event.x
    MOUSE.y = event.y
})

window.addEventListener("resize", init)

canvas.addEventListener("click", init)

init()
// document.body.style.background = `url(${canvas.toDataURL()})`
animate()