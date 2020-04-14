const Discord = require("discord.js");
const discordClient = new Discord.Client();

module.exports = function (messageBroadcaster) {
  const module = {};
  module.listen = function () {
    discordClient.on("message", (msg) => {
      if (msg.channel.name === "general") {
        console.log("sending discord message back to client...");
        messageBroadcaster.pushMessage(msg.content);
      }
    });
    console.log("logging into Discord chatbot...");
    discordClient.login(process.env.DISCORD_BOT_TOKEN);
  };
  return module;
};
