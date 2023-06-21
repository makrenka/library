import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

import { BASE_URL } from '../constants/api';
import { ROUTES } from '../constants/routes';

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 30000,
});

axiosInstance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        const token = Cookies.get('token');

        if (token) {
            return {
                ...config,
                headers: {
                    ...config.headers,
                    Authorization: `Bearer ${token}`,
                },
            };
        }

        return config;
    },
    (error: Error & AxiosError) => Promise.reject(error),
);

axios.interceptors.response.use(
    (response: AxiosResponse) => response,

    (error: AxiosError) => {
        if (error.response?.status === 401) {
            Cookies.remove('token');
            localStorage.removeItem('user');
            window.location.replace(ROUTES.auth);
        }

        return Promise.reject(error);
    },
);
