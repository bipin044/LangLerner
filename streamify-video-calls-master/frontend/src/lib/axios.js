import axios from "axios";

// Use actual backend URL in production
const BASE_URL = import.meta.env.MODE === "development" 
  ? "http://localhost:5001/api" 
  : "https://lingualink-backend-nohq.onrender.com/api";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // send cookies with the request
});
