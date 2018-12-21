import Vue from 'vue'
import Router from 'vue-router'
import AppShell from '@/components/AppShell.vue'

Vue.use(Router)

export default new Router({
  //mode: 'history',
  routes: [
    { 
      path: '/',
      redirect: function(to){
        return 'home';
      }
    },
    { path: '/home' , name: 'AppShellWithSpec', component: AppShell },
    { path: '/home/reload', name: 'AppShellWithSpec', component: AppShell },
    { path: '/home/load/:specUrl?' , name: 'AppShellWithSpec', component: AppShell },
  ]
})
