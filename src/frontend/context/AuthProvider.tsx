import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { onAuthStateChanged } from '@firebase/auth';

import { auth } from '../../firebase/client/client';
import { getIdToken } from 'firebase/auth';

export interface AuthContextType {
  access_token: string;
}

export const AuthContext = createContext<AuthContextType>({
  access_token: '',
});

export const PrivateRouteProvider: NextPage = ({ children }) => {
  const [access_token, setAccessToken] = useState<string>('');

  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/');
      } else {
        const token = await getIdToken(user);
        if (token) {
          setAccessToken(token);
        }
      }
    });
  }, [router]);

  return (
    <AuthContext.Provider value={{ access_token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
