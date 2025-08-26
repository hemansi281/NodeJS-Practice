const express = require('express');
const http = require("http");
const path = require('path');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, 'cursor.html'))
})

io.on('connection',(socket)=>{
    console.log(socket.id)

    socket.on('cursorMove',({x,y})=>{
        console.log(x,y)

        socket.broadcast.emit('cursorUpdate',{id:socket.id,x,y})
    })

    socket.on('disconnect',()=>{
        console.log('disconnect')

        socket.broadcast.emit('removeCursor',socket.id);
    })
})

server.listen(3000, () => { 
    console.log("Server is listening on", 3000) 
}) 
 