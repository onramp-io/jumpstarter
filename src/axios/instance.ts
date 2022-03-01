import axios from "axios";

const instance = axios.create({
  baseURL: process.env.PUBLIC_API_URL_DEV,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default instance;
