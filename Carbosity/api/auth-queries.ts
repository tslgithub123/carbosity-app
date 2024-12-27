import { useMutation } from "@tanstack/react-query";
import { fetchWithAuth } from "./queryUtils";
import { Credentials } from "@/types/Credentials";
import { endpoints } from "./endpoints";

export const useLogin = () => {
    console.log(endpoints.auth.login)
    const mutation = useMutation({
      mutationFn: async (credentials: Credentials) => {
        return fetchWithAuth(endpoints.auth.login, {
          method: 'POST',
          body: JSON.stringify(credentials),
        });
      },
    });
  
    return {
      ...mutation,
      isPending: mutation.isPending,
      isError: mutation.isError,
    };
  };

  
  export const useRegister = (onSuccess?: (data: any) => void, onError?: (error: any) => void) => {
    const mutation = useMutation({
      mutationFn: async (credentials: Credentials) => {
        const response = await fetchWithAuth(endpoints.auth.register, {
          method: 'POST',
          body: JSON.stringify(credentials),
        });
  
  
        return response.json();
      },
      onSuccess,
      onError,
    });
  
    return {
      ...mutation,
      isPending: mutation.isPending,
      isError: mutation.isError,
      error: mutation.error,
    };
  };