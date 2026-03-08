import axios from "axios";
import { toast } from "react-toastify";

// Fallback backend URL if env var is not set
// default to empty string so that `baseURL` becomes "/api" (same origin)
const DEFAULT_BACKEND_URL = "";

// trim whitespace and remove trailing slashes
let backendUrl = (import.meta.env.VITE_BACKEND_URL || DEFAULT_BACKEND_URL)
  .toString()
  .trim()
  .replace(/\/+$/g, "");

// if the value looks like a full URL but fetch fails quickly, warn
if (import.meta.env.DEV) {
  console.log("Backend URL configured:", backendUrl || "(same origin)");
}

if (import.meta.env.DEV) {
  console.log("Backend URL configured:", backendUrl);
}

export const axiosInstance = axios.create({
  // Ensure the backend url doesn't end with a slash so we don't end up with
  // `https://example.com//api`.  if backendUrl is empty the request goes to
  // `/api` on the current origin, which is ideal when front+back deploy
  // together on the same domain.
  baseURL: (backendUrl ? backendUrl : "") + "/api",
  timeout: 15000,
  withCredentials: true,
});

// Function to set seller token
export const setSellerToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // log baseURL in development to help debugging
    if (import.meta.env.DEV) {
      console.debug("Axios request to", config.baseURL, config.url);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// for development we can optionally ping the health endpoint once so
// that the console shows a connection failure early (helps catch mis-set
// VITE_BACKEND_URL values during local testing).
if (import.meta.env.DEV && backendUrl) {
  axios.get(backendUrl + "/api/health").catch(err => {
    console.warn("Warning: unable to reach backend at", backendUrl, err.message);
  });
}

// Response interceptor
let networkErrorShown = false;

axiosInstance.interceptors.response.use(
  (response) => {
    // Reset network error flag on successful response
    networkErrorShown = false;
    return response;
  },
  (error) => {
    // Don't show toast for every error, only show meaningful ones
    if (error.code === 'ECONNABORTED') {
      if (!networkErrorShown) {
        toast.error("Request timeout. Please check your connection.");
        networkErrorShown = true;
      }
    } else if (error.code === 'ERR_NETWORK' || !error.response) {
      // Only show network error once per session
      if (!networkErrorShown) {
        // Don't show toast, let the BackendStatus component handle it
        networkErrorShown = true;
      }
    } else {
      const errorMessage = error.response?.data?.message || error.message || "An error occurred";
      // Show toast for user-facing errors (but not 404s)
      if (error.response?.status !== 404 && error.response?.status !== 401) {
        toast.error(errorMessage);
      }
    }
    return Promise.reject(error);
  }
);
