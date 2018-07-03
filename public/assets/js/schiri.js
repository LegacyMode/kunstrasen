console.log('test')

const toggle = document.getElementById('toggle')
const body = document.querySelector('body')
const heading = document.getElementById('heading')

const setText = () => {
  return (heading.dataset.finished == 'true' ? heading.innerHTML = "finished": 0 )
}

function toggleText() {
  if (toggle.dataset.running == 'true') {
    toggle.innerHTML = 'Pause Game'
  } else {
    toggle.innerHTML = 'Start Game'
  }
}

toggleText()
setText()
startTime()

function checkTime (i) { return (i < 10 ? "0" + i : i) }

function startTime() {
    var today = new Date()
    var h = today.getHours()
    var m = today.getMinutes()
    var s = today.getSeconds()
    m = checkTime(m)
    s = checkTime(s)
    document.getElementById('clock').innerHTML =
    h + ":" + m + ":" + s
    var t = setTimeout(startTime, 500)
}

function endGame() {
  const url = `/schiri/${body.id}/endgame`
  return fetch(url, {
    cache: 'no-cache',
    credentials: 'same-origin',
    header: {
      'content-type': 'application/json'
    },
    mode: 'cors',
    method: 'post',
    referrer: 'no-referrer'
  })
  .then(response => response.json())
  .then((match) => {
    console.log(match)
    heading.dataset.finished = match.finished
    setText()
  })
  .catch((err) => console.log(err))
}

function toggleGame() {
  const url = `/schiri/${body.id}/toggle`
  return fetch(url, {
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'content-type': 'application/json'
    },
    mode: 'cors', // no-cors, cors, *same-origin
    method: 'post',
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // *client, no-referrer
  })
  .then(response => response.json()) // parses response to JSON
  .then((match) => {
    console.log(match)
    toggle.dataset.running = match.running
    toggleText()
  })
  .catch((err) => console.log(err))
}

function updateGoal(el) {
  console.log(el.dataset.team)
  postData(body.id, el.dataset.team, el.dataset.operator)
}

function postData(id, team, operator) {
  const team1Elem = document.getElementById('team1')
  const team2Elem = document.getElementById('team2')
  const url = `/schiri/${id}/goals`
  // Default options are marked with *
  return fetch(url, {
    body: JSON.stringify({ operator, team }), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    //mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // *client, no-referrer
  })
  .then(response => response.json()) // parses response to JSON
  .then((goals) => {
    team1Elem.innerHTML = goals.team1Goals
    team2Elem.innerHTML = goals.team2Goals
  })
}
