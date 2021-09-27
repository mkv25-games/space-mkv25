import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

function setupFontAwesome() {
  library.add(faUserSecret)
  Vue.component('font-awesome-icon', FontAwesomeIcon)
  Vue.config.productionTip = false
}

export default setupFontAwesome