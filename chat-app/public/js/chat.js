const socket = io()

// elements
const $messageForm = document.querySelector('#message-form');
const $messageFormInput = document.querySelector('input');
const $messageFormButton = document.querySelector('button');
const $sendLocationButton = document.querySelector("#send-location")
const $messages = document.querySelector('#messages')

// templates
const messageTemplate = document.querySelector('#message-template').innerHTML;
const locationTemplate = document.querySelector('#location-message-template').innerHTML;

socket.on('countUpdated', (count) => {
    console.log('count updated', count)
})
socket.on('message', (message) => {
    console.log(message)
    const html = Mustache.render(messageTemplate, {
        message: message.text,
        createdAt: moment(message.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
})

socket.on("sendMessage", (message) => {
    console.log(message)
})

socket.on('locationMessage', (url) => {
    console.log(url);
    const html = Mustache.render(locationTemplate, {
        location: url.url,
        createdAt: moment(url.createdAt).format('h:mm a')
    });
    $messages.insertAdjacentHTML('beforeend', html);
})

$messageForm.addEventListener("submit",(e) => {
    e.preventDefault();
    $messageFormButton.setAttribute('disabled', 'disabled');
    // disable
    message =  e.target.elements.message.value;
    socket.emit("sendMessage", message, (error) => {
        $messageFormButton.removeAttribute('disabled');
        $messageFormInput.value = '';
        $messageFormInput.focus();
        // enable 
        if (error) {
            return console.log(error)
        }

        console.log('delivered');
    })
})

$sendLocationButton.addEventListener("click", () => {
    if (!navigator.geolocation) {
        return alert("Your browser does not support geolocation")
    }

    $sendLocationButton.setAttribute('disabled', 'disabled');
    navigator.geolocation.getCurrentPosition((position) => {
        data = {latitude: position.coords.latitude, longitude: position.coords.longitude}
        socket.emit("sendLocation", `http://www.google.com/maps?q=${position.coords.latitude},${position.coords.longitude}`, (msg) => {
            console.log(msg)
            $sendLocationButton.removeAttribute('disabled')
        });
    })
})