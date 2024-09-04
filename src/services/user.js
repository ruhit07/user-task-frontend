import axios from 'axios';

const apiUrl = `${import.meta.env.VITE_API_URL}/users/sorted`;

export function sortedUser(data) {
  return axios.post(apiUrl, data);
};

