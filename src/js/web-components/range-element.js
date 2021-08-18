class RangeElement extends HTMLElement {
  constructor() {
    super()
    this.onTogglePointerDown = this.onTogglePointerDown.bind(this)
    this.attachShadow({ mode: 'open' })
  }

  get togglePosition() {
    return this._currentTogglePosition
  }

  set togglePosition(newPosition) {
    if (newPosition <= -this.centerToggle) {
      this._currentTogglePosition = -this.centerToggle
    } else if (newPosition >= this.widthBar - this.centerToggle) {
      this._currentTogglePosition = this.widthBar - this.centerToggle
    } else {
      this._currentTogglePosition = newPosition
    }
    this.toggle.style.transform = `translateX(${this._currentTogglePosition}px)`
  }

  get currentValueRange() {
    return (
      (this.togglePosition + this.centerToggle) * this.step +
      +this.getAttribute('min-value')
    )
  }

  onTogglePointerDown(evt) {
    this.toggle.setPointerCapture(evt.pointerId)
    let shiftX = evt.clientX - this.toggle.getBoundingClientRect().left

    let pointerMove = (evt) => {
      let newPosition = evt.pageX - this.leftEdge - shiftX
      this.togglePosition = newPosition

      this.dispatchEvent(
        new CustomEvent('change-range-value', {
          bubbles: true,
          detail: this.currentValueRange,
        })
      )
    }

    let pointerUp = () => {
      this.toggle.removeEventListener('pointermove', pointerMove)
      this.toggle.removeEventListener('pointerup', pointerUp)
    }
    this.toggle.addEventListener('pointermove', pointerMove)

    this.toggle.addEventListener('pointerup', pointerUp)
  }

  connectedCallback() {
    this.render()

    this.bar = this.shadowRoot.getElementById('bar')
    this.toggle = this.shadowRoot.getElementById('toggle')

    this.step = Math.abs(
      (+this.getAttribute('max-value') - +this.getAttribute('min-value')) /
        this.bar.getBoundingClientRect().width
    )
    this.widthBar = this.bar.getBoundingClientRect().width
    this.leftEdge = this.bar.getBoundingClientRect().left
    this.centerToggle = this.toggle.getBoundingClientRect().width / 2
    let initialTogglePosition =
      +this.getAttribute('current-value') / this.step - this.centerToggle

    this.togglePosition = initialTogglePosition

    this.toggle.addEventListener('pointerdown', this.onTogglePointerDown)
  }

  disconnectedCallback() {
    this.toggle.removeEventListener('pointerdown', this.onTogglePointerDown)
  }

  static get observedAttributes() {
    return ['current-value']
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'current-value') {
      if (this.toggle) {
        this.togglePosition = +newValue / this.step - this.centerToggle
      }
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          width: 100%;
          height: 50px;
          padding: 8px;

          display: flex;
          align-items: center;
          justify-content: center;

          box-sizing: border-box;
        }

        :host * {
          box-sizing: border-box;
        }

        #bar {
          width: 100%;
          height: 4px;

          display: flex;
          align-items: center;
          justify-content: flex-start;

          background-color: blue;
          border-radius: 8px;
        }

        #toggle {
          width: 28px;
          height: 28px;
          
          background-color: green;

          border-radius: 50%;
        }

      </style>

      <div id="bar">
        <div id="toggle">

        </div>
      </div>
    `
  }
}

customElements.define('range-element', RangeElement)

let ran = document.querySelector('.range')
ran.addEventListener('change-range-value', (evt) => {
  console.log(Math.round(evt.detail), 'from listener', evt.detail)
})

let rangeElem = ran.querySelector('range-element')
setTimeout(() => {
  rangeElem.setAttribute('current-value', 24)
}, 1000)
