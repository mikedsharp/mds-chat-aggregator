<script>
  import io from "socket.io-client";
  const socket = io("http://localhost:9000");
  let messages = [];
  let message = "";
  socket.on("event", function(data) {
    messages = [...messages, data.message];
  });
</script>

<h1>This is home</h1>
<ul>
  {#each messages as message}
    <li>{message}</li>
  {/each}
</ul>
