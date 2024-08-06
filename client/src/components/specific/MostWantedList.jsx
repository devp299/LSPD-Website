import React, { useEffect, useState } from "react";
import "../../css/MostWantedList.css";
import { getAllWanted, giveTip } from "../../api";
import toast, { Toaster } from "react-hot-toast";
import { IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import FaceRecognitionModal from '../modals/FaceRecognitionModal';

const MostWantedList = () => {
  const [mostWanted, setMostWanted] = useState([]);
  const [filteredWanted, setFilteredWanted] = useState([]);
  const [selectedCriminal, setSelectedCriminal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTipModalOpen, setIsTipModalOpen] = useState(false);
  const [isFaceRecogModalOpen, setIsFaceRecogModalOpen] = useState(false);
  const [matchedCriminal, setMatchedCriminal] = useState(null);
  const [tip, setTip] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    const fetchList = async () => {
      setLoading(true);
      try {
        const response = await getAllWanted();
        if (response.status === 200) {
          const sortedList = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setMostWanted(sortedList);
          setFilteredWanted(sortedList);
          setDataFetched(true);
        } else {
          console.error("Fetched data is not an array:", response);
          setDataFetched(true);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setDataFetched(true);
      }
      setLoading(false);
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
    setLoading(true);
    try {
      const response = await giveTip({ message: tip });
      if (response.data.success) {
        toast.success("Tip given successfully");
        closeTipModal();
      } else {
        console.log('No token received');
      }
    } catch (error) {
      console.log('An error occurred', error);
    }
    setLoading(false);
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

  const handleFaceRecognitionMatch = (criminal) => {
    setMatchedCriminal(criminal);
  };

  const closeFaceRecognitionModal = () => {
    setIsFaceRecogModalOpen(false);
    setMatchedCriminal(null);
  };

  return (
    <div className="most-wanted-container">
      {loading && <div className="loader"></div>}
      <video autoPlay muted loop>
        <source src={'https://motionbgs.com/media/2534/gta-5-night-city.960x540.mp4'} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <h1>Los Santos Most Wanted</h1>
      {/* <button className="face-recog-button" onClick={() => setIsFaceRecogModalOpen(true)}>
        Face Recognition
      </button> */}
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search criminals..."
        className="search-input"
      />
      <div className="most-wanted-list">
        {!loading && !dataFetched && <div className="no-results"><h3>Loading...</h3></div>}
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
              <div style={{ marginTop: "1rem", color: "#ffb463", display: "flex", fontSize: '2em', justifyContent: "center", height: "2rem" }}>
                <strong style={{ color: "#ffb463" }}></strong> {criminal.name}
              </div>
              <div className="brutalist-card__message">
                <br />
                <strong style={{ color: "#ffb463" }}>Crimes :</strong> {criminal.crimes}
                <br />
                <strong style={{ color: "#ffb463" }}>Last Seen:</strong> {criminal.lastSeen}
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
              </div>
            </div>
          ))
        ) : (
          !loading && <div className="no-results"><h3>No results Found</h3></div>
        )}
      </div>
      <button
        className="global-tip-button"
        onClick={() => openTipModal(null)}
      >
        Give Tip
      </button>
      {isModalOpen && (
        <div className="wanted-modal" onClick={closeModal}>
          <div className="wanted-modal-content" onClick={(e) => e.stopPropagation()}>
            <IconButton className="wanted-close" onClick={closeModal}>
              <CloseIcon />
            </IconButton>
            <div className="brutalist-card__icon wanted-modal-image">
              <img
                src={selectedCriminal.image.url}
                alt={selectedCriminal.name}
                className="criminal-photo"
              />
              <h6 style={{ color: "#ffb463" }}>{selectedCriminal.name}</h6>
            </div>
            <p><strong style={{ color: "#ffb463" }}>Alias :</strong> {selectedCriminal.alias}</p>
            <p><strong style={{ color: "#ffb463" }}>Description :</strong> {selectedCriminal.description}</p>
            <p><strong style={{ color: "#ffb463" }}>Crimes :</strong> {selectedCriminal.crimes}</p>
            <p><strong style={{ color: "#ffb463" }}>Last Seen :</strong> {selectedCriminal.lastSeen}</p>
          </div>
        </div>
      )}
      {isTipModalOpen && (
        <div className="wanted-modal" onClick={closeTipModal}>
          <div className="wanted-tip-modal-content" onClick={(e) => e.stopPropagation()}>
            <IconButton className="wanted-close" onClick={closeTipModal}>
              <CloseIcon/>
            </IconButton>
            <h6>Give a Tip</h6>
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
      {isFaceRecogModalOpen && (
        <FaceRecognitionModal
          onClose={closeFaceRecognitionModal}
          onMatch={handleFaceRecognitionMatch}
        />
      )}
      {matchedCriminal && (
        <div className="matched-modal" onClick={() => setMatchedCriminal(null)}>
          <div className="wanted-modal-content" onClick={(e) => e.stopPropagation()}>
            <IconButton className="wanted-close" onClick={() => setMatchedCriminal(null)}>
              <CloseIcon />
            </IconButton>
            <div className="brutalist-card__icon wanted-modal-image">
              <img
                src={matchedCriminal.image.url}
                alt={matchedCriminal.name}
                className="criminal-photo"
              />
              <h6 style={{ color: "#ffb463" }}>{matchedCriminal.name}</h6>
            </div>
            <p><strong style={{ color: "#ffb463" }}>Alias :</strong> {matchedCriminal.alias}</p>
            <p><strong style={{ color: "#ffb463" }}>Description :</strong> {matchedCriminal.description}</p>
            <p><strong style={{ color: "#ffb463" }}>Crimes :</strong> {matchedCriminal.crimes}</p>
            <p><strong style={{ color: "#ffb463" }}>Last Seen :</strong> {matchedCriminal.lastSeen}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MostWantedList;
