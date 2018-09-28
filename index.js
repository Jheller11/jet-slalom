const initiateGame = () => {
  gameCanvas.start()
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
