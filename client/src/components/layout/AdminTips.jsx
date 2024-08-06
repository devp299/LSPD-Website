import React, { useEffect, useState } from 'react';
import '../../css/admintips.css';
import { Pagination } from '@mui/material';
import { getAllTips } from '../../api';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import toast, { Toaster } from 'react-hot-toast';
const tipsPerPage = 6; // Number of tips to show per page
const AdminTips = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTips = async () => {
      setLoading(true);
      try {
        const response = await getAllTips();
        // Sort tips by createdAt timestamp in descending order (newest first)
        const sortedTips = response.tips.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setTips(sortedTips);
      } catch (error) {
        console.error('Error fetching tips:', error);
      }
      setLoading(false);
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
      {loading && <div className='loader-admin'></div>}
      <h4 className="tips-title">Crime Tips</h4>
      <div className="tips-list">
        <TransitionGroup component={null}>
        {tips.map((tip) => (
          <CSSTransition
            key={tip._id}
            timeout={500}
            classNames="tip-card-transition"
          >
          <div key={tip._id} className="tip-card">
            <div className="tip-id">{}</div>
            <div className="tip-content">"{tip.message}"</div>
          </div>
          </CSSTransition>
        ))}
        </TransitionGroup>
      </div>
      <Toaster/>
    </div>
  );
};
export default AdminTips;