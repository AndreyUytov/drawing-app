import { Canvas, IColor } from './canvas'

import {
  Shape,
  CanvasCircle,
  CanvasLine,
  Brush,
  CanvasRect,
  PixelColorDetecter,
} from './figure'

import {
  Command,
  SetColorCommand,
  SetlineWidthCommand,
  InsertFonCommand,
  SaveAsFileCommand,
  SaveToBufferCommand,
  SetDrawToolsCommand,
  ClearCanvasCommand,
  ToogleEraserCommand,
  MakeBackupCommand,
  UndoCommand,
} from './command'

import { UserInterface } from './user-interface'
import Snapshot from './snapshot'

interface Imap {
  [key: string]: Shape
}

const mapToolToShape: Imap = {
  brush: new Brush(),
  line: new CanvasLine(),
  circle: new CanvasCircle(),
  rectangle: new CanvasRect(),
  'pixel-color': new PixelColorDetecter(),
}

export class App {
  private canvas: Canvas
  private UI: UserInterface
  private history: Snapshot[]
  constructor() {
    this.canvas = new Canvas(document.querySelector('.canvas-container'))
    this.UI = new UserInterface()
    this.history = []

    this.setListenersUI()
  }

  private executeCommand(c: Command) {
    let result = c.execute()

    if (result instanceof Snapshot) {
      this.history.push(result)
    }
  }

  private setColor(value: IColor) {
    this.executeCommand(new SetColorCommand(this.canvas, value))
  }

  private setLineWidth(value: number) {
    this.executeCommand(new SetlineWidthCommand(this.canvas, value))
  }

  private setBackgroundImage(value: File) {
    this.executeCommand(new InsertFonCommand(this.canvas, value))
  }

  private copyToClipBoard(
    resolve: (reason: void) => void,
    reject: (reason: void) => void
  ) {
    this.executeCommand(new SaveToBufferCommand(this.canvas, resolve, reject))
  }

  private saveAsFile() {
    this.executeCommand(new SaveAsFileCommand(this.canvas))
  }

  private setTool(tool: string) {
    let shape = mapToolToShape[tool]
    if (!shape) {
      alert(`That shape ${tool} not exist!`)
      return false
    }
    this.executeCommand(new SetDrawToolsCommand(this.canvas, shape))

    return true
  }

  private clearCanvas() {
    this.executeCommand(new ClearCanvasCommand(this.canvas))
  }

  private toogleEraser(value: boolean) {
    this.executeCommand(new ToogleEraserCommand(this.canvas, value))
  }

  private makeBackup() {
    this.executeCommand(new MakeBackupCommand(this.canvas))
    console.log(this.history)
  }

  private undo() {
    let backup = this.history.pop()
    if (backup) {
      this.executeCommand(new UndoCommand(this.canvas, backup))
    }
    console.log(this.history)
  }

  private setListenersUI() {
    this.UI.setColorBtn.setCommand(
      (v: IColor) =>
        this.setColor(v)
    )

    this.canvas.addListener(this.UI.setColorBtn.setColor)

    this.UI.setLineWidthBtn.setCommand((v: number) => this.setLineWidth(v))

    this.UI.insertFonBtn.setCommand((v: File) => this.setBackgroundImage(v))

    window.addEventListener('paste', (evt: ClipboardEvent) => {
      let items = evt.clipboardData.files
      for (let i = 0; i < items.length; i++) {
        if (/image/.test(items[i].type)) {
          this.setBackgroundImage(items[i])
        }
      }
    })

    this.UI.saveAsFileBtn.setCommand(() => this.saveAsFile())
    this.UI.saveToBufferBtn.setCommand(() =>
      this.copyToClipBoard(
        () => alert('copy to clipboard!'),
        () => alert('Not support! Use Chrome browser for copy to buffer!')
      )
    )
    this.UI.setDrawToolBtn.setCommand((tool: string) => this.setTool(tool))
    this.UI.undoBtn.setCommand(() => this.undo())
    this.UI.clearCanvasBtn.setCommand(() => this.clearCanvas())
    this.UI.eraserToogleBtn.setCommand((value: boolean) =>
      this.toogleEraser(value)
    )
    this.canvas.makeBackupCommand = () => this.makeBackup()
    document.addEventListener('keydown', (evt) => {
      if ((evt.code === 'KeyZ' && evt.ctrlKey) || evt.metaKey) {
        this.undo()
      }
    })
  }
}
