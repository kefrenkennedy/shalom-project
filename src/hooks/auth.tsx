import React, {
  createContext,
  ReactNode,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import Router from 'next/router';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { ISignInDTO } from '@/dtos';
import { sessionsServices } from '@/services/sessionsServices';
import { api } from '@/services/apiClient';

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface IAuthContext {
  user: IUser;
  signIn: (credentials: ISignInDTO) => Promise<void>;
  signOut: () => void;
}

interface IAuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export function AuthProvider({ children }: IAuthProviderProps) {
  const [user, setUser] = useState<IUser>({} as IUser);

  const signIn = useCallback(async ({ email, password }: ISignInDTO) => {
    const responseData = await sessionsServices().create({ email, password });

    const { token, user } = responseData;

    setCookie(undefined, `shalomeventos.token`, token, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/', // aplications path that have access to cookie
    });

    setUser(user);

    //@ts-ignore
    api.defaults.headers['Authorization'] = `Bearer ${token}`;

    // Router.push('/dashboard');
  }, []);

  const signOut = useCallback(() => {
    setUser({} as IUser);

    destroyCookie(undefined, 'shalomeventos.token');

    // Router.push('/signin');
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): IAuthContext {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
