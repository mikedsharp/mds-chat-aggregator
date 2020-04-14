<script>
  import { onMount } from "svelte";
  import { push } from "svelte-spa-router";

  async function onYouTubeLoginClick() {
    const youTubeAuthLinkResponse = await fetch(
      "http://localhost:3000/authenticate-youtube",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    const youTubeAuthLinkData = await youTubeAuthLinkResponse.json();
    window.location.href = youTubeAuthLinkData.authUrl;
  }
  function onChatWindowButtonClick() {
    push("/chat");
  }
  onMount(() => {});
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
  }
</style>

<div class="wrap">
  <h1>Welcome to the Live Chat Aggregator!</h1>
  <button
    type="button"
    on:click={() => {
      onYouTubeLoginClick();
    }}>
    Log into YouTube chat (required for YouTube stream chat)
  </button>
  <button
    type="button"
    on:click={() => {
      onChatWindowButtonClick();
    }}>
    Go to chat window (will only show discord if you don't log in with google
    via button above)
  </button>
</div>
