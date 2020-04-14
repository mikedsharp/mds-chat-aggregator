module.exports = function (messageBroadcaster) {
  const module = {};
  module.listen = function () {
    console.log("Fake Twitch login");
    console.log("Fake Message receipt...");
    messageBroadcaster.pushMessage({
      message: "message from fake Twitch client",
      username: "fakeUser",
      createdTimestamp: 1586826493774,
    });
  };
  return module;
};
