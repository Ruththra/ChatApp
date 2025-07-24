// axios use to fetch resources from the backend
// This file is used to create an axios instance with a base URL
// and can be imported in other files to make API calls.

import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5001/api",// Base URL for the API contain the backend server address
  withCredentials: true, // This allows cookies to be sent with requests
});

