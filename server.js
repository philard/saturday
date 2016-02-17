'use strict';

let http = require('http');
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let socketio = require('socket.io');

let server = http.createServer(app);
let io = socketio(server);


io.on('connection', (sock) => {
	console.log('Somebody connected');

	sock.emit('circles', circleList); //sock is no ONLY THE NEW client

	sock.on('chat', (chatDTO) => {
		io.emit('chat', chatDTO);
	});
	sock.on('circle', (cord) => {
		circleList.push(cord);
		io.emit('circle', cord);
	});
	sock.on('triangle', (cord) => {
		//todo have a triangle list
		io.emit('triangle', cord);
	});
	sock.on('circles', () => {
		sock.emit('circles', circleList);
	});

});




//START data
let circleList = [];
//END data

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));



app.get('/hello', (req, res) => {
	res.send('Helo WOrld' + 'Your messages are: ' + messageList.toString());
});


app.post('/message', (req, res) => {

	let data = req.body;
	messageList.push({text:data.text});

	console.log(JSON.stringify(messageList));
	res.send('OK');
});

app.get(('/messages'), (req, res) => {

	res.send(JSON.stringify(messageList));

})

server.listen(8080, () => {
	console.log('hello 8080')
});
