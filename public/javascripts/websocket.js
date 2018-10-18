// Make connection
// setting up socket in client side.
/* eslint-disable */
const socket = io.connect('http://localhost:3000');

const renderDiv = document.getElementById('renderDiv');

// Listen for events
socket.on('snapshot', (data) => {    
    renderDiv.innerHTML = `<img src=${data.imgUrl} />`;
});
