import {Canvas} from './canvas'

export abstract class Command {
  protected canvas: Canvas
  constructor(canvas: Canvas) {
    this.canvas = canvas
  }

  abstract execute(): void
}

export class SetColorCommand extends Command {
  private color: string
  constructor(canvas:Canvas, color:string) {
    super(canvas)
    this.color = color
  }
  execute() {
    this.canvas.color = this.color
  }
}

export class SetlineWidthCommand extends Command {
  private value: number
  constructor(canvas: Canvas, value: number) {
    super(canvas)
    this.value = value
  }

  execute() {
    this.canvas.lineWidth = this.value
  }
}

export class InsertFonCommand extends Command {
  private value: File

  constructor(canvas: Canvas, value: File) {
    super(canvas)
    this.value = value
  }

  execute() {
    this.canvas.backgroundImage = this.value
  }
}

export class SaveAsFileCommand extends Command {
  execute() {
    this.canvas.saveCanvasAsFile()
  }
}