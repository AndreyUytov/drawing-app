class RangeElement extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
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
    let newPosition =
      +this.getAttribute('current-value') / this.step - this.centerToggle

    this.toggle.style.transform = `translateX(${newPosition}px)`

    this.toggle.addEventListener('pointerdown', (evt) => {
      this.toggle.setPointerCapture(evt.pointerId)
      let shiftX = evt.clientX - this.toggle.getBoundingClientRect().left

      let moveAt = (evt) => {
        newPosition = evt.pageX - this.leftEdge - shiftX

        if (newPosition <= -this.centerToggle) {
          newPosition = -this.centerToggle
        }

        if (newPosition >= this.widthBar - this.centerToggle) {
          newPosition = this.widthBar - this.centerToggle
        }
        this.toggle.style.transform = `translateX(${newPosition}px)`
      }

      let pointerMove = (evt) => {
        moveAt(evt)
      }

      let pointerUp = () => {
        this.currentPosition = (newPosition + this.centerToggle) * this.step

        this.dispatchEvent(
          new CustomEvent('change-range-value', {
            bubbles: true,
            detail: this.currentPosition,
          })
        )
        this.toggle.removeEventListener('pointermove', pointerMove)
        this.toggle.removeEventListener('pointerup', pointerUp)
      }
      this.toggle.addEventListener('pointermove', pointerMove)

      this.toggle.addEventListener('pointerup', pointerUp)
    })
  }

  disconnectedCallback() {}

  static get observedAttributes() {
    return ['current-value', 'max-value', 'min-value']
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'current-value') {
      if (this.toggle) {
        this.toggle.style.transform = `translateX(${
          +newValue / this.step - this.centerToggle
        }px)`
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
  console.log(evt.detail, 'from listener')
})

let rangeElem = ran.querySelector('range-element')
setTimeout(() => {
  rangeElem.setAttribute('current-value', 10)
}, 1000)
