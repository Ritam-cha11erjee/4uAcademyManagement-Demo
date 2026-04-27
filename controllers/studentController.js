const Student = require('../Models/Student')

module.exports.getAllStudents =  async (req, res) => { //READ endoint that finds all rows & their data in Student collection
    try {
        const students = await Student.find();
        res.json(students); //returns the student records
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports.getDefaulters =  async (req, res) => { //READ endpoint that fetches defaulters JSON
    try {
        const today = new Date(); //today is initialized to today's date & time

        const students = await Student.find({ //if they are active & their feesClearTill date is less than today
            status: 'Active',
            feesClearTill: { $lt: today } //$lt: means less than
        });
        res.json(students); //return the defaulter students JSON
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

//|||||||||||||||| WRITE LOGIC |||||||||||||||||||

module.exports.addStudent =  async (req, res) => { //WRITE endpoint for adding student
    try {
        const newStudent = new Student(  //sets the target collection
                                        //using the Student blueprint, create a new data packet
            {
                name: req.body.name,
                batchType: req.body.batchType,
                monthlyFee: req.body.monthlyFee,
                phoneNumber: req.body.phoneNumber,
                joiningDate: req.body.joiningDate
            }
        );

        const savedStudent = await newStudent.save(); //saves the object in the target collection
        res.status(201).json(savedStudent);

    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}


module.exports.logPayment =  async (req, res) => { //WRITE endpoint to log payment for a student
    try {
        const student = await Student.findById(req.params.id);

        const payment = { 
            month: req.body.month,
            amountPaid: req.body.amountPaid,
            dateOfPayment: req.body.dateOfPayment || Date.now()
        };

        student.paymentHistory.push(payment); //pushing the object into paymentHistory array of the student

        let newClearDate = new Date(student.feesClearTill);
        newClearDate.setMonth(newClearDate.getMonth() + 1);
        student.feesClearTill = newClearDate;
        await student.save();

        res.json({ message: 'Payment logged!', nextDueDate: newClearDate })
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}


//|||||||||||||||| PATCH LOGIC |||||||||||||||||||

module.exports.updateStudent = async (req, res) => { //UPDATE endpoint for updated student data
    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id, //key to match
            req.body, //updated data
            { new: true }
        );

        res.json(updatedStudent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}