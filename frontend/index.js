const wsserver = 'http://ws.example-domain.local' //PUT YOUR SERVER-DOMAIN
const socket = io(wsserver)

const messages = document.querySelector('#messages')
const messageForm = document.querySelector('#message-form')
const inputMessage = document.querySelector('#input-message')

messageForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const message = inputMessage.value

    if (message.trim() !== '') {
        socket.emit('message', message)
        inputMessage.value = ''
    }
})

socket.on('message', (data) => {
    const li = document.createElement('li')
    li.textContent = data

    messages.appendChild(li)
})
