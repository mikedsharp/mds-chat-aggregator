const { google } = require("googleapis");

module.exports = function (messageBroadcaster, youtubeAuthenticationService) {
  const YOUTUBE_POLLING_INTERVAL = 15000;
  const module = { liveChatId: null, pageToken: null };
  let youtube = null;
  let poller = null;
  module.listen = async function () {
    youtube = google.youtube({
      version: "v3",
      auth: youtubeAuthenticationService.oauth2Client,
    });
    try {
      await module.getCurrentLiveBroadcastHandle();
      // do not await this as it goes in a loop on its own
      module.pollForMessages();
    } catch (ex) {
      console.log("failed to connect to livestream chat");
    }
  };
  module.getCurrentLiveBroadcastHandle = async function () {
    // trying to fetch a live broadcast id from YouTube
    const res = await youtube.liveBroadcasts.list({
      part: "snippet",
      broadcastStatus: "active",
    });
    console.log("got live chat id: " + res.data.items[0].snippet.liveChatId);
    module.liveChatId = res.data.items[0].snippet.liveChatId;
  };
  module.stopPollingForMessages = function () {
    if (poller) {
      poller();
    }
  };
  module.pollForMessages = async function () {
    try {
      const requestParams = {
        liveChatId: module.liveChatId,
        part: "snippet,authorDetails",
      };
      if (module.nextPageToken) {
        requestParams.pageToken = module.nextPageToken;
      }
      const res = await youtube.liveChatMessages.list(requestParams);
      module.nextPageToken = res.data.nextPageToken;
      res.data.items.forEach((message) => {
        messageBroadcaster.pushMessage({
          message: message.snippet.displayMessage,
          username: message.authorDetails.displayName,
          createdTimestamp: new Date().getTime(),
          avatar: message.authorDetails.profileImageUrl,
        });
      });
      module.poller = setTimeout(() => {
        module.pollForMessages();
      }, YOUTUBE_POLLING_INTERVAL);
    } catch (ex) {
      console.log(
        "stopping polling due to a problem connecting, authenticating or being rate-limited by Google"
      );
      module.stopPollingForMessages();
    }
  };
  return module;
};
