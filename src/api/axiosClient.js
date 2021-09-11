import axios from "axios";

const configAxios = {
  headers: {
    "Content-Type": "application/json",
  },
  // baseURL: "http://localhost:8000",
  baseURL: "https://ltt-json-server.herokuapp.com",
};

// Create instance axios
const axiosClient = axios.create(configAxios);

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosClient;
