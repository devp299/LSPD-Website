import React, { useEffect, useState } from "react";
import ApplyForm from "../components/modals/ApplyForm";
import "../css/Careers.css";
import UserLayout from '../components/layout/UserLayout';
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
    <UserLayout>
    <div className="careers-container">

        {/* <video autoPlay muted loop>
          <source src={'https://motionbgs.com/media/2533/pegassi-zentorno-gta5.960x540.mp4'} type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}
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
              <a>Location :</a> {job.location}
            </p>
            <p>
              <a>Department :</a> {job.department}
            </p>
            <p>
              <a>Eligibility :</a> {job.requirements}
            </p>
            <p>
              <a>Benefits :</a> {job.benefits}
            </p>
            <button className="apply-button" onClick={() => handleApply(job)}>
              Apply
            </button>
          </div>
        ))}
      </div>
      {selectedJob && (
        <div className="carer-modal-backdrop" onClick={handleCloseForm}>
          <div className="carer-modal-conten" onClick={(e) => e.stopPropagation()}>
            <ApplyForm job={selectedJob} onClose={handleCloseForm} />
          </div>
        </div>
      )}
    </div>
    </UserLayout>
  );
};

export default Careers;