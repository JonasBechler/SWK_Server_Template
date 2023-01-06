
module.exports = function( config, userDataPath ) {

	const express = require('express');
	const router = express.Router();

	const get_user = require('../helpers/get_user')(userDataPath)
	const fusionauth = require("../SWK_Fusionauth_Handler/index")(config)



	router.get('/', (req, res) => {

		if (req.session.account_id && req.session.token) {

			fusionauth.introspect(req.session.token)
			.then(introspectResponse => {
				if (introspectResponse.active){

					const selected_user = get_user.by_account_id(req.session.account_id);
					const selected_fusionauth_user = get_user.by_fusionauthIntrospect(introspectResponse);

					if (selected_fusionauth_user.user){
						//remove accountid in session
						delete req.session.account_id 
						return res.json(selected_fusionauth_user).end()
					}

					else if (selected_user.user && selected_user.user.knlogin_id){
						// should not happen
						//TODO: idk
						//remove accountid in session
						return res.json(selected_user).end()
					}

					else if (selected_user.user && selected_fusionauth_user.fusionauth_user){
						// good for connecting, allowing and waiting for /connect
						selected_user.fusionauth_user = selected_fusionauth_user.fusionauth_user
						return res.json(selected_user).end()
					}


					// both work and are the same => same account
					if (selected_user.user && selected_user.user === selected_fusionauth_user.user){
						return res.json(selected_user).end()
					}

					// both work and are not the same => prefere fusionauth
					else if (selected_user.user.knlogin_id && selected_fusionauth_user.user && selected_user.user !== selected_fusionauth_user.user){
						return res.json(selected_fusionauth_user).end()
					}

					// if account_id account found and no fusionauth account => ask for connecting 
					else if (selected_user.user && selected_fusionauth_user.fusionauth_user){
						selected_user.fusionauth_user = selected_fusionauth_user.fusionauth_user
						return res.json(selected_user).end()
					}
				}

				//fusionauth account not valid
				else{

					const selected_user = get_user.by_account_id(req.session.account_id);
					selected_user.user.password = ""
					return res.json(selected_user).end()
				}

			})
		}

		else if (req.session.account_id) {

			const selected_user = get_user.by_account_id(req.session.account_id);

			if (selected_user.user){
				selected_user.user.password = ""
				return res.json(selected_user).end()
			}

			else if (selected_user.blank_user) {
				return res.json(selected_user).end()
			}

		}

    	// token in session -> get user data and send it back to the react app

		else if (req.session.token) {

			fusionauth.introspect(req.session.token)
			.then(introspectResponse => {
				console.log(introspectResponse);
				if (introspectResponse.active) {
					const selected_user = get_user.by_fusionauthIntrospect(introspectResponse);

					if (selected_user.user){
						selected_user.user.password = ""
						return res.send(selected_user).end();
					}

					else if (selected_user.fusionauth_user){
						// no user available, register with given fusionauth
						return res.send(selected_user).end();
					}
				
					
				}

				// expired token -> send nothing
				else {
					req.session.destroy();
					return res.send(get_user.details()).end();
				}
			})
		}

		 // no token -> send nothing
		else {
			return res.send(get_user.details()).end();
		}
	});
      


  	return router
}
