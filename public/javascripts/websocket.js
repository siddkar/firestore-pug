// Make connection
// setting up socket in client side.
/* eslint-disable */
const socket = io.connect('http://localhost:3000');

// Listen for events
socket.on('snapshot', (data) => {
    document.getElementById('renderDiv').innerHTML = `<img src="${data.imgUrl}" />`;
});
