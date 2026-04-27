import React from 'react'
import axios from 'axios'

const LogPayment = (props) => {

    const confirmPayment = async () => { //called after clicking confirm on Mark Paid Modal
        const { student, date } = props.paymentModal; //destructured data from paymentModal
        const amount = document.getElementById(`pay-amt-${student._id}`).value; //Got amount from the amount input element

        try {
            await axios.post(`${process.env.NODE_URL}/students/${student._id}/pay`, {
                amountPaid: Number(amount), //amount was a string as .value returns a string
                dateOfPayment: date
            });

            const res = await axios.get(`${process.env.NODE_URL}/students`);
            props.setStudents(res.data); //refresh student list

            //Reset & close payment Modal
            props.setPaymentModal({ show: false, student: null, date: '' })
            alert("Payment logged successfully!");
        } catch (err) {
            alert("Demo Mode: Database modifications are disabled. Read-only access is active.");
        }
    };

    return (

        <div style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000
        }}>
            <div style={{
                backgroundColor: 'white', padding: '30px', borderRadius: '15px',
                width: '350px', textAlign: 'center', boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
            }}>
                <h3 style={{ marginTop: 0 }}>Confirm Payment</h3>
                <p style={{ color: '#666' }}>Marking payment for <strong>{props.paymentModal.student.name}</strong></p>
                <div style={{ margin: '20px 0' }}>
                    <label style={{ display: 'block', fontSize: '12px', marginBottom: '5px', color: '#888' }}>Date of Payment</label>
                    <input type="date"
                        value={props.paymentModal.date}
                        onChange={(e) => props.setPaymentModal({ ...props.paymentModal, date: e.target.value })}
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '16px', boxSizing: 'border-box' }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={confirmPayment} style={{ flex: 1, padding: '12px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Confirm
                    </button>
                    <button onClick={() => props.setPaymentModal({ show: false, student: null })} style={{ flex: 1, padding: '12px', backgroundColor: '#c00', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default LogPayment
