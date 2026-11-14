<script>
  import { onMount } from "svelte";
  import { auth, initKeycloak, login, logout } from "./lib/keycloack.svelte";

  onMount(async () => {
    await initKeycloak();
  });
</script>

<main>
  {#if !auth.initialized}
    <p class="loading">Loading authentication...</p>
  {:else}
    <div class="auth-box">
      {#if auth.authenticated}
        <h2>Welcome back, {auth.userProfile?.firstName || "User"}!</h2>
        <p>Email: {auth.userProfile?.email}</p>
        <button onclick={logout}>Logout</button>
      {:else}
        <h2>You are not logged in</h2>
        <button onclick={login}>Log In with Keycloak</button>
      {/if}
    </div>
  {/if}
</main>

<style>
  main {
    font-family: sans-serif;
    padding: 2rem;
  }
  .loading {
    color: #666;
  }
  button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
  }
  button:hover {
    background-color: #0056b3;
  }
</style>
