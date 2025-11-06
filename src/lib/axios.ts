import axios, { AxiosInstance } from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL as string | undefined;

export const httpClient: AxiosInstance = axios.create({
  baseURL: apiBaseUrl ?? '/',
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
});

let csrfInitialized = false;

async function ensureCsrfCookie(): Promise<void> {
  if (csrfInitialized) return;
  await httpClient.get('/sanctum/csrf-cookie');
  csrfInitialized = true;
}

httpClient.interceptors.request.use(async (config) => {
  // For Laravel Sanctum with cookies, we fetch CSRF cookie once per session
  await ensureCsrfCookie();
  return config;
});

export default httpClient;


