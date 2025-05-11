import { envConfig } from "@/config/envConfig";
import axios from "axios";
import { cookies } from "next/headers";

const api = axios.create({
  baseURL: envConfig.baseUrl,
  withCredentials: true,
});

// Request interceptor
api.interceptors.request.use(
  async (config) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const cookieStore = await cookies();
      cookieStore.set("token", "", {
        path: "/",
        expires: new Date(0),
      });
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
