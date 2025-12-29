import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { authToken } from "./authToken";

const headers = {
  "Content-Type": "application/json",
};

interface HttpClientConfig {
  baseURL: string;
  onUnauthorized?: () => void;
}

export const createHttpClient = (
  config: HttpClientConfig | string
): AxiosInstance => {
  const baseURL = typeof config === "string" ? config : config.baseURL;
  const onUnauthorized =
    typeof config === "object" ? config.onUnauthorized : undefined;

  const client = axios.create({
    baseURL,
    headers,
  });

  client.interceptors.request.use(
    (reqConfig: InternalAxiosRequestConfig) => {
      const token = authToken.get();
      if (token && reqConfig.headers) {
        reqConfig.headers.Authorization = `Bearer ${token}`;
      }
      return reqConfig;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  client.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        authToken.remove();
        if (onUnauthorized) {
          onUnauthorized();
        }
      }
      return Promise.reject(error);
    }
  );

  return client;
};
