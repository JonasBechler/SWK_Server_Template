
module.exports = function ( config, userDataPath ) {
	const express = require('express');
	const router = express.Router();

	const fusionauth = require("../../SWK_Fusionauth_Handler/index")(config)


	router.get('/', (req, res) => {

		

		if (req.session.token) {
			// delete the session
			req.session.destroy();

			// end FusionAuth session
			fusionauth.logout(req, res)
		}

		else if (req.session.account_id) {
			// delete the session
			req.session.destroy();
			res.redirect(`${config.device_ip}:${config.port}`);
		}

	});

	return router
}