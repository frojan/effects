<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import Demo from 'index'
import dd from 'pixi'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App 222'
    }
  },
  created () {
    /* eslint-disable no-new */
    new Demo()
    dd.name = 12
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
