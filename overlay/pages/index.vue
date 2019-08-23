<template>
  <ul>
    <li
      v-for="(m, idx) in messages"
      :key="idx">
      {{ m }}
    </li>
  </ul>
</template>

<script>

export default {
  computed: {
    messages() {
      return this.$store.state.messages
    }
  }
}

</script>

<style lang="sass">

</style>
