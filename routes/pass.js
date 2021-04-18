const express = require('express')
const router = express.Router()
const passController = require('../controller/passController')
router.get('/:ticketId', passController.pass);
module.exports = router