import React from 'react'

const Navbar = (props) => {
  return <div style={{ marginBottom: '0px', display: 'flex', gap: '10px', justifyContent: 'space-between' }}>

        <div style={{ display: 'flex' }}>
          <img src="/4u-academy-management.png" alt="Logo" width='70' height='70' style={{ paddingTop: '20px' }} />
          <h1 style={{ margin: '25px', marginLeft: '0' }}>4u Academy Management</h1>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button
            onClick={() => props.setView('students')}
            style={{
              padding: '10px 20px',
              backgroundColor: props.view === 'students' ? '#007bff' : '#ddd',
              color: props.view === 'students' ? 'white' : 'black',
              height: '40%',
              border: 'none', borderRadius: '5px', cursor: 'pointer'
            }}
          >
            Student Management
          </button>
          <button
            onClick={() => props.setView('finance')}
            style={{
              padding: '10px 20px',
              height: '40%',
              backgroundColor: props.view === 'finance' ? '#007bff' : '#ddd',
              color: props.view === 'finance' ? 'white' : 'black',
              border: 'none', borderRadius: '5px', cursor: 'pointer'
            }}
          >
            Financial Analytics
          </button>
        </div>
      </div>
}

export default Navbar
