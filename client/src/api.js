import axios from 'axios';

const API_URL_Job = 'http://localhost:3000/api/v1/admin/jobs';
const API_URL_List = 'http://localhost:3000/api/v1/admin/list';

const getToken = () => {
  return localStorage.getItem('token'); // Adjust according to your storage mechanism
};

export const getJobs = async () => {
  try {
    const token = getToken();
    const response = await axios.get(API_URL_Job, {
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
    const response = await axios.post(API_URL_Job, jobData, {
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
    const response = await axios.put(`${API_URL_Job}/${jobId}`, jobData, {
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
    const response = await axios.delete(`${API_URL_Job}/${jobId}`, {
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

export const getList = async () => {
  try {
    const token = getToken();
    const response = await axios.get(API_URL_List, {
      headers: {
        Authorization: `Bearer ${token}`, // Include token in the header
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching wanted list:', error);
    throw error;
  }
};

export const createListItem = async (listData) => {
  try {
    const token = getToken();
    const response = await axios.post(API_URL_List, listData, {
      headers: {
        Authorization: `Bearer ${token}`, // Include token in the header
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating wanted list:', error);
    throw error;
  }
};

export const updateList = async (listId, listData) => {
  try {
    const token = getToken();
    const response = await axios.put(`${API_URL_List}/${listId}`, listData, {
      headers: {
        Authorization: `Bearer ${token}`, // Include token in the header
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating list:', error);
    throw error;
  }
};

export const deleteList = async (listId) => {
  try {
    const token = getToken();
    const response = await axios.delete(`${API_URL_List}/${listId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include token in the header
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting list:', error);
    throw error;
  }
};

// Add more API calls as needed
