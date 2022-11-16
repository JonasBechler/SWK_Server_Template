
module.exports = function ( config, userDataPath ) {
	const express = require('express');
	const router = express.Router();

	const fusionauth_config = require('../../fusionauth_config.json');


	router.get('/', (req, res) => {

		if (req.session.email) {
			// delete the session
			req.session.destroy();
			res.redirect(`${config.device_ip}:${config.port_react}`);
		}

		else if (req.session.token) {
			// delete the session
			req.session.destroy();

			// end FusionAuth session
			res.redirect(`${config.device_ip}:${config.fusionauth_port}/oauth2/logout?client_id=${fusionauth_config.client_id}`);
		}

	});

	return router
}