module.exports = function (io) {
  const module = {};
  module.pushMessage = function (message) {
    io.emit("event", message);
  };
  return module;
};
