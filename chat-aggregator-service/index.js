// import env vars
require("dotenv").config();
const socketIoServer = require("http").createServer();
const io = require("socket.io")(socketIoServer);
const messageBroadcaster = require("./MessageBroadcaster")(io);
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const port = 3000;

require("./Controllers/YouTubeAuthController")(app, messageBroadcaster);

const discordMessageReceiver = require("./MessageReceivers/DiscordMessageReceiver")(
  messageBroadcaster
);

// establish socket.io connection to relay messages from all message providers
io.on("connection", (client) => {
  console.log("client connected");
  client.on("disconnect", () => {
    console.log("client disconnected");
  });
});
socketIoServer.listen(9000);

discordMessageReceiver.listen();

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
