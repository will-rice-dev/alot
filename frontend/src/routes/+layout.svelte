
<script>
  import "tailwindcss/tailwind.css";
  import Navigation from "../components/Navigation.svelte";
  import { page } from "$app/stores"
</script>

{#if $page.url.pathname != "/login"}
  <Navigation />
{/if}
<slot />

