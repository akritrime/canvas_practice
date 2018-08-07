import './distribution.scss'
import { resizeCanvas } from "../utils";

const div = document.querySelector('div')
const canvas = document.querySelector('canvas')
const CTX = canvas.getContext('2d')

let randomCounts = Array(20).fill(0)
let w = canvas.width/randomCounts.length

function draw() {
    requestAnimationFrame(draw)
    const index = ~~(Math.random() * randomCounts.length)
    randomCounts[index] += 1

    randomCounts.forEach((x, i) => {
        CTX.fillRect(w * i, canvas.height - x, w - 2, x)
    })
}

function init() {
    randomCounts = Array(20).fill(0)
    resizeCanvas(canvas, div)
    w = canvas.width/randomCounts.length
}

// function animate() {
//     requestAnimationFrame(animate)
//     // CTX.clearRect(0, 0, canvas.width, canvas.height)
//     draw()
// }

window.addEventListener("resize", init)

div.addEventListener('click', init)

init()
draw()