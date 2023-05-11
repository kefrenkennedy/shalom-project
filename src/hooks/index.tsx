import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';

import { AuthProvider } from './auth';

import 'react-toastify/dist/ReactToastify.css';

interface IAppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: IAppProviderProps) {
  return (
    <AuthProvider>
      {children}

      <ToastContainer />
    </AuthProvider>
  );
}
