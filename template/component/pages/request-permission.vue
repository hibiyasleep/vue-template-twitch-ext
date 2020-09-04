<template>
  <div>
    <p>
      {{#if i18n}}
        <span v-text="$t('message.permission')" />
      {{else}}
        Please allow identify sharing, to use this extension.
      {{/if}}
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

<style lang="scss">

</style>
