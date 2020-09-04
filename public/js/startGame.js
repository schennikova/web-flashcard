const btnsList = document.querySelectorAll('.btn')

btnsList.forEach(btn => btn.addEventListener('click', startGame))

function startGame(e) {
  e.preventDefault()
  const id = e.target.id
  fetch('/api/game/startGame', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body : JSON.stringify({id})
  }).
      then(async res => {
       const result = await res.json()
        console.log(result.message)
        document.location = `/game/${id}`
      }).
      catch(e => {
        alert('Вы не авторизованный медведь')
      })
}

