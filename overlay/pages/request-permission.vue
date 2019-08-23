<template>
  <div>
    <p>
      익스텐션을 사용하기 위해 Twitch ID의 접근을 허용해주세요.
    </p>
    <p>
      <button @click="grant">허용하기</button>
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
