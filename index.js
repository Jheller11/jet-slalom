var jet
var wall

function initiateGame() {
  gameCanvas.start()
  jet = new Component(10, 20, 'white', 300, 560)
  wall = new Component(10, 10, 'red', 300, 20)
  wall.speedY = 1
  document.addEventListener('keydown', e => {
    if (e.keyCode == '37') {
      jet.moveLeft()
      console.log(jet.speedX)
    } else if (e.keyCode == '39') {
      jet.moveRight()
      console.log(jet.speedX)
    }
  })
}

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
  moveLeft() {
    if (this.speedX > -4) {
      this.speedX -= 1
    }
  }
  moveRight() {
    if (this.speedX < 4) {
      this.speedX += 1
    }
  }
}

const updateGameArea = () => {
  gameCanvas.clear()
  wall.newPos()
  wall.update()
  jet.newPos()
  jet.update()
}

var gameCanvas = {
  canvas: document.createElement('canvas'),
  start: function() {
    this.canvas.width = 600
    this.canvas.height = 600
    this.context = this.canvas.getContext('2d')
    document.body.insertBefore(this.canvas, document.body.childNodes[0])
    this.interval = setInterval(updateGameArea, 20)
  },
  clear: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  },
  stop: function() {
    clearInterval(this.interval)
  }
}

initiateGame()
updateGameArea()

// add event listeners for left and right accelerate with left/right arrows
