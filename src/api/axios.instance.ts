import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.VERCEL_URL || "http://localhost:8000",
  headers: {
    "Content-type": "application/json",
  },
});
