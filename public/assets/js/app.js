console.log('test2')

const statusElems = document.getElementsByClassName('status')
console.log(statusElems)

Array.from(statusElems).forEach((e) => {
  if (e.dataset.finished == 'true') { e.innerHTML = 'finished'; e.style.color = '#e84c9c' }
  else if (e.dataset.running == 'true') { e.innerHTML = 'live'; e.style.color = '#26a69a' }
  else { e.innerHTML = 'upcoming'; e.style.color = 'lightblue'}
})
