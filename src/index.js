import React from 'react';
import { Router } from 'react-router-dom';
import { render } from 'react-dom';

import { history } from './_helpers';
import { accountService } from './_services';
import { App } from './app';

// Note: Using an Alias in Webpack
import 'styles/index.scss';

// Note: Give a wake up ping to the server ( at Azure ) from the idle mode and get the response value "hello" in x.message !
 accountService.pingServer()
 .then( pong => {
	  
	  // Take a look at the Crome Developer Console 
	  console.log( 'INDEX => Pong from the Node Server: ' + pong.message );
	 });

// Starting the App  !
startApp(); 

// NOTE: IF a User is logged in and makes a Page Refresh by the Browser the below block of code try to generate Refresh Tokens again
// Remember a Page Refresh by the Browser normally load all JS again and would stop the JS Timer for generation of Refresh Tokens !  
const user = accountService.userValue;
      if (user) {
	     
         console.log( 'INDEX => Calls the Refresh Tokens because the User : ' + JSON.stringify( user.firstName ) + ' is logged in !');
		 accountService.refreshToken();
	} 

function startApp() { 
    render(
        <Router history={history}>
            <App />
        </Router>,
        document.getElementById('app')
    );
}

// Note: Before npm run build the statement module.hot.accept(); could / should to be disabled / comment out !!!
// In Webpck HotModuleReplacementPlugin() is used to set hot to true. 
// This way the browser dont need to reload the entire page when changing  file !
// Note: Needed here - in contrast to Vue.js  !!
 if (module.hot) {
    module.hot.accept();
 }


