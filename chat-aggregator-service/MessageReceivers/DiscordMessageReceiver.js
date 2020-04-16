const Discord = require("discord.js");
const discordClient = new Discord.Client();

module.exports = function (messageBroadcaster) {
  const module = {};
  module.listen = function () {
    discordClient.on("message", (msg) => {
      if (
        msg.channel.name === process.env.DISCORD_BROADCAST_CHANNEL &&
        msg.cleanContent.length > 0
      ) {
        messageBroadcaster.pushMessage({
          message: msg.cleanContent,
          username: msg.author.username,
          createdTimestamp: msg.createdTimestamp,
          avatar: msg.author.defaultAvatarURL,
        });
      }
    });
    discordClient.login(process.env.DISCORD_BOT_TOKEN);
  };
  return module;
};
