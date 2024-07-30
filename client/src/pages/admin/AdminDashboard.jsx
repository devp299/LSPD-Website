import React from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import AdminTips from '../../components/layout/AdminTips';

const AdminDashboard = () => {
  return (
    <div>
      <AdminLayout>
        <div style={{ display: "flex" }}>

          <div style={{ flex: 1, overflow: 'auto' }}>
            <AdminTips />
          </div>
        </div>
      </AdminLayout>
    </div>
  );
};

export default AdminDashboard;
