var socket = io();
socket.on('connect', function() {
    console.log("Connected to server");
    socket.emit('createEmail', {
        to: 'hello@hello.com',
        text: 'Hey, this is andrew'
    });
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newEmail', function(email) {
    console.log('New email arrived', email);
});