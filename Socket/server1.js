var express = require('express');
const app = express()
const server =require("http").createServer(app)
const io= require("socket.io").listen(server)
const port=5000
var roomsData=[];
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
        console.log(msg.roomid);
        roomsData.push(msg)
        socket.join(msg.roomid);

});
socket.on("NEW_USER",msg => {
        console.log(socket.adapter.rooms)
        if(roomsData.includes(msg)==true){
                console.log("Room Exist")
        console.log(msg);
        socket.join(msg);
        io.to(msg).emit("JOINEE","one new user");}
        else{
                console.log("room not existed ");
                socket.broadcast.emit("NOTJOINEE","Room is not exist")
        }

});
socket.on("getter",msg => {

        io.to(msg).emit("setter",msg);
});
});
                                    