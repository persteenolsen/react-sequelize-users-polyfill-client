import config from 'config';
import { accountService } from '@/_services';

export const fetchWrapper = {
	getPing,
	get,
    post,
    put,
    delete: _delete
}

// Sending a Ping to the Node Server and gets the Pong by calling the function "handleResponse" which returns the 
// message / error back to index.js by account.service.js
function getPing(url) {
	
	console.log( 'FETCH-WRAPPER => Sending the Ping to the Node Server ... ' ); 
	
    const requestOptions = {
        method: 'GET'
    };
    return fetch(url, requestOptions).then(handleResponse);
}


/*
// Note: Not in use because this function is only a test display the return value directly from the server !
function getPing(url){
	 const requestOptions = {
        method: 'GET'
     };
	  fetch(url, requestOptions )
	 .then(response => response.json())
	 .then(pong => { 
	  
     // To test if the server was called !	  
	 console.log( 'FETCH-WRAPPER: Pong from the Node Server: ' + pong.message ); 
	 
	 // No need to return a value because it is only a wapeup call to the server from idle mode on Azure
	 // return pong.message;
	 return;
	 }); 
 }
*/


function get(url) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(url)
    };
    return fetch(url, requestOptions).then(handleResponse);
}


function post(url, body) {
	
	//console.log( 'FETCH-WRAPPER => posting url and body ... ' + JSON.stringify( body )); 
		
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader(url) },
        credentials: 'include',
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(handleResponse);
}



function put(url, body) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeader(url) },
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(handleResponse);    
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(url)
    };
    return fetch(url, requestOptions).then(handleResponse);
}

// helper functions

function authHeader(url) {
    // return auth header with jwt if user is logged in and request is to the api url
    const user = accountService.userValue;
    const isLoggedIn = user && user.jwtToken;
    const isApiUrl = url.startsWith(config.apiUrl);
    if (isLoggedIn && isApiUrl) {
        return { Authorization: `Bearer ${user.jwtToken}` };
    } else {
        return {};
    }
}

function handleResponse(response) {
	
		
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        
        if (!response.ok) {
            if ([401, 403].includes(response.status) && accountService.userValue) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                accountService.logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}