let playerPaddle,
  pcPaddle,
  ball,
  walls = []

// class component defines all elements (walls, paddles, ball)

class Component {
  constructor(width, height, color, x, y, type) {
    this.width = width
    this.height = height
    this.color = color
    this.x = x
    this.y = y
    this.type = type
    this.speedX = 0
    this.speedY = 0
  }

  update() {
    let ctx = gameCanvas.context
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }

  newPos() {
    switch (this.type) {
      case 'paddle':
        if (this.y + this.speedY > 390) {
          this.y = 390
        } else if (this.y + this.speedY < 10) {
          this.y = 10
        } else {
          this.x += this.speedX
          this.y += this.speedY
        }
        break
      case 'ball':
        if (this.y + this.speedY > 485) {
          this.y = 485
          this.speedY = -this.speedY
        } else if (this.y + this.speedY < 10) {
          this.y = 10
          this.speedY = -this.speedY
        } else {
          this.x += this.speedX
          this.y += this.speedY
        }
        break
      default:
        break
    }
  }

  checkCollision(obstacle) {
    let leftSide = this.x
    let rightSide = this.x + this.width
    let top = this.y
    let bottom = this.y + this.height
    let obstacleLeft = obstacle.x
    let obstacleRight = obstacle.x + obstacle.width
    let obstacleTop = obstacle.y
    let obstacleBottom = obstacle.y + obstacle.height
    let crash = true
    if (
      bottom < obstacleTop ||
      top > obstacleBottom ||
      rightSide < obstacleLeft ||
      leftSide > obstacleRight
    ) {
      crash = false
    }
    return crash
  }

  moveUp() {
    if (this.speedY < 5) {
      this.speedY += 5
    }
  }

  moveDown() {
    if (this.speedY > -5) {
      this.speedY -= 5
    }
  }
}

// define game canvas shape and context
var gameCanvas = {
  canvas: document.createElement('canvas'),
  start: function() {
    this.canvas.width = 900
    this.canvas.height = 500
    this.context = this.canvas.getContext('2d')
    document.querySelector('.game').appendChild(this.canvas)
    this.interval = setInterval(updateGameArea, 25)
    this.frameNo = 0
    this.score = [0, 0]
    this.round = 0
  },
  clear: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  },
  stop: function() {
    clearInterval(this.interval)
  }
}

// simple AI
const simpleAI = (ball, pcPaddle) => {
  let ballPosition = ball.y + ball.height / 2
  let paddlePosition = pcPaddle.y + pcPaddle.height / 2
  if (ballPosition < paddlePosition) {
    pcPaddle.moveDown()
  } else if (ballPosition > paddlePosition) {
    pcPaddle.moveUp()
  }
}

// start round with components
const initiateGame = () => {
  gameCanvas.start()
  playerPaddle = new Component(20, 100, 'blue', 50, 200, 'paddle')
  pcPaddle = new Component(20, 100, 'red', 830, 200, 'paddle')
  walls.push(new Component(900, 10, 'gray', 0, 0, 'wall'))
  walls.push(new Component(900, 10, 'gray', 0, 490, 'wall'))
  ball = new Component(10, 10, 'green', 445, 245, 'ball')
  ball.speedX = -3
  ball.speedY = 6
  document.addEventListener('keydown', e => {
    if (e.keyCode == '40') {
      playerPaddle.moveUp()
    } else if (e.keyCode == '38') {
      playerPaddle.moveDown()
    }
  })
}

const updateGameArea = () => {
  gameCanvas.clear()
  playerPaddle.newPos()
  pcPaddle.newPos()
  playerPaddle.update()
  pcPaddle.update()
  if (pcPaddle.checkCollision(ball)) {
    ball.speedX = -3
  }
  if (playerPaddle.checkCollision(ball)) {
    ball.speedX = 3
  }
  ball.newPos()
  ball.update()
  walls.forEach(wall => {
    wall.update()
  })
  simpleAI(ball, pcPaddle)
  simpleAI(ball, playerPaddle)
}

initiateGame()
