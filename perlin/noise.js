import { drawLine, resizeCanvas } from "../utils";

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

function perlin(x, y, z) {

}

function smoothstep(v) {
    return (v * v) * (3.0 - 2.0 * v)
}

function mix(x, y, a) {
    return x * (1 - a) + y * a
}

function noise1D() {

}


let stoppedCircles = 0
// let stopped = false
// updates the values of the variables and returns a new object with the new variables
function updateCircle(c) {
}



let x = canvas.width / 2
let y = canvas.height / 2
// starts and continuees the animation per frame
let angle = 0
function animate() {
    requestAnimationFrame(animate)
    // CTX.clearRect(0, 0, canvas.width, canvas.height)
    // circles =  circles.map(c => drawCircle(updateCircle(c)))
    
    let x1 = x + 1
    let y1 = y + Math.cos(angle++)
    drawLine(x, y, x = x1, y = y1, CTX)

}



canvas.addEventListener("mousemove", function(event) {
    MOUSE.x = event.x
    MOUSE.y = event.y
})

window.addEventListener("resize", init)

canvas.addEventListener("click", init)

let circles = []
function init() {

    resizeCanvas(canvas)

    x = canvas.width / 2
    y = canvas.height / 2
}

init()
// document.body.style.background = `url(${canvas.toDataURL()})`
animate()