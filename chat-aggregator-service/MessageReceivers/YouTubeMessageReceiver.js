module.exports = function (messageBroadcaster) {
  const module = {};
  module.listen = function () {
    console.log("Fake YouTube login");
    console.log("Fake Message receipt...");
    messageBroadcaster.pushMessage("message from fake YouTube client");
  };
  return module;
};
