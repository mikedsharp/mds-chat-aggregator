module.exports = function (messageBroadcaster) {
  const module = {};
  module.listen = function () {
    messageBroadcaster.pushMessage({
      message: "message from fake Twitch client",
      username: "fakeUser",
      createdTimestamp: 1586826493774,
    });
  };
  return module;
};
