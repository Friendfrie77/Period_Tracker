const express = require('express');
const data = require('../controllers/data');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/add', auth, data.addPeriod)

module.exports = router;