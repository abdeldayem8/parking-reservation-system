import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { API_URL } from '../Config/Config';
import { endpoints } from '../Config/endpoints';

interface User {
  id: string;
  username: string;
  role: 'admin' | 'employee';
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isLoading: boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (username: string, password: string) => {
        set({ isLoading: true });
        
        try {
          const response = await API_URL.post(endpoints.auth.login, {
            username,
            password,
          });

          // Axios automatically throws for non-2xx status codes
          set({
            user: response.data.user,
            token: response.data.token,
            isAuthenticated: true,
            isLoading: false,
          });
          return { success: true };
        } catch (error: any) {
          set({ isLoading: false });
          
          // Handle Axios error response
          const errorMessage = error.response?.data?.message || 
                              error.message || 
                              'Login failed';
          
          return { 
            success: false, 
            error: errorMessage
          };
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
