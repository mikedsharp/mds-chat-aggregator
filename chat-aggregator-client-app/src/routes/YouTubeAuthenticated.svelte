<script>
  import { push } from "svelte-spa-router";

  function onChatWindowButtonClick() {
    push("/chat");
  }
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
  <h1>You are now authenticated with YouTube!</h1>
  <button
    type="button"
    on:click={() => {
      onChatWindowButtonClick();
    }}>
    Continue to chat window
  </button>
</div>
