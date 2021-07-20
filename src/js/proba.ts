interface Figure {
  draw(ctx: CanvasRenderingContext2D, x: number, y: number, x2?: number, y2?: number): void
}

class CanvasRect implements Figure {
  draw(ctx: CanvasRenderingContext2D, x: number, y: number, x2: number, y2: number) {
    let width = x2 - x
    let height = y2 - y
    ctx.strokeRect(x, y, width, height)
  }
}

class CanvasCircle implements Figure {
  draw(ctx: CanvasRenderingContext2D, x: number, y: number, x2: number, y2: number) {
    ctx.beginPath()

    let centerCircleX = (x + x2) / 2
    let centerCircleY = (y + y2) / 2

    let catetA = x2 - centerCircleX
    let catetB = y2 - centerCircleY
    let radius = +Math.sqrt(Math.pow(catetA,2) + Math.pow(catetB,2)).toFixed(2)    
    
    ctx.arc(centerCircleX, centerCircleY, radius, 0, 360)
    ctx.stroke()
  }
}
class CanvasBrush implements Figure {
  draw(ctx: CanvasRenderingContext2D, x: number, y: number, x2: number, y2: number) {
    
  }
}

class CanvasLine implements Figure {
  draw(ctx: CanvasRenderingContext2D, x: number, y: number, x2: number, y2: number) {
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x2, y2)
    ctx.stroke()
  }
}

class CanvasApp {
  private canvas: HTMLCanvasElement
  private subCanvas: HTMLCanvasElement
  private context: CanvasRenderingContext2D
  private subContext: CanvasRenderingContext2D

  public figure: Figure
  public width: number
  public height: number
  public strokeColor: string = 'black'
  public lineWidth: number = 4

  constructor() {
    this.subCanvas = document.getElementById('sub-canvas') as HTMLCanvasElement
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement
    this.subContext = this.subCanvas.getContext("2d")
    this.context = this.canvas.getContext("2d")

    this.width = this.canvas.width = this.subCanvas.width = innerWidth
    this.height = this.canvas.height =  this.subCanvas.height = innerHeight

    this.context.lineCap = 'round';
    this.context.lineJoin = 'round';
    this.context.strokeStyle = this.strokeColor;
    this.context.lineWidth = this.lineWidth;

    this.subContext.lineCap = 'round';
    this.subContext.lineJoin = 'round';
    this.subContext.strokeStyle = `rgba(0,0,0,0.4)`;
    this.subContext.lineWidth = this.lineWidth;
    this.subContext.setLineDash([4, 8])

    this.figure = new CanvasCircle()

    this.canvas.addEventListener('pointerdown', this.onCanvasPointerDownAndDrawFigure)
  }

  onCanvasPointerDownAndDrawBrush = (evt:PointerEvent) => {
    evt.preventDefault()
    this.context.moveTo(evt.clientX, evt.clientY)

    let resetListeners = () => {
      this.canvas.removeEventListener('pointerout', onCanvasPointerOut)
      this.canvas.removeEventListener('pointermove', onCanvasPointerMove)
      this.canvas.removeEventListener('pointerup', onCanvasPointerUp)
    }

    let onCanvasPointerMove = (evt: PointerEvent) => {
      evt.preventDefault() 
        
      this.context.lineTo(evt.clientX, evt.clientY)
      this.context.stroke() 
    }

    let onCanvasPointerUp = (evt: PointerEvent) => {
      evt.preventDefault()   

      resetListeners()
    }

    let onCanvasPointerOut = () => {   
      evt.preventDefault()   

      resetListeners()
    }

    this.canvas.addEventListener('pointerout', onCanvasPointerOut)
    this.canvas.addEventListener('pointermove', onCanvasPointerMove)
    this.canvas.addEventListener('pointerup', onCanvasPointerUp)
  }

  onCanvasPointerDownAndDrawFigure = (evt: PointerEvent) => {
    evt.preventDefault()
    let startX = evt.clientX
    let startY = evt.clientY

    let resetListeners = () => {
      this.canvas.removeEventListener('pointerout', onCanvasPointerOut)
      this.canvas.removeEventListener('pointermove', onCanvasPointerMove)
      this.canvas.removeEventListener('pointerup', onCanvasPointerUp)
    }

    let onCanvasPointerMove = (evt: PointerEvent) => {
      evt.preventDefault()
      this.subContext.clearRect(0,0, this.width, this.height)
      this.figure.draw(this.subContext, startX, startY,  evt.clientX, evt.clientY)
    }

    let onCanvasPointerOut = (evt: PointerEvent) => {
      evt.preventDefault()

      resetListeners()
    }

    let onCanvasPointerUp = (evt: PointerEvent) => {
      evt.preventDefault()   
  
      this.figure.draw(this.context, startX, startY,  evt.clientX, evt.clientY)

      resetListeners()
    }

    this.canvas.addEventListener('pointerup', onCanvasPointerUp)
    this.canvas.addEventListener('pointerout', onCanvasPointerOut)
    this.canvas.addEventListener('pointermove', onCanvasPointerMove)
  }
}



const canvas = new CanvasApp()