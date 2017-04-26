var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(80);
console.log("开启socket.io")

function handler(req, res) {
	fs.readFile(__dirname + '/index.html',
		function(err, data) {
			if(err) {
				res.writeHead(500);
				return res.end('Error loading index.html');
			}

			res.writeHead(200);
			res.end(data);
		});
}
//问题
var text;
//简历socket连接
io.on('connection', function(socket) {
	console.log(socket.id)
	//画笔
	socket.on('draw', function(data) {
		console.log(data);
		//socket.emit('paint', data);
		//向所有客户端广播
		io.emit('paint', data);
	});
	//停笔
	socket.on('stop', function(data) {
		console.log(data);
		io.emit('paint', data);
	});
	//清空画布
	socket.on('clear', function(data) {
		console.log(data);
		io.emit('clear', data);
	});
	//接受画图的描述
	socket.on('ask', function(data) {
		console.log('ask:' + data);
		//把答案保存起来跟猜图回复进行判断
		text = data
	});
	//猜图回答
	socket.on('answer', function(data) {
		console.log('answer:' + data);
		if(text == data) {
			io.emit('answer', 'right');
		}else{
			io.emit('answer', 'wrong');
		}
	});
	console.log(io.sockets.sockets);
});