
import { fas } from '@fortawesome/free-solid-svg-icons'

function icons() {
  const all = Object.keys(fas)
  const remapped = all.map(key => {
    return key
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .toLocaleLowerCase()
      .replace('fa-', '')
      .replace('xray', 'x-ray')
  })
  return remapped
}

export default icons