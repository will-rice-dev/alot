<script>
    import { onMount } from "svelte";
    let password = '';
  
    const handleSubmit = async () => {
        try {
            const response = await fetch('http://127.0.0.1:3000/v1/login', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password })
        });

        console.log(response);
      if (response.status === 200) {
        // Password is correct, navigate to the main page
        window.location.href = '/main';
      } else {
        alert('Incorrect password. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred during login. Please try again.');
    }
  };
  </script>

<div class="hero min-h-screen bg-base-200">
    <div class="hero-content flex-col lg:flex-row-reverse">
        <div class="text-center lg:text-left">
            <h1 class="text-5xl font-bold text-accent">Hey there lover!</h1>
        </div>
        <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form class="card-body">
                <div class="form-control">
                    <!-- svelte-ignore a11y-label-has-associated-control -->
                    <label class="Password">
                        <span class="label-text">Password</span>
                    </label>
                    <input type="password" placeholder="password" class="input input-bordered"
                         bind:value={password} required />
                </div>
                <div class="form-control mt-6">
                    <button class="btn btn-primary" on:click={handleSubmit}>Login</button>
                </div>
            </form>
        </div>
    </div>
</div>