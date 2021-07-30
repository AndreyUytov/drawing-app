import {Canvas} from './canvas'

export interface Shape {
  draw(canvas: Canvas, evt: PointerEvent ): void
}

abstract class AbstractBrush implements Shape {
  draw(canvas: Canvas, evt: PointerEvent ) {
    evt.preventDefault()

    let resetListeners = () => {
      context.restore()
      canvas.$canvas.removeEventListener('pointerout', onCanvasPointerOut)
      canvas.$canvas.removeEventListener('pointermove', onCanvasPointerMove)
      canvas.$canvas.removeEventListener('pointerup', onCanvasPointerUp)
    }

    let shiftX = canvas.$canvas.getBoundingClientRect().left
    let shiftY = canvas.$canvas.getBoundingClientRect().top

    let context = canvas.$canvas.getContext("2d")
    context.save()
    context.moveTo(evt.clientX - shiftX, evt.clientY - shiftY)
    context.beginPath()

    

    let onCanvasPointerMove = (evt: PointerEvent) => {
      evt.preventDefault() 
        
      this.drawShape(context, evt.clientX - shiftX, evt.clientY - shiftY ) 

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

  abstract drawShape(ctx: CanvasRenderingContext2D, x:number, y: number ): void
}

export class Brush extends AbstractBrush {
  drawShape(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.lineTo(x, y)
    ctx.stroke() 
  }
}

export class Eraser extends AbstractBrush {
  drawShape(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.strokeStyle = "#fff"
    ctx.lineTo(x, y)
    ctx.stroke() 
  }
}

abstract class StandartShape implements Shape {
  draw(canvas: Canvas, evt: PointerEvent) {
    evt.preventDefault()

    let subContext = canvas.$subCanvas.getContext("2d")
    let context = canvas.$canvas.getContext("2d")

    let shiftX = canvas.$canvas.getBoundingClientRect().left
    let shiftY = canvas.$canvas.getBoundingClientRect().top

    let startX = evt.clientX - shiftX
    let startY = evt.clientY - shiftY

    let resetListeners = () => {
      canvas.clearSubContext()
    
      canvas.$canvas.removeEventListener('pointerout', onCanvasPointerOut)
      canvas.$canvas.removeEventListener('pointermove', onCanvasPointerMove)
      canvas.$canvas.removeEventListener('pointerup', onCanvasPointerUp)
    }

    let onCanvasPointerMove = (evt: PointerEvent) => {
      evt.preventDefault()
      canvas.clearSubContext()
      this.drawShape(subContext, startX, startY,  evt.clientX - shiftX, evt.clientY - shiftY)
    }

    let onCanvasPointerOut = (evt: PointerEvent) => {
      evt.preventDefault()

      resetListeners()
    }

    let onCanvasPointerUp = (evt: PointerEvent) => {
      evt.preventDefault()   
  
      this.drawShape(context, startX, startY,  evt.clientX - shiftX, evt.clientY - shiftY)

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