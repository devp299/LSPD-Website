import React, { useEffect, useState } from "react";
import ApplyForm from "../components/modals/ApplyForm";
import "../css/Careers.css";
import { getAllUserJobs } from "../api";

const Careers = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getAllUserJobs();
        if (response.success && Array.isArray(response.data)) {
          // Sort jobs by createdAt timestamp in descending order (newest first)
          const sortedJobs = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setJobs(sortedJobs);
        } else {
          console.error("Fetched data is not an array:", response.data);
        }
      } catch (error) {
        setError(error.message);
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();    
  }, []);

  const handleApply = (job) => {
    setSelectedJob(job);
  };

  const handleCloseForm = () => {
    setSelectedJob(null);
  };

  return (
    <div className="careers-container">
      <h1>Join the Madness: LSPD Careers</h1>
      <div className="job-list">
        {jobs.map((job) => (
          <div key={job._id} className="job-posting">
            <div className="job-header">
              {/* <img src={job.image} alt={job.title} className="job-image" /> */}
              <h3>{job.title}</h3>
            </div>
            {/* <p>
              <strong>Description :</strong> {job.description}
            </p> */}
            <p>
              <strong>Location :</strong> {job.location}
            </p>
            <p>
              <strong>Department :</strong> {job.department}
            </p>
            <p>
              <strong>Eligibility :</strong> {job.requirements}
            </p>
            <p>
              <strong>Benefits :</strong> {job.benefits}
            </p>
            <button className="apply-button" onClick={() => handleApply(job)}>
              Apply
            </button>
          </div>
        ))}
      </div>
      {selectedJob && (
        <div className="career-modal-backdrop" onClick={handleCloseForm}>
          <div className="career-modal-content" onClick={(e) => e.stopPropagation()}>
            <ApplyForm job={selectedJob} onClose={handleCloseForm} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Careers;
