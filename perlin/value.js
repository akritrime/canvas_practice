import { fade } from "./perlin";

let seed = 2011

function random() {
    // const s = (seed * 9301 + 49297) % 233280
    // return s / 233280
    const x = Math.tan(seed++) * 10000
    return x - ~~x
}

const p = Array(256).fill(0).map(_ => random())
// const p = [151,160,137,91,90,15,
//     131,13,201,95,96]

export function valueNoise1D(x) {
    const i = Math.floor(x)
    const f = x - i

    const min = i & 255
    const max = (min + 1) & 255
    
    return lerp(p[min], p[max], fade(f))
}

export function valueNoise2D(x, y) {
    const xi = Math.floor(x)
    const yi = Math.floor(y)

    const xf = x - xi
    const yf = y - yi

    const px0 = xi & 16
    const px1 = (xi + 1) & 16
    const py0 = yi & 16
    const py1 = (yi + 1) & 16

    const c00 = p[py0 * 16 + px0]
    const c10 = p[py0 * 16 + px1]
    const c01 = p[py1 * 16 + px0]
    const c11 = p[py1 * 16 + px1]

    const tx = fade(xf)
    return lerp(lerp(c00, c10, tx), lerp(c01, c11, tx), fade(yf))
}

function lerp(x, y, a) {
    return x * (1 - a) + y * a
}

function cos(v) {
    return 1 - Math.cos(v * Math.PI) * 0.5
}

function smoothstep(v) {
    return v * v * (3 - (2 * v))
}

export function octave(x, p = 0.5) {
    // let max = 0
    let noiseSum = 0
    let amp = 1
    let f = 1
    for (let i = 0; i < 256; i++) {
        noiseSum += valueNoise1D(x * f) * amp
        amp *= p
        f *= 2
        // max += amp
    }

    return noiseSum
}