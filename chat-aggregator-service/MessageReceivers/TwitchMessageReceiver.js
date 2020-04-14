module.exports = function (messageBroadcaster) {
  const module = {};
  module.listen = function () {
    console.log("Fake Twitch login");
    console.log("Fake Message receipt...");
    messageBroadcaster.pushMessage("message from fake Twitch client");
  };
  return module;
};
