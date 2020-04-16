const { google } = require("googleapis");

module.exports = function () {
  const module = {
    oauth2Client: null,
    refresh_token: null,
    access_token: null,
  };
  module.generateAuthUrl = function () {
    module.oauth2Client = new google.auth.OAuth2(
      process.env.YOUTUBE_CLIENT_ID,
      process.env.YOUTUBE_CLIENT_SECRET,
      "http://localhost:3000/receive-token"
    );

    const scopes = ["https://www.googleapis.com/auth/youtube.readonly"];
    const url = module.oauth2Client.generateAuthUrl({
      // 'online' (default) or 'offline' (gets refresh_token)
      access_type: "offline",

      // If you only need one scope you can pass it as a string
      scope: scopes,
    });
    return url;
  };
  module.beginTokenManagement = async function (authCode) {
    const { tokens } = await module.oauth2Client.getToken(authCode);
    module.oauth2Client.setCredentials(tokens);
    module.oauth2Client.on("tokens", async (tokens) => {
      if (tokens.refresh_token) {
        module.refresh_token = tokens.refresh_token;
      }
      module.access_token = tokens.access_token;
    });
    return Promise.resolve({});
  };
  return module;
};
