const flattenObject = (obj = {}, res = {}, extraKey = '') => {
  for (const key in obj) {
    if (typeof obj[key] !== 'object') {
      res[extraKey + key] = obj[key]
    } else {
      flattenObject(obj[key], res, `${extraKey}${key}.`)
    }
  }
  return res
}

module.exports = flattenObject
