import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from 'react-hot-toast';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
};
