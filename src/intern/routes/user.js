
module.exports = function( config, userDataPath ) {

	const express = require('express');
	const router = express.Router();

	const get_user = require('../../helpers/get_user')(userDataPath)
	const fusionauth = require("../../SWK_Fusionauth_Handler/index")(config)



	router.get('/', (req, res) => {

    	// token in session -> get user data and send it back to the react app

		if (req.session.token) {

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
