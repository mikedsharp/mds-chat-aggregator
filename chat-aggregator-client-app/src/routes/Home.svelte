<script>
  import { onMount } from "svelte";
  import { push } from "svelte-spa-router";
  let random = null;
  const serviceEndpoint = "http://localhost:3000";
  const healthEndpoint = `${serviceEndpoint}/health`;
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
  function getCachebustValue() {
    return Math.random() * 10000000000000000;
  }
  async function checkApiHealth() {
    random = getCachebustValue();
    const healthResult = await fetch(`${healthEndpoint}?cachebust=${random}`, {
      method: "GET"
    });
    const healthData = await healthResult.json();
    if (healthData.healthy) {
      push("/youtube-authenticated");
    }
  }
  onMount(async () => {
    await checkApiHealth();
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
      font-size: 18px;
      font-weight: 400;
      background-color: #445544;
      font-family: "Noto Sans", sans-serif;
      color: #eee;
      border-radius: 3px;
      padding: 10px 20px;
      width: 300px;
      cursor: pointer;
      &:hover {
        background-color: #556655;
      }
    }
    h1 {
      font-family: "Sansita", sans-serif;
      margin: 20px 10px;
      text-align: center;
    }
    p {
      max-width: 600px;
    }
    .login-options {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
  .option__gotogooglelogin,
  .option__gotochat {
    background-color: #3a423c;
    color: #eee;
    border-radius: 10px;
    width: 300px;
    margin: 10px;
    padding: 30px;

    p {
      margin: 5px;
    }
  }
</style>

<div class="wrap">
  <h1>Welcome to the Live Chat Aggregator!</h1>
  <div class="login-options">
    <div class="option__gotogooglelogin">
      <p>
        To enable YouTube live chat you will first need to click on 'Log in with
        google'. logging in will allow the app to connect to your livestreams
        chat
      </p>
      <button
        type="button"
        on:click={() => {
          onYouTubeLoginClick();
        }}>
        Log in with google
      </button>
    </div>
    <div class="option__gotochat">

      <p>
        Alternatively you can go straight to the chat window if you're already
        authenticated with google or just want discord chat messages.
      </p>
      <button
        type="button"
        on:click={() => {
          onChatWindowButtonClick();
        }}>
        Go to chat window
      </button>
    </div>
  </div>
</div>
