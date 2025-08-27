const express = require('express');
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
app.use(express.static(__dirname))

// Middleware
io.use((socket, next) => {
  setTimeout(() => {
    console.log("middleware")

    next();
  }, 1000);

  socket.on("disconnect", () => {

    console.log('disconnect')
  });
});

io.on('connection', async (socket) => {
  // console.log("socket is: ",socket)
  console.log('hello')
  const listener = (...args) => {
    console.log(args)
  }

  function logAny(anyEvent, ...args) {
    console.log(`onAny event: ${anyEvent}`, args);
  }

  function logAny2(anyEvent, ...args) {
    console.log(`onAny2 event: ${anyEvent}`, args);
  }

  /* socket.handshake - contain headers, time, address, url, query, auth(for token) */
  console.log(socket.handshake.auth)

  socket.emit('event', (ack) => {
    console.log(ack.status)
  })

  socket.on("ping", (count) => {
    console.log(count);
  });

  /* socket.once - listen only first time event demo is called. If demo emit twice then it is not listened */
  socket.on('demo', listener)
  socket.on('demo', logAny)
  
  console.log(socket.eventNames())

  /* socket.off - removes the specified listener from the demo event (same for removeListener)*/
  socket.off('demo', listener)
  console.log(socket.eventNames())

  /* socket.prependAny - the listener is added to the beginning of the listener array. When the any event is fired this will called at the top of listeners no matter the listener of any event is removed or not
   */
  socket.prependAny(() => {
    console.log('prepend')
  })


  /* socket.onAny - adds a listener that will be fired when any event  is emitted. */
  socket.onAny(logAny,logAny2)

  /* socket.offAny - removes a specific listener added with onAny. */
  // socket.offAny(logAny)

  /* with no args removes all "any" listeners. */
  // socket.offAny(); 

  // socket.on("error", (err) => {
  //   console.log("General socket error:", err);
  // });

  console.log(socket.rooms)       // to show all created rooms

  /* fetchSockets() - return a promise with socket, client, namespace, adapter, handshake and server object */
  const sockets = await io.fetchSockets();
  // console.log(sockets,"fetch")

  /** Rooms **/
  /* socket.join - to join the specific room */
  socket.join("room1");

  const socketId = socket.id;
  /* send to specific id of the socket. io.to(socketId) - it only sends that particular socket id. 
  So, socket.to(socketId) & io.to(socketId) is same in id case */
  // io.to(socketId).emit();

  /* emiting to specific room to all the user also sender */
  io.to("room1").emit("some event");

  /* send to all the users which are connected except the room1 */
  io.except("room1").emit("some event");

  /* emit to several rooms at same time  */
  io.to("room1").to("room2").to("room3").emit("some event");

  console.log(socket.rooms)
})

io.of("/").adapter.on("create-room", (room) => {  
  console.log(`room ${room} was created`);
});

io.of("/").adapter.on("join-room", (room, id) => {
  console.log(`socket ${id} has joined room ${room}`);
});

// Namespace - like separate channels
io.of("/orders").on("connection", (socket) => {
  socket.on("ns1", (data) => {
    console.log(data)
  });

});

/* triggered when new namespace is created when server restarts before the server listen event  */
io.on("new_namespace", (namespace) => {
  // console.log(namespace, "namespace")
});

const usernsp = io.of("/users");
usernsp.use((socket, next) => {
  console.log('User namespace middleware')
})

server.listen(3000, () => {
  console.log("Server is running on 3000");
}); 