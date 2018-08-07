import {resizeCanvas, circle as _circle, drawCircle} from '../utils'

const canvas = document.querySelector('canvas');
const CTX = canvas.getContext('2d')


const MOUSE = {
    x: 0,
    y: 0,
    // clicked: false
}
const COLORS = [
    "#092140",
    "#024959",
    "#F2C777",
    "#F24738",
    "#BF2A2A"
]


// returns an object with values to draw a circle
function circle() {
    const dx = (Math.random() - 0.5)
    const dy = (Math.random() - 0.5)
    const c = _circle(COLORS, canvas, [2, 6], dx, dy)

    return Object.assign({}, {minRadius: c.radius}, c)
}

// updates the values of the variables and returns a new object with the new variables
function updateCircle(c) {
    let { dx, dy, x, y, radius, minRadius, color } = c
    // dx = dx > 0 : Math.random() + 1 
    // dy = Math.random() + 1 http://localhost:1234/


    if ((x + radius) >= canvas.width || (x - radius) <= 0) {
        dx = -dx
        // const positive = dx > 0
        // if (dx > 1 || dy > 1) {
        //     dx = Math.random() - 0.5
        //     if (positive) {
        //         dx = dx > 0 ? dx : -dx
        //     } else {
        //         dx = dx < 0 ? dx : -dx
        //     }
        //     dy = Math.random() - 0.5
        // }
        // if (dy*dy === 9 || dx*dy === -9) {
        //     temp = Math.random() - 0.5
        //     dy = dx > 0 ? temp > 0  && temp || - temp : temp < 0 && temp || - temp 
        //     dx = Math.random() - 0.5
        // }
    }
    if ((y + radius) >= canvas.height || (y - radius) <= 0)  {
        dy = -dy
        // const positive = dy > 0
        // if (dx > 1 || dy > 1) {
        //     dx = Math.random() - 0.5
        //     dy = Math.random() - 0.5
        //     if (positive) {
        //         dy = dy > 0 ? dy : -dy
        //     } else {
        //         dy = dy < 0 ? dy : -dy
        //     }
        // }
        // if (dy*dy === 9 || dx*dy === -9) {
        //     temp = Math.random() - 0.5
        //     dy = dy > 0 ? temp > 0  && temp || - temp : temp < 0 && temp || - temp
        //     dx = Math.random() - 0.5
        // }
    }

    x += dx
    y += dy

    if (MOUSE.x - x < 50 && MOUSE.x - x > -50
            && MOUSE.y - y < 50 && MOUSE.y - y > -50 
            && radius < 100) {
        radius += 1
        // if (MOUSE.clicked) {
        //     dx = dx > 0 ? 3 : -3
        //     dy = dy > 0 ? 3 : -3
        // }
    } else if (radius > minRadius) {
        radius -= 1
        if (radius < minRadius) {
            radius = minRadius
        }
    }

    return {x, y, dx, dy, radius, minRadius, color}
}

// starts and continuees the animation per frame
function animate() {
    requestAnimationFrame(animate)
    CTX.clearRect(0, 0, canvas.width, canvas.height)
    circles =  circles.map(c => drawCircle(updateCircle(c), CTX))
    // if (MOUSE.clicked) {
    //     MOUSE.clicked = false
    // }
}



canvas.addEventListener("mousemove", function(event) {
    MOUSE.x = event.x
    MOUSE.y = event.y
})

window.addEventListener("resize", init)

// canvas.addEventListener("click", function(event) {
//     MOUSE.clicked = true
// })
function init() {
    resizeCanvas(canvas)
}

init()

let circles = []

for (let i = 0; i < 1000; i ++) {

    // let x = 
    // // let y = 
    // let color = `rgba(${~~(Math.random() * 255)}, ${~~(Math.random() * 255)}, ${~~(Math.random() * 255)}, 0.5)`
    // let _dx = Math.random() > 0.5 ? dx : -dx
    // let _dy = Math.random() < 0.5 ? dy : -dy
    
    let c = circle() 
    drawCircle(c, CTX)
    circles.push(c)

}




// document.body.style.background = `url(${canvas.toDataURL()})

animate()