// Add auth header function
const getAuthHeader = () => {
  const user = localStorage.getItem('user');
  if (user) {
    const userData = JSON.parse(user);
    if (userData && userData.token) {
      return { 'Authorization': 'Bearer ' + userData.token };
    }
  }
  return {};
};

const API_URL = 'http://localhost:8080/api/resume-matching';

const resumeService = {
  matchResume: async (resumeText, jobDescription) => {
    try {
      const response = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader()
        },
        body: JSON.stringify({
          resume: resumeText,
          jobDescription: jobDescription
        }),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error matching resume:', error);
      throw error;
    }
  },

  uploadResume: async (file, jobDescription) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('jobDescription', jobDescription);
      
      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        headers: {
          ...getAuthHeader()
          // Don't set Content-Type with FormData
        },
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error uploading resume:', error);
      throw error;
    }
  }
};

export default resumeService;
