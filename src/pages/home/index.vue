<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <section v-for="(item, type) in listConfig" :key="type">
      <h2>{{type}}</h2>
      <ul>
        <li v-for="demo in item" :key="demo.path">
          <router-link :to="demo.path">{{demo.name}}</router-link>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import config from '@/config/list'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome',
      listConfig: config
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
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
