import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useReducer,
} from 'react';

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
  interests: string[];
  balance: number;
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: '',
  firstName: '',
  lastName: '',
  bio: '',
  avatar: '',
  totalInvestments: 0,
  interests: [],
  balance: 0,
});

const userDispatchContext = createContext({});

const initialState = {
  accessToken: '',
  firstName: '',
  lastName: '',
  bio: '',
  avatar: '',
  totalInvestments: 0,
  interests: [],
  balance: 0,
};

const reducer = (state, action) => {
  console.log(action.payload); //debug
  switch (action.type) {
    case 'SET_USER':
      return { ...state, ...action.payload };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const PrivateRouteProvider: NextPage = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [accessToken, setAccessToken] = useState<string>('');

  const router = useRouter();

  const setUser = (payload) => dispatch({ type: 'SET_USER', payload });

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/'); //if user is not signed in then send them to home page
      } else {
        const token = await getIdToken(user);
        getUser(token);
        if (token) {
          setAccessToken(token);
        }
      }
    });
  }, []);

  const getUser = async (token) => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get('http://localhost:3000/api/users/get', {
      headers,
    });
    setUser({
      accessToken: accessToken,
      firstName: response.data.userData['firstName'],
      lastName: response.data.userData['lastName'],
      bio: response.data.userData['bio'],
      avatar: response.data.userData['avatar'],
      investedAmt: response.data.userData['investedAmt'],
      interests: response.data.userData['interests'],
      balance: response.data.userData['balance'],
    });
  };

  return (
    <userDispatchContext.Provider value={{ setUser }}>
      <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
    </userDispatchContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useUserDispatch = () => {
  return useContext(userDispatchContext);
};
