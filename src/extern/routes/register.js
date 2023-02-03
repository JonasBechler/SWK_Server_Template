
module.exports = function ( config, userDataPath ) {

    const express = require('express');
    const router = express.Router();

    const get_user = require('../helpers/get_user')(userDataPath)
    const set_user = require('../helpers/set_user')(userDataPath)


    router.post('/', (req, res) => {
        let details = Object.assign({}, get_user.details().details)

        Object.keys(details).forEach(detail_key => {
            details[detail_key] = req.query[detail_key]
        })

        let email = req.query.email;

        const selected_user = get_user.by_mail(email)

        if (selected_user.user == null) {
            set_user(details)

            req.session.account_id = details.account_id
            //res.json({}).end()
             return res.status(200).send({});
        }


        res.status(400).send({});


    });

    return router;
}