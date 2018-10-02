let playerPaddle, pcPaddle, ball

class Component {
  constructor(width, height, color, x, y) {
    this.width = width
    this.height = height
    this.color = color
    this.x = x
    this.y = y
    this.speedX = 0
    this.speedY = 0
  }

  update() {
    let ctx = gameCanvas.context
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }

  newPos() {
    this.x += this.speedX
    this.y += this.speedY
  }
}

var gameCanvas = {
  canvas: document.createElement('canvas'),
  start: function() {
    this.canvas.width = 700
    this.canvas.height = 500
    this.context = this.canvas.getContext('2d')
    document.querySelector('.game').appendChild(this.canvas)
    this.interval = setInterval(updateGameArea, 20)
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
  playerPaddle = new Component(20, 100, 'blue', 50, 200)
  pcPaddle = new Component(20, 100, 'red', 630, 200)
}

initiateGame()
