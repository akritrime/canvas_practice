import { inherits } from "util";

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

// resizes the canvas to fill the window
function sizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// returns an object with values to draw a circle
function circle() {
    const radius = Math.random() * 20 + 5
    const color = COLORS[Math.floor(Math.random() * 5)]
    const x = Math.random() * (canvas.width - 2 * radius) + radius
    const y = Math.random() * (canvas.height / 2) + radius
    const dx = (Math.random() * 4 - 2)
    const dy = 0

    return {
        x,
        y,
        dx,
        dy,
        radius,
        color
    }
}

// draws the circle depending on the circle object. Returns the object back
function drawCircle(c) {
    CTX.beginPath()
    CTX.arc(c.x, c.y, c.radius, 0, Math.PI * 2, false)
    
    CTX.fillStyle = c.color
    CTX.fill()
    return c
}

// updates the values of the variables and returns a new object with the new variables
function updateCircle(c) {
    let { dx, dy, x, y, radius, color } = c

    if (y + radius + dy > canvas.height) {
        dy = -dy * 0.9
    } else {
        dy += 0.9
    }

    if (x + radius + dx > canvas.width || x - radius + dx < 0) {
        dx = -dx
    }

    x += dx
    y += dy
    return {x, y, dx, dy, radius, color}
}

// starts and continuees the animation per frame
function animate() {
    requestAnimationFrame(animate)
    CTX.clearRect(0, 0, canvas.width, canvas.height)
    circles =  circles.map(c => drawCircle(updateCircle(c)))
    // if (MOUSE.clicked) {
    //     MOUSE.clicked = false
    // }
}



canvas.addEventListener("mousemove", function(event) {
    MOUSE.x = event.x
    MOUSE.y = event.y
})

window.addEventListener("resize", sizeCanvas)

canvas.addEventListener("click", function(event) {
    init()
})
let circles = []
function init() {

    sizeCanvas()
    circles = []
    for (let i = 0; i < 200; i ++) {
        let c = circle() 
        drawCircle(c)
        circles.push(c)

    }
}

init()
// document.body.style.background = `url(${canvas.toDataURL()})`
animate()