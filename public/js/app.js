
// 'name' and 'room' vars use query params to get user/room info using method in QueryParams.js
var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');

var socket = io();

console.log(name + ' wants to join ' + room);

// Updates room name in chat.html page
jQuery('.room-title').text(room);

// Emits to users when someone new joins the chatroom using joinRoom listener from server.js
socket.on('connect', function () {
	// notifies when user enters chat app using web browser
	console.log('Connected to socket.io server!');
	socket.emit('joinRoom', {
		name: name,
		room: room
	});
});

//handles the submission of the message and displays it
socket.on('message', function (message) {
	//timestamp
	var momentTimestamp = moment.utc(message.timestamp);
	//messages to be displayed on
	var $messages = jQuery('.messages');
	var $message = jQuery('<li class="list-group-item"></li>');

	console.log('New message:');
	console.log(message.text);

	// User name and timestamp
	$message.append('<p><strong>' + message.name + ' ' + momentTimestamp.local().format('h:mm a') + '</strong></p>');
	// message submitted by the user
	$message.append('<p>' + message.text + '</p>');
	$messages.append($message);
});

// Handles the input of new message in the chat.html
var $form = jQuery('#message-form');

$form.on('submit', function (event) {
	event.preventDefault();

	var $message = $form.find('input[name=message]');

	socket.emit('message', {
		name: name,
		text: $message.val()
	});

	$message.val('');
});