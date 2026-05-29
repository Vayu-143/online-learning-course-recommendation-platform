import axios from "axios";

const API = axios.create({
  baseURL:
    "https://online-learning-course-recommendation-r7wl.onrender.com/api",
});

export default API;