var socket = io();
socket.on('connect', function() {
    console.log("Connected to server");
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    var formattedTIme = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTIme
    });
    jQuery('#messages').append(html);
    // console.log('New Message:', message);
    // var li = jQuery('<li></li>');
    // li.text(`${message.from} ${formattedTIme}: ${message.text}`);
    // jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
    var formattedTIme = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedTIme
    });
    jQuery('#messages').append(html);
    // var li = jQuery('<li></li>');
    // var a = jQuery('<a target="_blank">My current location</a>');
    
    // li.text(`${message.from} ${formattedTIme}: `);
    // a.attr('href', message.url);
    // li.append(a);
    // jQuery('#messages').append(li);
});

// socket.emit('createMessage', {
//     from: 'Andrew',
//     text: 'Helloo'
// }, function(data) {
//     console.log('Got acknowledgment:', data);
// });

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();
    var messageBox = jQuery('[name=message]');
    socket.emit('createMessage', {
        from: 'User',
        text: messageBox.val()
    }, function() {
        messageBox.val('');
    });
});

var locationButton = jQuery('#send-location');

locationButton.on('click', function() {
    if (!navigator.geolocation){
        return alert('Geolocation not supported by your browser');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
        locationButton.removeAttr('disabled').text('Send location');
    }, function() {
        alert('Unable to fetch location.');
        locationButton.removeAttr('disabled').text('Send location');
    });
});