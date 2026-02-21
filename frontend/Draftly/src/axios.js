import axios from "axios";

//No localhost in production so make this dynamic
const BASE_URL = import.meta.env.MODE === "development" 
    ? "http://localhost:5001/api" 
    : "https://draftly-1dpq.onrender.com/api";
const api = axios.create({
    baseURL:BASE_URL
})

export default api;