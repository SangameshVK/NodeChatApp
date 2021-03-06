var socket = io();

function scrollToBotton() {
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');
    //Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
    // console.log(clientHeight, scrollTop, newMessageHeight, lastMessageHeight, scrollHeight);
    // console.log(clientHeight + scrollTop + newMessageHeight, scrollHeight);
    // console.log(clientHeight + scrollTop + newMessageHeight + lastMessageHeight, scrollHeight);
    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight>= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function() {
    console.log("Connected to server");
    var params = jQuery.deparam(window.location.search);

    socket.emit('join', params, function(err) {
        if (err){
            window.location.href = "/";
            alert(err);
        } else {
            console.log('No error');
        }
    });
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('updateUserList', function(users) {
    console.log("users list", users);
    var ol = jQuery('<ol></ol>');

    users.forEach(function (user) {
        ol.append(jQuery('<li></li>').text(user));
    });
    jQuery('#users').html(ol);
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
    scrollToBotton();
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
    scrollToBotton();
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