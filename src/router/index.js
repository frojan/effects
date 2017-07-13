import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/App'
import Game from '@/pages/game/App'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/:path',
      name: 'game',
      component: Game
    }
  ]
})
