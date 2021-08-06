import { Canvas } from './canvas'

export default class Snapshot {
  private data: HTMLImageElement
  private canvas: Canvas
  constructor(canvas: Canvas, data: HTMLImageElement) {
    this.data = data
    this.canvas = canvas
  }

  restore() {
    this.canvas.restore(this.data)
  }
}
