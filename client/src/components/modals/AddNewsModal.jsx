import React, { useState } from 'react';
import '../../css/addNewsModal.css';

const AddNewsModal = ({ open, onClose, onCreate }) => {
  const [newsDetails, setNewsDetails] = useState({
    title: '',
    content: '',
    location: '',
    author: '',
    date: '',
    image: null,
  });

  const handleChange = (e) => {
    setNewsDetails({ ...newsDetails, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setNewsDetails({ ...newsDetails, image: e.target.files[0] });
  };

  const handleCreate = () => {
    onCreate(newsDetails);
    onClose();
  };

  return (
    <div className={`add-news-modal ${open ? 'open' : ''}`}>
      <div className="add-news-modal-content">
        <h1 className="add-news-modal-title">Add New Announcement</h1>
        <div className="input-news-group">
          <div className='input-news-tag'>
          <div className="input-news-container">
            <label className="input-label" htmlFor="title">Title</label>
            <input
              id="title"
              className="job-input"
              name="title"
              type="text"
              value={newsDetails.title}
              onChange={handleChange}
            />
          </div>
          <div className="input-news-container">
            <label className="input-label" htmlFor="location">Location</label>
            <input
              id="location"
              className="job-input"
              name="location"
              type="text"
              value={newsDetails.location}
              onChange={handleChange}
            />
          </div>
          </div>
          <div className="input-news-container">
            <label className="input-label" htmlFor="content">Content</label>
            <textarea
              id="content"
              className="job-textarea"
              name="content"
              value={newsDetails.content}
              onChange={handleChange}
            />
          </div>
          <div className='input-news-tag'>
          <div className="input-news-container">
            <label className="input-label" htmlFor="date">Date & Time</label>
            <input
              id="date"
              className="job-input"
              name="date"
              type="datetime-local"
              value={newsDetails.date}
              onChange={handleChange}
            />
          </div>
          <div className="input-news-container">
          <input
            accept="image/*"
            type="file"
            onChange={handleImageChange}
            style={{ margin: '2rem 0' }}
          />
          </div>
        </div>
        </div>
        <div className="add-job-modal-buttons">
          <button className="create-btn" onClick={handleCreate}>
            Create
          </button>
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewsModal;
