var express = require('express'); 
const app = express()
const server =require("http").createServer(app)
const io= require("socket.io").listen(server)
const port=5000

io.on('connection', function (socket) {
console.log("a user connected");
socket.on("start",msg => {
	console.log(msg);
    socket.broadcast.emit("Brodacast","This is brodacast messaage")
});
});

server.listen(port, () => console.log("server running on port" + port));

