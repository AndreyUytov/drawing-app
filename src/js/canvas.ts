import {
  Shape,
  Brush
} from './figure'
export class Canvas {
  private canvas: HTMLCanvasElement
  private fon: HTMLCanvasElement
  private context: CanvasRenderingContext2D
  private fonContext: CanvasRenderingContext2D

  private canvasContainer: HTMLElement

  private shape: Shape = new Brush()
  private width: number
  private height: number

  constructor(canvasContainer: HTMLElement) {
    this.canvas = document.createElement('canvas')
    this.fon = document.createElement('canvas')
    this.context = this.canvas.getContext("2d")
    this.fonContext = this.fon.getContext("2d")

    this.canvasContainer = canvasContainer


    this.setCanvasSize()
    this.context.globalCompositeOperation = 'source-over'
    this.fonContext.globalCompositeOperation = 'source-over'
    this.fonContext.lineCap = 'round'
    this.fonContext.lineJoin = 'round'
    this.fonContext.lineWidth = 2
    this.fonContext.strokeStyle = "black"
    this.context.strokeStyle = `rgba(0,0,0,0.4)`
    this.context.setLineDash([2, 4])

    this.canvas.addEventListener('pointerdown', this.onCanvasPointerDown)

    this.renderCanvas()

    this.setPointerView()
  }

  private setCanvasSize ()  {
    this.width = this.canvas.width = this.fon.width = this.canvasContainer.getBoundingClientRect().width

    this.height = this.canvas.height = this.fon.height = this.canvasContainer.getBoundingClientRect().height
  }

  get drawContext() {
    return this.fonContext 
  }

  get previewContext() {
    return this.context
  }

  set backgroundImage(value: File) {
    if(/image/.test(value.type)) {
      let imageFon = new Image()
      imageFon.onload = () => {
        this.drawContext.save()
        this.drawContext.globalCompositeOperation = 'source-over'
        if(imageFon.width > this.width || imageFon.height > this.height) {
          this.fonContext.drawImage(imageFon, 0,0, this.width,this.height)
          this.drawContext.restore()
        } else {
          this.fonContext.drawImage(imageFon, 0,0)
          this.drawContext.restore()
        }       
      }
      
      imageFon.src = URL.createObjectURL(value)

      // URL.revokeObjectURL(imageFon.src)
    }
  }

  setPointerView() {
    let shiftX = this.$canvas.getBoundingClientRect().left
    let shiftY = this.$canvas.getBoundingClientRect().top

    let drawShapeCursor = (evt: PointerEvent) => {
      let dislocationX = evt.clientX - shiftX
      let dislocationY = evt.clientY - shiftY
      this.context.save()
      this.context.strokeStyle = this.fonContext.strokeStyle
      this.context.lineWidth = this.fonContext.lineWidth
      this.context.setLineDash([])

      this.context.beginPath()
      this.context.moveTo(dislocationX, dislocationY - 5)
      this.context.lineTo(dislocationX, dislocationY + 5)
      this.context.closePath()
      this.context.stroke()

      this.context.beginPath()
      this.context.moveTo(dislocationX - 5, dislocationY)
      this.context.lineTo(dislocationX + 5, dislocationY)
      this.context.closePath()
      this.context.stroke()

      this.context.restore()
    }

    let drawBrushCursor = (evt: PointerEvent) => {
      let dislocationX = evt.clientX - shiftX
      let dislocationY = evt.clientY - shiftY

      this.context.save()
      this.context.fillStyle = this.fonContext.strokeStyle
      this.context.beginPath()
      this.context.arc(dislocationX, dislocationY, this.fonContext.lineWidth / 2, 0, 360)
      this.context.fill()
      this.context.restore()
    }

    let showPointer = (evt: PointerEvent) => {
      this.clearContext()
      drawBrushCursor(evt)
    }

    
    this.canvas.addEventListener('pointerover', (evt) => {
      this.canvas.style.cursor = 'none'
      showPointer(evt)
    })
    this.canvas.addEventListener('pointermove', (evt) => {
      showPointer(evt)
    })
  }

  set toogleEraser(toogle:boolean) {
    if(toogle) {
      this.fonContext.globalCompositeOperation = 'destination-out'
    } else {
      this.fonContext.globalCompositeOperation = 'source-over'
    }
  }

  saveCanvasAsFile() {
    this.fon.toBlob((blob) => {
      let link = document.createElement('a')
      link.download = 'mycanvas.png'
    
      link.href = URL.createObjectURL(blob);
      link.click()
      URL.revokeObjectURL(link.href)
    }, 'image/png')
  }

  saveCanvasToBuffer(resolve: (reason:void) => void, reject: (reason:void) => void) {
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

  set shapeInstrument (shape: Shape) {
    this.shape = shape
  }

  set color(color:string) {
    this.fonContext.strokeStyle = color
  }

  set lineWidth (value: number) {
    this.context.lineWidth = this.fonContext.lineWidth = value
  }

  clearCanvas () {
    this.fonContext.clearRect(0,0, this.width, this.height)
  }

  clearContext () {
    this.context.clearRect(0,0,this.width, this.height)
  }

  private renderCanvas() {
    this.canvasContainer.append(this.fon, this.canvas)
  }

  private onCanvasPointerDown = (evt: PointerEvent) => {
    evt.preventDefault()
    this.shape.draw(this, evt)
  }

}