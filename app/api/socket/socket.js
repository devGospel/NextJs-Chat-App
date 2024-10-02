import {Server} from 'socket-io';
import { io } from 'socket.io-client';

 const Socket = (req, res) => {
  res.socket.server.io;

  io.on("connection", (socket) => {
    socket.on("send-message", obj => {
      io.emit("receive-message", obj)
    })
  }) 

  console.log("Setting Socket")
  res.end()
}

export default Socket