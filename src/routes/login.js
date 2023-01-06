
module.exports = function( config, userDataPath ) {

    const express = require('express');
    const router = express.Router();

    const get_user = require('../helpers/get_user')(userDataPath)


    router.post('/', (req, res) => {
        let email = req.query.email;
        let password = req.query.password;
        const selected_user = get_user.by_mail(email);
        
        if (selected_user.user == null || selected_user.user.password !== password){
            res.status(401).send({});
        }
        else{
            req.session.account_id = selected_user.user.account_id
            //res.json({}).end()
            res.status(200).send({});
            
        }
    });

    return router
}