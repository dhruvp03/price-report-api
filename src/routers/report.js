const express = require('express')

const reportController = require('../controllers/report')
const priceConv = require('../middlewares/priceConv')
const auth = require('../middlewares/auth')

const router = express.Router();

router.post('/reports',[auth,priceConv],reportController.sendReport); //Route to which agent sends report

router.get('/reports',auth,reportController.getAggregateReport); //Route to get the aggregate report

module.exports = router