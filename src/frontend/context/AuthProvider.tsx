import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { onAuthStateChanged } from '@firebase/auth';

import { auth } from '../../firebase/client/client';
import { getIdToken } from 'firebase/auth';
import axios from 'axios';

export interface AuthContextType {
  accessToken: string;
  firstName: string;
  lastName: string;
  bio: string;
  avatar: string;
  totalInvestments: number;
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: '',
  firstName: '',
  lastName: '',
  bio: '',
  avatar: '',
  totalInvestments: 0,
});

export const PrivateRouteProvider: NextPage = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [avatar, setAvatar] = useState<string>('');
  const [totalInvestments, setTotalInvestments] = useState<number>(0);

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
      const resposne = await axios.get('http://localhost:3000/api/users/get', {
        headers,
      });
      setFirstName(resposne.data.userData['first_name']);
      setLastName(resposne.data.userData['last_name']);
      setBio(resposne.data.userData['bio']);
      setAvatar(resposne.data.userData['avatar']);
      setTotalInvestments(resposne.data.userData['investedAmt']);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        firstName,
        lastName,
        bio,
        avatar,
        totalInvestments,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
