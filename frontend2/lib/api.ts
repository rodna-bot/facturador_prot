import { authService } from './auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

interface RequestOptions extends RequestInit {
  requireAuth?: boolean;
}

async function fetchAPI(
  endpoint: string,
  options: RequestOptions = {}
): Promise<any> {
  const { requireAuth = true, ...fetchOptions } = options;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(fetchOptions.headers as Record<string, string>),
  };

  if (requireAuth) {
    const token = authService.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: 'Error en la solicitud',
    }));
    throw new Error(error.message || `Error: ${response.status}`);
  }

  return response.json();
}

export const api = {
  get: (endpoint: string, options?: RequestOptions) =>
    fetchAPI(endpoint, { ...options, method: 'GET' }),

  post: (endpoint: string, data?: any, options?: RequestOptions) =>
    fetchAPI(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    }),

  put: (endpoint: string, data?: any, options?: RequestOptions) =>
    fetchAPI(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (endpoint: string, options?: RequestOptions) =>
    fetchAPI(endpoint, { ...options, method: 'DELETE' }),
};
