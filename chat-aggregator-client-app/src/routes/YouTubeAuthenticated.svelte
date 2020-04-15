<script>
  import { push } from "svelte-spa-router";
  import { onMount } from "svelte";
  let healthStatus = false;
  let broadcastId = "";
  function onChatWindowButtonClick() {
    push("/chat");
  }
  function onClickRetryConnectToLivestream() {
    window.location.href = "http://localhost:3000/connect/latest";
  }
  function onClickConnectByBroadcastId() {
    window.location.href = `http://localhost:3000/connect/${broadcastId}`;
  }
  onMount(async () => {
    const healthResult = await fetch("http://localhost:3000/health", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const healthData = await healthResult.json();
    healthStatus = healthData.healthy;
    console.log(healthStatus);
  });
</script>

<style lang="scss">
  .wrap {
    font-family: Arial, Helvetica, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    margin-top: 20px;

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
  }
</style>

<div class="wrap">
  <h1>You are now authenticated with YouTube!</h1>
  {#if healthStatus === false}
    <h2>
      You could not be connected automatically to a chat, please try to connect
      to a live stream chat again or specify a broadcast ID of a schedule
      broadcast
    </h2>
    <button on:click={() => onClickRetryConnectToLivestream()} type="button">
      Retry connecting to active livestream
    </button>
    <label>Broadcast ID</label>
    <input bind:value={broadcastId} type="text" />
    <button on:click={() => onClickConnectByBroadcastId()} type="button">
      Connect to chat of a scheduled livestream
    </button>
  {:else}
    <button
      type="button"
      on:click={() => {
        onChatWindowButtonClick();
      }}>
      Continue to chat window
    </button>
  {/if}
</div>
