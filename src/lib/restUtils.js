import axios from 'axios';
import store from '@/store';

export function callEndPoint (method, url, pathParams, queryParams, formParams, bodyParams, headerParams) {

    let baseUrl="";
    let endPoint = url;
    let qParams = {};
    let hParams = {};

    /* Deal with form data or blob or multipart later 
    // If request has form-data then set the content type in header
    if (formParams.length > 0 ){
        hParams['Content-Type']='multipart/form-data';
    }
    */


    // Path Params
    if (pathParams){
        pathParams.map(function(v){
            endPoint = endPoint.replace("{"+v.name+"}", v.example);
        });
    }

    // Query Params

    // Header Params
    if (headerParams){
        headerParams.map(function(v){
            if (v.example){
                hParams[v.name] = v.example;
            }
        });
    }

    baseUrl= store.state.scheme+ "://"+ store.state.host + store.state.basePath + "/";
    debugger
    axios({
        baseURL : baseUrl,
        method  : method,
        url     : endPoint,
        params  : queryParams,    // Query Params
        data    : bodyParams, // Body Params
        headers : hParams,    // Header Params
        /* Basic Auth
        auth: {
            username: 'janedoe',
            password: 's00pers3cret'
        },
        */  
    })
    .then(function (response) {
        console.log(response);
        debugger;
    })
    .catch(function (error) {
        console.log(error);
        debugger;
    });
    return endPoint;


}

