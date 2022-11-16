
module.exports = function (config) {

	const express = require('express');
	const router = express.Router();

	const fusionauth_config = require('../../fusionauth_config.json');


	router.get('/', (req, res) => {
		// delete the session
		req.session.destroy();

		// end FusionAuth session
		res.redirect(`${config.device_ip}:${config.fusionauth_port}/oauth2/logout?client_id=${fusionauth_config.client_id}`);
	});

	return router
}