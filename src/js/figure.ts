import { Canvas } from './canvas'

export interface Shape {
  draw(canvas: Canvas, evt: PointerEvent): void
  drawPointer(canvas: Canvas, evt: PointerEvent): void
}

abstract class AbstractBrush implements Shape {
  pointer(canvas: Canvas, evt: PointerEvent, shiftX: number, shiftY: number) {
    let dislocationX = evt.clientX - shiftX
    let dislocationY = evt.clientY - shiftY
    let context = canvas.previewContext

    context.save()
    context.shadowOffsetX = 2
    context.shadowOffsetY = 2
    context.shadowBlur = 2
    context.shadowColor = 'rgba(0,0,0,0.5)'
    context.fillStyle = canvas.color
    context.beginPath()
    context.arc(dislocationX, dislocationY, canvas.lineWidth / 2, 0, 360)
    context.fill()
    context.restore()
  }

  drawPointer(canvas: Canvas, evt: PointerEvent) {
    evt.preventDefault()
    let shiftX = canvas.$canvas.getBoundingClientRect().left
    let shiftY = canvas.$canvas.getBoundingClientRect().top

    canvas.clearContext()
    this.pointer(canvas, evt, shiftX, shiftY)

    let onCanvasMove = (evt: PointerEvent) => {
      canvas.clearContext()
      this.pointer(canvas, evt, shiftX, shiftY)
    }

    let onCanvasOut = (evt: PointerEvent) => {
      canvas.$canvas.removeEventListener('pointerdown', onCanvasDown)
      canvas.$canvas.removeEventListener('pointerout', onCanvasOut)
      canvas.$canvas.removeEventListener('pointermove', onCanvasMove)
      canvas.$canvas.removeEventListener('pointerup', onCanvasUp)
    }

    let onCanvasDown = (evt: PointerEvent) => {
      canvas.$canvas.removeEventListener('pointerdown', onCanvasDown)
      canvas.$canvas.removeEventListener('pointerout', onCanvasOut)
    }

    let onCanvasUp = () => {
      canvas.$canvas.addEventListener('pointerdown', onCanvasDown)
      canvas.$canvas.addEventListener('pointerout', onCanvasOut)
    }

    canvas.$canvas.addEventListener('pointermove', onCanvasMove)
    canvas.$canvas.addEventListener('pointerdown', onCanvasDown)
    canvas.$canvas.addEventListener('pointerout', onCanvasOut)
    canvas.$canvas.addEventListener('pointerup', onCanvasUp)
  }

