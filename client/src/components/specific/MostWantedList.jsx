import React, { useEffect, useState } from "react";
import "../../css/MostWantedList.css";
import { getAllWanted, giveTip } from "../../api";
import toast, { Toaster } from "react-hot-toast";

const MostWantedList = () => {
  const [mostWanted, setMostWanted] = useState([]);
  const [filteredWanted, setFilteredWanted] = useState([]);
  const [selectedCriminal, setSelectedCriminal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTipModalOpen, setIsTipModalOpen] = useState(false);
  const [tip, setTip] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await getAllWanted();
        if (response.status === 200) {
          // Sort jobs by createdAt timestamp in descending order (newest first)
          const sortedList = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setMostWanted(sortedList);
          setFilteredWanted(sortedList);
        } else {
          console.error("Fetched data is not an array:", response);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchList();  
  }, []);

  const openModal = (criminal) => {
    setSelectedCriminal(criminal);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCriminal(null);
  };

  const openTipModal = (criminal) => {
    setSelectedCriminal(criminal);
    setIsTipModalOpen(true);
  };

  const closeTipModal = () => {
    setIsTipModalOpen(false);
    setSelectedCriminal(null);
    setTip("");
  };

  const handleTipSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await giveTip({message: tip});
      if (response.data.success) {
        toast.success("Tip given successfully");
        closeTipModal();
      } else {
        console.log('No token received');
      }
    } catch (error) {
      console.log('An error occurred',error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    const query = e.target.value.toLowerCase();
    const filtered = mostWanted.filter((criminal) =>
      criminal.name.toLowerCase().includes(query) ||
      criminal.alias.toLowerCase().includes(query) ||
      criminal.description.toLowerCase().includes(query) ||
      criminal.crimes.toLowerCase().includes(query) ||
      criminal.lastSeen.toLowerCase().includes(query)
    );
    setFilteredWanted(filtered);
  };

  return (
    <div className="most-wanted-container">
      <h1>Los Santos Most Wanted</h1>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search criminals..."
        className="search-input"
      />
      <div className="most-wanted-list">
        {filteredWanted.length > 0 ? (
          filteredWanted.map((criminal) => (
            <div key={criminal._id} className="brutalist-card">
              <div className="brutalist-card__header">
                <div className="brutalist-card__icon">
                  <img
                    src={criminal.image.url}
                    alt={criminal.name}
                    className="criminal-photo"
                  />
                </div>
                <div className="brutalist-card__alert">{criminal.alias}</div>
              </div>
              <div className="brutalist-card__message">
                <strong style={{color: "#ff0000"}}>Name :</strong> {criminal.name}
                <br />
                <strong style={{color: "#ff0000"}}>Description :</strong> {criminal.description}
                <br />
                {/* <strong>Crimes:</strong> {criminal.crimes} */}
                {/* <br /> */}
                <strong style={{color: "#ff0000"}}>Last Seen:</strong> {criminal.lastSeen}
              </div>
              <div className="brutalist-card__actions">
                <a
                  className="brutalist-card__button brutalist-card__button--mark"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    openModal(criminal);
                  }}
                >
                  Read More
                </a>
                <a
                  className="brutalist-card__button brutalist-card__button--read"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    openTipModal(criminal);
                  }}
                >
                  Give Tip
                </a>
              </div>
              <Toaster/>
            </div>
          ))
        ) : (
          <div className="no-results"><h3>No results Found</h3></div>
        )}
      </div>
      {isModalOpen && (
        <div className="wanted-modal" onClick={closeModal}>
          <div className="wanted-modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="wanted-close" onClick={closeModal}>
              &times;
            </span>
            <h2>{selectedCriminal.name}</h2>
            <p><strong style={{color: "#ff0000"}}>Alias :</strong> {selectedCriminal.alias}</p>
            <p><strong style={{color: "#ff0000"}}>Description :</strong> {selectedCriminal.description}</p>
            <p><strong style={{color: "#ff0000"}}>Crimes :</strong> {selectedCriminal.crimes}</p>
            <p><strong style={{color: "#ff0000"}}>Last Seen :</strong> {selectedCriminal.lastSeen}</p>
            <p><strong style={{color: "#ff0000"}}>Details :</strong> {selectedCriminal.details}</p>
          </div>
        </div>
      )}
      {isTipModalOpen && (
        <div className="wanted-modal" onClick={closeTipModal}>
          <div className="wanted-modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="wanted-close" onClick={closeTipModal}>
              &times;
            </span>
            <h2>Give a Tip for {selectedCriminal.name}</h2>
            <textarea
              className="list-textArea"
              name="tip"
              value={tip}
              onChange={(e) => setTip(e.target.value)}
              placeholder="Enter your tip here..."
            ></textarea>
            <button className="wanted-button brutalist-card__button" onClick={handleTipSubmit}>
              Submit Tip
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MostWantedList;
