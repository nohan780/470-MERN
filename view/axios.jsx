import axios from 'axios';

const axioInstance = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
});

export default axioInstance