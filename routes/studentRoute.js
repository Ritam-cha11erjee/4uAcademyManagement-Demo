const express = require('express');
const router = express.Router();
const {getAllStudents, getDefaulters, addStudent, logPayment, updateStudent} = require('../controllers/studentController')

router.get('/', getAllStudents);
router.get('/defaulters', getDefaulters);
router.post('/add-student', addStudent);
router.post('/:id/pay', logPayment);
router.patch('/:id', updateStudent);

module.exports = router;