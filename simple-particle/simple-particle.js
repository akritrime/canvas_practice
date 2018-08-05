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

// resizes the canvas to fill the window
function sizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// returns an object with values to draw a circle
function circle() {
    const radius = Math.random() * 5
    const color = COLORS[Math.floor(Math.random() * 5)]
    const x = Math.random() * (canvas.width - 2 * radius) + radius
    const y = Math.random() * (canvas.height - 2 * radius) + radius
    const dx = (Math.random() - 0.5)
    const dy = (Math.random() - 0.5)

    return {
        x,
        y,
        dx,
        dy,
        minRadius: radius,
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

// canvas.addEventListener("click", function(event) {
//     MOUSE.clicked = true
// })

sizeCanvas()



let circles = []

for (let i = 0; i < 1000; i ++) {

    // let x = 
    // // let y = 
    // let color = `rgba(${~~(Math.random() * 255)}, ${~~(Math.random() * 255)}, ${~~(Math.random() * 255)}, 0.5)`
    // let _dx = Math.random() > 0.5 ? dx : -dx
    // let _dy = Math.random() < 0.5 ? dy : -dy
    
    let c = circle() 
    drawCircle(c)
    circles.push(c)

}




// document.body.style.background = `url(${canvas.toDataURL()})`
animate()