import { circle, drawCircle, resizeCanvas } from "../utils";

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


let stoppedCircles = 0
// let stopped = false
// updates the values of the variables and returns a new object with the new variables
function updateCircle(c) {
    let { dx, dy, x, y, radius, color } = c

    if (y + radius + dy > canvas.height) {
        // if (Math.abs(dy) > 0.001) {
            dy = dy = -dy * 0.9
        // } else if (dy !== 0) {
        //     stoppedCircles += 1
        //     dy = 0
        // }
    } else {
        dy += 0.9
    }

    if (x + radius + dx > canvas.width || x - radius + dx < 0) {
        dx = -dx
    }

    // if (stopped) {
    //     dy = - Math.random() * 4
    // }
    
    
    // console.log(dy)

    x += dx
    y += dy
    return {x, y, dx, dy, radius, color}
}

// starts and continuees the animation per frame
function animate() {
    requestAnimationFrame(animate)
    CTX.clearRect(0, 0, canvas.width, canvas.height)
    circles =  circles.map(c => drawCircle(updateCircle(c), CTX))
    // if (MOUSE.clicked) {
    //     MOUSE.clicked = false
    // }
    // if (stoppedCircles === circles.length) {
    //     stopped = true
    //     setTimeout(() => stopped = false, 5000)
    // }
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
    circles = []
    for (let i = 0; i < 200; i ++) {
        let c = circle(COLORS, canvas, [5, 20], (Math.random() * 4 - 2), 0) 
        drawCircle(c, CTX)
        circles.push(c)
    }
}

init()
// document.body.style.background = `url(${canvas.toDataURL()})`
animate()