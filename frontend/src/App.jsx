import { useEffect, useState } from 'react'
import Finance from './Components/Finance';
import StudentRecords from './Components/StudentRecords';
import Navbar from './Components/Navbar';

function App() {
  const [view, setView] = useState('students') // Can be 'students' or 'finance'

  return (

    <div style={{ boxSizing: 'border-box', padding: '40px', backgroundColor: '#f4f4f4', color: 'black', minHeight: '100vh', width: '98.8vw', paddingTop: '1px' }}>
      
      <Navbar view={view} setView={setView}/>

      {view === 'students' ? /* Simplified Routing */
        <StudentRecords/> : <Finance />
      }
    </div>
  )
}

export default App