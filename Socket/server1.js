var express = require('express');
const app = express()
const server =require("http").createServer(app)
const io= require("socket.io").listen(server)
const port=5000
var roomsData=[];
var rooms=[];
function editroomdata(index,data){
	console.log("Editing Room")
	roomsData[index].username.push(data.username[0])
	roomsData[index].userID.push(data.userID[0])
	roomsData[index].status.push(0)
	roomsData[index].totalPlayer=roomsData[index].totalPlayer+1;
	console.log(roomsData[index])
}
io.on('connection', function (socket) {
console.log("a user connected");
socket.on('disconnect', function() {
     console.log('Got disconnect!');
});
socket.on("start",msg => {
        console.log(msg);
        socket.broadcast.emit("start",msg);
});
socket.on("stop",msg => {
        console.log(msg);
        socket.broadcast.emit("stop",msg);
});
socket.on("create",msg => {
        roomsData.push(msg)
		rooms.push(msg.roomid)
		console.log(roomsData)
		console.log(rooms)
		console.log(rooms.indexOf(msg.roomid))
        socket.join(msg.roomid);

});
socket.on("NEW_USER",msg => {
        if(rooms.includes(msg.roomid)==true){
        console.log("Room Exist")
        editroomdata(rooms.indexOf(msg.roomid),msg)
        socket.join(msg.roomid);
		io.to(msg.roomid).emit("JOINEE",roomsData[rooms.indexOf(msg.roomid)]);
		}
        else{
                console.log("room not existed ");
                socket.emit("NOTJOINEE","Room is not exist")
        }

});
socket.on("toggleStatus",msg => {
		let index= rooms.indexOf(msg[0])
		console.log(msg[0])
		console.log(index)
		console.log(msg[1])
		roomsData[index].status[msg[1]]=roomsData[index].status[msg[1]]? 0:1
		console.log(roomsData[index])
		socket.to(msg[0]).emit("remoteToggleStatus",msg[1]);

});
});

server.listen(port, () => console.log("server running on port" + port));

                                    