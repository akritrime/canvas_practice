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

export function drawGrid(width, height, canvas, CTX) {
    const l_v = canvas.width / width
    for (let i = 0; i < l_v; i++) {
        CTX.beginPath()
        CTX.moveTo(i*width, 0)
        CTX.lineTo(i*width, canvas.height)
        CTX.strokeStyle = "white"
        CTX.stroke()
    }

    const l_h = game.height / height
    for (let i = 0; i < l_h; i++) {
        CTX.beginPath()
        CTX.moveTo(0, i*height)
        CTX.lineTo(game.width, i*height)
        CTX.stroke()
    }
}

export function drawPosXAxis(A, originB, unit, CTX, m = 10) {
    drawLine(A[0], originB, A[1], originB, CTX)
    let a = A[0] + unit
    while (a < A[1]) {
        drawLine(a, originB, a, originB + m, CTX)
        a += unit
    }
}

export function drawNegXAxis(A, originB, unit, CTX, m = 10) {
    drawLine(A[1], originB, A[0], originB, CTX)
    let a = A[0] - unit
    while (a > A[1]) {
        drawLine(a, originB, a, originB + m, CTX)
        a -= unit
    }
}

export function drawNegYAxis(A, originB, unit, CTX, m = 10) {
    drawLine(originB, A[0], originB, A[1], CTX)
    let a = A[0] + unit
    while (a < A[1]) {
        drawLine(originB, a, originB + m, a, CTX)
        a += unit
    }
}

export function drawPosYAxis(A, originB, unit, CTX, m = 10) {
    drawLine(originB, A[0], originB, A[1], CTX)
    let a = A[0] - unit
    while (a > A[1]) {
        drawLine(originB, a, originB + m, a, CTX)
        a -= unit
    }
}

export function drawAxes(X, Y, unit, CTX) {
    const originX = (X[0] + X[1]) / 2
    const originY = (Y[0] + Y[1]) / 2
    drawPosXAxis([originX, X[1]], originY, unit, CTX)
    drawNegXAxis([originX, X[0]], originY, unit, CTX)
    drawNegYAxis([originY, Y[1]], originX, unit, CTX)
    drawPosYAxis([originY, 0], originX, unit, CTX)
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