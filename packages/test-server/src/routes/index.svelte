<script lang="ts">
    import {regularCounter} from "$stores/regularCounter";
    import {isolatedCounter} from "$stores/isolatedCounter";

    regularCounter.update(x => x + 1)
    isolatedCounter.update(x => x + 1)
</script>

<main>
    <h1>Regular vs isolated storage comparison</h1>
    <section>
        Regular storage value: <span id="regular">{$regularCounter}</span>
    </section>
    <section>
        Isolated storage value: <span id="isolated">{$isolatedCounter}</span>
    </section>
    <p>
        The values seem to be equal on every reload. But the values were rendered during SSR will differ.
        That is because in the browser context the stores are initialised with zeros and then increased by 1 on every
        reload
        while in the server context the initialization of regularCounter happens once for the entire lifetime of the
        server,
        thus the regularCounter's value keeps on increasing infinitely
    </p>
</main>

<style>
    main {
        @apply mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg;
        @apply pt-4 md:pt-[30vh];
        @apply text-center;
    }

    h1 {
        @apply text-5xl;
    }
</style>