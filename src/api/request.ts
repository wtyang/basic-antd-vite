// Axios 实例封装

import axios from 'axios';
import type {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { message } from 'antd';
import { getToken, clearAuth } from '@/utils/auth';
import type { ApiResponse } from '@/types/api';

// 创建 Axios 实例
const request: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器 — 自动注入 Token
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截器 — 统一错误处理
request.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const { data } = response;

    // 如果响应是 Blob（文件下载），直接返回
    if (response.config.responseType === 'blob') {
      return response;
    }

    // 业务成功
    if (data.code === 0 || data.code === 200) {
      return data as unknown as AxiosResponse;
    }

    // 业务错误
    message.error(data.message || '请求失败');
    return Promise.reject(new Error(data.message || '请求失败'));
  },
  (error) => {
    if (axios.isCancel(error)) {
      // 请求被取消，静默处理
      return Promise.reject(error);
    }

    const status = error.response?.status;

    switch (status) {
      case 401: {
        message.error('登录已过期，请重新登录');
        clearAuth();
        // 兼容子路径部署
        const baseUrl = import.meta.env.BASE_URL || '/';
        const loginUrl =
          `${baseUrl.endsWith('/') ? baseUrl : baseUrl + '/'}${'login'}`.replace(
            /\/+/g,
            '/',
          );
        window.location.href = loginUrl;
        break;
      }
      case 403:
        message.error('没有操作权限');
        break;
      case 404:
        message.error('请求的资源不存在');
        break;
      case 500:
        message.error('服务器内部错误');
        break;
      default:
        message.error(error.message || '网络异常，请检查网络连接');
    }

    return Promise.reject(error);
  },
);

export default request;
