const wsserver = "http://ws.example-domain.local" //PUT YOUR SERVER
const socket = io(wsserver);

const messages = document.getElementById('messages');
const messageForm = document.getElementById('message-form');
const inputMessage = document.getElementById('input-message');

messageForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = inputMessage.value;

    if (message.trim() !== '') {
        socket.emit('message', message);
        inputMessage.value = '';
    }
});

socket.on('message', (data) => {
    const li = document.createElement('li');
    li.textContent = data;

    messages.appendChild(li);
});
