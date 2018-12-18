import store from '@/store';
import axios from 'axios';


function  callEndPoint (method, url, pathParams, queryParams, reqBodyMimeType, requestBody, headerParams, formParams, cookieParams ) {
    let endPoint= url;
    let qParams = {};
    let updatedQParams;
    let hParams = {};


    // Path Params
    if (pathParams){
        pathParams.map(function(v){
            endPoint = endPoint.replace("{"+v.name+"}", v.example);
        });
    }
    // Query Params
    if (queryParams){
        queryParams.map(function(v){
            if (v.example){
                qParams[v.name] = v.example;
            }
        });
        //updatedQParams = parseQueryStringArrayParams(qParams);
        //debugger;
    }

    // Header Params
    if (headerParams){
        headerParams.map(function(v){
            if (v.example){
                hParams[v.name] = v.example;
            }
        });
    }

    // Additional Header Param for apiKey/basic/bearer tokens
    if (store.state.reqTokenType==='bearer' ){
        hParams['Authorization'] = 'Bearer ' + store.state.reqToken;
    }
    if (store.state.reqTokenType==='basic' ){
        hParams['Authorization'] = 'Basic ' + store.state.reqToken; // reqToken will be Base64 encoded 'usr:pwd'
    }
    else if (store.state.reqTokenType==='apikey' && store.state.reqSendTokenIn==='header'){
        hParams[store.state.reqHeader] = store.state.reqToken;
    }

    // Request Body
    let reqBodyContent ="";
    if (Object.keys(requestBody).length === 0 || Object.keys(requestBody[reqBodyMimeType]).length===0){
        //hParams['Content-Type'] = 'application/json';
        reqBodyContent = "";
    }
    else{
        hParams['Content-Type'] = reqBodyMimeType; //TODO: check if its a valid mime type
        if (requestBody[reqBodyMimeType].examples[0]){
            if (reqBodyMimeType.toLowerCase().includes("json") ){
                try{
                    reqBodyContent = JSON.parse(requestBody[reqBodyMimeType].examples[0]);
                }
                catch{
                    reqBodyContent="";
                }
            }
            else{
                reqBodyContent = requestBody[reqBodyMimeType].examples[0];
            }
        }
    }
    //TODO: Deal with formParams and cookieParams later


    endPoint= store.state.selectedApiServer.replace(/^\/|\/$/g, '') +"/" + endPoint.replace(/^\/|\/$/g, '');
    return axios.request({
        'method'  : method,
        'url'     : endPoint,
        'params'  : qParams,    // Query Params
        'data'    : reqBodyContent, // Body Params
        'headers' : hParams,        // Header Params
        'paramsSerializer': qParams => serealizeQueryString(qParams) 
    });
    //return endPoint;
}

function getOauthToken(tokenUrl, clientId, clientSecret, authCode, redirectUri){
    let finalTokenUrl = `${tokenUrl}?grant_type=authorization_code&client_id=${clientId}&client_secret=${clientSecret}&code=${authCode}&redirect_uri=${redirectUri}&code_verifier=abcd&scope=repository`;

    console.log("before making POST call")
    let postData = {
        "grant_type":"authorization_code",
        "client-id":clientId,
        "client_secret":clientSecret,
        "code":authCode,
        "redirect_uri":redirectUri
    }

    
    axios.request({
        method: 'post',
        url: finalTokenUrl,
        headers: {
             accept: 'application/json'
        }
      }).then((response) => {
        console.log("Success POST call auth-code")
        const accessToken = response.data.access_token
      });
    
      /*
      axios.request({
        "method": 'post',
        "url": tokenUrl,
        "data":postData,
        "headers": {
            "accept": 'application/json'
        }
      }).then((response) => {
        console.log("Success POST call auth-code")
        debugger;
        const accessToken = response.data.access_token
      });
      */



}

// To convert an Object to QueryString
function serealizeQueryString(params) {
    const keys = Object.keys(params);
    let options = '';
  
    keys.forEach((key) => {
      const isParamTypeObject = typeof params[key] === 'object';
      const isParamTypeArray = isParamTypeObject && (params[key].length >= 0);
  
      if (!isParamTypeObject) {
        options += `${key}=${params[key]}&`;
      }
  
      if (isParamTypeObject && isParamTypeArray) {      
        params[key].forEach((element) => {
          options += `${key}=${element}&`;
        });
      }
    });
    return options ? options.slice(0, -1) : options;
};

function parseQueryString(queryString, key){
    var vars = queryString.split('&');
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == key) {
            return decodeURIComponent(pair[1]);
        }
    }
}

export { callEndPoint, getOauthToken, serealizeQueryString, parseQueryString }
