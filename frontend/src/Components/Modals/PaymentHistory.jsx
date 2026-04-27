import React from 'react'

const PaymentHistory = (props) => {
    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
            <div style={{
                backgroundColor: 'white', padding: '30px', borderRadius: '15px',
                width: '400px', maxWidth: '90%', maxHeight: '80vh', overflowY: 'auto', boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <h2 style={{ margin: 0 }}>{props.selectedStudent.name}</h2>
                    <button onClick={() => props.setSelectedStudent(null)} style={{ border: 'none', background: 'none', fontSize: '20px', cursor: 'pointer', color: 'black', padding: '0', height: '60%' }}>✕</button>
                </div>

                <h3 style={{ fontSize: '14px', color: '#666', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Payment History</h3>

                {props.selectedStudent.paymentHistory.length === 0 ? (
                    <p style={{ color: '#999', textAlign: 'center', marginTop: '20px' }}>No payments recorded yet.</p>
                ) : (
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {props.selectedStudent.paymentHistory.slice().reverse().map((payment, index) => (
                            <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>{new Date(payment.dateOfPayment).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                                <span style={{ fontWeight: 'bold', color: '#28a745', marginRight: '50%' }}>₹{payment.amountPaid}</span>
                            </li>
                        ))}
                    </ul>

                )}
                <button
                    onClick={() => props.setSelectedStudent(null)}
                    style={{ width: '100%', marginTop: '20px', padding: '10px', backgroundColor: '#c00', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                >
                    Close
                </button>
            </div>
        </div >
    )
}

export default PaymentHistory