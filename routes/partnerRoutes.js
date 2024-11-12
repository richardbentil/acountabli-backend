const express = require('express');
const { assignPartner } = require('../controllers/partnerController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/:id/assign', auth, assignPartner);

module.exports = router;
