<script>
  import io from "socket.io-client";
  import { format } from "date-fns";
  import * as animateScroll from "svelte-scrollto";
  import { onDestroy, onMount } from "svelte";
  const socket = io("http://localhost:9000");
  let messages = [];
  let message = "";
  let chatLength = 0;
  // there will be a better way of doing this in svelte... I do not know it yet though.
  let interval;
  onMount(() => {
    interval = window.setInterval(() => {
      const chatWindowElm = document.getElementById("chat-window");
      chatWindowElm.scrollTop = chatWindowElm.offsetHeight;
    }, 500);
    socket.on("event", function(data) {
      messages = [...messages, data];
      animateScroll.scrollToBottom({ element: "#chat-window" });
    });
  });
  onDestroy(() => {
    interval();
  });
</script>

<style lang="scss">
  .chat-window {
    margin: 0;
    padding: 0;
    background-color: #eee;
    border: 1px solid #dcdcdc;
    height: 100%;
    overflow-y: auto;
    .message {
      padding: 10px 2px;
      list-style-type: none;
      margin: 0;
      font-family: Verdana, Geneva, Tahoma, sans-serif;
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      color: #000;
      .username {
        margin-right: 6px;
        color: #777;
      }
      .avatar {
        display: flex;
        width: 32px;
        height: 32px;
        min-width: 32px;
        min-height: 32px;
        float: left;
        margin: 0 10px;
        border-radius: 50%;
      }
      .message-text {
        margin-top: 3px;
        word-break: break-word;
        word-wrap: break-word;
      }
    }
  }
</style>

<ul class="chat-window" id="chat-window">
  {#each messages as message}
    <li class="message">
      <img class="avatar" alt="user avatar" src={message.avatar} />
      <span class="message-text">
        <b class="username">{message.username}</b>
        {message.message}
      </span>
    </li>
  {/each}
</ul>
