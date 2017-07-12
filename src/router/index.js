import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/index'
import NodeAni from '@/pages/nodeAni/index'
// import Demo from '@/pages/nodeAni/index'
// import Demo from '@/pages/nodeAni/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/demo',
      name: 'nodeAni',
      component: NodeAni
    }
  ]
})
