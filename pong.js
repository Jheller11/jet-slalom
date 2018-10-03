let playerPaddle,
  pcPaddle,
  ball,
  walls = []

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
    if (this.y + this.speedY > 400) {
      this.y = 400
    } else if (this.y + this.speedY < 0) {
      this.y = 0
    } else {
      this.x += this.speedX
      this.y += this.speedY
    }
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
  },
  clear: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  },
  stop: function() {
    clearInterval(this.interval)
  }
}

const initiateGame = () => {
  gameCanvas.start()
  playerPaddle = new Component(20, 100, 'blue', 50, 200, 'paddle')
  pcPaddle = new Component(20, 100, 'red', 830, 200, 'paddle')
  walls.push(new Component(900, 10, 'gray', 0, 0, 'wall'))
  walls.push(new Component(900, 10, 'gray', 0, 490, 'wall'))
  ball = new Component(10, 10, 'green', 445, 245, 'ball')
  ball.speedX = 3
  ball.speedY = 5
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
  ball.newPos()
  ball.update()
  walls.forEach(wall => {
    wall.update()
  })
}

initiateGame()
