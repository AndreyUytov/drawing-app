import {
  Shape,
  CanvasCircle,
  Brush
} from './figure'

export class Canvas {
  private canvas: HTMLCanvasElement
  private subCanvas: HTMLCanvasElement
  private context: CanvasRenderingContext2D
  private subContext: CanvasRenderingContext2D

  private main: HTMLElement

  private shape: Shape = new Brush()
  private width: number
  private height: number
  private strokeColor: string = 'black'
  private lineWidth: number = 4

  constructor() {
    this.canvas = document.createElement('canvas')
    this.subCanvas = document.createElement('canvas')
    this.context = this.canvas.getContext("2d")
    this.subContext = this.subCanvas.getContext("2d")

    this.main = document.querySelector('.page-main')


    this.width = this.canvas.width = this.subCanvas.width = innerWidth
    this.height = this.canvas.height =  this.subCanvas.height = innerHeight
    this.context.lineCap = this.subContext.lineCap = 'round'
    this.context.lineJoin = this.subContext.lineJoin = 'round'
    this.context.lineWidth = this.subContext.lineWidth = this.lineWidth
    
    this.context.strokeStyle = this.strokeColor
    
    this.subContext.strokeStyle = `rgba(0,0,0,0.4)`
    this.subContext.setLineDash([4, 8])

    this.canvas.addEventListener('pointerdown', this.onCanvasPointerDown)

    this.renderCanvas()

  }

  get widthCanvas () {
    return this.width
  }

  get heightCanvas () {
    return this.height
  }

  get $canvas () {
    return this.canvas
  }

  get $subCanvas () {
    return this.subCanvas
  }

  set shapeInstrument (shape: Shape) {
    this.shape = shape
  }

  private renderCanvas() {
    this.main.append(this.subCanvas, this.canvas)
  }

  private onCanvasPointerDown = (evt: PointerEvent) => {
    this.shape.draw(this, evt)
  }
}

const canv = new Canvas()
