import Vue from 'vue'
import Router from 'vue-router'
import AppShell from '@/components/AppShell.vue'
import AuthCode from '@/components/AuthCode.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/',
      redirect: function(to){
        return '/home';
      }
    },
    { path: '/home/:reloadSpec?' , name: 'AppShellWithSpec', component: AppShell, props: true},
    { path: '/oauth', name: 'AuthCode', component: AuthCode }

  ]
})
