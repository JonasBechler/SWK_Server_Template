
module.exports = function( config, userDataPath ) {

  const express = require('express');
  const router = express.Router();
  const request = require('request');

  const fusionauth = require("../SWK_Fusionauth_Handler/index")(config)
 


  router.get('/', (req, res) => {

    fusionauth.login.callback(req, res)
    
  });

  return router
}
