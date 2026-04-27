const Student = require('../Models/Student')
const MonthlyStats = require('../Models/MonthlyStats')

module.exports.getFinanceSummary =  async (req, res) => { //READ endpoint to populate the finances table using this data
    try {
        const students = await Student.find();
        const allStats = await MonthlyStats.find();

        const summaryMap = {}; //Declared an empty object

        //calculate income from students
        students.forEach(student => {
            student.paymentHistory.map(payment => {
                const date = new Date(payment.dateOfPayment);
                const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });

                if (!summaryMap[monthYear]) { //if data for the monthYear is not already present, initializing row to default values
                    summaryMap[monthYear] = { income: 0, ads: 0, fixed: 2100, misc: 0 };
                }
                summaryMap[monthYear].income += payment.amountPaid; //updating income for the month
            });
        });

        //Overwrite with specific Ad Spend/Misc from our MonthlyStats collection
        //Why overwriting? Cuz everytime finance info is requested, ads, fixed, misc WILL be default.
        //So, overwriting from the current row values present in DB & adding income on top of exisiting calculation from payments
        allStats.forEach(stat => {

            if (!summaryMap[stat.monthYear]) { //maybe no paymentHistory exists so populating from MonthlyStats collection, setting default values in the row
                summaryMap[stat.monthYear] = { income: 0, ads: 0, fixed: 2100, misc: 0 };
            }
            summaryMap[stat.monthYear].ads = stat.adSpend || 0;
            if (stat.income) //if income data is present in the database otherwise we will be adding undefined
                summaryMap[stat.monthYear].income += stat.income;
            summaryMap[stat.monthYear].misc = stat.miscExpenses || 0;
            summaryMap[stat.monthYear].fixed = stat.fixed || 2100;

        });

        const finalTable = Object.keys(summaryMap).map(month => ({ //Converted the Keys in key value pair to an array & mapped for each key (month)
            month,
            ...summaryMap[month],
            profit: (summaryMap[month].income - (summaryMap[month].fixed + summaryMap[month].ads + summaryMap[month].misc))
        }));

        const sortedTable = finalTable.sort((a,b) => {
            return new Date(a.month) - new Date(b.month);
        });

        res.json(sortedTable.reverse());

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


module.exports.updateMothlyStats =  async (req, res) => { //WRITE endpoint to update adSpend, Misc & fixed costs for a particular month
    const { monthYear, adSpend, miscExpenses } = req.body;
    try {
        const stats = await MonthlyStats.findOneAndUpdate(
            { monthYear }, //Key to match
            { adSpend, miscExpenses }, //updated values
            { upsert: true, new: true } //update or insert (if not present) new means updated data will be returned to be set in stats
        );
        res.json(stats);
    } catch (err) {
        res.status(500).json(err);
    }
}