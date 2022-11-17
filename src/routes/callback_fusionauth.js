
module.exports = function( config, userDataPath ) {

  const express = require('express');
  const router = express.Router();
  const request = require('request');


  router.get('/', (req, res) => {
    request(
      // POST request to /token endpoint
      {
        method: 'POST',
        uri: `${config.device_ip}:${config.fusionauth_port}/oauth2/token`,
        form: {
          'client_id': config.fusionauth.client_id,
          'client_secret': config.fusionauth.client_secret,
          'code': req.query.code,
          'code_verifier': req.session.verifier,
          'grant_type': 'authorization_code',
          'redirect_uri': `${config.device_ip}:${config.port}${config.fusionauth.redirect_uri}`
        }
      },

      // callback
      (error, response, body) => {
        // save token to session
        req.session.token = JSON.parse(body).access_token;
        console.log(JSON.parse(body))
        // redirect to the React app
        res.redirect(`${config.device_ip}:${config.port_react}`);

      }
    );
  });

  return router
}
