const express = require('express');
const auth = require('../controllers/auth');
const authen = require('../middleware/auth');

const router = express.Router();

router.post('/login', auth.login);
router.post('/deleteuser', authen, auth.deleteAccount);
router.post('/changepassword', authen, auth.changePassword);
router.post('/demo', auth.demoAccount);
module.exports = router; 