  draw(canvas: Canvas, evt: PointerEvent) {
    evt.preventDefault()

    let resetListeners = () => {
      canvas.$canvas.removeEventListener('pointerout', onCanvasPointerOut)
      canvas.$canvas.removeEventListener('pointermove', onCanvasPointerMove)
      canvas.$canvas.removeEventListener('pointerup', onCanvasPointerUp)
    }

    let shiftX = canvas.$canvas.getBoundingClientRect().left
    let shiftY = canvas.$canvas.getBoundingClientRect().top

    let context = canvas.drawContext
    context.moveTo(evt.clientX - shiftX, evt.clientY - shiftY)
    context.beginPath()

    let onCanvasPointerMove = (evt: PointerEvent) => {
      evt.preventDefault()

      this.drawShape(context, evt.clientX - shiftX, evt.clientY - shiftY)
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

  abstract drawShape(ctx: CanvasRenderingContext2D, x: number, y: number): void
}

export class Brush extends AbstractBrush {
  drawShape(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.lineTo(x, y)
    ctx.stroke()
  }
}
abstract class StandartShape implements Shape {
  pointer(canvas: Canvas, evt: PointerEvent, shiftX: number, shiftY: number) {
    let dislocationX = evt.clientX - shiftX
    let dislocationY = evt.clientY - shiftY
    let context = canvas.previewContext

    context.save()
    context.shadowOffsetX = 2
    context.shadowOffsetY = 2
    context.shadowBlur = 2
    context.shadowColor = 'rgba(0,0,0,0.5)'
    context.strokeStyle = canvas.color
    context.lineWidth = 2
    context.setLineDash([])

    context.beginPath()
    context.moveTo(dislocationX, dislocationY - 10)
    context.lineTo(dislocationX, dislocationY + 10)
    context.closePath()
    context.stroke()

    context.beginPath()
    context.moveTo(dislocationX - 10, dislocationY)
    context.lineTo(dislocationX + 10, dislocationY)
    context.closePath()
    context.stroke()

    context.restore()
  }

  drawPointer(canvas: Canvas, evt: PointerEvent) {
    evt.preventDefault()
    let shiftX = canvas.$canvas.getBoundingClientRect().left
    let shiftY = canvas.$canvas.getBoundingClientRect().top

    canvas.clearContext()
    this.pointer(canvas, evt, shiftX, shiftY)

    let onCanvasMove = (evt: PointerEvent) => {
      canvas.clearContext()
      this.pointer(canvas, evt, shiftX, shiftY)
    }

    let onCanvasOut = (evt: PointerEvent) => {
      canvas.$canvas.removeEventListener('pointermove', onCanvasMove)
      canvas.$canvas.removeEventListener('pointerdown', onCanvasDown)
      canvas.$canvas.removeEventListener('pointerout', onCanvasOut)
      canvas.$canvas.removeEventListener('pointerup', onCanvasUp)
    }

    let onCanvasDown = (evt: PointerEvent) => {
      canvas.$canvas.removeEventListener('pointermove', onCanvasMove)
      canvas.$canvas.removeEventListener('pointerdown', onCanvasDown)
      canvas.$canvas.removeEventListener('pointerout', onCanvasOut)
    }

    let onCanvasUp = (evt: PointerEvent) => {
      canvas.$canvas.addEventListener('pointermove', onCanvasMove)
      canvas.$canvas.addEventListener('pointerdown', onCanvasDown)
      canvas.$canvas.addEventListener('pointerout', onCanvasOut)
    }

    canvas.$canvas.addEventListener('pointermove', onCanvasMove)
    canvas.$canvas.addEventListener('pointerdown', onCanvasDown)
    canvas.$canvas.addEventListener('pointerup', onCanvasUp)
    canvas.$canvas.addEventListener('pointerout', onCanvasOut)
  }

  draw(canvas: Canvas, evt: PointerEvent) {
    evt.preventDefault()

    let previewContext = canvas.previewContext
    let context = canvas.drawContext

    let shiftX = canvas.$canvas.getBoundingClientRect().left
    let shiftY = canvas.$canvas.getBoundingClientRect().top

    let startX = evt.clientX - shiftX
    let startY = evt.clientY - shiftY

    let resetListeners = () => {
      canvas.clearContext()

      canvas.$canvas.removeEventListener('pointerout', onCanvasPointerOut)
      canvas.$canvas.removeEventListener('pointermove', onCanvasPointerMove)
      canvas.$canvas.removeEventListener('pointerup', onCanvasPointerUp)
    }

    let onCanvasPointerMove = (evt: PointerEvent) => {
      evt.preventDefault()
      canvas.clearContext()
      this.pointer(canvas, evt, shiftX, shiftY)
      this.drawShape(
        previewContext,
        startX,
        startY,
        evt.clientX - shiftX,
        evt.clientY - shiftY
      )
    }

    let onCanvasPointerOut = (evt: PointerEvent) => {
      evt.preventDefault()

      resetListeners()
    }

    let onCanvasPointerUp = (evt: PointerEvent) => {
      evt.preventDefault()

      this.drawShape(
        context,
        startX,
        startY,
        evt.clientX - shiftX,
        evt.clientY - shiftY
      )

      resetListeners()
    }

    canvas.$canvas.addEventListener('pointerup', onCanvasPointerUp)
    canvas.$canvas.addEventListener('pointerout', onCanvasPointerOut)
    canvas.$canvas.addEventListener('pointermove', onCanvasPointerMove)
  }

  abstract drawShape(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    x2: number,
    y2: number
  ): void
}

export class CanvasRect extends StandartShape {
  drawShape(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    x2: number,
    y2: number
  ) {
    let width = x2 - x
    let height = y2 - y
    ctx.strokeRect(x, y, width, height)
  }
}

export class CanvasCircle extends StandartShape {
  drawShape(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    x2: number,
    y2: number
  ) {
    ctx.beginPath()

    let centerCircleX = (x + x2) / 2
    let centerCircleY = (y + y2) / 2

    let catetA = x2 - centerCircleX
    let catetB = y2 - centerCircleY
    let radius = +Math.sqrt(Math.pow(catetA, 2) + Math.pow(catetB, 2)).toFixed(
      2
    )

    ctx.arc(centerCircleX, centerCircleY, radius, 0, 360)
    ctx.stroke()
  }
}

export class CanvasLine extends StandartShape {
  drawShape(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    x2: number,
    y2: number
  ) {
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x2, y2)
    ctx.stroke()
  }
}
