const form = document.querySelector('.form-signin');

form.addEventListener('submit', register)


async function register(e) {
  e.preventDefault();
  console.log(e.target.elements['email']);
  const email = e.target.elements['email'].value
  const name = e.target.elements['username'].value

try {
  const response = await fetch('/api/auth/registration', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email, name
    })
  })
  const result = await response.json()
  if(result.success){
    document.location='/login'
  } else {
    const div = document.createElement('div')
    div.innerText = result.message
    div.style.color = 'red'
    form.append(div)
  }
} catch (e) {
  alert('Вы уже авторизованы!')
}

}
