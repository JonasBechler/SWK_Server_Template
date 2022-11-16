const express = require('express');
const router = express.Router();
const config = require('../../../../config.json');

router.get('/', (req, res) => {
  // delete the session
  req.session.destroy();

  // end FusionAuth session
  res.redirect(`${config.device_ip}:${config.fusionauth_port}/oauth2/logout?client_id=${config.handyticket_fusionauth_id}`);
});

module.exports = router