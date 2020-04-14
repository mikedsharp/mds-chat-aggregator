const youTubeAuthenticationService = require("../Auth/YouTubeAuthenticationService")();
module.exports = function (app, messageBroadcaster) {
  app.get("/authenticate-youtube", (req, res) => {
    const url = youTubeAuthenticationService.generateAuthUrl();
    return res.json({
      authUrl: url,
    });
  });
  app.get("/receive-token", async (req, res) => {
    await youTubeAuthenticationService.beginTokenManagement(req.query.code);
    const youTubeMessageReceiver = require("../MessageReceivers/YouTubeMessageReceiver")(
      messageBroadcaster,
      youTubeAuthenticationService
    );
    youTubeMessageReceiver.listen();
    return res.redirect(301, "http://localhost:1234/#/youtube-authenticated");
  });
};
