import {
  Shape,
  CanvasCircle,
  CanvasLine,
  Brush
} from './figure'

export class Canvas {
  private canvas: HTMLCanvasElement
  private fon: HTMLCanvasElement
  private subCanvas: HTMLCanvasElement
  private context: CanvasRenderingContext2D
  private subContext: CanvasRenderingContext2D
  private fonContext: CanvasRenderingContext2D

  private main: HTMLElement

  private shape: Shape = new CanvasLine()
  private width: number
  private height: number
  private strokeColor: string = 'black'
  private lineWidth: number = 4

  constructor() {
    this.canvas = document.createElement('canvas')
    this.fon = document.createElement('canvas')
    this.subCanvas = document.createElement('canvas')
    this.context = this.canvas.getContext("2d")
    this.subContext = this.subCanvas.getContext("2d")
    this.fonContext = this.fon.getContext("2d")

    this.main = document.querySelector('.page-main')


    this.width = this.canvas.width = this.subCanvas.width = this.fon.width = innerWidth
    this.height = this.canvas.height =  this.subCanvas.height = this.fon.height = innerHeight
    this.context.lineCap = this.subContext.lineCap = 'round'
    this.context.lineJoin = this.subContext.lineJoin = 'round'
    this.context.lineWidth = this.subContext.lineWidth = this.lineWidth
    
    this.context.strokeStyle = this.strokeColor
    
    this.subContext.strokeStyle = `rgba(0,0,0,0.4)`
    this.subContext.setLineDash([4, 8])

    window.addEventListener('paste', (evt: ClipboardEvent) => {
      console.log(evt.clipboardData.files)

      let items = evt.clipboardData.files
      for(let i = 0; i < items.length; i++) {
        console.log(items[i].type)
        if(/image/.test(items[i].type)) {
          console.log('work');
          let imageFon = new Image()
          imageFon.onload = () => {
            imageFon.width = this.canvas.width
            imageFon.height = this.canvas.height
            this.fonContext.drawImage(imageFon, 0,0)
          }
          imageFon.src = URL.createObjectURL(items[i])
        }
      }
    })

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

  clearContext () {
    this.context.clearRect(0,0,this.width, this.height)
  }

  clearSubContext () {
    this.subContext.clearRect(0,0,this.width, this.height)
  }

  private renderCanvas() {
    this.main.append(this.fon, this.subCanvas, this.canvas)
  }

  private onCanvasPointerDown = (evt: PointerEvent) => {
    evt.preventDefault()
    this.shape.draw(this, evt)
  }

}

const canv = new Canvas()
