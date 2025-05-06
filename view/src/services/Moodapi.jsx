// view/src/services/moodApi.jsx

import axios from '../../axios';

const moodApi = {
  submitMood: async (moodData) => {
    try {
      const response = await axios.post('/api/moods', moodData);
      return response.data;
    } catch (error) {
      console.error('Error submitting mood:', error);
      throw error;
    }
  },

  getAllMoods: async () => {
    try {
      const response = await axios.get('/api/moods/all');
      return response.data;
    } catch (error) {
      console.error('Error fetching moods:', error);
      throw error;
    }
  },

  getLatestMood: async () => {
    try {
      const response = await axios.get('/api/moods/latest');
      return response.data;
    } catch (error) {
      console.error('Error fetching latest mood:', error);
      throw error;
    }
  }
};

export default moodApi;
