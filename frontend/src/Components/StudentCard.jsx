import React from 'react'

const StudentCard = (props) => {

    let student = props.student;

    const openPaymentModal = (student) => {
        props.setPaymentModal({ show: true, student: student, date: new Date().toISOString().split('T')[0] });
    }; //function to open & initialize the Mark Paid modal

    return (
        <div
            style={{
                background: '#ffffff', // Shifted to white for a cleaner look
                padding: '15px 25px',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                display: 'flex',          // The magic begins
                justifyContent: 'space-between',
                alignItems: 'center',      // Centers items vertically
                marginBottom: '5px',
                borderLeft: student.status === 'Active' ? '6px solid #28a745' : '6px solid #ffc107',
            }}>
            {/* Left Side: Student Info */}
            <div style={{ display: 'flex', flexDirection: 'column', width: '60%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h2
                        onClick={() => props.setSelectedStudent(student)}
                        style={{ margin: 0, fontSize: '1.2rem', cursor: 'pointer' }}
                    >
                        {student.name}
                    </h2>

                    {/* Consistent Edit Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            props.setEditingStudent(student);
                            props.setEditFormData({
                                name: student.name,
                                batchType: student.batchType,
                                monthlyFee: student.monthlyFee,
                                feesClearTill: student.feesClearTill,
                                phoneNumber: student.phoneNumber,
                                joiningDate: new Date(student.joiningDate).toISOString().split('T')[0],
                                status: student.status
                            });
                        }}
                        style={{
                            background: '#f0f0f0',
                            border: 'none',
                            borderRadius: '50%',
                            width: '30px',
                            height: '30px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            fontSize: '14px',
                            transition: 'background 0.2s'
                        }}
                        title="Edit Student"
                        onMouseEnter={(e) => e.currentTarget.style.background = '#e0e0e0'}
                        onMouseLeave={(e) => e.currentTarget.style.background = '#f0f0f0'}
                    >
                        ✏️
                    </button>
                </div>
                <a href={`https://wa.me/91${student.phoneNumber}?text=${encodeURIComponent(
                    props.showOnlyDefaulters
                        ? `Hi ${student.name}, this is a reminder from 4u Academy regarding your pending fees. Your payment was due on ${new Date(student.feesClearTill).toISOString().split('T')[0]}. Please clear it at your earliest convenience. Thanks!`
                        : ``
                )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ margin: '2px 0', fontSize: '0.85rem', color: '#007bff', width: '15%' }}>
                    📞 {student.phoneNumber || "No Number"}
                </a>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#999' }}>
                    Joined: {new Date(student.joiningDate).toLocaleDateString('en-IN')}
                </p>
                <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                    Batch: <strong>{student.batchType}</strong> |
                    Status: <span style={{
                        color: student.status === 'Active' ? 'green' : 'orange',
                        fontWeight: 'bold'
                    }}>{student.status}</span>
                </p>
            </div>

            {/* Right Side: Payment Info & Action */}
            <div style={{ textAlign: 'right' }}>
                <p style={{ margin: '0 0 8px 0', fontSize: '0.85rem', color: '#555' }}>
                    Paid Until: <strong>{student.feesClearTill ? new Date(student.feesClearTill).toLocaleDateString() : 'N/A'}</strong>
                </p>
                <input
                    type="number"
                    id={`pay-amt-${student._id}`}
                    defaultValue={student.monthlyFee} // Defaults to their usual fee
                    onClick={(e) => e.stopPropagation()}
                    onMouseUp={(e) => e.stopPropagation()}
                    style={{
                        width: '80px',
                        padding: '8px',
                        borderRadius: '6px',
                        border: '1px solid #ccc',
                        textAlign: 'center',
                        marginRight: '10px',
                        fontWeight: 'bold',
                        fontSize: '18px'
                    }}
                />
                <button
                    style={{
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        transition: 'transform 0.1s'
                    }}
                    onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
                    onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    onClick={(e) => {
                        e.stopPropagation();
                        openPaymentModal(student)
                    }}
                >
                    Mark Paid
                </button>
            </div>
        </div>
    )
}

export default StudentCard
