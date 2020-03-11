const socket = io()

socket.on('countUpdated', (count) => {
    console.log('count updated', count)
})

document.querySelector('#increment').addEventListener('click', () => {
    console.log('clicked')
    socket.emit('increment')
})