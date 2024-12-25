import useAuthStore from '@/store/useAuthStore';
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

export const fetchWithAuth = async (
    url: string,
    options: RequestInit = {}
  ): Promise<any> => {
    const token = useAuthStore.getState().token;
    const headers = new Headers(options.headers || {});
    
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    headers.set('Content-Type', 'application/json');
  
    const response = await fetch(url, {
      ...options,
      headers,
    });
  
    // First check if the response is ok
    if (!response.ok) {
      if (response.status === 401) {
        useAuthStore.getState().setIsLoggedIn(false);
      }
      // Try to parse error message if available
      try {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      } catch (e) {
        // If error response isn't JSON
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }
  
    // If response is ok, try to parse JSON
    try {
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Failed to parse JSON response');
    }
  };