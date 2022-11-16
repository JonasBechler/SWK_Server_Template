
module.exports = function ( config, userDataPath ) {

	const express = require('express');
	const router = express.Router();



	router.get('/', (req, res) => {
		// delete the session
		req.session.destroy();

		// end FusionAuth session
		res.redirect(`${config.device_ip}:${config.fusionauth_port}/oauth2/logout?client_id=${config.fusionauth.client_id}`);
	});

	return router
}