/* For Delayed Event Handler Execution */
function redirectToAuthorizationUrl (authorizationUrl, clientId, redirectUrl, responseType, scopes) {
    let randomStateId=Math.floor((1 + Math.random()) * 0x10000000000).toString(16);
    let authUrl = `${authorizationUrl}?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUrl}&state=${randomStateId}`;
    if (scopes){
        authUrl = authUrl + "&scope=" +scopes;
    }
    window.location.assign(authUrl);
}




export { redirectToAuthorizationUrl}
