import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getJobs = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/v1/admin/jobs`);
    return response.data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};

export const createJob = async (jobData) => {
  try {
    const response = await axios.post(`${API_URL}/api/v1/admin/jobs`, jobData);
    return response.data;
  } catch (error) {
    console.error("Error creating job:", error);
    throw error;
  }
};

// Add more API calls as needed
