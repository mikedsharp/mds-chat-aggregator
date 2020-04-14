<script>
  import Router from "svelte-spa-router";

  import Home from "./routes/Home";
  import Foo from "./routes/Foo";

  const routes = {
    "/": Home,
    "/foo": Foo
  };
</script>

<Router {routes} />
