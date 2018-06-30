console.log('test')

function updateGoal(el) {
  const body = document.querySelector('body')
  console.log(el.dataset.team)
  postData(body.id, el.dataset.team, el.dataset.operator)
}

function postData(id, team, operator) {
  const team1Elem = document.getElementById('team1')
  const team2Elem = document.getElementById('team2')
  const url = `/schiri/${id}/goals`;
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
