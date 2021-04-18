const express = require('express')
const router = express.Router();
const ticketConttroller  = require('../controller/ticketController');

router.post('/create', ticketConttroller.ticketCreate);
router.get('/viewOpen', ticketConttroller.viewopen);
router.get('/viewClosed', ticketConttroller.viewclosed);
router.get('/:ticketId', ticketConttroller.getticketId);
router.put('/:ticketId', ticketConttroller.updateticketId);

module.exports = router;