# mds-chat-aggregator

The mds-chat-aggregator allows you to display discord and YouTube messages in one window as they are sent, this could be useful if you wish to have livestream chat showing to your audience from multiple chat services. I may add Twitch chat in the near future, but YouTube and discord are currently supported.

## Setup

for full setup instructions, please see my [YouTube video](https://www.youtube.com/user/programmerinprogress), i'd normally provide written instructions but this takes a bit of setup in google and discord and is better presented as a video you can skim through.

Please watch the video linked above to its completion before trying to run the chat aggregator.

## Running the aggregator

from the root directory of the project, open two terminal windows.

In terminal 1, type:

`cd chat-aggregator-client-app`

followed by

`npm install`

and finally

`npm start`

Then, in terminal 2 type:

`cd chat-aggregator-service`

followed by

`npm install`

and finally

`npm start`

The service should now be running, with some API endpoints running on port http://localhost:3000 and
the UI should be running on http://localhost:1234

go to http://localhost:1234 to begin using the application

# Disclaimer

I built this app in two days to help a friend out, it is not intended to be run on a remote server or to serve requests to 3rd parties, therefore it is your responsibility to set up the require Discord bot and Google Developer client application and credentials to get the app up and running.

So please, use the project as intended, as a locally hosted project that only aggregates chat messages from your own YouTube and Discord channel. Thank you.
