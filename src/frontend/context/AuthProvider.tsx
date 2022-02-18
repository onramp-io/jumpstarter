import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { onAuthStateChanged } from '@firebase/auth';

import { auth } from '../../firebase/client/client';
import { getIdToken } from 'firebase/auth';
import axios from 'axios';

export interface AuthContextType {
  access_token: string;
  firstName: string;
}

export const AuthContext = createContext<AuthContextType>({
  access_token: '',
  firstName: '',
});

export const PrivateRouteProvider: NextPage = ({ children }) => {
  const [access_token, setAccessToken] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');

  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/');
      } else {
        const token = await getIdToken(user);
        getUser(token);
        if (token) {
          setAccessToken(token);
        }
      }
    });
    const getUser = async (token) => {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      const resposne = await axios.get('http://localhost:3000/api/users/user', {
        headers,
      });
      setFirstName(resposne.data.userData['first_name']);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ access_token, firstName }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
