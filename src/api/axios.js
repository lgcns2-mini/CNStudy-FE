import axios from "axios"; 

export const http = axios.create({
  baseURL: "http://172.31.4.104:8088",
  headers: { "Content-Type": "application/json" },
});

export const httpSummarize = axios.create({
  baseURL: "http://172.31.4.104:9001",
  headers: { "Content-Type": "application/json" },
});

export const httpFortune = axios.create({
  baseURL: "http://172.31.4.104:9002",
  headers: { "Content-Type": "application/json" },
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`; 
  return config;
});
