<template>
  <main :class="'twitch-color-mode-' + $store.state.context.theme">
    <router-view />
  </main>
</template>

<script>

</script>

<style lang="scss">
body {
  font-family: system-ui, sans-serif;
}

.twitch-color-mode-dark {
  color: #e0e0e0;
}
</style>
