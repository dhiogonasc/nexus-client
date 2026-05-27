import axios from "axios";
import { storageService } from "./storageService";

export const api = axios.create({
  baseURL: "https://nexus-server-gewa.onrender.com",
});

api.interceptors.request.use(
  async (config) => {
    const token = await storageService.getToken();

    if (
      token &&
      token !== "undefined" &&
      token !== "null" &&
      !config.url?.includes("/auth/")
    ) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
