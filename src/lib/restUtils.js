import store from '@/store';
import axios from 'axios';


function  callEndPoint (method, url, pathParams, queryParams, bodyParams, headerParams, formParams, cookieParams ) {

    let endPoint ;
    let qParams = {};
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
    }

    // Header Params
    if (headerParams){
        headerParams.map(function(v){
            if (v.example){
                hParams[v.name] = v.example;
            }
        });
    }

    //TODO: Deal with formParams and cookieParams later

    debugger;

    //baseUrl= store.state.scheme+ "://"+ store.state.host + store.state.basePath + "/";
    baseUrl= "http://10.21.83.83:8080/api";
    baseUrl= "'https://fakerestapi.azurewebsites.net";
    method = "get";
    endPoint="/Users";
    queryParams={};
    bodyParams={};
    hParams={};
    
    axios.request({
        method  : method,
        url     : "https://fakerestapi.azurewebsites.net/api/Users",
        //url     : endPoint,
        params  : queryParams,    // Query Params
        data    : bodyParams,     // Body Params
        headers : hParams,        // Header Params
    }).then(function (response) {
        console.log(response);
        debugger;
    })
    .catch(function (error) {
        console.log(error);
        debugger;
    });
    return endPoint;
}

export { callEndPoint }
