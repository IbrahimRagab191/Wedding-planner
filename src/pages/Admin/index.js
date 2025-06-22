import React from 'react';
import './Admin.css';

function AdminDashboard() {
    return (
        <div className="admin-dashboard">
        <h1>Admin Panel</h1>
        <p>Welcome, Admin!</p>

        <div className="admin-options">
            <button>View Users</button>
            <button>Manage Vendors</button>
            <button>View Reports</button>
            {/* زود أي خيارات تانية تحبها */}
        </div>
        </div>
    );
    }

export default AdminDashboard;
