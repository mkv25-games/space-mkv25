function formatDate (dateString) {
  const date = new Date(dateString)
  const yyyymmdd = date.toISOString().substring(0, 10)
  const hhmm = date.toISOString().substring(11, 19)
  return [yyyymmdd, hhmm].join(' ')
}

export default formatDate