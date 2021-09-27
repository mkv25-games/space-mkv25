import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

function setupFontAwesome (app) {
  console.log('Free Solid Icons', Object.keys(fas))
  library.add(fas)
}

export default setupFontAwesome
