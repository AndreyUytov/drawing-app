import { Canvas, IColor } from './canvas'
import { Shape } from './figure'
import Snapshot from './snapshot'

export abstract class Command {
  protected canvas: Canvas
  constructor(canvas: Canvas) {
    this.canvas = canvas
  }

  abstract execute(): void | boolean | Snapshot
}

export class SetColorCommand extends Command {
  private color: IColor
  constructor(
    canvas: Canvas,
    color: IColor
  ) {
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

export class SaveToBufferCommand extends Command {
  private resolve: (reason: void) => void
  private reject: (reason: void) => void
  constructor(
    canvas: Canvas,
    resolve: (reason: void) => void,
    reject: (reason: void) => void
  ) {
    super(canvas)
    this.resolve = resolve
    this.reject = reject
  }
  execute() {
    this.canvas.saveCanvasToBuffer(this.resolve, this.reject)
  }
}

export class SetDrawToolsCommand extends Command {
  private tool: Shape
  constructor(canvas: Canvas, tool: Shape) {
    super(canvas)
    this.tool = tool
  }

  execute() {
    this.canvas.shapeInstrument = this.tool
  }
}

export class ClearCanvasCommand extends Command {
  execute() {
    this.canvas.clearCanvas()
  }
}

export class ToogleEraserCommand extends Command {
  private toggle: boolean

  constructor(canvas: Canvas, toggle: boolean) {
    super(canvas)
    this.toggle = toggle
  }
  execute() {
    this.canvas.toogleEraser = this.toggle
  }
}

export class MakeBackupCommand extends Command {
  execute() {
    return this.canvas.createSnapshot()
  }
}

export class UndoCommand extends Command {
  private backup: Snapshot
  constructor(canvas: Canvas, backup: Snapshot) {
    super(canvas)
    this.backup = backup
  }
  execute() {
    this.backup.restore()
  }
}
