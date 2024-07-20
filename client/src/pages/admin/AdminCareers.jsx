import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import JobCard from '../../components/layout/JobCard';
import JobDetailsModal from '../../components/modals/JobDetailsModal';
import EditJobModal from '../../components/modals/EditJobModal';
import AddIcon from '@mui/icons-material/Add';
import '../../css/adminCareer.css';
import { IconButton } from '@mui/material';
import AddJobModal from '../../components/modals/AddJobModal';
import { getJobs, createJob, updateJob, deleteJob } from '../../api';

const AdminCareers = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobList, setJobList] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getJobs();
        if (response.success && Array.isArray(response.data)) {
          // Sort jobs by createdAt timestamp in descending order (newest first)
          const sortedJobs = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setJobList(sortedJobs);
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

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleCreateJob = async (newJob) => {
    try {
      const createdJob = await createJob(newJob);
      if (createdJob.success) {
        // Update job list with the new job
        setJobList([createdJob.data, ...jobList]);
      } else {
        console.error("Error creating job:", createdJob.message);
      }
    } catch (error) {
      setError(error.message);
      console.error("Error creating job:", error);
    }
  };

  const handleViewDetails = (job) => {
    setSelectedJob(job);
  };

  const handleClose = () => {
    setSelectedJob(null);
  };

  const handleApply = () => {
    alert("Applied for the job successfully!");
    setSelectedJob(null);
  };

  const handleEdit = (job) => {
    setEditingJob(job);
  };

  const handleSaveEdit = async (updatedJob) => {
    console.log("Updating Job ID:", updatedJob._id); // Add this line for debugging
    try {
      const response = await updateJob(updatedJob._id, updatedJob);
      if (response.success) {
        setJobList(jobList.map(job => (job._id === updatedJob._id ? response.data : job)));
        setEditingJob(null);
      } else {
        console.error("Error updating job:", response.message);
      }
    } catch (error) {
      setError(error.message);
      console.error("Error updating job:", error);
    }
  };

  const handleDelete = async (jobId) => {
    try {
      const response = await deleteJob(jobId);
      if (response.success) {
        setJobList(jobList.filter(job => job._id !== jobId));
      } else {
        console.error("Error deleting job:", response.message);
      }
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  return (
    <div>
      <AdminLayout>
        {error && <div className="error-message">{error}</div>}
        <IconButton sx={{
          position: "fixed",
          bottom: "40px",
          right: "40px",
          width: "60px",
          height: "60px",
          backgroundColor: "#4CAF50",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          boxShadow:" 0 2px 10px rgba(0, 0, 0, 0.2)",
          zIndex: "1000",
          transition: "background-color 0.3s ease, transform 0.2s ease-out",
          '&:hover': {
            backgroundColor: "#4CAD12",
            transform: "scale(1.1)"
          }
        }} onClick={handleOpenModal}>
          <AddIcon fontSize='large'/>
        </IconButton>
        <div className="jobs-container">
          {jobList.map((job) => (
            <JobCard key={job._id} job={job} onViewDetails={handleViewDetails} onEdit={handleEdit} onDelete={handleDelete} />
          ))}
        </div>
        {selectedJob && (
          <JobDetailsModal
            job={selectedJob}
            onClose={handleClose}
            onApply={handleApply}
          />
        )}
        {editingJob && (
          <EditJobModal
            job={editingJob}
            onClose={() => setEditingJob(null)}
            onSave={handleSaveEdit}
          />
        )}
        <AddJobModal open={modalOpen} onClose={handleCloseModal} onCreate={handleCreateJob}/>
      </AdminLayout>
    </div>
  );
}

export default AdminCareers;
