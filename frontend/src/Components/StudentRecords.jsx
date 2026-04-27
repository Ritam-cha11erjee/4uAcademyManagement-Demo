import React, {useState, useEffect} from 'react'
import axios from 'axios' //used to ease communication b/w frontend & backend
import EditStudent from './Modals/EditStudent';
import PaymentHistory from './Modals/PaymentHistory';
import LogPayment from './Modals/LogPayment';
import AddStudentForm from './Modals/AddStudentForm';
import StudentCard from './StudentCard';

const StudentRecords = (props) => {

    const [students, setStudents] = useState([]) //state for students list
    const [searchTerm, setSearchTerm] = useState("") //The term, in search field
    const [showOnlyDefaulters, setShowOnlyDefaulters] = useState(false) //simple true or false state
    const [batchFilter, setBatchFilter] = useState('All') //Kids batch? Adult Batch? All Batches?
    const [statusFilter, setStatusFilter] = useState('Active') //Active? Left? On Break?
    const [showAddForm, setShowAddForm] = useState(false) //show add student form?
    const [editFormData, setEditFormData] = useState({}) //The data to send in backend write call
    const [editingStudent, setEditingStudent] = useState(null) //the student being edited
    const [paymentModal, setPaymentModal] = useState({ show: false, student: null, date: new Date().toISOString().split('T')[0] }) //Show Modal? And track name & date
    const [selectedStudent, setSelectedStudent] = useState(null)
    const [loading, setLoading] = useState(true) //loading state

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://localhost:3000/students')
                setStudents(response.data) //on getting data, update state
                setLoading(false)
            } catch (err) {
                console.error("Connection Error:", err)
                setLoading(false)
            }
        }
        fetchStudents();
    }, []) // The empty [] means "run this only once when the page loads"


    const defaulterCount = students.filter(student => { //Counts no. of defaulters by filtering students
        return (new Date(student.feesClearTill) < new Date() && student.status === 'Active');
    }).length;

    const filteredStudents = students.filter(student => {

        const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
        const isOverdue = new Date(student.feesClearTill) < new Date();

        const matchesBatch = batchFilter === 'All' | batchFilter === student.batchType;
        const matchesFilter = statusFilter === 'All' | statusFilter === student.status;

        if (showOnlyDefaulters) {
            return matchesSearch && matchesFilter && matchesBatch && isOverdue && student.status === 'Active';
        }
        return matchesSearch && matchesFilter && matchesBatch;
    });

    if (loading) return <h2>Fetching academy records... <br /><i>(Note: This backend is hosted on a free Render instance and may take up to 60 seconds to wake up from sleep mode).</i></h2>
    return (
        <>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>

                <div style={{
                    display: 'flex',
                    alignItems: 'flex-start', // Aligns button with the bottom of the form inputs
                    gap: '15px',
                    marginBottom: '0px',
                    flexWrap: 'wrap' // Wraps if the screen is too narrow
                }}>
                    {/* The Toggle Button */}
                    <button
                        onClick={() => setShowAddForm(!showAddForm)}
                        style={{
                            backgroundColor: showAddForm ? '#6c757d' : '#28a745',
                            color: 'white',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            marginBottom: showAddForm ? '15px' : '0'
                        }}
                    >
                        {showAddForm ? '✕ Close' : '+ Add New Student'}
                    </button>

                    {showAddForm &&
                        <AddStudentForm />
                    }
                </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
                <input
                    type="text"
                    placeholder="Search student..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                />

                <select value={batchFilter}
                    onChange={(e) => setBatchFilter(e.target.value)}
                    style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd', cursor: 'pointer' }}
                >
                    <option value="All">All Batches</option>
                    <option value="Kids">Kids Batch</option>
                    <option value="Adult">Adult Batch</option>
                </select>

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd', cursor: 'pointer' }}
                >
                    <option value="All">All Statuses</option>
                    <option value="Active">Active Only</option>
                    <option value="On Break">On Break</option>
                    <option value="Left">Left</option>
                </select>

                <button
                    onClick={() => setShowOnlyDefaulters(!showOnlyDefaulters)}
                    style={{
                        padding: '0 20px',
                        borderRadius: '8px',
                        border: 'none',
                        backgroundColor: showOnlyDefaulters ? '#ff4d4d' : '#fff',
                        color: showOnlyDefaulters ? '#fff' : '#ff4d4d',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                        border: '1px solid #ff4d4d'
                    }}
                >
                    {showOnlyDefaulters ? 'showing Overdue' : `Overdue: ${defaulterCount}`}
                </button>
            </div>

            <div style={{ display: 'grid', gap: '20px' }}>
                {/*Generating student cards*/}
                {
                    filteredStudents.map(student =>
                        <StudentCard key={student._id}
                            setEditingStudent={setEditingStudent}
                            student={student}
                            setSelectedStudent={setSelectedStudent}
                            setEditFormData={setEditFormData}
                            showOnlyDefaulters={showOnlyDefaulters}
                            setPaymentModal={setPaymentModal}
                        />)
                }

                {/*Modal for payment history of a student*/}
                {selectedStudent &&
                    <PaymentHistory
                        setSelectedStudent={setSelectedStudent}
                        selectedStudent={selectedStudent}
                    />
                }

                {/*Modal for editing a student*/}
                {editingStudent &&
                    <EditStudent
                        editingStudent={editingStudent}
                        setEditingStudent={setEditingStudent}
                        editFormData={editFormData}
                        setEditFormData={setEditFormData}
                        setStudents={setStudents}
                    />
                }

                {/*Modal for logging a payment*/}
                {paymentModal.show &&
                    <LogPayment
                        setPaymentModal={setPaymentModal}
                        paymentModal={paymentModal}
                        setStudents={setStudents}
                    />
                }

            </div>

        </>
    )
}

export default StudentRecords
