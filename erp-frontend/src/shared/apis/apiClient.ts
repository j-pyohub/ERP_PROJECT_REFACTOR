import type { AxiosInstance } from "axios";
import axios from "axios";

const BASE_URL = 'http://localhost:5432/api';

const apiClient: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    timeout: 10000,
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
        console.log('인증 실패. 로그인 페이지로 이동해야 함');
            //로그인 페이지로 이동하게 해야 함
        }
        return Promise.reject(error);
    }
);

export default apiClient;