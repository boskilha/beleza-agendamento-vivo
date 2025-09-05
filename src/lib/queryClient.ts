// Optimized QueryClient configuration
import { QueryClient } from "@tanstack/react-query";

// Optimized QueryClient with better defaults
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Stale time: 5 minutes
      staleTime: 5 * 60 * 1000,
      // Cache time: 10 minutes
      gcTime: 10 * 60 * 1000,
      // Retry failed requests 3 times
      retry: 3,
      // Background refetch settings
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      // Enable network error retries
      retryOnMount: true,
    },
    mutations: {
      // Retry failed mutations once
      retry: 1,
    },
  },
});