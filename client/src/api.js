import axios from 'axios';
const API_URL = 'http://localhost:3000/api/v1/user/me';
const API_URL_Job = 'http://localhost:3000/api/v1/admin/jobs';
const API_URL_List = 'http://localhost:3000/api/v1/admin/list';
const API_URL_News = 'http://localhost:3000/api/v1/admin/news';
const API_URL_Tips = 'http://localhost:3000/api/v1/admin/tips';
const API_URL_User_News = 'http://localhost:3000/api/v1/user/news';
const API_URL_User_Like = 'http://localhost:3000/api/v1/user/like';
const API_URL_User_Comment = 'http://localhost:3000/api/v1/user/comment';
const API_URL_User_Jobs = 'http://localhost:3000/api/v1/user/jobs';
const API_URL_User_Apply = 'http://localhost:3000/api/v1/user/apply';
const API_URL_User_Tips = 'http://localhost:3000/api/v1/user';
const API_URL_User_List = 'http://localhost:3000/api/v1/user/list';


export const getToken = localStorage.getItem('user-token') ; // Adjust according to your storage mechanism

export const getMyProfile = async() => {
  try{
    const token = getToken;
    const response = await axios.get("http://localhost:3000/api/v1/user/me", {
      headers: { 
        Authorization: `Bearer ${token}`
      }
      });
      return response.data;
  } catch(error){
    // console.log(error);
    throw error;
  } 
}
export const getAllUserNews = async () => {
  try {
    // const token = getToken;
    // console.log("token for fetching news and announcement");
    const response = await axios.get(API_URL_User_News, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('user-token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.log('Error getting News', error);
    throw error;
  }
}

export const getAllWanted = async () => {
  try {
    // const token = getToken;
    const response = await axios.get(API_URL_User_List);
    return response;
  } catch (error) {
      console.log('Error getting Wanted', error);
      throw error;
  }
}
export const getAllUserJobs = async () => {
  try {
    const response = await axios.get(API_URL_User_Jobs, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('user-token')}`, // Include token in the header
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
}

export const apply = async (data) => {
  try {
    const response = await axios.post(API_URL_User_Apply, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('user-token')}`, // Include token in the header
      },
    });
      return response.data;
    } catch (error) {
        console.error('Error fetching jobs:', error);
        throw error; 
    }
}

export const giveTip = async (message) => {
  try {
    const response = await axios.post(API_URL_User_Tips, message);
      return response;
  } catch (error) {
      // console.error('Error fetching jobs:', error);
      throw error;
  }
}

export const getJobs = async () => {
  try {
    const response = await axios.get(API_URL_Job, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('lspd-admin-token')}`, // Include token in the header
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
    const response = await axios.post(API_URL_Job, jobData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('lspd-admin-token')}`, // Include token in the header
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
    const response = await axios.put(`${API_URL_Job}/${jobId}`, jobData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('lspd-admin-token')}`, // Include token in the header
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
    const response = await axios.delete(`${API_URL_Job}/${jobId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('lspd-admin-token')}`, // Include token in the header
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
    const response = await axios.get(API_URL_List, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('lspd-admin-token')}`, // Include token in the header
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
    const response = await axios.post(API_URL_List, listData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('lspd-admin-token')}`, // Include token in the header
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    // console.error('Error creating wanted list:', error);
    // throw error;
  }
};

export const updateList = async (listId, listData) => {
  try {
    const response = await axios.put(`${API_URL_List}/${listId}`, listData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('lspd-admin-token')}`, // Include token in the header
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
    const response = await axios.delete(`${API_URL_List}/${listId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('lspd-admin-token')}`, // Include token in the header
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting list:', error);
    throw error;
  }
};

export const getAllAnnouncements = async () => {
  try {
    const response = await axios.get(`${API_URL_News}`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('lspd-admin-token')}`, // Include token in the header
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching announcements:', error);
    throw error;
  }
};

// Create a new announcement
export const createAnnouncement = async (announcementData) => {
  try {
    const response = await axios.post(`${API_URL_News}`, announcementData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('lspd-admin-token')}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating announcement:', error);
    throw error;
  }
};

// Update an announcement
export const updateAnnouncement = async (newsId, announcementData) => {
  try {
    const response = await axios.put(`${API_URL_News}/${newsId}`,announcementData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('lspd-admin-token')}`, // Include token in the header
        'Content-Type': 'application/json', 
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating news:', error);
    throw error;
  }
};

// Delete an announcement
export const deleteAnnouncement = async (id) => {
  try {
    const response = await axios.delete(`${API_URL_News}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('lspd-admin-token')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting announcement:', error);
    throw error;
  }
};

export const getAllTips = async () => {
  try {
    const response = await axios.get(`${API_URL_Tips}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('lspd-admin-token')}`
      }
    });
    return response.data;
    } catch (error) {
        console.error('Error getting tips:', error);
        throw error;
      }
}

export const likeNews = async (announcementId) => {
  try {
    const response = await axios.post('http://localhost:3000/api/v1/user/like', { announcementId },{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('user-token')}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error liking news');
  }
};

export const fetchLikes = async (announcementId) => {
  try {
    const response = await axios.get(`${API_URL_User_Like}/${announcementId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching likes:', error);
    throw error;
  }
}

export const checkUserLike = async (announcementId) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/v1/user/like-status/${announcementId}`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('user-token')}`
      }
    });
    return response.data; // Assuming the response includes a 'liked' property
} catch (error) {
    console.error('Error checking like:', error);
    return { liked: false };
}
}

export const giveComment = async ({ newsId, comment }) => {
  try {
    const response = await axios.post('http://localhost:3000/api/v1/user/comment', { newsId, comment }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('user-token')}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error commenting news');
  }
};

export const getComments = async (announcementId) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/v1/user/comment/${announcementId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('user-token')}`
      }
    });

    // Filter comments based on the announcementId
    const filteredComments = response.data.comments.filter(comment => comment.newsId === announcementId);
    // console.log(filteredComments);
    return filteredComments;
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
};
// Add more API calls as needed
