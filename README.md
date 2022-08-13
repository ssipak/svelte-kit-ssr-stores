## Svelte Kit SSR Stores

The global state management library for Svelte Kit with the SSR support.

## Installation

```shell
npm install svelte-kit-ssr-stores
```

## Usage

Say, we want to isolate a portion of the app state and make it accessible in components throughout the app.
Svelte stores serve this goal well in the browser context.
Unfortunately on the server side, an exported store will be shared among all the request handlers,
which means that potentially sensible user data will be accessible to all concurrent and consequent request. 

As an easy and convenient solution this library provides `defineSessionable` helper.
It converts a factory method into a callable Proxy object that provides access to all the fields and methods of
an object that is created by the factory method and bound to the current session.

### Basic store example

```ts
// /src/stores/counter.ts

export const counter = defineSessionable({}, () => writable(0));
```

```sveltehtml
<!-- /src/routes/counter.svelte -->

<script lang="ts">
    // Use counter as if it was a normal Svelte store
    import {counter} from '/src/stores/counter'

    function increase() {
        counter.update(x => x + 1)
    }
</script>

<button on:click={increase}>Counter: {$counter}</button>
```

### A store with a dependency and the load function

```ts
// /src/stores/users.ts
export const usersStore = defineSessionable({}, () => {
    const users = writable([])

    async function loadUsers({fetch}: LoadEvent) {
        users.set(await fetch('https://your.api/getUsers'))
    }

    return {users, loadUsers}
})
```

```ts
// /src/stores/usersCount.ts
export const usersCountStore = defineSessionable({usersStore}, ({usersStore}) => {
    const usersCount = derived(usersStore.users, users => users.length)
    
    return {usersCount}
})
```

```sveltehtml
<!-- /src/routes/users.svelte -->

<script lang="ts" context="module">
    // ...
    import {usersStore} from '/src/stores/usersStore'

    export const load = loadWithSessionables({usersStore}, ({usersStore}, evt: LoadEvent) => {
        usersStore.load(evt)
    })
</script>

<script lang="ts">
    import {usersCountStore} from '/src/stores/usersCountStore'
    
    const {usersCount} = usersCountStore
</script>

<div>Users count: {usersCount}</div>
```

## Alternatives

[svelte-kit-isolated-store](https://github.com/x3rAx/svelte-kit-isolated-stores)
