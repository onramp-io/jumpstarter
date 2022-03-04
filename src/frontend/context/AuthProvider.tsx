import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';

import { onAuthStateChanged } from '@firebase/auth';

import { auth } from '../../firebase/client/client';
import { getIdToken } from 'firebase/auth';
import axios from '../../axios/instance';

const initialState = {
  accessToken: '',
  userId: 0,
  firstName: '',
  lastName: '',
  bio: '',
  avatar: '',
  totalInvestments: 0,
  interests: [],
  balance: 0,
  investments: [],
  userProjects: [],
  setUser: (payload: any) => {},
  isUserLoading: false,
};

export const AppContext = createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const PrivateRouteProvider: NextPage = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();
  const setUser = (payload) => dispatch({ type: 'SET_USER', payload });

  useEffect(() => {
    const getUser = async (token: string) => {
      try {
        setUser({
          isUserLoading: true,
        });
        const response = await axios.get('/users/get');
        setUser({
          accessToken: token,
          userId: response.data.userData['id'],
          firstName: response.data.userData['firstName'],
          lastName: response.data.userData['lastName'],
          bio: response.data.userData['bio'],
          avatar: response.data.userData['avatar'],
          investedAmt: response.data.userData['investedAmt'],
          interests: response.data.userData['interests'],
          balance: response.data.userData['balance'],
          totalInvestments: response.data.userData['investedAmt'],
        });
        setUser({
          isUserLoading: false,
        });
      } catch (error) {
        console.log(error);
      }
    };

    onAuthStateChanged(auth, async (user) => {
      try {
        if (!user) {
          delete axios.defaults.headers.common['Authorization'];
          setUser(initialState);
          router.push('/');
        } else {
          const token = await getIdToken(user);
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          getUser(token);
        }
      } catch (error) {
        console.log(error);
      }
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AppContext);
};
