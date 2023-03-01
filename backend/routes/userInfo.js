const express = require('express');
const data = require('../controllers/data');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/newuser', auth, data.addNewUserInfo)
router.post('/addperiod', auth, data.addNewPeriod)
router.post('/getuserinfo', auth, data.getUserInfo)
router.post('/setperiodinfo', auth, data.setPeriodStatus)
router.post('/addpreviousperiod', auth, data.addPreviousPeriod)
router.post('/updateperiod', auth, data.updatePeriod)
module.exports = router;