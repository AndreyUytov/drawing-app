export class  UserInterface {
  saveAsFileBtn: StandartButton
  saveToBufferBtn: StandartButton
  insertFonBtn: StandartButton
  setLineWidthBtn: StandartButton
  setColorBtn: StandartButton


  constructor() {
    this.saveAsFileBtn = new SaveAsFileBtn(document.querySelector('.save-as-file-btn')) 
    this.saveToBufferBtn = new SaveToBufferBtn(document.querySelector('.save-to-buffer')) 
    this.insertFonBtn = new insertFonBtn(document.querySelector('.insert-btn')) 
    this.setLineWidthBtn = new SetLineWidthBtn(document.querySelector('.set-line-width-btn')) 
    this.setColorBtn = new SetColorBtn(document.querySelector('.set-color-btn')) 
  }
}

interface StandartButton {
  setCommand(cb: any):void
}

abstract class Btn implements StandartButton {
  protected btn: HTMLElement
  constructor(btn: HTMLElement) {
    this.btn = btn
  }

  abstract setCommand(cb: any):void
}

class SetColorBtn extends Btn {
  setCommand(cb:any) {
    this.btn.addEventListener('input', (evt) => {
      let target = evt.target as HTMLInputElement
      if (target.tagName !== "INPUT") return
      let value = target.value
      cb(value)
    })
  }
}

class SetLineWidthBtn extends Btn {
  setCommand(cb:any) {
    this.btn.addEventListener('input', (evt) => {
      let target = evt.target as HTMLInputElement
      if (target.tagName !== "INPUT") return
      let value = +target.value
      cb(value)
    })
  }
}

class insertFonBtn extends Btn {
  setCommand(cb:any) {
    this.btn.addEventListener('change', evt => {
      let target = evt.target as HTMLInputElement
      if (target.tagName !== "INPUT") return
      let value = target.files[0]
      if(!value) return
      cb(value)
    })
  }
}

class SaveToBufferBtn extends Btn {
  setCommand(cb:any) {
    this.btn.addEventListener('click', evt => {
      cb()
    })
  }
}

class SaveAsFileBtn extends Btn {
  setCommand(cb:any) {
    this.btn.addEventListener('click', evt => {
      cb()
    })
  }
}