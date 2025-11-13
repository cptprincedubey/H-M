import axios from "axios";
import { toast } from "react-toastify";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 10000,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    toast.error(error.message);
  }
);
