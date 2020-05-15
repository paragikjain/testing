var express = require('express'); 
const app = express()
const server =require("http").createServer(app)
const io= require("socket.io").listen(server)
const port=5000

io.on('connection', function (socket) {
console.log("a user connected");
socket.on("start",msg => {
	console.log(msg);
	socket.broadcast.emit("start",msg);
});
socket.on("stop",msg => {
	console.log(msg);
	socket.broadcast.emit("stop",msg);
});
socket.on("create",msg => {
	console.log(msg);
	socket.join(msg);

});
socket.on("NEW_USER",msg => {
	console.log(msg);
	socket.in(msg).emit("JOINEE","JOined SUccesufully");
});
});

server.listen(port, () => console.log("server running on port" + port));

