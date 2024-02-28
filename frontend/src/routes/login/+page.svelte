<script lang="ts">
    import { enhance } from '$app/forms';
    export let form: { error?: string; } | null;
</script>

<div class="hero min-h-screen bg-base-200">
    <div class="hero-content flex-col lg:flex-row-reverse">
        <div class="text-center lg:text-left">
            <h1 class="text-5xl font-bold text-accent">Hey there lover!</h1>
        </div>
        <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form class="card-body" method="POST" action="/login" use:enhance>
                <div class="form-control">
                    <!-- svelte-ignore a11y-label-has-associated-control -->
                    <label class="Password">
                        <span class="label-text">Password</span>
                    </label>
                    <input type="password" placeholder="password" class="input input-bordered"
                         name="password" required />
                </div>
                {#if form?.error}<p>{form.error}</p>{/if}
                <div class="form-control mt-6">
                    <button class="btn btn-primary" type="submit">Login</button>
                </div>
            </form>
        </div>
    </div>
</div>