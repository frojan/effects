<template>
  <div class="container">
    <div class="game-area"></div>
  </div>
</template>

<script>

export default {
  name: 'hello',
  data () {
    return {
    }
  },
  mounted () {
    /* eslint-disable no-new */
    // let Demo = require(`@/pages/${this.path}/main`).default
    let path = this.$route.params.path
    import(`@/pages/game/${path}/main`).then((module) => {
      let Demo = module.default
      new Demo()
    })
  }
}
</script>

<style scoped>

</style>
