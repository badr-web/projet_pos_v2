import React, { useState, useEffect } from 'react';

export default function Navbar({ onToggleAdmin, isAdmin }) {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const id = setInterval(() => setDate(new Date()), 1000);
        return () => clearInterval(id);
    }, []);


    return (
        <nav className="navbar">
            <h1 className="navbar-title">Café POS</h1>
            <div className="navbar-right">
                <div className="navbar-clock"> 
                    {date.toLocaleDateString()} {date.toLocaleTimeString()}
                </div>
                <button className="button small" onClick={onToggleAdmin}>
                    {isAdmin ? 'Back' : 'Admin'}
                </button>
            </div>
        </nav>
    );
}
