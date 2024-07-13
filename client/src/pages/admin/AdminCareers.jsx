import React, { useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import JobCard from '../../components/layout/JobCard';
import JobDetailsModal from '../../components/modals/JobDetailsModal';
import EditJobModal from '../../components/modals/EditJobModal';
import AddIcon from '@mui/icons-material/Add';
import '../../css/adminCareer.css';
import { IconButton } from '@mui/material';
import AddJobModal from '../../components/modals/AddJobModal';

const jobs = [
  {
    id: 1,
    title: "Police Officer",
    department: "Patrol Division",
    location: "Los Santos",
    summary: "Responsible for maintaining public safety and enforcing laws.",
    description: "As a Police Officer, you will be responsible for maintaining public safety, enforcing laws, and responding to emergencies. You will work closely with the community to prevent and solve crimes. Qualifications include a high school diploma, physical fitness, and passing a background check.",
    requirements: "High school diploma, physical fitness, background check",
    benefits: "Health insurance, retirement plan, paid time off",
  },
  {
    id: 2,
    title: "Detective",
    department: "Investigations Division",
    location: "Los Santos",
    summary: "Conduct investigations and solve crimes.",
    description: "As a Detective, you will conduct investigations and solve crimes. You will gather evidence, interview witnesses, and work closely with other law enforcement agencies. Qualifications include a bachelor's degree in criminal justice, investigative experience, and excellent analytical skills.",
    requirements: "Bachelor's degree in criminal justice, investigative experience",
    benefits: "Health insurance, retirement plan, paid time off, flexible hours",
  },
  {
    id: 3,
    title: 'Forensic Scientist',
    department: 'Forensics',
    location: 'Los Santos',
    summary: 'Analyze physical evidence from crime scenes.',
    description: 'As a Forensic Scientist, you will analyze physical evidence from crime scenes, including DNA, fingerprints, and digital evidence. You will work in a lab environment and collaborate with law enforcement to solve crimes. Qualifications include a bachelor’s degree in forensic science, biology, chemistry, or a related field, laboratory experience, and strong analytical skills.',
    requirements: 'Bachelor’s degree in forensic science, biology, chemistry, or related field, laboratory experience, strong analytical skills.',
    benefits: 'Health insurance, retirement plan, paid time off',
  },
  {
    id: 4,
    title: 'Administrative Assistant',
    department: 'Administration',
    location: 'Los Santos',
    summary: 'Provide administrative support to the police department.',
    description: 'As an Administrative Assistant, you will provide administrative support to the police department, including record keeping, scheduling, and communication tasks. You will work closely with various departments to ensure smooth operations. Qualifications include a high school diploma or GED, proficiency in office software, and excellent organizational skills.',
    requirements: 'High school diploma or GED, proficiency in office software, excellent organizational skills.',
    benefits: 'Health insurance, retirement plan, paid time off',
  },
  {
    id: 5,
    title: 'Public Relations Officer',
    department: 'Public Relations',
    location: 'Los Santos',
    summary: 'Manage the department’s public image and handle media inquiries.',
    description: 'As a Public Relations Officer, you will manage the department’s public image, handle media inquiries, and coordinate community outreach efforts. You will work with the media and the public to promote the department’s initiatives and build positive relationships. Qualifications include a bachelor’s degree in public relations, communications, or a related field, strong communication skills, and experience in media relations.',
    requirements: 'Bachelor’s degree in public relations, communications, or related field, strong communication skills, experience in media relations.',
    benefits: 'Health insurance, retirement plan, paid time off, flexible hours',
  }
    // Add more jobs as needed
  ];
  
  const AdminCareers = () => {
    const [selectedJob, setSelectedJob] = useState(null);
    const [jobList, setJobList] = useState(jobs);
    const [editingJob, setEditingJob] = useState(null);
    const [jobes, setJobes] = useState(jobs);
    const [modalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
      setModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setModalOpen(false);
    };
  
    const handleCreateJob = (newJob) => {
      newJob.id = jobes.length + 1;
      setJobes([newJob, ...jobes]);
    };

    const handleViewDetails = (job) => {
      setSelectedJob(job);
    };
  
    const handleClose = () => {
      setSelectedJob(null);
    };
  
    const handleApply = () => {
      // Handle job application logic here
      alert("Applied for the job successfully!");
      setSelectedJob(null);
    };
  
    const handleEdit = (job) => {
      setEditingJob(job);
      // setSelectedJob(job);
    };
  
    const handleSaveEdit = (updatedJob) => {
      setJobList(jobList.map(job => (job.id === updatedJob.id ? updatedJob : job)));
      setEditingJob(null);
    };
  
    const handleDelete = (jobId) => {
      setJobList(jobList.filter(job => job.id !== jobId));
    };
  return (
    <div>
      <AdminLayout>
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
          '&: hover': {
            backgroundColor: "#4CAD12",
            transform: "scale(1.1)"
          }
        }} onClick={handleOpenModal}>
          <AddIcon fontSize='large'/>
        </IconButton>
      <div className="jobs-container">
        {jobes.map((job) => (
          <JobCard key={job.id} job={job} onViewDetails={handleViewDetails} onEdit={handleEdit} onDelete={handleDelete} />
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
  )
}

export default AdminCareers;
