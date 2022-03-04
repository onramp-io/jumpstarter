import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { createContext, useContext, useEffect, useReducer } from 'react';

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
        const response = await axios.get('/users/get');
        setUser({
          accessToken: token,
          firstName: response.data.userData['firstName'],
          lastName: response.data.userData['lastName'],
          bio: response.data.userData['bio'],
          avatar: response.data.userData['avatar'],
          investedAmt: response.data.userData['investedAmt'],
          interests: response.data.userData['interests'],
          balance: response.data.userData['balance'],
          totalInvestments: response.data.userData['investedAmt'],
        });
      } catch (error) {
        console.log(error);
      }
    };

    const getCategories = async () => {
      try {
        const response = await axios.get('/users/preferences/get');
        setUser({
          interests: response.data.categories,
        });
      } catch (error) {
        console.log(error);
      }
    };

    const getUserProjects = async () => {
      const response = await axios.get('/users/projects/getAll');
      setUser({
        userProjects: response.data.userProjects,
      });
    };

    const getUserInvestments = async () => {
      try {
        const response = await axios.get('/investments/get');
        setUser({
          investments: response.data.userInvestments,
        });
      } catch (error) {
        console.log(error);
      }
    };

    onAuthStateChanged(auth, async (user) => {
      try {
        if (!user) {
          delete axios.defaults.headers.common['Authorization'];
          router.push('/');
        } else {
          const token = await getIdToken(user);
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          getUser(token);
          getUserInvestments();
          getCategories();
          getUserProjects();
        }
      } catch (error) {
        console.log(error);
      }
    });
  }, []);

  useEffect(() => {}, []);

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
