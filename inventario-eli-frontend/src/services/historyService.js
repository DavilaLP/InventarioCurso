// src/services/historyService.js
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const getHistory = async () => {
  const response = await axios.get(`${BACKEND_URL}/api/history`, { withCredentials: true });
  return response.data;
};

export const getSalesReport = async (from, to) => {
  let url = `${BACKEND_URL}/api/history/sales`;
  if (from && to) {
    url += `?from=${from}&to=${to}`;
  }
  const response = await axios.get(url, { withCredentials: true });
  return response.data;
};

export const clearHistory = async () => {
  const response = await axios.delete(`${BACKEND_URL}/api/history`, { withCredentials: true });
  return response.data;
};
