module.exports = function (app, messageBroadcaster) {
  const youTubeAuthenticationService = require("../Auth/YouTubeAuthenticationService")();
  const youTubeMessageReceiver = require("../MessageReceivers/YouTubeMessageReceiver")(
    messageBroadcaster,
    youTubeAuthenticationService
  );
  app.get("/authenticate-youtube", (req, res) => {
    const url = youTubeAuthenticationService.generateAuthUrl();
    return res.json({
      authUrl: url,
    });
  });
  app.get("/receive-token", async (req, res) => {
    await youTubeAuthenticationService.beginTokenManagement(req.query.code);
    return res.redirect(301, "http://localhost:1234/#/youtube-authenticated");
  });
  app.get("/health", async (req, res) => {
    return res.json({
      healthy: youTubeMessageReceiver.liveChatId ? true : false,
    });
  });
  app.get("/connect/latest", async (req, res) => {
    await youTubeMessageReceiver.listen();
    return res.json({});
  });
  app.get("/connect/:broadcastId", async (req, res) => {
    await youTubeMessageReceiver.listen(req.params.broadcastId);
    return res.json({});
  });
};
