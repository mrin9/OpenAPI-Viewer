import store from '@/store';
import axios from 'axios';


function  callEndPoint (method, url, pathParams, queryParams, reqBodyMimeType, requestBody, headerParams, formParams, cookieParams ) {
    let endPoint= url;
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

    // Request Body
    let reqBodyContent ="";
    if (Object.keys(requestBody).length === 0 || Object.keys(requestBody[reqBodyMimeType]).length===0){
        //hParams['Content-Type'] = 'application/json';
        reqBodyContent = "";
    }
    else{
        hParams['Content-Type'] = reqBodyMimeType; //TODO: check if its a valid mime type

        if (reqBodyMimeType.toLowerCase().includes("json") ){
            reqBodyContent = JSON.parse(requestBody[reqBodyMimeType].examples[0]);
        }
        else{
            reqBodyContent = requestBody[reqBodyMimeType].examples[0];
        }
    }
    //TODO: Deal with formParams and cookieParams later


    endPoint= store.state.selectedApiServer.replace(/^\/|\/$/g, '') +"/" + endPoint.replace(/^\/|\/$/g, '');
    axios.request({
        method  : method,
        url     : endPoint,
        params  : queryParams,    // Query Params
        data    : reqBodyContent, // Body Params
        headers : hParams,        // Header Params
    }).then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
    return endPoint;
}

export { callEndPoint }
