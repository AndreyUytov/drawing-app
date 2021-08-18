import { animate, makeToZero, penta, setupEndValue } from './animate'

export class UserInterface {
  saveAsFileBtn: StandartButton
  saveToBufferBtn: StandartButton
  insertFonBtn: StandartButton
  setLineWidthBtn: StandartButton
  setColorBtn: StandartButton
  undoBtn: StandartButton

  setDrawToolBtn: StandartButton
  eraserToogleBtn: StandartButton
  clearCanvasBtn: StandartButton

  constructor() {
    this.saveAsFileBtn = new SaveAsFileBtn(
      document.querySelector('.save-as-file-btn')
    )
    this.saveToBufferBtn = new SaveToBufferBtn(
      document.querySelector('.save-to-buffer')
    )
    this.insertFonBtn = new insertFonBtn(document.querySelector('.insert-btn'))
    this.setLineWidthBtn = new SetLineWidthBtn(
      document.querySelector('.set-line-width-btn')
    )
    this.setColorBtn = new SetColorBtn(document.querySelector('.set-color-btn'))
    this.setDrawToolBtn = new setDrawToolBtn(
      document.querySelector('.page-main__draw-tools')
    )
    this.clearCanvasBtn = new ClearCanvasBtn(
      document.querySelector('[data-clear="clear"]')
    )
    this.eraserToogleBtn = new ToggleEraserBtn(
      document.querySelector('.eraser-label')
    )
    this.undoBtn = new UndoBtn(document.querySelector('.undo-btn'))
  }
}

interface StandartButton {
  setCommand(cb: any): void
}

abstract class Btn implements StandartButton {
  protected btn: HTMLElement
  constructor(btn: HTMLElement) {
    this.btn = btn
  }

  abstract setCommand(cb: any): void
}

class UndoBtn extends Btn {
  setCommand(cb: any) {
    this.btn.addEventListener('click', () => {
      cb()
    })
  }
}

class ToggleEraserBtn extends Btn {
  setCommand(cb: any) {
    this.btn.addEventListener('click', () => {
      let value = this.btn.querySelector('input').checked
      if (value) {
        this.btn.classList.add('eraser-label--on')
        cb(value)
      } else {
        this.btn.classList.remove('eraser-label--on')
        cb(value)
      }
    })
  }
}

class ClearCanvasBtn extends Btn {
  setCommand(cb: any) {
    this.btn.addEventListener('click', () => {
      cb()
    })
  }
}

class setDrawToolBtn extends Btn {
  activeTool: HTMLElement
  constructor(btn: HTMLElement) {
    super(btn)
    this.activeTool = document.querySelector('.draw-tools__button--selected')
    this.toggleDrawToolsPanel()
  }

  toggleDrawToolsPanel() {
    if (window.innerWidth >= 768) {
      this.btn.addEventListener('pointerenter', (evt) => {
        animate({
          duration: 400,
          timing: makeToZero(penta),
          draw: (progress: number) => {
            this.btn.style.left = `${setupEndValue(-56, 0, progress)}px`
          },
        })
      })

      this.btn.addEventListener('pointerleave', (evt) => {
        animate({
          duration: 400,
          timing: makeToZero(penta),
          draw: (progress: number) => {
            this.btn.style.left = `${setupEndValue(0, -56, progress)}px`
          },
        })
      })
    }
  }

  setCommand(cb: any) {
    this.btn.addEventListener('click', (evt) => {
      let btn = evt.target as HTMLElement
      if (btn.tagName !== 'BUTTON') return
      if (btn === this.activeTool) return
      let tool = btn.dataset.tool
      if (!tool) return
      if (cb(tool)) {
        this.activeTool.classList.remove('draw-tools__button--selected')
        btn.classList.add('draw-tools__button--selected')
        this.activeTool = btn
      }
    })
  }
}

class SetColorBtn extends Btn {
  private rangeBtn: HTMLButtonElement
  private rangeBtnContent: HTMLElement
  private range: HTMLElement
  private rangeRed: RangeElement
  private rangeGreen: RangeElement
  private rangeBlue: RangeElement
  private rangeAlfa: RangeElement
  constructor(btn: HTMLElement) {
    super(btn)

    this.rangeBtn = this.btn.querySelector('.range-btn')
    this.rangeBtnContent = this.btn.querySelector('.range-btn__content')
    this.range = this.btn.querySelector('.range-btn__range')

    const ranges = Array.from(
      this.btn.querySelectorAll('range-element')
    ) as RangeElement[]
    this.rangeRed = ranges[0]
    this.rangeGreen = ranges[1]
    this.rangeBlue = ranges[2]
    this.rangeAlfa = ranges[3]

    this.rangeBtn.addEventListener('click', () => {
      this.range.classList.toggle('range-btn__range--active')
    })
  }
  setCommand(cb: any) {
    this.btn.addEventListener('end-change-range-value', (evt: CustomEvent) => {
      this.range.classList.remove('range-btn__range--active')

      let red = Math.round(this.rangeRed.currentValueRange)
      let green = Math.round(this.rangeGreen.currentValueRange)
      let blue = Math.round(this.rangeBlue.currentValueRange)
      let alfa = this.rangeAlfa.currentValueRange
      this.rangeBtnContent.style.background = `rgba(${red}, ${green}, ${blue}, ${alfa})`

      console.log(`rgba(${red}, ${green}, ${blue}, ${alfa})`)

      cb(`rgba(${red}, ${green}, ${blue}, ${alfa})`)
    })
  }
}

class SetLineWidthBtn extends Btn {
  private rangeBtn: HTMLButtonElement
  private rangeBtnContent: HTMLElement
  private range: HTMLElement
  constructor(btn: HTMLElement) {
    super(btn)

    this.rangeBtn = this.btn.querySelector('.range-btn')
    this.rangeBtnContent = this.btn.querySelector('.range-btn__content')
    this.range = this.btn.querySelector('.range-btn__range')
    this.rangeBtn.addEventListener('click', () => {
      this.range.classList.toggle('range-btn__range--active')
    })
  }
  setCommand(cb: any) {
    this.btn.addEventListener('change-range-value', (evt: CustomEvent) => {
      this.rangeBtnContent.textContent = `${Math.round(evt.detail)}`
    })
    this.btn.addEventListener('end-change-range-value', (evt: CustomEvent) => {
      this.range.classList.remove('range-btn__range--active')
      cb(Math.round(evt.detail))
    })
  }
}

class insertFonBtn extends Btn {
  setCommand(cb: any) {
    this.btn.addEventListener('change', (evt) => {
      let target = evt.target as HTMLInputElement
      if (target.tagName !== 'INPUT') return
      let value = target.files[0]
      if (!value) return
      cb(value)
    })
  }
}

class SaveToBufferBtn extends Btn {
  setCommand(cb: any) {
    this.btn.addEventListener('click', (evt) => {
      cb()
    })
  }
}

class SaveAsFileBtn extends Btn {
  setCommand(cb: any) {
    this.btn.addEventListener('click', (evt) => {
      cb()
    })
  }
}
