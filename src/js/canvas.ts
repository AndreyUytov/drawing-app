import {
  Shape,
  Brush
} from './figure'

import {
  UserInterface
} from './user-interface'

import { Command, SetColorCommand } from './command'

export class Canvas {
  private canvas: HTMLCanvasElement
  private fon: HTMLCanvasElement
  private subCanvas: HTMLCanvasElement
  private context: CanvasRenderingContext2D
  private subContext: CanvasRenderingContext2D
  private fonContext: CanvasRenderingContext2D

  private canvasContainer: HTMLElement

  private shape: Shape = new Brush()
  private width: number
  private height: number

  constructor(canvasContainer: HTMLElement) {
    this.canvas = document.createElement('canvas')
    this.fon = document.createElement('canvas')
    this.subCanvas = document.createElement('canvas')
    this.context = this.canvas.getContext("2d")
    this.subContext = this.subCanvas.getContext("2d")
    this.fonContext = this.fon.getContext("2d")

    this.canvasContainer = canvasContainer


    this.setCanvasSize()
    this.context.globalCompositeOperation = 'source-over'
    this.fonContext.globalCompositeOperation = 'source-over'
    this.context.lineCap = this.subContext.lineCap = 'round'
    this.context.lineJoin = this.subContext.lineJoin = 'round'
    this.context.lineWidth = this.subContext.lineWidth = 2
    this.context.strokeStyle = "black"
    this.subContext.strokeStyle = `rgba(0,0,0,0.4)`
    this.subContext.setLineDash([4, 8])

    this.canvas.addEventListener('pointerdown', this.onCanvasPointerDown)

    this.renderCanvas()
  }

  private setCanvasSize ()  {
    this.width = this.canvas.width = this.subCanvas.width = this.fon.width = this.canvasContainer.getBoundingClientRect().width

    this.height = this.canvas.height =  this.subCanvas.height = this.fon.height = this.canvasContainer.getBoundingClientRect().height
  }

  set backgroundImage(value: File) {
    if(/image/.test(value.type)) {
      let imageFon = new Image()
      imageFon.onload = () => {
        if(imageFon.width > this.width || imageFon.height > this.height) {
          this.fonContext.drawImage(imageFon, 0,0, this.width,this.height)
        } else {
          this.fonContext.drawImage(imageFon, 0,0)
        }       
      }
      imageFon.src = URL.createObjectURL(value)

      // URL.revokeObjectURL(imageFon.src)
    }
  }

   copyCanvasToOneFon() {
    this.fonContext.drawImage(this.$canvas, 0,0)
  }

  saveCanvasAsFile() {
    this.copyCanvasToOneFon()
    this.fon.toBlob((blob) => {
      let link = document.createElement('a')
      link.download = 'mycanvas.png'
    
      link.href = URL.createObjectURL(blob);
      link.click()
      URL.revokeObjectURL(link.href)
    }, 'image/png')
  }

  saveCanvasToBuffer(resolve: (reason:void) => void, reject: (reason:void) => void) {
    this.copyCanvasToOneFon()
    this.fon.toBlob((blob) => {
    if(navigator.clipboard && typeof ClipboardItem === 'function') {
      navigator.clipboard.write([new ClipboardItem({'image/png': blob})]).then(resolve)
    } else {
      console.log('navigator ClipboardItem not exist');
      reject()
      }
    }, 'image/png')
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

  set color(color:string) {
    this.context.strokeStyle = color
  }

  set lineWidth (value: number) {
    this.context.lineWidth = this.subContext.lineWidth = value
  }

  clearCanvas () {
    this.context.clearRect(0,0,this.width, this.height)
    this.fonContext.clearRect(0,0, this.width, this.height)
  }

  clearSubContext () {
    this.subContext.clearRect(0,0,this.width, this.height)
  }

  private renderCanvas() {
    this.canvasContainer.append(this.fon, this.subCanvas, this.canvas)
  }

  private onCanvasPointerDown = (evt: PointerEvent) => {
    evt.preventDefault()
    this.shape.draw(this, evt)
  }

}