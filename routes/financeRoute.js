const express = require('express');
const router = express.Router();
const {getFinanceSummary, updateMothlyStats} = require('../controllers/financeController')

router.get('/financial-summary', getFinanceSummary);
router.post('/update-monthly-stats', updateMothlyStats);

module.exports = router;
