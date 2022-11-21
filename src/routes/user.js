
module.exports = function( config, userDataPath ) {

  const express = require('express');
  const router = express.Router();
  const request = require('request');

  const get_user = require('../helpers/get_user')(userDataPath)
  const fusionauth = require("../SWK_Fusionauth_Handler/index")(config)



  router.get('/', (req, res) => {

    // check if session is valid
    // differ from service to service

    if (req.session.email) {
      const selected_user = get_user.by_mail(req.session.email);
      selected_user.user.password = ""
      return res.json(selected_user).end()

    }

    // token in session -> get user data and send it back to the react app

    if (req.session.token) {
      
      fusionauth.introspect(req.session.token, introspectResponse => {
        // valid token -> get more user data and send it back to the react app
        if (introspectResponse.active) {

          const selected_user = get_user.by_mail(introspectResponse.email);
          if (selected_user.user === null){
            // no user available. So register this mail first
            req.session.destroy();
            res.send(get_user.details()).end();
            return
          }
          selected_user.user.password = ""
          return res.send(selected_user).end();
            
        }

        // expired token -> send nothing
        else {
          req.session.destroy();
          res.send(get_user.details()).end();
        }
      })
    }

    // no token -> send nothing
    else {
      res.send(get_user.details()).end();
    }
  });

  return router
}
