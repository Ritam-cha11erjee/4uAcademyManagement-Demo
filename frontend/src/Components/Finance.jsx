import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Finance = () => {

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/finances/financial-summary`).then(
            res => setFinances(res.data)
        ).catch(err => console.log(err));

    }, []);

    const [finances, setFinances] = useState([]) //list of all data to populate the finances table
    const inputStyle = { padding: '8px', borderRadius: '4px', border: '1px solid #ccc', marginTop: '5px' };
    const tableHeaderStyle = { padding: '15px' };
    const tableCellStyle = { padding: '15px' };


    const handleUpdateStats = async () => {
        const monthYear = document.getElementById('statMonth').value;
        const adSpend = document.getElementById('statAds').value;
        const miscExpenses = document.getElementById('statMisc').value;

        if (!monthYear) return alert("Please enter the month and year");

        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/finances/update-monthly-stats`, {
                monthYear,
                adSpend: Number(adSpend),
                miscExpenses: Number(miscExpenses)
            });

            //Refresh the table
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/finances/financial-summary`);
            setFinances(res.data);
            alert("Stats Updated!");
        } catch (err) {
            alert("Demo Mode: Database modifications are disabled. Read-only access is active.");
        }
    }

    return (
        <div>
            <h2 style={{ marginBottom: '20px', marginTop: '0' }}>Profit & Loss Ledger</h2>
            <div style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '10px',
                marginBottom: '30px',
                display: 'flex',
                gap: '15px',
                alignItems: 'flex-end'
            }}>
                <div>
                    <label style={{ display: 'block', fontSize: '12px' }}>Month/Year (e.g., February 2026)</label>
                    <input id="statMonth" type="text" placeholder="February 2026" style={inputStyle} />
                </div>
                <div>
                    <label style={{ display: 'block', fontSize: '12px' }}>Ad Spend (₹)</label>
                    <input id="statAds" type="number" placeholder="0" style={inputStyle} />
                </div>
                <div>
                    <label style={{ display: 'block', fontSize: '12px' }}>Misc (₹)</label>
                    <input id="statMisc" type="number" placeholder="0" style={inputStyle} />
                </div>
                <button
                    onClick={handleUpdateStats}
                    style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}
                >
                    Save Stats
                </button>
            </div>

            {/* The Table */}
            <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: '10px', overflow: 'hidden' }}>
                <thead>
                    <tr style={{ backgroundColor: '#007bff', color: 'white', textAlign: 'left' }}>
                        <th style={tableHeaderStyle}>Month</th>
                        <th style={tableHeaderStyle}>Income</th>
                        <th style={tableHeaderStyle}>Ads</th>
                        <th style={tableHeaderStyle}>Fixed</th>
                        <th style={tableHeaderStyle}>Misc</th>
                        <th style={tableHeaderStyle}>Profit</th>
                    </tr>
                </thead>
                <tbody>
                    {finances.map((row, index) => (
                        <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                            <td style={tableCellStyle}>{row.month}</td>
                            <td style={{ ...tableCellStyle, color: 'green', fontWeight: 'bold' }}>₹{row.income}</td>
                            <td style={tableCellStyle}>₹{row.ads}</td>
                            <td style={tableCellStyle}>₹{row.fixed}</td>
                            <td style={tableCellStyle}>₹{row.misc}</td>
                            <td style={{ ...tableCellStyle, color: row.profit >= 0 ? 'blue' : 'red', fontWeight: 'bold' }}>
                                ₹{row.profit}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Finance