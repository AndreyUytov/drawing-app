import { Canvas } from './canvas'

export default class Snapshot {
  private data: HTMLCanvasElement
  private canvas: Canvas
  constructor(canvas: Canvas, data: HTMLCanvasElement) {
    this.data = data
    this.canvas = canvas
  }

  restore() {
    this.canvas.restore(this.data)
  }
}
