import { Server } from 'socket.io';

export default function SocketHandler(req, res) {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);

    io.on('connection', (socket) => {
      console.log('Connected to socket:', socket.id);

      // Handle receiving new messages
      socket.on('newMessage', (message) => {
        // Emit the message to the receiver
        socket.broadcast.emit('receiveMessage', message);
      });

      socket.on('disconnect', () => {
        console.log('Disconnected:', socket.id);
      });
    });

    res.socket.server.io = io;
  }

  res.end();
}
