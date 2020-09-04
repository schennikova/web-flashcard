const form = document.querySelector('.log')

form.addEventListener('submit', login)

async function login(e) {
  e.preventDefault()
  const email = e.target.elements['email'].value
  const name = e.target.elements['username'].value
  const body = {email, name}
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })

  const result = await res.json()
  console.log(result.message)
  if (result.success) {
    document.location = '/'
  } else {
    const div = document.createElement('div')
    div.innerText = result.message
    div.style.color = 'red'
    form.append(div)
  }
}
