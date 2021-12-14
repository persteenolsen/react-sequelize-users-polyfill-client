import React from 'react';


class AboutPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
                   
        };
    }

    componentDidMount() {
     
    }

    render() {

        return (
         
		   <div className="container">
                        
			<div className="row">
                            
			 <div className="col-xs-auto col-md-auto" >
		                     
			  <br/> 
			  <h3>Description</h3>
           
               This React SPA Client work together with a secure Node.js Express Web API using Sequelize ORM and Refresh and JWT access tokens serving as a Role based Membership System. Some older Browsers are partly supported like IE 11.
			   <br/><br/>

			   <b>Last updated</b>
			   <ul>
				  <li>14-12-2021</li>
			   </ul>

			   <b>GitHub</b>
			   <ul>
			     <li><a href="https://github.com/persteenolsen/react-sequelize-users-polyfill-client" target="_blank">The React SPA Client - The frontend</a></li>
				 <li><a href="https://github.com/persteenolsen/node-express-sequelize-users-api" target="_blank">The Web API - The backend</a></li>
			   </ul>
              	
             
			   <b>Main functionality of Users</b>
			   <ul>
			    <li>Users are able to register an account and after verify the email, the users will be able to login to the system</li>
			    <li>After a successfully login the users can update own profiles</li>
			    <li>The users can receive new passwords by the forgot password functionality by reseting their password before a given time like 24 hours</li>
			   </ul>
			  
			   <b>Main functionality of Administrators</b>
			   <ul>
			    <li>Administrators have access to the same functionality as the users</li>
			    <li>In addition Administrators are able to list, create, update and delete the users</li>
			   </ul>
			
               <b>Technology used for implementing authentication and security</b>        
               <ul>
             	 <li>The Passwords of the users and administrators are encrypted by BCRYPT before stored in the database</li>
                 <li>The system is using a JSON Web Token ( JWT ) for access to the secure endpoints of the Web API after a successfully authentication</li>
				 <li>Authentication is implemented with Refresh tokens and JWT access tokens ( expires after 15 minutes ). The refresh token will create a new JWT access token after 15 minutes and the User will be kept logged in even after the 15 minutes durarion of the JWT access token</li> 
				 <li>The Node backend have the functionally of using a Refresh Tokens placed in a HTTP ONLY Cookie( expires after 7 days ). 
				 The Refresh tokens will be revoked / replaced by a new Refresh token after creating a new JWT access tokens every 15 minutes ( duration of the JWT access token ). This is called <i>Refresh Token Rotation</i> </li>
				 <li>Note: The User is able to stay logged if / when using Refresh the page by the Browser. The timer for generate new Refresh tokens will then be started up at the main index.js. The localStorage is used as well by this React client for making more logic!</li>
				 <li>The use of Refresh Tokens can be disabled by a few steps mainly by the frontend and backend if wanted</li>
				 <li>The use of HTTP Only Cookies helps prevent the security threat <i>Cross-site scripting ( XSS )</i></li>
				 <li>The use of the technique known as Refresh Token Rotation which increases security by reducing the lifetime of refresh tokens</li>
			     <li>The Web API is secured by CORS allowing only the subdomain containing the React SPA client making HTTPS request</li>
				 <li>Frontend validation</li>
				 <li>Joi Schema for backend validation to controle form input by removing whitespaces, 
					 allowing only limited length of input, letters and numbers only ...</li>
                 <li>The above security is making the Web API and the data secure for the users of the system</li>
               </ul> 
          

               <b>Technology and hosting used for the React SPA client - The frontend</b>  
               <ul>
				<li>The frontend are representing the V for Views due to the MVC pattern</li>
                <li>React, HTML and CSS</li>
				<li>Mainly JavaScript ES5, ES6 and ES7 but in some cases up to ES10</li>
				<li>Formik and Yup for frontend form input validation</li>
                <li>Traditionel Bootstrap 4 by CDN for the responsive design</li>
	            <li>Manuel configuration of the Webpack 4 serving as a module bundler</li>
			    <li>Babel for transpiling JavaScript React ES6 to JavaScript ES5 ready for browsers</li>
			    <li>React BrowserRouter for navigation</li>
                <li>Hosted at a traditional Webhotel as a ES5 bundle and a index.html loading the Bootstrap by CDN</li>
              </ul>
          
		      <b>Technology, structure and hosting used for the Node.js Web API - The backend</b>  
              <ul>
               <li>Node.js and Express are used for the Web API backend</li>
			   <li>Sequelize ORM for mapping Models towards Database tables</li>
			   <li>Nodemailer for sending emails according to verify email and forgot password</li>
			   <li>Validation is implmented by using the Sequelize ORM functionality as well as other validation logic</li>
		       <li>Mainly JavaScript ES5, ES6 and ES7 but in some cases up to ES10</li>
			   <li>Models / Classes are used for a better overview and more clear syntax of the code</li>
			   <li>The MVC pattern is implemented by file structure representing a Model, Controllers and Services</li>
			   <li>The Views of the MVC pattern are represented by the React frontend</li>
			   <li>Hosted as a Cloud Service at Micosoft Azure App Service on a free service plan using Windows and iisnode</li>
              </ul>
          
		      <b>Documentation of the API</b>  
		     <ul>
		       <li>Swagger</li>
		     </ul>
			 
		     <b>Type of database</b>  
		     <ul>
		       <li>MySQL</li>
		     </ul>
			         
		     <b>Texteditor</b>  
		     <ul>
              <li>Visual Studio Code</li>
             </ul>

			 <b>Versions for the development stack of the Membership system</b>  
		     <ul>
              <li>React 16.8.6 for the frontend client</li>
			  <li>Bootstrap 4.4.1 for the responsive design of the frontend delivered by CDN</li>
			  <li>Node.js 8.9.4 and Express 4.16.3 for the backend Web API</li>
			  <li>Webpack 4.29.6 for the module bundler</li>
			  <li>MySQL 5.7 as database</li>
             </ul>
             			 		   
			   			   
			 <b>Testing</b>  
		       <ul>
		        <li>Test Driven Developement and Unit Testing all the way developing the system</li>
		       </ul>

           </div>

	      </div>
		
		</div>
	   
	   
      );

    }
}

export { AboutPage };