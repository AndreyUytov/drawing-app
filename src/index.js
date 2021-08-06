import './styles/index.scss'
import './images/svg/svg-sprite.js'

import { App } from './js/app'

new App()

if (document.documentElement.clientWidth < 768) {
  document.querySelector('.page-main__draw-tools').scrollIntoView(false)
}
