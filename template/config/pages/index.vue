<template>
  <div>
    <h1> {{ name }} </h1>
    <ul>
      <li
        v-for="(m, idx) in messages"
        :key="idx">
        \{{ m }}
      </li>
    </ul>
  </div>
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

<style lang="scss">

</style>
