import React from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import AdminTips from '../../components/layout/AdminTips';

const AdminDashboard = () => {
  return (
    <div>
      <AdminLayout>
        <div style={{ display: "flex" }}>

          {/* Left side for AdminTips */}
          <div style={{ flex: 1, overflow: 'auto' }}>
            <AdminTips />
          </div>
          {/* Right side for new features */}
          <div style={{ flex: '0 0 500px', height: '100vh', overflow: 'auto', position: 'sticky', top: 0 }}>
            <div style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', background: '#f7f7f7' }}>
              <h2>New Feature</h2>
              <p>Placeholder content for new feature.</p>
            </div>
          </div>
          
          
        </div>
      </AdminLayout>
    </div>
  );
};

export default AdminDashboard;
