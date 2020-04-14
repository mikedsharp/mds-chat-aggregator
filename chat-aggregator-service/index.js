// import env vars
require("dotenv").config();
const socketIoServer = require("http").createServer();
const io = require("socket.io")(socketIoServer);
const messageBroadcaster = require("./MessageBroadcaster")(io);

const discordMessageReceiver = require("./MessageReceivers/DiscordMessageReceiver")(
  messageBroadcaster
);
const youTubeMessageReceiver = require("./MessageReceivers/YouTubeMessageReceiver")(
  messageBroadcaster
);

const twitchMessageReceiver = require("./MessageReceivers/TwitchMessageReceiver")(
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
youTubeMessageReceiver.listen();
twitchMessageReceiver.listen();
