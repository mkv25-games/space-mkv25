const time = document.createElement('div')
document.body.appendChild(time)
time.innerHTML = 'What time is it?'

setInterval(() => {
  const date = new Date()
  time.innerHTML = date.toUTCString()
}, 200)
