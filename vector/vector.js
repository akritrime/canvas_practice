import { resizeCanvas, Vector, Mover } from "../utils"

const canvas = document.querySelector('canvas');
const CTX = canvas.getContext('2d')


let ms = fill_ms();
const mover_shape = (x, y) => {
    CTX.beginPath()
    CTX.shadowBlur = 10
    CTX.shadowColor = "black"
    CTX.arc(x, y, 10, 0, Math.PI * 2, false)
    CTX.fillStyle = "gray"
    CTX.fill()
}

function fill_ms() {
    return Array(1000).fill(0).map(v => new Mover(
        1,
        new Vector(canvas.width / 2, canvas.height / 2),
        new Vector(0, 0),
        new Vector(Math.random() * 0.01 - 0.005, Math.random() * 0.01 - 0.005),
    ))
}

function init() {
    resizeCanvas(canvas)
    ms = fill_ms()
    ms.map(m => m.display(CTX, mover_shape))

    // CTX.fillRect(canvas.width / 2 - 50, canvas.height / 2 - 50, 100, 100)
    // CTX.fill()
}

function animate() {
    window.requestAnimationFrame(animate)
    // CTX.clearRect(0, 0, canvas.width, canvas.height)
    ms.forEach(m => {
        m.update()
        // m.checkEdges()
        m.display(CTX, mover_shape)
    })
    // ms.map(m => m.display())
}

window.onclick = init
window.onresize = init

init()
animate()