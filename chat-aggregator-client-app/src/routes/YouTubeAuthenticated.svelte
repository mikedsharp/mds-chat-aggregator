<script>
  import { push } from "svelte-spa-router";
  import { onMount } from "svelte";
  let healthStatus = false;
  let connectionAttempted = false;
  let broadcastId = "";
  let random = Math.random() * 10000000000000000;
  function onChatWindowButtonClick() {
    push("/chat");
  }
  async function onClickRetryConnectToLivestream() {
    random = Math.random() * 10000000000000000;
    await fetch(`http://localhost:3000/connect/latest?cachebust=${random}`, {
      method: "GET"
    });
    const healthResult = await fetch(
      `http://localhost:3000/health?cachebust=${random}`,
      {
        method: "GET"
      }
    );
    const healthData = await healthResult.json();
    healthStatus = healthData.healthy;
    connectionAttempted = true;
  }
  async function onClickConnectByBroadcastId() {
    if (broadcastId.length === 0) {
      return;
    }
    random = Math.random() * 10000000000000000;
    await fetch(
      `http://localhost:3000/connect/${broadcastId}?cachebust=${random}`,
      {
        method: "GET"
      }
    );
    const healthResult = await fetch(
      `http://localhost:3000/health?cachebust=${random}`,
      {
        method: "GET"
      }
    );
    const healthData = await healthResult.json();
    healthStatus = healthData.healthy;
    connectionAttempted = true;
  }
  onMount(async () => {
    random = Math.random() * 10000000000000000;
    const healthResult = await fetch(
      `http://localhost:3000/health?cachebust=${random}`,
      {
        method: "GET"
      }
    );
    const healthData = await healthResult.json();
    healthStatus = healthData.healthy;
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
  {#if healthStatus === false && connectionAttempted === true}
    <h2>
      You were unable to connect to either the current live chat or an upcoming
      broadcast, please try again by either clicking 'Retry connecting to active
      livestream' or providing a broadcast ID and clicking 'Connect to chat of a
      scheduled livestream'
    </h2>
  {/if}
  {#if healthStatus === false || connectionAttempted === false}
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
