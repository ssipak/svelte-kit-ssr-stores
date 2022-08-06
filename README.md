## Purpose

Global state management library for Svelte Kit with SSR support.

## Installation

```shell
npm install svelte-kit-ssr-stores
```

## Usage

Say, we want to isolate a portion of the app state and make it accessible from components
that sit deep in the tree. We also want this portion of state be isolated on per request bases.

Wrapping built-in Svelte stores up with `defineSessionable` helper let us use it inside load functions,
components of any level of nesting, makes data inaccessible outside the current session scope.

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