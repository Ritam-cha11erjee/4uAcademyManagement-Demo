import React, { useState } from 'react'
import axios from 'axios'


const EditStudent = (props) => {

    const handleUpdateStudent = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`${process.env.NODE_URL}/students/${props.editingStudent._id}`, props.editFormData); //send the edit form data to backend

            //Refresh Data
            const res = await axios.get(`${process.env.NODE_URL}/students`);
            props.setStudents(res.data);

            props.setEditingStudent(null);
            alert("Student data updated successfully!");
        } catch (err) {
            alert("Demo Mode: Database modifications are disabled. Read-only access is active.");
        }
    }

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1100
        }}>
            <form onSubmit={handleUpdateStudent} style={{
                backgroundColor: 'white', padding: '30px', borderRadius: '15px',
                width: '600px', // Widened for 2-column layout
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
            }}>
                <h2 style={{ marginTop: 0, marginBottom: '20px', color: '#333' }}>Edit Student: {props.editingStudent.name}</h2>

                {/* ROW 1: Basic Info */}
                <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', fontSize: '12px', color: '#666', marginBottom: '5px' }}>Student Name</label>
                        <input type="text" value={props.editFormData.name}
                            onChange={(e) => props.setEditFormData({ ...props.editFormData, name: e.target.value })}
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }}
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', fontSize: '12px', color: '#666', marginBottom: '5px' }}>Phone Number</label>
                        <input
                            type="text"
                            placeholder="Phone Number"
                            value={props.editFormData.phoneNumber}
                            onChange={(e) => props.setEditFormData({ ...props.editFormData, phoneNumber: e.target.value })}
                            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd', boxSizing: 'border-box' }}
                        />
                    </div>
                </div>

                {/* ROW 2: Academic/Financial */}
                <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', fontSize: '12px', color: '#666', marginBottom: '5px' }}>Batch</label>
                        <select
                            value={props.editFormData.batchType}
                            onChange={(e) => props.setEditFormData({ ...props.editFormData, batchType: e.target.value })}
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                        >
                            <option value="Kids">Kids</option>
                            <option value="Adult">Adult</option>
                        </select>
                    </div>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', fontSize: '12px', color: '#666', marginBottom: '5px' }}>Monthly Fee (₹)</label>
                        <input
                            type="number"
                            value={props.editFormData.monthlyFee}
                            onChange={(e) => props.setEditFormData({ ...props.editFormData, monthlyFee: Number(e.target.value) })}
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }}
                        />
                    </div>
                </div>

                {/* ROW 3: Status and Cycle Management */}
                <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', fontSize: '12px', color: '#666', marginBottom: '5px' }}>Status</label>
                        <select
                            value={props.editFormData.status}
                            onChange={(e) => props.setEditFormData({ ...props.editFormData, status: e.target.value })}
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                        >
                            <option value="Active">Active</option>
                            <option value="On Break">On Break</option>
                            <option value="Left">Left</option>
                        </select>
                    </div>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', fontSize: '12px', color: '#666', marginBottom: '5px' }}>Fees Clear Until</label>
                        <input
                            type="date"
                            value={props.editFormData.feesClearTill ? props.editFormData.feesClearTill.split('T')[0] : ''}
                            onChange={(e) => props.setEditFormData({ ...props.editFormData, feesClearTill: e.target.value })}
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }}
                        />

                    </div>
                </div>

                {/* ROW 4: Administrative Date */}
                <div style={{ marginBottom: '25px' }}>
                    <label style={{ display: 'block', fontSize: '12px', color: '#666', marginBottom: '5px' }}>Joining Date</label>
                    <input
                        type="date"
                        value={props.editFormData.joiningDate ? props.editFormData.joiningDate.split('T')[0] : ''}
                        onChange={(e) => props.setEditFormData({ ...props.editFormData, joiningDate: e.target.value })}
                        style={{ width: '48.5%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd', boxSizing: 'border-box' }}
                    />
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '15px' }}>
                    <button type="submit" style={{ flex: 2, padding: '12px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                        Save Changes
                    </button>
                    <button type="button" onClick={() => props.setEditingStudent(null)} style={{ flex: 1, padding: '12px', backgroundColor: '#c00', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditStudent