
module.exports = function (config) {

	const express = require('express');
	const router = express.Router();

	const fusionauth_config = require('../../fusionauth_config.json');

	const pkce = require('../helpers/pkce');

	router.get('/', (req, res) => {
		// Generate and store the PKCE verifier
		req.session.verifier = pkce.generateVerifier();

		// Generate the PKCE challenge
		const challenge = pkce.generateChallenge(req.session.verifier);

		// Redirect the user to log in via FusionAuth
		const redirect_uri = `${config.device_ip}:${config.fusionauth_port}/oauth2/authorize?client_id=${fusionauth_config.client_id}&redirect_uri=${config.device_ip}:${config.handyticket_port}${fusionauth_config.redirect_uri}&response_type=code&code_challenge=${challenge}&code_challenge_method=S256`
		res.redirect(redirect_uri);
	});

	return router;
}