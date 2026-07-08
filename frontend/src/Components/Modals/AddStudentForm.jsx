import React, {useState} from 'react'
import axios from 'axios'

const AddStudentForm = () => {

    const [newStudent, setNewStudent] = useState({ //set this state on hitting add student button & send newStudent to backend while adding student
        name: '',
        batchType: 'Kids',
        monthlyFee: 1000,
        phoneNumber: '',
        joiningDate: new Date().toISOString().split('T')[0],
    });

    const handleAddStudent = async (e) => {
        e.preventDefault(); //Don't refresh the page
        if (!newStudent.name) return alert("Please enter a name");

        try {
            await axios.post('http://localhost:3000/students/add-student', newStudent);

            const res = await axios.get('http://localhost:3000/students');
            setStudents(res.data); //update students state after adding new student

            //Reset the form
            setNewStudent({ name: '', batchType: 'Kids', monthlyFee: 1000, phoneNumber: '', joiningDate: new Date() });
            alert("Student added successfully!");
        } catch (err) {
            alert("Demo Mode: Database modifications are disabled. Read-only access is active.");
        }
    };

    return (
        <form onSubmit={handleAddStudent} style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '12px',
            marginBottom: '10px',
            display: 'flex',
            gap: '50px',
            alignItems: 'flex-end',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
        }}>
            <div style={{ flex: 2 }}>
                <label style={{ fontSize: '12px', color: '#666' }}>Student Name</label>
                <input
                    type="text"
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                    placeholder="Full Name"
                    style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '6px', border: '1px solid #ddd' }}
                />
            </div>
            <div style={{ flex: 1 }}>
                <label style={{ fontSize: '12px', color: '#666' }}>Batch</label>
                <select
                    value={newStudent.batchType}
                    onChange={(e) => setNewStudent({ ...newStudent, batchType: e.target.value })}
                    style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '6px', border: '1px solid #ddd' }}
                >
                    <option value="Kids">Kids</option>
                    <option value="Adult">Adult</option>
                </select>
            </div>

            <div style={{ flex: 1 }}>
                <label style={{ fontSize: '12px', color: '#666' }}>Monthly Fee (₹)</label>
                <input
                    type="number"
                    default={1000}
                    value={newStudent.monthlyFee}
                    onChange={(e) => setNewStudent({ ...newStudent, monthlyFee: Number(e.target.value) })}
                    style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '6px', border: '1px solid #ddd' }}
                />
            </div>

            <div style={{ flex: 1 }}>
                <label style={{ fontSize: '12px', color: '#666' }}>Phone Number</label>
                <input
                    type="text"
                    placeholder="Phone Number"
                    value={newStudent.phoneNumber}
                    onChange={(e) => setNewStudent({ ...newStudent, phoneNumber: e.target.value })}
                    style={{ flex: 1, padding: '10px', marginTop: '5px', borderRadius: '6px', border: '1px solid #ddd' }}
                />
            </div>

            <div style={{ flex: 1 }}>
                <label style={{ fontSize: '12px', color: '#666' }}>Joining Date</label>
                <input
                    type="date"
                    value={newStudent.joiningDate}
                    onChange={(e) => setNewStudent({ ...newStudent, joiningDate: e.target.value })}
                    style={{ flex: 1, padding: '10px', marginTop: '5px', borderRadius: '6px', border: '1px solid #ddd' }}
                />
            </div>

            <button type="submit" style={{
                backgroundColor: '#28a745',
                color: 'white',
                padding: '12px 25px',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 'bold',
                cursor: 'pointer'
            }}>
                + Add Student
            </button>
        </form>
    )
}

export default AddStudentForm
