module.exports = function (messageBroadcaster) {
  const module = {};
  module.listen = function () {
    console.log("Fake YouTube login");
    console.log("Fake Message receipt...");
    messageBroadcaster.pushMessage({
      message: "message from fake YouTube client",
      username: "fakeUser",
      createdTimestamp: 1586826493774,
    });
  };
  return module;
};
