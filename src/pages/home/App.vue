<template>
  <div class="wrapper">
    <section class="category" v-for="(item, type) in listConfig" :key="type">
      <div class="title">{{type}}</div>
      <ul class="list">
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
<style lang="scss" scoped>
  .wrapper{
    margin-top: 60px; 
    font-size: 40px;
    text-align: center;
  }
  .category{
    margin-bottom: 20px; 
  }
  .title{
    font-size: 40px;
    text-align: center;
  }
  .list{
    list-style-type: none;
    padding: 0;
    li {
      display: inline-block;
      margin: 0 10px;
    }
    a {
      color: #42b983;
    }
  }
</style>
