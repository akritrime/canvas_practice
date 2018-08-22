import { resizeCanvas, Vector, Mover, perlinOctave, map } from "../utils"
// import { Mover } from "./mover"


const canvas = document.querySelector('canvas');
const CTX = canvas.getContext('2d')

canvas.style.background = "black"


const colors_red = [
    "rgba(127, 0, 0, 0.7)",
    "rgba(255, 76, 76, 0.7)",
    "rgba(255, 0, 0, 0.7)",
    "rgba(127, 38, 38, 0.7)",
    "rgba(204, 0, 0, 0.7)"
]

const colors_green = [
    "rgba(0, 127, 0, 0.7)",
    "rgba(76, 255, 76, 0.7)",
    "rgba(0, 255, 0, 0.7)",
    "rgba(38, 127, 38, 0.7)",
    "rgba(0, 204, 0, 0.7)"
]


const colors_yellow = [
    "rgba(127, 103, 13, 0.7)",
    "rgba(255, 222, 103, 0.7)",
    "rgba(255, 206, 27, 0.7)",
    "rgba(127, 111, 52, 0.7)",
    "rgba(204, 165, 21, 0.7)"
]
const colors_blue = [
    "rgba(0, 0, 127, 0.7)",
    "rgba(76, 76, 255, 0.7)",
    "rgba(0, 0, 255, 0.7)",
    "rgba(38, 38, 127, 0.7)",
    "rgba(0, 0, 204, 0.7)"
]


function mover_shape(radius, color){
    return (x, y) => {
        CTX.beginPath()
        CTX.arc(x, y, radius, 0, Math.PI * 2, false)
        CTX.fillStyle = color
        CTX.fill()
        // CTX.strokeStyle = color
        // drawLine(mouse.x, mouse.y, x, y, CTX)
        // CTX.fillRect(x, y, radius, radius)
    }
}

function fill_ms(num, colors, min_radius, max_radius) {
    return Array(num).fill(0).map(v => {
        let m = new Mover(
            1,
            new Vector(Math.random() * canvas.width, Math.random() * canvas.height),
        )

        let radius = Math.random() * max_radius + min_radius
        let color = colors[~~(Math.random() * colors.length)]
        let shape = mover_shape(radius, color)
        return [m, shape]
    })
}

const update = (minVel, maxVel, acc) => ([m, shape]) => {
    const dir = new Vector(mouse.x, mouse.y)


    dir.sub(m.loc)
    
    dir.normalize()
    // console.log(dir.mag)
    dir.scalar_mul(acc)

    m.applyForce(dir)

    m.update(minVel, maxVel)
    m.acc.scalar_mul(0)
    m.checkEdges(canvas)
    m.display(CTX, shape)
}

let mouse = new Vector(0, 0)
let ms_red = fill_ms(250, Math.random() > 0.5 ? colors_red : colors_green, 2, 10);
let ms_yellow = fill_ms(500, Math.random() < 0.5 ? colors_yellow : colors_blue, 0, 5)


function init() {
    resizeCanvas(canvas)
    ms_red = fill_ms(250, Math.random() > 0.5 ? colors_red : colors_green, 2, 10)
    ms_yellow = fill_ms(1000, Math.random() < 0.5 ? colors_yellow : colors_blue, 0, 5)

    ms_red.forEach(m => m[0].display(CTX, m[1]))
    ms_yellow.forEach(m => m[0].display(CTX, m[1]))
}

function animate() {
    window.requestAnimationFrame(animate)
    CTX.clearRect(0, 0, canvas.width, canvas.height)
    ms_yellow.forEach(update(-5, 5, 0.2))
    ms_red.forEach(update(-10, 10, 0.5))
}

window.addEventListener("mousemove", (e) => {
    // const x = map(perlinOctave(e.x), [-1, 1], [200, canvas.width - 200])
    // const y = map(perlinOctave(e.y), [-1, 1], [200, canvas.height - 200])
    mouse = new Vector(e.x, e.y)
})

init()
animate()

window.addEventListener("click", init)
window.addEventListener("resize", init)