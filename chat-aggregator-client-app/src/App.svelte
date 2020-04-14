<script>
  import Router from "svelte-spa-router";

  import Home from "./routes/Home";
  import YouTubeAuthenticated from "./routes/YouTubeAuthenticated";
  import ChatWindow from "./routes/ChatWindow";

  const routes = {
    "/": Home,
    "/chat": ChatWindow,
    "/youtube-authenticated": YouTubeAuthenticated
  };
</script>

<Router {routes} />
