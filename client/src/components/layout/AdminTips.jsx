import React, { useEffect, useState } from 'react';
import '../../css/admintips.css';
import { Pagination } from '@mui/material';
import { getAllTips } from '../../api';

const tipsPerPage = 6; // Number of tips to show per page

const AdminTips = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [tips, setTips] = useState([]);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const response = await getAllTips();
        // Sort tips by createdAt timestamp in descending order (newest first)
        const sortedTips = response.tips.sort((a, b) => new Date(b.date) - new Date(a.date));
        setTips(sortedTips);
      } catch (error) {
        console.error('Error fetching tips:', error);
      }
    };
    fetchTips();
  }, []);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Calculate indexes for tips to display based on current page
  const indexOfLastTip = currentPage * tipsPerPage;
  const indexOfFirstTip = indexOfLastTip - tipsPerPage;
  const currentTips = tips.slice(indexOfFirstTip, indexOfLastTip);

  // Determine total number of pages
  const totalPages = Math.ceil(tips.length / tipsPerPage);

  return (
    <div className="admin-tips-container">
      <h1 className="tips-title">Crime Tips</h1>
      <div className="tips-list">
        {currentTips.map((tip) => (
          <div key={tip._id} className="tip-card">
            <div className="tip-id">{}</div>
            <div className="tip-content">"{tip.message}"</div>
          </div>
        ))}
      </div>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        className="pagination"
      />
    </div>
  );
};

export default AdminTips;
