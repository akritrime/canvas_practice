import { resizeCanvas, drawCircle, perlinOctave, map } from "../utils"
// import {  perlinOctave } from '../utils'
// import { valueNoise2D, octave } from "./value";


const canvas = document.querySelector('canvas');
const CTX = canvas.getContext('2d')

const MOUSE = {
    x: 0,
    y: 0
}

// const COLORS = [ 
//     "#4c5b5c", 
//     "#ff715b",
//     "#f9cb40",
//     "#bced09",
//     "#2f52e0"
// ]


let x = 0
let y = 0
// let i = 0
// let c = new CartesianSystem(0, 0, CTX)
let bg = document.createElement('canvas')
// const frequency = 1
// const amplitude = 1



function init() {
    // noise.seed(Math.random())
    resizeCanvas(canvas)
    // c = new CartesianSystem(100, canvas.height / 2, CTX)
    // CTX.moveTo(x, y)
    x = 0
    // y = perlinOctave(i)
    y = 1000
    // i = 0
    // CTX.strokeStyle = "gray"
    // c.drawGrid([100, canvas.height - 100], canvas.width, 50)
    // CTX.strokeStyle = "black"
    // c.drawGrid([100, canvas.height - 100], canvas.width, 100)
    // c.drawAxes(500, canvas.width, 10, 0)
    // let xoff = 0
    const bg_ctx = bg.getContext('2d')
    resizeCanvas(bg)
    smoke(bg, bg_ctx)
    // bg = CTX.createImageData(canvas.width, canvas.height)
    // let xoff = 0
    // for (let px = 0; px < canvas.width; px++) {
    //     let yoff = 0
    //     for (let py = 0; py < canvas.height; py++) {
    //         const i = py * (bg.width * 4) + px * 4
    //         const c = map(perlinOctave([px * 0.2, py * 0.2], 2, 0.2), [-1, 1], [0, 255])
    //         // console.log(perlinc(px, py), px, py)
    //         bg.data[i] = c
    //         bg.data[i + 1] = c
    //         bg.data[i + 2] = c
    //         bg.data[i + 3] = 255
    //         yoff += 0.56
    //     }
    //     xoff += 0.96

    // }
    // console.log(bg)
    // for(let i = 0; i < bg.data.length; i+=4) {
        
    // }
}

function smoke(canvas, CTX) {
    for(let px = 0; px < canvas.width; px += 45) {
        for(let py = 0; py < canvas.height; py += 45) {
            const n = perlinOctave([px * 0.01, py * 0.01], 2, 0.2)
            // console.log(n)
            const c = map(n, [-1, 1], [0, 255])
            CTX.shadowBlur = 45
            CTX.shadowColor = 'black'
            CTX.fillStyle = `rgba(${c}, ${c}, ${c}, 1)`
            CTX.fillRect(px, py, 45, 45)
        }
    }
}

function animate() {
    requestAnimationFrame(animate)
    // let x_ = (i++ / 999) * 100
    // let y_ = perlinNoise(x_)
    CTX.clearRect(0, 0, canvas.width, canvas.height)
    
    // CTX.putImageData(bg, 0, 0)
    // smoke()
    CTX.drawImage(bg, 0, 0)
    CTX.shadowBlur = 100
    CTX.shadowColor = 'white'
    drawCircle({
        x: map(perlinOctave(x), [-1, 1], [200, canvas.width - 200]),
        y: map(perlinOctave(y), [-1, 1], [200, canvas.height - 200]),
        radius: 20,
        color: "white"
    }, CTX)
    // console.log(y_)
    // CTX.lineWidth = 5
    // drawLine(...c.toCoordinates(x, y, 50), ...c.toCoordinates(x_, y_, 50), CTX)
    x += 0.002
    y += 0.005
    // x = x_
    // y = y_
    // i++

}


canvas.addEventListener("mousemove", function(event) {
    MOUSE.x = event.x
    MOUSE.y = event.y
})

window.addEventListener("resize", init)

canvas.addEventListener("click", init)

init()
// document.body.style.background = `url(${canvas.toDataURL()})`
animate()