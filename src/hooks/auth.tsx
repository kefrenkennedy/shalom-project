import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import Router from 'next/router';
import { destroyCookie, parseCookies, setCookie } from 'nookies';

import { api } from '@/services/apiClient';
import { sessionsServices } from '@/services/sessionsServices';
import { SignIn, User } from '@/types/Auth';

interface AuthContextType {
  user: User;
  signIn: (credentials: SignIn) => Promise<void>;
  signOut: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const TOKEN_KEY = 'shalomeventos.token';

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);

  const signIn = useCallback(async ({ email, password }: SignIn) => {
    const responseData = await sessionsServices().create({ email, password });

    const { token, user } = responseData;

    setCookie(undefined, TOKEN_KEY, token, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/', // aplications path that have access to cookie
    });

    setUser(user);

    //@ts-ignore
    api.defaults.headers['Authorization'] = `Bearer ${token}`;

    // Router.push('/dashboard');
  }, []);

  const signOut = useCallback(() => {
    setUser({} as User);

    console.log('começou');
    destroyCookie(null, TOKEN_KEY, {
      path: '/',
    });

    console.log('terminou');

    // Router.push('/signin');
  }, []);

  const updateUser = useCallback(() => {
    const { [TOKEN_KEY]: token } = parseCookies();

    if (token) {
      api
        .get('/profile')
        .then((response) => {
          const { user } = response.data;

          setUser(user);
        })
        .catch((error) => {
          destroyCookie(undefined, 'shalomeventos.token', {
            path: '/',
          });

          Router.push('/');
        });
    }
  }, []);

  useEffect(() => {
    updateUser();
  }, [updateUser]);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
