<template>
  <div> 
    <div class="sw-security-title"> AUTHENTICATION</div>
    <table style="margin-top:5px;line-height:16px;width:auto" class="sw-table">
      <tr>
        <th >Type </th>  
        <th> Authentication Procedure </th>  
      </tr>  
      <tr v-for="(scheme,key) in schemes" :key="key">
        <td class="sw-markdown-block" style="width:auto"> 
          <div class="sw-security-sub-title"> {{scheme.type}} {{scheme.scheme?scheme.scheme:""}} </div>
          <span v-html="$marked(scheme.description?scheme.description:'')">  </span>   
        </td>  

        <!-- If scheme is apiKey -->
        <td v-if="scheme.type==='apiKey'">
          If Activated, all requests will send <code>'{{scheme.name}}'</code> in <code>'{{scheme.in}}'</code> with the given value
          <div style="margin:5px 0 10px 0">
            <input type="text" class="sw-small" style="width:205px; margin-right:5px" placeholder="api-token" v-model="apiToken">
            <button class="sw-btn sw-primary sw-small" @click="onActivateSecurityScheme(scheme)" >ACTIVATE</button>
          </div>  
        </td>  
        <!-- If scheme is http -->
        <td v-else-if="scheme.type==='http' && scheme.scheme ==='basic' ">
          <!-- Basic or Bearer -->
            If Activated, all requests will send <code>'Authorization'</code> 
            header that contains the word  <code>'Basic'</code> word followed by a space and a base64-encoded string username:password.
            <div style="margin:5px 0 10px 0">
              <input type="text" class="sw-small" style="width:100px" placeholder="username" v-model="username">
              <input type="text" class="sw-small" style="width:100px; margin:0 5px;" placeholder="password" v-model="password">
              <button class="sw-btn sw-primary sw-small"  @click="onActivateSecurityScheme(scheme)">ACTIVATE</button>
            </div>
        </td>
        <td v-else-if="scheme.type==='http' && scheme.scheme ==='bearer' ">
            If Activated, all requests will send <code>'Authorization'</code> 
            header that contains the word  <code>'Bearer'</code> word followed by a space and a Token String.
            <div style="margin:5px 0 10px 0">
              <input type="text" class="sw-small" style="width:205px; margin-right:5px" placeholder="bearer-token" v-model="bearerToken">
              <button class="sw-btn sw-primary sw-small"  @click="onActivateSecurityScheme(scheme)">ACTIVATE</button>
              <div style="font-size:11px; margin-top:2px;" class="sw-gray-small-text">Once activated, this token will be sent in 'Authorization' header of every request </div>
            </div>  
        </td>  
        <!-- If scheme is oauth2 -->
        <td v-else-if="scheme.type==='oauth2'"> 
          <span v-for="(flow,flowName) in scheme.flows" :key="flowName">
            <div v-if="flow.authorizationUrl"> <b>Auth URL:</b> <code style="color:#999"> {{flow.authorizationUrl}}</code></div>
            <div v-if="flow.tokenUrl"> <b>Token URL: </b><code style="color:#999"> {{flow.tokenUrl}} </code></div>
            <div v-if="flow.refreshUrl"> <b>Refresh URL: </b><code style="color:#999"> {{flow.refreshUrl}}</code></div>
            <template v-if="flow.scopes">
              <b>Scopes:</b>
              <code style="color:#999" v-for="(scope, scopeName) in flow.scopes" :key="scopeName"> 
                {{scopeName}}, 
              </code>
            </template>  
            <div style="margin:5px 0 10px 0">
              <input type="text" class="sw-small" style="width:100px" placeholder="client-id" v-model="clientId">
              <input type="text" class="sw-small" style="width:100px; margin:0 5px;" placeholder="client-secret" v-model="clientSecret">
              <button class="sw-btn sw-primary sw-small"  @click="onOAuth(flowName, flow)">ACTIVATE</button>
            </div>
            <div v-if="flow.authorizationUrl"> <b>Directions: </b> Register this client with <code>{{ getOAuthBaseUrl(flow.authorizationUrl) }}</code><br/></div>
            <ul>
                <li> Obtain a <code>client-id</code> and <code>client-secret</code> </li>
                <li> During registration, specify callback(redirect) url as <code>{{ browserLocation.origin+"/oauth" }}</code></li>
            </ul>
          </span>
        </td>  
        <td v-else> 
          {{ scheme.type }}
        </td>  
      </tr>  
      <tr>
        <td>
          other
        </td> 
        <td>
            To cover other authentication cases, you can provide a custom request-header and a value that will be attached to all the requests.
            <br/><br/>
            <input type="text" class="sw-small" style="width:100px" placeholder="custom-header" v-model="customHeader">
            <input type="text" class="sw-small" style="width:100px; margin:0 5px;" placeholder="custom-token" v-model="customToken">
            <button class="sw-btn sw-primary sw-small"  @click="onActivateSecurityScheme('other')">ACTIVATE</button>
        </td>
      </tr>

    </table>

  </div>
</template>

<script>
  import store from '@/store';
  import { redirectToAuthorizationUrl } from '@/lib/authUtils';
  import { getBaseUrlFromUrl } from '@/lib/utils';


  export default {
    props: {
      schemes:{
        type: Object
      }
    },

    data:function(){
      return {
        username:"",
        password:"",
        apiToken:"",
        bearerToken:"",
        customHeader:"",
        customToken:"",
        clientId:"",
        clientSecret:"",
        browserLocation:location
      }
    },

    methods:{
      onActivateSecurityScheme(){
        
      },

      onOAuth(flowName, flow){
        let redirectUrl = location.origin+"/oauth";
        let responseType="token"; //"code";
        let scopes="";
        store.commit("oAuthTokenUrl", flow.tokenUrl) // Store this as it will needed after redirection
        /*
        for (let key in flow.scopes){
          scopes = scopes + " " + key;
        }
        */
        redirectToAuthorizationUrl(flow.authorizationUrl, this.clientId, redirectUrl, responseType, scopes);
      },

      getOAuthBaseUrl(authorizationUrl){
        return getBaseUrlFromUrl(authorizationUrl);
      }

    },


    mounted(){

    },
    components: {
    }
  }
</script>

<style scoped lang="scss">
@import "~@/assets/styles/_vars.scss";
  .sw-security-title{
    font-size:20px;
    margin-bottom: 8px;
    color:$sw-blue-text;
  }
  .sw-security-sub-title{
    font-size:12px;
    margin-bottom: 4px;
    color:$sw-blue-text;
    font-weight:bold;
  }



  
</style>

