import {Canvas} from './canvas'

export interface Shape {
  draw(canvas: Canvas, evt: PointerEvent ): void
}

export class Brush implements Shape {
  draw(canvas: Canvas, evt: PointerEvent ) {
    evt.preventDefault()    

    let context = canvas.$canvas.getContext("2d")
    context.moveTo(evt.clientX, evt.clientY)

    let resetListeners = () => {
      canvas.$canvas.removeEventListener('pointerout', onCanvasPointerOut)
      canvas.$canvas.removeEventListener('pointermove', onCanvasPointerMove)
      canvas.$canvas.removeEventListener('pointerup', onCanvasPointerUp)
    }

    let onCanvasPointerMove = (evt: PointerEvent) => {
      evt.preventDefault() 
        
      context.lineTo(evt.clientX, evt.clientY)
      context.stroke() 
    }

    let onCanvasPointerUp = (evt: PointerEvent) => {
      evt.preventDefault()   

      resetListeners()
    }

    let onCanvasPointerOut = () => {   
      evt.preventDefault()   

      resetListeners()
    }

    canvas.$canvas.addEventListener('pointerout', onCanvasPointerOut)
    canvas.$canvas.addEventListener('pointermove', onCanvasPointerMove)
    canvas.$canvas.addEventListener('pointerup', onCanvasPointerUp)
  }
}

abstract class StandartShape implements Shape {
  draw(canvas: Canvas, evt: PointerEvent) {
    evt.preventDefault()

    let subContext = canvas.$subCanvas.getContext("2d")
    let context = canvas.$canvas.getContext("2d")

    let startX = evt.clientX
    let startY = evt.clientY

    let resetListeners = () => {
      subContext.clearRect(0,0, canvas.widthCanvas, canvas.heightCanvas)
    
      canvas.$canvas.removeEventListener('pointerout', onCanvasPointerOut)
      canvas.$canvas.removeEventListener('pointermove', onCanvasPointerMove)
      canvas.$canvas.removeEventListener('pointerup', onCanvasPointerUp)
    }

    let onCanvasPointerMove = (evt: PointerEvent) => {
      evt.preventDefault()
      subContext.clearRect(0,0, canvas.widthCanvas, canvas.heightCanvas)
      this.drawShape(subContext, startX, startY,  evt.clientX, evt.clientY)
    }

    let onCanvasPointerOut = (evt: PointerEvent) => {
      evt.preventDefault()

      resetListeners()
    }

    let onCanvasPointerUp = (evt: PointerEvent) => {
      evt.preventDefault()   
  
      this.drawShape(context, startX, startY,  evt.clientX, evt.clientY)

      resetListeners()
    }

    canvas.$canvas.addEventListener('pointerup', onCanvasPointerUp)
    canvas.$canvas.addEventListener('pointerout', onCanvasPointerOut)
    canvas.$canvas.addEventListener('pointermove', onCanvasPointerMove)
  }

  abstract drawShape(ctx: CanvasRenderingContext2D, x: number, y: number, x2: number, y2: number): void
  
}

export class CanvasRect extends StandartShape {
  drawShape(ctx: CanvasRenderingContext2D, x: number, y: number, x2: number, y2: number) {
    let width = x2 - x
    let height = y2 - y
    ctx.strokeRect(x, y, width, height)
  }
}

export class CanvasCircle extends StandartShape {
  drawShape(ctx: CanvasRenderingContext2D, x: number, y: number, x2: number, y2: number) {
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

export class CanvasLine extends StandartShape {
  drawShape(ctx: CanvasRenderingContext2D, x: number, y: number, x2: number, y2: number) {
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x2, y2)
    ctx.stroke()
  }
}