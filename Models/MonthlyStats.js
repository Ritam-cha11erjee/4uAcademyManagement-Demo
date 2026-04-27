const mongoose = require('mongoose')
const monthlyStatsSchema = new mongoose.Schema({
    monthYear: {type: String, required: true, unique: true},
    income: {type: Number, default: 0},
    adSpend: {type: Number, default: 0},
    fixedCost: {type: Number, default: 2100}
});

module.exports = mongoose.model('MonthlyStats', monthlyStatsSchema);