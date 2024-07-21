import React, { useEffect, useState } from 'react';
import '../../css/admintips.css';
import { Pagination } from '@mui/material';
import { getAllTips } from '../../api';

const tipsPerPage = 6; // Number of tips to show per page

// const tips = [
//   { id: 1, content: "Suspicious activity near the old warehouse. Multiple individuals observed entering and exiting late at night, carrying large bags and boxes." },
//   { id: 2, content: "I saw someone matching the description of a wanted person in Vinewood. They were wearing a red hoodie and black jeans, and seemed to be meeting with several individuals in a secluded area." },
//   { id: 3, content: "There's a vehicle parked for hours in a no-parking zone. Driver appears to be monitoring nearby establishments and making frequent phone calls." },
//   { id: 4, content: "A person carrying a suspicious package near the bank. Package is unmarked and appears to be heavy. Person was seen quickly entering and exiting the area." },
//   { id: 5, content: "Loud noises and shouting heard from the abandoned house on 3rd street. Possible illegal gathering or altercation involving multiple individuals." },
//   { id: 6, content: "Group of individuals gathering late at night behind the gas station. Suspicious activity and exchanges of small packages observed between them." },
//   { id: 7, content: "Unusual number of vehicles seen entering and exiting an abandoned warehouse at odd hours. No known business or legitimate activity registered for the location." },
//   { id: 8, content: "Several reports of vandalism and graffiti in the downtown area. Tags and symbols suggest potential gang activity marking territory." },
//   { id: 9, content: "Someone seen dumping large bags into the river. Concerns about environmental impact and potential illegal disposal of hazardous materials." },
//   { id: 10, content: "Suspicious person offering 'too good to be true' deals on electronics in the parking lot. Potential scam operation targeting unsuspecting buyers." }
// ];

const AdminTips = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [tips,setTips] = useState([]);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const response = await getAllTips();
        setTips(response.tips);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchTips();
  }, []);

  const handlePageChange = (event,value) => {
    setCurrentPage(value)
  }
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
