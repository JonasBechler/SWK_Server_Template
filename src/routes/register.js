const express = require('express');
const router = express.Router();
const config = require('../../../../config.json');

const get_user = require('../helpers/get_user')
const set_user = require('../helpers/set_user')


router.post('/', (req, res) => {
    let details = Object.assign({}, get_user.details().details)

    Object.keys(details).forEach(detail_key => {
        details[detail_key] = req.query[detail_key]
    })
    
    let email = req.query.email;

    const selected_user = get_user.by_mail(email)
    
    if (selected_user.user == null){
        set_user(details)

        req.session.email = details.email
        req.session.auth_via = "standard"
        //res.json({}).end()
        res.status(200).send({});
    }

    
    res.status(400).send({});

   
});

module.exports = router