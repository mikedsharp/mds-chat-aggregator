<script>
  import { push } from "svelte-spa-router";
  import { onMount } from "svelte";
  import {
    checkApiHealth,
    getCachebustValue,
    connectToLiveBroadcast,
    connectToSpecificBroadcast,
    disconnectFromBroadcastChat
  } from "../helpers/YouTubeHelpers";

  let healthStatus = false;
  let connectionAttempted = false;
  let broadcastId = "";

  onMount(async () => {
    healthStatus = await checkApiHealth();
    connectionAttempted = healthStatus;
  });

  function onChatWindowButtonClick() {
    push("/chat");
  }

  async function onClickRetryConnectToLivestream() {
    await connectToLiveBroadcast();
    await checkApiHealth();
    connectionAttempted = true;
  }

  async function onClickConnectByBroadcastId() {
    if (broadcastId.length === 0) {
      return;
    }
    await connectToSpecificBroadcast(broadcastId);
    healthStatus = await checkApiHealth();
    connectionAttempted = true;
  }

  async function onCancelYouTubeBroadcastListener() {
    await disconnectFromBroadcastChat();
    healthStatus = await checkApiHealth();
    connectionAttempted = false;
  }
</script>

<style lang="scss">
  .wrap {
    max-width: 960px;
    margin: 0 auto;
    font-family: Arial, Helvetica, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;

    button {
      margin: 5px;
      padding: 10px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
    }

    button {
      margin: 5px;
      padding: 10px;
      font-size: 18px;
      font-weight: 400;
      background-color: #445544;
      text-shadow: 2px 3px 3px #353535;
      font-family: "Noto Sans", sans-serif;
      color: #eee;
      border-radius: 3px;
      padding: 10px 20px;
      cursor: pointer;
      &:hover {
        background-color: #556655;
      }
    }
    h1 {
      font-family: "Sansita", sans-serif;
    }
    .broadcast-options {
      display: flex;
      flex-direction: row;

      div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: #707a71;
        color: #eee;
        border-radius: 10px;
        width: 300px;
        margin: 10px;
        padding: 30px;
        label {
          font-weight: bold;
        }
        input {
          padding: 5px;
          margin: 5px 0;
        }
      }
    }
  }
</style>

<div class="wrap">
  <h1>You are now authenticated with YouTube!</h1>
  {#if healthStatus === false && connectionAttempted === true}
    <h2>
      You were unable to connect to either the current live chat or an upcoming
      broadcast. Please try again by either clicking 'Connect to active
      Livestream' or providing a broadcast ID and clicking 'Connect to chat of a
      scheduled livestream'
    </h2>
  {/if}
  {#if healthStatus === false || connectionAttempted === false}
    <div class="broadcast-options">
      <div>
        <button
          on:click={() => onClickRetryConnectToLivestream()}
          type="button">
          Connect to active livestream
        </button>
      </div>
      <div>
        <label>Broadcast ID</label>
        <input bind:value={broadcastId} type="text" />
        <button on:click={() => onClickConnectByBroadcastId()} type="button">
          Connect to chat of a scheduled livestream
        </button>
      </div>
    </div>
  {:else}
    <button
      type="button"
      on:click={() => {
        onChatWindowButtonClick();
      }}>
      Continue to chat window
    </button>
    <button
      type="button"
      on:click={() => {
        onCancelYouTubeBroadcastListener();
      }}>
      Stop listening to current broadcast
    </button>
  {/if}
</div>
