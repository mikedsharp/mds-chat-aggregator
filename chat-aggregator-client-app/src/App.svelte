<script>
  import { onMount } from "svelte";
  const worked = true;
  let authCode = null;
  let authBody = null;
  const chatBotClientId = "699275721402613790";
  const chatBotclientSecret = "wbAO69dxjisdT9bdFIJRA8UF_DeKFVfL";
  const redirectUrl = encodeURIComponent("http://localhost:1234");
  const discordUrl = `https://discordapp.com/api/oauth2/authorize?client_id=${chatBotClientId}&permissions=0&redirect_uri=${redirectUrl}&response_type=code&scope=bot%20messages.read`;
  const tokenEndpoint = "https://discordapp.com/api/oauth2/token";
  const accessToken = null;
  onMount(async () => {
    const matches = window.location.href.match(/code=()\w+/);
    if (matches.length > 0) {
      // store authorization code
      authCode = matches[0].replace("code=", "");
      const searchParams = new URLSearchParams();
      searchParams.set("client_id", chatBotClientId);
      searchParams.set("client_secret", chatBotclientSecret);
      searchParams.set("grant_type", "authorization_code");
      searchParams.set("code", authCode);
      searchParams.set("redirect_uri", "http://localhost:1234");
      searchParams.set("scope", "messages.read bot");

      const authResponse = await fetch(tokenEndpoint, {
        method: "POST",
        body: searchParams,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });
      authBody = JSON.stringify(await authResponse.json());
    }
  });

  function onDiscordLogin(event) {
    window.location.href = discordUrl;
  }
</script>

<style>
  h1 {
    color: hotpink;
  }
</style>

{#if !authCode}
  <div class="login-discord">

    <button
      type="button"
      on:click={event => {
        onDiscordLogin(event);
      }}>
      Login to get discord chat
    </button>
  </div>
{:else}
  <div>
    <h1>User has auth code: {authCode}</h1>
    <h2>Auth Body:</h2>
    <p>{authBody}</p>
  </div>
{/if}
