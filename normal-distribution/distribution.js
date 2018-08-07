import './distribution.scss'
import { resizeCanvas } from '../utils'

const div = document.querySelector('div')
const canvas = document.querySelector('canvas')
const CTX = canvas.getContext('2d')
const SIZE = 60

let randomCounts = Array(SIZE).fill(0)
let w = canvas.width/randomCounts.length


function getMeanAndSD(arr = randomCounts.map((_, i) => i)) {
    const sum = arr.reduce((s, v) => s + v)
    const mean = sum / arr.length
    const sd = (arr.map(v => (v - mean) ** 2).reduce((s, v) => s + v) / arr.length) ** 0.5
    return [mean, sd]
}

const [mean, sd] = getMeanAndSD()

let nrand

function getGaussian() {
    if (nrand) {
        const temp = nrand * sd + mean
        nrand = false
        return temp
    } else {
        let u,v,s

        while(!s || s >= 1) {
            u = Math.random() * 2 - 1
            v = Math.random() * 2 - 1
            s = u * u + v * v
        }
        const m = (-2.0 * Math.log(s) / s) ** 0.5
        nrand = v * m
        return u * m * sd + mean
    }
}

function draw() {
    requestAnimationFrame(draw)
    const index = ~~getGaussian(mean,sd)
    randomCounts[index] += 1

    randomCounts.forEach((x, i) => {
        CTX.fillRect(w * i, canvas.height - x, w - 2, x)
    })
}

function init() {
    randomCounts = Array(SIZE).fill(0)
    resizeCanvas(canvas, div)
    w = canvas.width/randomCounts.length
    // console.log(getGaussian(...getMeanAndSD()))
}

// function animate() {
//     requestAnimationFrame(animate)
//     // CTX.clearRect(0, 0, canvas.width, canvas.height)
//     draw()
// }

div.addEventListener('click', init)
window.addEventListener('resize', init)

init()
draw()