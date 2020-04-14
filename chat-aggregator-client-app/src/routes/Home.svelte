<script>
  import io from "socket.io-client";
  import { format } from "date-fns";
  const socket = io("http://localhost:9000");
  let messages = [];
  let message = "";
  socket.on("event", function(data) {
    messages = [...messages, data];
  });
</script>

<style lang="scss">
  ul {
    margin: 0;
    padding: 0;
    background-color: #eee;
    border: 1px solid #dcdcdc;
    height: 100%;
    overflow-y: auto;
    li {
      padding: 10px 2px;
      list-style-type: none;
      margin: 0;
      font-family: Verdana, Geneva, Tahoma, sans-serif;
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      color: #000;
      b {
        margin-right: 6px;
        color: #777;
      }
      img {
        display: flex;
        width: 32px;
        height: 32px;
        float: left;
        margin: 0 10px;
        border-radius: 50%;
      }
      span {
        margin-top: 3px;
      }
    }
  }
</style>

<ul>
  {#each messages as message}
    <li>
      <img alt="user avatar" src={message.avatar} />
      <span>
        <b>{message.username}</b>
        {message.message}
      </span>
    </li>
  {/each}
</ul>
