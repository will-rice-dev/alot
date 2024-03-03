<script lang="ts">
  import { error } from "@sveltejs/kit";
import type { PageData } from "./$types";
  export let data: PageData;
</script>

<h1>Hello there</h1>
<p>
    {#await data.pops}
        Waiting...
    {:then}
        {#each data.pops as stick }
            <p>{stick.idea}</p>
        {/each}
    {:catch error}
        error.message
    {/await}
</p>