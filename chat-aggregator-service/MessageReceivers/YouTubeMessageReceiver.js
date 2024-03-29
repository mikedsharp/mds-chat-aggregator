const { google } = require("googleapis");

module.exports = function (messageBroadcaster, youtubeAuthenticationService) {
  const YOUTUBE_POLLING_INTERVAL = 15000;
  const module = { liveChatId: null, pageToken: null };
  let youtube = null;
  let poller = null;
  module.listen = async function (broadcastId) {
    youtube = google.youtube({
      version: "v3",
      auth: youtubeAuthenticationService.oauth2Client,
    });
    try {
      if (broadcastId) {
        await module.getBroadcastById(broadcastId);
      } else {
        await module.getCurrentLiveBroadcastHandle();
      }
      // do not await this as it goes in a loop on its own
      module.pollForMessages();
    } catch (ex) {
      console.log("failed to connect to livestream chat");
      return Promise.reject({});
    }
    return Promise.resolve({});
  };
  module.getCurrentLiveBroadcastHandle = async function () {
    // trying to fetch a live broadcast id from YouTube
    const res = await youtube.liveBroadcasts.list({
      part: "snippet",
      broadcastStatus: "active",
    });

    if (res.data.items.length > 0) {
      module.liveChatId = res.data.items[0].snippet.liveChatId;
      return Promise.resolve({});
    } else {
      console.log("no live broadcasts found");
      return Promise.reject({});
    }
  };
  module.getBroadcastById = async function (broadcastId) {
    const res = await youtube.liveBroadcasts.list({
      part: "snippet",
      id: broadcastId,
    });
    if (res.data.items.length > 0) {
      module.liveChatId = res.data.items[0].snippet.liveChatId;
      return Promise.resolve({});
    } else {
      console.log(`broadcast '${broadcastId}' was not found`);
      return Promise.reject({});
    }
  };
  module.stopPollingForMessages = function () {
    if (poller) {
      poller();
    }
    module.liveChatId = null;
    module.pageToken = null;
  };
  module.pollForMessages = async function () {
    try {
      if (!module.liveChatId) {
        return Promise.reject({});
      }
      const requestParams = {
        liveChatId: module.liveChatId,
        part: "snippet,authorDetails",
      };
      if (module.pageToken) {
        requestParams.pageToken = module.pageToken;
      }
      const res = await youtube.liveChatMessages.list(requestParams);
      module.pageToken = res.data.nextPageToken;
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
      module.stopPollingForMessages();
      return Promise.resolve({});
    }
  };
  return module;
};
