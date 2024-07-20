import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/admin/jobs';

const getToken = () => {
  return localStorage.getItem('token'); // Adjust according to your storage mechanism
};

export const getJobs = async () => {
  try {
    const token = getToken();
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`, // Include token in the header
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};

export const createJob = async (jobData) => {
  try {
    const token = getToken();
    const response = await axios.post(API_URL, jobData, {
      headers: {
        Authorization: `Bearer ${token}`, // Include token in the header
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating job:', error);
    throw error;
  }
};

export const updateJob = async (jobId, jobData) => {
  try {
    const token = getToken();
    const response = await axios.put(`${API_URL}/${jobId}`, jobData, {
      headers: {
        Authorization: `Bearer ${token}`, // Include token in the header
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating job:', error);
    throw error;
  }
};

export const deleteJob = async (jobId) => {
  try {
    const token = getToken();
    const response = await axios.delete(`${API_URL}/${jobId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include token in the header
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting job:', error);
    throw error;
  }
};
// Add more API calls as needed
