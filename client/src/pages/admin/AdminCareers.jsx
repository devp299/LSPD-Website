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
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import toast, { Toaster } from 'react-hot-toast';

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
        setJobList([createdJob.data, ...jobList]);
      } else {
        console.error("Error creating job:", createdJob.message);
      }
    } catch (error) {
      setError(error.message);
      toast.error(error.response.data.message);
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
    toast.error("You are admin. You cannot apply");
    setSelectedJob(null);
  };

  const handleEdit = (job) => {
    setEditingJob(job);
  };

  const handleSaveEdit = async (updatedJob) => {
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
      <AdminLayout>
        {/* {error && <div className="error-message">{error}</div>} */}
        <IconButton
          sx={{
            position: "fixed",
            bottom: "40px",
            right: "40px",
            width: "70px",
            height: "70px",
            backgroundColor: "#f39c12",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
            zIndex: "1000",
            transition: "background-color 0.3s ease, transform 0.3s ease"
          }}
          className="add-job-button"
          onClick={handleOpenModal}
        >
          <AddIcon fontSize='large' />
        </IconButton>
        <div className="jobs-container">
          <TransitionGroup component={null}>
            {jobList.map((job) => (
              <CSSTransition
                key={job._id}
                timeout={500}
                classNames="job-card-transition"
              >
                <JobCard
                  key={job._id}
                  job={job}
                  onViewDetails={handleViewDetails}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
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
        <AddJobModal open={modalOpen} onClose={handleCloseModal} onCreate={handleCreateJob} />
        <Toaster/>
      </AdminLayout>
  );
}

export default AdminCareers;
