const form = document.querySelector('.wow')
const counterDiv = document.querySelector('#counter')
const end = document.querySelector('.end')
let index = 0
let counter = 0
form.addEventListener('submit', next)

async function next(e) {
  e.preventDefault()
  const input = e.target.elements['answer']
  const answer = input.value
  input.value = ''
  const body = {
    answer,
  }
  const id = e.target.id
  const res = await fetch(`/api/game/${id}/${index}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  const result = await res.json()
  if (result.statusOfAnswer) {
    counter++
  }
  if (result.nextQuestion === 'Игра закончена') {
    e.target.elements[1].disabled = true
    end.style.visibility = 'visible'
  }
  counterDiv.textContent = `Правильных ответов : ${counter}`
  const questionField = document.querySelector('h5')
  questionField.textContent = result.nextQuestion
  index++
}

end.addEventListener('click', () => document.location = '/')
