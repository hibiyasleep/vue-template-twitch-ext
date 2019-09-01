<template>
  <div>
    <p>
      Please allow identify sharing, to use this extension.
    </p>
    <p>
      <button @click="grant">requestIdShare()</button>
    </p>
  </div>
</template>

<script>

export default {
  methods: {
    grant() {
      this.$twitch.actions.requestIdShare()
    }
  }
}

</script>

<style lang="sass">

</style>
