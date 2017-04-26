var app = require('http').createServer(function(req, res) {
	
})
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(8899);
console.log("开启socket.io")
var users = {};
//简历socket连接
io.on('connection', function(socket) {
	console.log(socket.id)
	users[socket.id] = socket
	//console.log(io.sockets.sockets)
	socket.on('test', function(data) {
		console.log(data)
		//console.log(users)
	});
});