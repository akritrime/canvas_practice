export function resizeCanvas(canvas, el) {
    canvas.width = el ? el.clientWidth : window.innerWidth;
    canvas.height = el ? el.clientHeight : window.innerHeight;
}

export function drawLine(x, y, x1, y1, CTX) {
    CTX.beginPath()
    CTX.moveTo(x, y)
    CTX.lineTo(x1, y1)
    CTX.stroke()
}

export class CartesianSystem {
    constructor(originX, originY, CTX) {
        this.origin = {
            x: originX, 
            y: originY
        }
        this.CTX = CTX
    }

    drawGrid(length, width, unit_l = 10, unit_w) {
        if (!unit_w) {
            unit_w = unit_l
        }

        if (typeof length === 'number') {
            length = [0, length]
        }
        if (typeof width === 'number') {
            width = [0, width]
        }
        
        const {x, y} = this.origin

        for(let i = x; i > width[0]; i -= unit_w) {
            drawLine(i, length[0], i, length[1], this.CTX)
        }

        for(let i = x; i < width[1]; i += unit_w) {
            drawLine(i, length[0], i, length[1], this.CTX)
        }

        for(let i = y; i > length[0]; i -= unit_l) {
            drawLine(width[0], i, width[1], i, this.CTX)
        }

        for(let i = y; i < length[1]; i += unit_l) {
            drawLine(width[0], i, width[1], i, this.CTX)
        }

    }

    drawPosXAxis(width, unit, m = 5) {
        const {x, y} = this.origin

        const start = x
        const end = x + width
        drawLine(start, y, end, y, this.CTX)
        for (let i = start + unit; i < end; i += unit) {
            drawLine(i, y, i, y + m, this.CTX)
        }
    }

    drawNegXAxis(width, unit, m = 5) {
        const {x, y} = this.origin

        const start = x - width
        const end = x
        drawLine(start, y, end, y, this.CTX)
        for (let i = end - unit; i > start; i -= unit) {
            drawLine(i, y, i, y + m, this.CTX)
        }
    }

    drawPosYAxis(length, unit, m = 5) {
        const {x, y} = this.origin

        const start = y
        const end = y + length
        drawLine(x, start, x, end, this.CTX)
        for (let i = start + unit; i < end; i += unit) {
            drawLine(x, i, x + m, i, this.CTX)
        }
    }

    drawNegYAxis(length, unit, m = 5) {
        const {x, y} = this.origin

        const start = y - length
        const end = y
        drawLine(x, start, x, end, this.CTX)
        for (let i = end - unit; i > start; i -= unit) {
            drawLine(x, i, x + m, i, this.CTX)
        }
    }

    drawAxes(length, width, unit, m = 5) {
        this.drawPosXAxis(width, unit, m)
        this.drawNegXAxis(width, unit, m)
        this.drawPosYAxis(length, unit, m)
        this.drawNegYAxis(length, unit, m)
    }

    toPoints(x, y, unit_x = 10, unit_y) {
        if (!unit_y) {
            unit_y = unit_x
        }

        return [
            (x - this.origin.x) / unit_x,
            (this.origin.y - y) / unit_y
        ]
    }

    toCoordinates(x, y, unit_x = 10, unit_y) {
        if (!unit_y) {
            unit_y = unit_x
        }

        return [ this.origin.x + unit_x * x
               , this.origin.y - unit_y * y
            ]
    }
}

export function circle(COLORS, canvas, radiusRange, dx, dy) {
    const radius = Math.random() * radiusRange[1] + radiusRange[0]
    const color = COLORS[Math.floor(Math.random() * 5)]
    const x = Math.random() * (canvas.width - 2 * radius) + radius
    const y = Math.random() * (canvas.height - 2* radius) + radius

    return {
        x,
        y,
        dx,
        dy,
        radius,
        color
    }
}

// draws the circle depending on the circle object. Returns the object back
export function drawCircle(c, CTX) {
    CTX.beginPath()
    CTX.arc(c.x, c.y, c.radius, 0, Math.PI * 2, false)
    
    CTX.fillStyle = c.color
    CTX.fill()
    return c
}

const p = Array(512)
const permutation = [151,160,137,91,90,15,
   131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,
   190, 6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,
   88,237,149,56,87,174,20,125,136,171,168, 68,175,74,165,71,134,139,48,27,166,
   77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,
   102,143,54, 65,25,63,161, 1,216,80,73,209,76,132,187,208, 89,18,169,200,196,
   135,130,116,188,159,86,164,100,109,198,173,186, 3,64,52,217,226,250,124,123,
   5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,
   223,183,170,213,119,248,152, 2,44,154,163, 70,221,153,101,155,167, 43,172,9,
   129,22,39,253, 19,98,108,110,79,113,224,232,178,185, 112,104,218,246,97,228,
   251,34,242,193,238,210,144,12,191,179,162,241, 81,51,145,235,249,14,239,107,
   49,192,214, 31,181,199,106,157,184, 84,204,176,115,121,50,45,127, 4,150,254,
   138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180]

for (let i = 0; i < 256; i++) {
    p[256+i] = p[i] = permutation[i]
}

export function fade(v) {
  return v ** 3 * (v * (v * 6 - 15) + 10)
}

export function lerp(t, a, b) {
  return a + t * (b -a)
}

export function grad(hash, x, y, z) {
  if (y === undefined) {
    return (hash & 1) === 0 ? x : -x
    // const h = hash & 15
    // let g = 1.0 + (h & 7)
    // if (h & 8) g = -g
    // return g * x
  }

  if (z === undefined) {
    const h = hash & 7
    const [u, v] = h < 4 ? [x, y] : [y, x]
    return ((h & 1) ? -u : u) + ((h&2)? -2.0*v : 2.0*v)
  }

  const h = hash & 15
  const u = h < 8 ? x : y
  const v = h < 4 ? y : ( h === 12 || h === 14 ? x : z)
  return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v)
}

