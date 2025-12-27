// socket.js
let io = null;

module.exports = {
  init: (server) => {
    const { Server } = require("socket.io");

    io = new Server(server, {
      cors: { origin: "*" },
    });

    io.on("connection", (socket) => {
      console.log("🔌 Socket connected:", socket.id);

      socket.on("disconnect", () => {
        console.log("❌ Socket disconnected:", socket.id);
      });
    });

    return io;
  },

  getIO: () => {
    if (!io) {
      throw new Error("Socket.io chưa được khởi tạo");
    }
    return io;
  },
};
