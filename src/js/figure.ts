import { Canvas, IColor } from './canvas'

export interface Shape {
  draw(canvas: Canvas, evt: PointerEvent, makeBackup?: () => void): void
  drawPointer(canvas: Canvas, evt: PointerEvent): void
}

export class PixelColorDetecter implements Shape {
  private _color: IColor
  private rgba: string
  constructor() {
    this.color = {red: 0,green: 0, blue: 0, alfa: 1}
  }

  set color(color: IColor) {
    this._color = color
    this.rgba = `rgba(${this.color.red}, ${this.color.green}, ${this.color.blue}, ${this.color.alfa})`
  }

  get color() {
    return this._color
  }
  pointer(canvas: Canvas, evt: PointerEvent, shiftX: number, shiftY: number, rgba: string) {
    let dislocationX = evt.clientX - shiftX
    let dislocationY = evt.clientY - shiftY
    let context = canvas.previewContext

    context.save()
    context.strokeStyle = 'black'
    context.lineWidth = 1
    context.setLineDash([])

    context.beginPath()
    context.moveTo(dislocationX, dislocationY)
    context.lineTo(dislocationX, dislocationY + 10)
    context.closePath()
    context.stroke()

    context.beginPath()
    context.shadowOffsetX = 2
    context.shadowOffsetY = 2
    context.shadowBlur = 2
    context.shadowColor = 'rgba(0,0,0,0.5)'
    context.fillStyle = rgba
    context.arc(dislocationX, dislocationY + 20, 10, 0, 360)
    context.fill()
    context.stroke()

    context.restore()
  }

  drawPointer(canvas: Canvas, evt: PointerEvent) {
    evt.preventDefault()
    let shiftX = canvas.$canvas.getBoundingClientRect().left
    let shiftY = canvas.$canvas.getBoundingClientRect().top

    canvas.clearContext()
    this.pointer(canvas, evt, shiftX, shiftY, this.rgba)

    let onCanvasMove = (evt: PointerEvent) => {
      canvas.clearContext()
      this.pointer(canvas, evt, shiftX, shiftY, this.rgba)
    }

    let onCanvasClick = (evt: PointerEvent) => {
      canvas.clearContext()
      this.pointer(canvas, evt, shiftX, shiftY, this.rgba)
    }

    let onCanvasOut = (evt: PointerEvent) => {
      canvas.$canvas.removeEventListener('pointerout', onCanvasOut)
      canvas.$canvas.removeEventListener('pointermove', onCanvasMove)
      canvas.$canvas.removeEventListener('click', onCanvasClick)
    }

    canvas.$canvas.addEventListener('click', onCanvasClick)
    canvas.$canvas.addEventListener('pointermove', onCanvasMove)
    canvas.$canvas.addEventListener('pointerout', onCanvasOut)
  }

  draw(canvas: Canvas, evt: PointerEvent) {
    evt.preventDefault()
    let shiftX = canvas.$canvas.getBoundingClientRect().left
    let shiftY = canvas.$canvas.getBoundingClientRect().top

    let pick = (x: number, y: number) => {
      let pixel = canvas.drawContext.getImageData(x, y, 1, 1)
      let data = pixel.data

      this.color = {red: data[0], green: data[1], blue: data[2],alfa: data[3] / 255}      
    }

    pick(evt.clientX - shiftX, evt.clientY - shiftY)
    canvas.color = this.color

    let pointerMove = (evt: PointerEvent) => {
      evt.preventDefault()
      pick(evt.clientX - shiftX, evt.clientY - shiftY)
      canvas.color = this.color
    }

    let pointerUp = (evt: PointerEvent) => {
      evt.preventDefault()
      canvas.$canvas.removeEventListener('pointermove', pointerMove)
      canvas.$canvas.removeEventListener('pointerup', pointerUp)
    }

    canvas.$canvas.addEventListener('pointermove', pointerMove)
    canvas.$canvas.addEventListener('pointerup', pointerUp)
  }
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
    context.fillStyle = canvas.rgba
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
      canvas.$canvas.removeEventListener('pointermove', onCanvasMove)
    }

    let onCanvasUp = () => {
      canvas.$canvas.addEventListener('pointerdown', onCanvasDown)
      canvas.$canvas.addEventListener('pointerout', onCanvasOut)
      canvas.$canvas.addEventListener('pointermove', onCanvasMove)
    }

    canvas.$canvas.addEventListener('pointermove', onCanvasMove)
    canvas.$canvas.addEventListener('pointerdown', onCanvasDown)
    canvas.$canvas.addEventListener('pointerout', onCanvasOut)
    canvas.$canvas.addEventListener('pointerup', onCanvasUp)
  }

  draw(canvas: Canvas, evt: PointerEvent, makeBackup: () => void) {
    evt.preventDefault()
    let context = canvas.drawContext
    let previewContext = canvas.previewContext

    let resetListeners = () => {
      canvas.clearContext()
      previewContext.restore()
      context.stroke()
      canvas.$canvas.removeEventListener('pointerout', onCanvasPointerOut)
      canvas.$canvas.removeEventListener('pointermove', onCanvasPointerMove)
      canvas.$canvas.removeEventListener('pointerup', onCanvasPointerUp)
    }

    let shiftX = canvas.$canvas.getBoundingClientRect().left
    let shiftY = canvas.$canvas.getBoundingClientRect().top

    context.moveTo(evt.clientX - shiftX, evt.clientY - shiftY)
    context.beginPath()
    previewContext.save()
    previewContext.setLineDash([0])
    previewContext.beginPath()
    previewContext.moveTo(evt.clientX - shiftX, evt.clientY - shiftY)

    makeBackup()

    let onCanvasPointerMove = (evt: PointerEvent) => {
      evt.preventDefault()
      this.drawShape(previewContext, evt.clientX - shiftX, evt.clientY - shiftY)
      previewContext.stroke()
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
    context.strokeStyle = canvas.rgba
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

  draw(canvas: Canvas, evt: PointerEvent, makeBackup: () => void) {
    evt.preventDefault()

    let previewContext = canvas.previewContext
    let context = canvas.drawContext

    let shiftX = canvas.$canvas.getBoundingClientRect().left
    let shiftY = canvas.$canvas.getBoundingClientRect().top

    let startX = evt.clientX - shiftX
    let startY = evt.clientY - shiftY

    let resetListeners = (evt: PointerEvent) => {
      makeBackup()
      this.drawShape(
        context,
        startX,
        startY,
        evt.clientX - shiftX,
        evt.clientY - shiftY
      )
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

      resetListeners(evt)
    }

    let onCanvasPointerUp = (evt: PointerEvent) => {
      evt.preventDefault()

      resetListeners(evt)
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
