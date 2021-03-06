import { Shape, Brush } from './figure'
import Snapshot from './snapshot'

export interface IColor {
  red: number,
  green: number,
  blue: number,
  alfa: number
}
export class Canvas {
  private canvas: HTMLCanvasElement
  private fon: HTMLCanvasElement
  private context: CanvasRenderingContext2D
  private fonContext: CanvasRenderingContext2D

  private canvasContainer: HTMLElement

  private shape: Shape
  private width: number
  private height: number
  private _color: IColor = {red: 0, green: 0, blue: 0, alfa:1}
  private listeners: Set<any> = new Set()

  private makeBackup: () => void

  constructor(canvasContainer: HTMLElement) {
    this.canvas = document.createElement('canvas')
    this.fon = document.createElement('canvas')
    this.context = this.canvas.getContext('2d')
    this.fonContext = this.fon.getContext('2d')

    this.canvasContainer = canvasContainer

    this.shape = new Brush()

    this.setCanvasSize()

    this.canvas.style.cursor = 'none'

    this.context.globalCompositeOperation = 'source-over'
    this.fonContext.globalCompositeOperation = 'source-over'
    this.fonContext.lineCap = 'round'
    this.fonContext.lineJoin = 'round'
    this.fonContext.lineWidth = 2
    this.fonContext.strokeStyle = 'black'
    this.context.strokeStyle = `rgba(0,0,0,0.4)`
    this.context.setLineDash([2, 4])

    this.renderCanvas()

    this.canvas.addEventListener('pointerdown', this.onCanvasPointerDown)
    this.canvas.addEventListener('pointerover', this.onCanvasPointerOver)
  }

  addListener(cb: any) {
    this.listeners.add(cb)
  }
  
  removeListener(cb: any) {
    this.listeners.delete(cb)
  }

  private update() {
    this.listeners.forEach((cb) => {
      cb(this.color)
    })
  }

  set makeBackupCommand(makeBackup: () => void) {
    this.makeBackup = makeBackup
  }

  private setCanvasSize() {
    this.width =
      this.canvas.width =
      this.fon.width =
        this.canvasContainer.getBoundingClientRect().width

    this.height =
      this.canvas.height =
      this.fon.height =
        this.canvasContainer.getBoundingClientRect().height
  }

  get drawContext() {
    return this.fonContext
  }

  get previewContext() {
    return this.context
  }

  set backgroundImage(value: File) {
    if (/image/.test(value.type)) {
      let imageFon = new Image()
      imageFon.onload = () => {
        this.drawContext.save()
        this.drawContext.globalCompositeOperation = 'source-over'
        if (imageFon.width > this.width || imageFon.height > this.height) {
          this.fonContext.drawImage(imageFon, 0, 0, this.width, this.height)
          this.drawContext.restore()
        } else {
          this.fonContext.drawImage(imageFon, 0, 0)
          this.drawContext.restore()
        }
      }

      imageFon.src = URL.createObjectURL(value)

      // URL.revokeObjectURL(imageFon.src)
    }
  }

  onCanvasPointerOver = (evt: PointerEvent) => {
    this.shape.drawPointer(this, evt)
  }

  set toogleEraser(toogle: boolean) {
    if (toogle) {
      this.fonContext.globalCompositeOperation = 'destination-out'
    } else {
      this.fonContext.globalCompositeOperation = 'source-over'
    }
  }

  saveCanvasAsFile() {
    this.fon.toBlob((blob) => {
      let link = document.createElement('a')
      link.download = 'mycanvas.png'

      link.href = URL.createObjectURL(blob)
      link.click()
      URL.revokeObjectURL(link.href)
    }, 'image/png')
  }

  saveCanvasToBuffer(
    resolve: (reason: void) => void,
    reject: (reason: void) => void
  ) {
    this.fon.toBlob((blob) => {
      if (navigator.clipboard && typeof ClipboardItem === 'function') {
        navigator.clipboard
          .write([new ClipboardItem({ 'image/png': blob })])
          .then(resolve)
      } else {
        console.log('navigator ClipboardItem not exist')
        reject()
      }
    }, 'image/png')
  }

  get $canvas() {
    return this.canvas
  }

  set shapeInstrument(shape: Shape) {
    this.shape = shape
  }

  set color(color: IColor) {
    this._color = color
    this.fonContext.strokeStyle = this.rgba
    this.update()
  }

  get color() {
    return this._color
  }

  get rgba() {
    return `rgba(${this.color.red}, ${this.color.green}, ${this.color.blue}, ${this.color.alfa})`
  }

  set lineWidth(value: number) {
    this.context.lineWidth = this.fonContext.lineWidth = value
  }

  get lineWidth() {
    return this.fonContext.lineWidth
  }

  clearCanvas() {
    this.fonContext.clearRect(0, 0, this.width, this.height)
  }

  clearContext() {
    this.context.clearRect(0, 0, this.width, this.height)
  }

  private renderCanvas() {
    this.canvasContainer.append(this.fon, this.canvas)
  }

  private onCanvasPointerDown = (evt: PointerEvent) => {
    evt.preventDefault()
    this.shape.draw(this, evt, this.makeBackup)
  }

  createSnapshot() {
    let canvasBackup = document.createElement('canvas')
    canvasBackup.width = this.width
    canvasBackup.height = this.height
    canvasBackup.getContext('2d').drawImage(this.fon, 0, 0)

    return new Snapshot(this, canvasBackup)
  }

  restore(data: HTMLCanvasElement) {
    this.clearCanvas()
    this.fonContext.save()
    this.fonContext.globalCompositeOperation = 'source-over'
    this.drawContext.drawImage(data, 0, 0)
    this.fonContext.restore()
  }
}
