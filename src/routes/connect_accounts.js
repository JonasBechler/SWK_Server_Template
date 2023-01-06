
module.exports = function( config, userDataPath ) {

    const express = require('express');
    const router = express.Router();

    const get_user = require('../helpers/get_user')(userDataPath)
    const update_user = require('../helpers/update_user')(userDataPath)
    const fusionauth = require("../SWK_Fusionauth_Handler/index")(config)



    router.get('/', (req, res) => {
        
        if (req.session.account_id && req.session.token){
            fusionauth.introspect(req.session.token)
            .then(introspectResponse => {
                if (introspectResponse.active){
                    const selected_user = get_user.by_account_id(req.session.account_id);
                    const selected_fusionauth_user = get_user.by_fusionauthIntrospect(introspectResponse);
                    
                    if (selected_user.user && selected_fusionauth_user.fusionauth_user){
                    
                        selected_user.user.knlogin_id = selected_fusionauth_user.fusionauth_user.knlogin_id
                        console.log(selected_user.user);
                        update_user(selected_user.user);
                        res.redirect(`${config.device_ip}:${config.port_react}`);
                        
                    }
                }
            })
            
        }
    });

    return router
}