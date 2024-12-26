import useAuthStore from '@/store/useAuthStore';
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      // staleTime: 5 * 60 * 1000,
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
      
    }
  
    return response;
    
  };