var express = require('express');

const http = require('http');

var app = express();

const server = http.createServer(app);

const socketIO = require("socket.io")(server, {
    cors : {
        origin : "*",
    }
});

socketIO.on("connection", (socket) =>{
    console.log("New client connected " + socket.id);

    socket.on("sendDataClient", function(data){
        console.log(data)
        socketIO.emit("sendDataServer", {data});
    });

    socket.on("disconnect", () =>{
        console.log("Client " + socket.id + " disconnected");
    });

    socket.emit("getId", socket.id);
});

server.listen(3000, () =>{
    console.log("Server is running on port 3000")
});