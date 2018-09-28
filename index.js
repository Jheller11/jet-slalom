var jet

const initiateGame = () => {
  gameCanvas.start()
  jet = new component(20, 20, 'white', 200, 20)
}

const component = (width, height, color, x, y) => {
  this.width = width
  this.height = height
  this.x = x
  this.y = y
  ctx = gameCanvas.context
  ctx.fillStyle = color
  ctx.fillRect(this.x, this.y, this.width, this.height)
}

const gameCanvas = {
  canvas: document.createElement('canvas'),
  start: () => {
    this.canvas.width = 400
    this.canvas.height = 700
    this.context = this.canvas.getContext('2d')
    document.body.insertBefore(this.canvas, document.body.childNodes[0])
  }
}
