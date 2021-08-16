class RangeElement extends HTMLElement {
  private step: number
  private bar: HTMLElement
  private toggle: HTMLElement
  constructor() {
    super()
    this.step = Math.abs(+this.getAttribute('max-value') / 100)

    this.attachShadow({mode: 'closed'})
  }

  connectedCallback() {
    this.render()

    this.bar = this.shadowRoot.getElementById('bar')
    this.toggle = this.shadowRoot.getElementById('toggle')

    this.bar.addEventListener('pointerdown', (evt: PointerEvent) => {
      let shiftX = evt.clientX - this.bar.getBoundingClientRect().left
      let moveAt = (evt: PointerEvent) => {
        this.bar.style.transform = `translateX(${evt.clientX - shiftX}%)`
      }
    })
  }

  disconnectedCallback() {
    
  }

  static get observedAttributes() {
    return ['current-value', 'max-value', 'min-value'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        
      </style>

      <div id="bar">
        <div id="toggle">

        </div>
      </div>
    `
  }
}