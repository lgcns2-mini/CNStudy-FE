import axios from "axios"; 

export const http = axios.create({
  baseURL: "http://172.31.35.230:9000",
  headers: { "Content-Type": "application/json" },
});

export const httpSummarize = axios.create({
  baseURL: "http://172.31.35.230:9000",
  headers: { "Content-Type": "application/json" },
});

export const httpFortune = axios.create({
  baseURL: "http://172.31.35.230:9000",
  headers: { "Content-Type": "application/json" },
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`; 
  return config;
});
