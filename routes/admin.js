const express = require('express');
const router = express.Router();
const {auth, adminCheck} = require('../authentication.js')

const adminController = require('../controller/adminController')
//router.post('/signup', adminController.admin);
router.post('/login', adminController.adminLogin);
router.post('/reset', [auth, adminCheck], adminController.adminreset);
module.exports = router;