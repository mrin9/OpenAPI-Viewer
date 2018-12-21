import Vue from 'vue'
import Router from 'vue-router'
import AppShell from '@/components/AppShell.vue'

Vue.use(Router)

const router = new Router({
  //mode: 'history',
  routes: [
    { 
      path: '/',
      redirect: function(to){
        return 'load';
      }
    },
    { path: '/load/:specUrl?' , name:'load', component: AppShell },
    { path: '/reload', name: 'reload', component: AppShell },
  ]
});

router.beforeEach((to, from, next) => {
  debugger;
  if (to.path.startsWith("/load")){
    if (!to.params.specUrl){
      let specUrl="";
      specUrl="https://api.apis.guru/v2/specs/bitbucket.org/2.0/swagger.json";//All auth type
      //specUrl="http://developer.twinehealth.com/swagger.json";
      //specUrl= "https://petstore.swagger.io/v2/swagger.json";
      //specUrl= "http://10.21.83.83:8080/api/swagger.json";
      //specUrl= "https://raw.githubusercontent.com/APIs-guru/unofficial_openapi_specs/master/github.com/v3/swagger.yaml", //large spec
      //specUrl= "https://fakerestapi.azurewebsites.net/swagger/docs/v1";
      //specUrl= "https://api.apis.guru/v2/specs/twilio.com/2010-04-01/swagger.json";  //xml responses
      //specUrl="https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v3.0/uspto.yaml"; // OpenAPI 3 with examples
      //specUrl="https://api.apis.guru/v2/specs/stackexchange.com/2.0/swagger.json";
      //specUrl="https://api.apis.guru/v2/specs/cisco.com/0.0.3/swagger.json"; // Has oAuth2 instructions
      router.push(`/load/${encodeURIComponent(specUrl)}`)
    }
  }
  next();
  
});

export default router;