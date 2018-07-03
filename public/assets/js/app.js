console.log('test2')

const statusElems = document.getElementsByClassName('status')
console.log(statusElems)

Array.from(statusElems).forEach((e) => {
  if (e.dataset.finished == 'true') { e.innerHTML = 'finished' }
  else if (e.dataset.running == 'true') { e.innerHTML = 'live'}
  else { e.innerHTML = 'upcoming'}
})
