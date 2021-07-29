import {
  Canvas
} from './canvas'

import { Command,
  SetColorCommand,
  SetlineWidthCommand,
  InsertFonCommand, 
  SaveAsFileCommand,
  SaveToBufferCommand
} from './command'

import { UserInterface } from './user-interface'

export class App {
  private canvas: Canvas
  private UI: UserInterface
  constructor() {       
    this.canvas =  new Canvas(document.querySelector('.canvas-container'))
    this.UI = new UserInterface()

    this.setListenersUI()
  }

  private executeCommand (c: Command) {
    c.execute()
  }

  private setColor (value: string) {
    this.executeCommand(new SetColorCommand(this.canvas, value))
  }

  private setLineWidth(value: number) {
    this.executeCommand(new SetlineWidthCommand(this.canvas, value))
  }

  private setBackgroundImage(value: File) {
    this.executeCommand(new InsertFonCommand(this.canvas, value))
  }

  private copyToClipBoard (resolve: (reason:void) => void, reject: (reason:void) => void) {
    this.executeCommand(new SaveToBufferCommand(this.canvas, resolve, reject))
  }

  private saveAsFile () {
    this.executeCommand(new SaveAsFileCommand(this.canvas))
  }

  private setListenersUI () {

    this.UI.setColorBtn.setCommand((v:string) => this.setColor(v))

    this.UI.setLineWidthBtn.setCommand((v: number) => this.setLineWidth(v))

    this.UI.insertFonBtn.setCommand((v: File) => this.setBackgroundImage(v))

    window.addEventListener('paste', (evt: ClipboardEvent) => {
      let items = evt.clipboardData.files
      for(let i = 0; i < items.length; i++) {
        if(/image/.test(items[i].type)) {
          this.setBackgroundImage(items[i])
        }
      }
    })

    this.UI.saveAsFileBtn.setCommand(() => this.saveAsFile())
    this.UI.saveToBufferBtn.setCommand(() => this.copyToClipBoard(()=>alert('copy to clipboard!'), () => alert('Not support! Use Chrome browser for copy to buffer!')))
  }
}