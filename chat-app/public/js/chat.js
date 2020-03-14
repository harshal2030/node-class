const socket = io()

socket.on('countUpdated', (count) => {
    console.log('count updated', count)
})
socket.on('message', (message) => {
    console.log(message)
})

socket.on("sendMessage", (message) => {
    console.log(message)
})

document.querySelector("#message-form").addEventListener("submit",(e) => {
    e.preventDefault();
    message =  e.target.elements.message.value;
    socket.emit("sendMessage", message)
})

document.querySelector("#send-location").addEventListener("click", () => {
    if (!navigator.geolocation) {
        return alert("Your browser does not support geolocation")
    }

    navigator.geolocation.getCurrentPosition((position) => {
        data = {latitude: position.coords.latitude, longitude: position.coords.longitude}
        socket.emit("sendLocation", data)
    })
})