export function map(val, a, b) {
    return (val - a[0]) * ((b[1] -b[0]) / (a[1] - a[0])) + b[0]
}

export function perlinNoise(x, y, z) {
  const X = ~~x & 255
  x -= ~~x
  const u = fade(x)

  if (y === undefined) {
    return lerp(u, grad(p[X], x), grad(p[X+1], x - 1)) * 2
  }

  const Y = ~~y & 255
  y -= ~~y
  const v = fade(y)
  
  const A = p[X  ] + Y
  const B = p[X+1] + Y

  if (z === undefined) {
    return lerp(v, lerp(u, grad(p[A  ], x, y  ), grad(p[B  ], x-1, y  )),
                   lerp(u, grad(p[A  ], x, y-1), grad(p[B  ], x-1, y-1)))
  }

  const Z = ~~z & 255
  z -= ~~z
  const w = fade(z)

  const AA = p[A] + Z, AB = p[A+1]+Z
  const BA = p[B] + Z, BB = p[B+1]+Z
  
  return lerp(w, lerp(v, lerp(u, grad(p[AA  ], x  , y  , z   ),
                                 grad(p[BA  ], x-1, y  , z   )), 
                         lerp(u, grad(p[AB  ], x  , y-1, z   ),  
                                 grad(p[BB  ], x-1, y-1, z   ))), 
                 lerp(v, lerp(u, grad(p[AA+1], x  , y  , z-1 ),  
                                 grad(p[BA+1], x-1, y  , z-1 )),
                         lerp(u, grad(p[AB+1], x  , y-1, z-1 ),
                                 grad(p[BB+1], x-1, y-1, z-1 ))))
}

export function perlinOctave(points, octs = 4, p = 0.5) {
  if (typeof points === 'number') {
      points = [points]
  }
  let max = 0
  let noiseSum = 0
  let amp = 1
  let f = 1
  for (let i = 0; i < octs; i++) {
      noiseSum += perlinNoise(...points.map(v => v * f)) * amp
      max += amp
      amp *= p
      f *= 2


  }

  return noiseSum / max
}

export class Vector {
    constructor(x, y, z) {
        this.x = x
        this.y = y
        this.z = z
    }

    add(v) {
        if (typeof this.x === 'number' && v.x) this.x += v.x
        if (typeof this.y === 'number' && v.y) this.y += v.y
        if (typeof this.z === 'number' && v.z) this.z += v.z
    }

    sub(v) {        
        if (typeof this.x === 'number' && v.x) this.x -= v.x
        if (typeof this.y === 'number' && v.y) this.y -= v.y
        if (typeof this.z === 'number' && v.z) this.z -= v.z
    }

    scalar_mul(v) {
        if (typeof this.x === 'number') this.x *= v
        if (typeof this.y === 'number') this.y *= v
        if (typeof this.z === 'number') this.z *= v
    }

    scalar_div(v) {
        if (typeof this.x === 'number') this.x /= v
        if (typeof this.y === 'number') this.y /= v
        if (typeof this.z === 'number') this.z /= v
    }

    mag() {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }

    normalize() {
        const m = this.mag()
        if (m !== 0) this.scalar_div(m)
    }

    limit(min, max) {
        if (this.x && this.x > max) {
            this.x = max
        } else if (this.x && this.x < min) {
            this.x = min
        }

        if (this.y && this.y > max) {
            this.y = max
        } else if (this.y && this.y < min) {
            this.y = min
        }
        
        if (this.z && this.z > max) {
            this.z = max
        } else if (this.z && this.z < min) {
            this.z = min
        }
    }
}

export class Mover {
    constructor(
        mass = 1,
        loc  = new Vector(0, 0), 
        vel  = new Vector(0, 0), 
        acc  = new Vector(0, 0)
    ) {
        this.loc  = loc
        this.vel  = vel
        this.acc  = acc
        this.mass = mass
    }

    applyForce(force) {
        force.scalar_div(this.mass)
        this.acc.add(force)
    }


    update(minVel = -2, maxVel = 2) {
        this.loc.add(this.vel)
        this.vel.add(this.acc)
        if (typeof minVel === 'number') this.vel.limit(minVel, maxVel)
        // this.acc.scalar_mul(0)
        // this.checkEdges()
    }

    display(CTX, shape) {
        const {x, y} = this.loc
        shape(x, y)
    }

    checkEdges(
        canvas, 
        diff_x = -10, 
        diff_y = -10
    ) {
        let f_x
        let f_y
        if (diff_x < 0) {
            f_x = (x) => {
                this.loc.x = x
            }
        } else {
            f_x = (x) => {
                this.loc.x = canvas.width - x
                this.vel.x *= -1
            }
        }

        if (diff_y < 0) {
            f_y = (y) => {
                this.loc.y = y
            }
        } else {
            f_y = (y) => {
                this.loc.y = canvas.height - y
                this.vel.y *= -1
            }
        }


        if (this.loc.x + diff_x > canvas.width) {
            f_x(diff_x)
        } else if (this.loc.x - diff_x < 0) {
            f_x(canvas.width - diff_x)
        }
        
        if (this.loc.y + diff_y > canvas.height) {
            f_y(diff_y)
        } else if (this.loc.y - diff_y < 0) {
            f_y(canvas.height - diff_y)
        }
    }
    

}