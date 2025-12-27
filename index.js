require("dotenv").config();
const http = require("http");
const app = require("./app");
const connectDB = require("./config/db");
const socket = require("./socket");

connectDB();

const PORT = process.env.PORT || 3000;

// 🔥 TẠO HTTP SERVER
const server = http.createServer(app);

// 🔥 GẮN SOCKET
socket.init(server);

server.listen(PORT, () => {
  console.log(`🚀 Server + Socket running on port ${PORT}`);
});
