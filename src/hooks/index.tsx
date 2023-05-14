import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';

import { AuthProvider } from './auth';
import { SidebarDrawerProvider } from './sidebar';

import 'react-toastify/dist/ReactToastify.css';

interface IAppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: IAppProviderProps) {
  return (
    <AuthProvider>
      <SidebarDrawerProvider>{children}</SidebarDrawerProvider>

      <ToastContainer />
    </AuthProvider>
  );
}
