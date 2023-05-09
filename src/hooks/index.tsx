import { ReactNode } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './auth';

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
