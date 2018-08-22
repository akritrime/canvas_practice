import { resizeCanvas, Vector, Mover } from "../utils"

const canvas = document.querySelector('canvas');
const CTX = canvas.getContext('2d')

let m = new Mover(
    3,
    new Vector(50, 50),
)

function mover_shape(m, color) {
    return (x, y) => {
        const radius = m.mass * 5
        // const color  = color
        CTX.beginPath()
        CTX.arc(x, y, radius, 0, Math.PI * 2, false)
        CTX.fillStyle = color
        CTX.fill()
    }
}

function init() {
    resizeCanvas(canvas)
    m = new Mover(
        3,
        new Vector(50, 50),
    )
    m.display(CTX, mover_shape(m, "blue"))
    const n = new Mover(
        1,
        new Vector(50, 50),
    )
    n.display(CTX, mover_shape(n, "white"))
}

function animate() {
    window.requestAnimationFrame(animate)
    CTX.clearRect(0, 0, canvas.width, canvas.height)

    const gravity = new Vector(0, 0.2)
    const wind = new Vector(0.04, 0)

    m.applyForce(gravity)
    m.applyForce(wind)

    m.update(false)
    m.checkEdges(canvas, 15, 15)
    m.display(CTX, mover_shape(m, "black"))
    // m.checkEdges(canvas, m.mass * 5, m.mass * 5, (m, ))

}

init()

animate()