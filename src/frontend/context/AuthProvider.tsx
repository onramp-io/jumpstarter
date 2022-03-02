import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useReducer,
} from "react";

import { onAuthStateChanged } from "@firebase/auth";

import { auth } from "../../firebase/client/client";
import { getIdToken } from "firebase/auth";
import axios from "../../axios/instance";
import { tokenToString } from "typescript";
import { Token } from "@mui/icons-material";

export interface AuthContextType {
  userId: number;
  accessToken: string;
  firstName: string;
  lastName: string;
  bio: string;
  avatar: string;
  totalInvestments: number;
  interests: string[];
  balance: number;
  investments: any[];
}

export const AuthContext = createContext<AuthContextType>({
  userId: 0,
  accessToken: '',
  firstName: '',
  lastName: '',
  bio: '',
  avatar: '',
  totalInvestments: 0,
  interests: [],
  balance: 0,
  investments: [],
});

const userDispatchContext = createContext({});

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
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, ...action.payload };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const PrivateRouteProvider: NextPage = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();
  const setUser = (payload) => dispatch({ type: "SET_USER", payload });

  useEffect(() => {
    const getUser = async (token) => {
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
      });
    };

    const getCategories = async () => {
      const response = await axios.get('/users/preferences/get');
      setUser({
        interests: response.data.categories,
      });
    };
    
    const getUserInvestments = async () => {
      const response = await axios.get('/investments/get');
      setUser({
        investments: response.data.investments,
      });
    };

    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/");
        delete axios.defaults.headers.common["Authorization"];
      } else {
        const token = await getIdToken(user);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        getUser(token);
        getUserInvestments();
        getCategories();
      }
    });
  }, []);

  const getUser = async (token) => {
    const response = await axios.get("/users/get");
    setUser({
      userId: response.data.userData['id'],
      accessToken: token,
      firstName: response.data.userData["firstName"],
      lastName: response.data.userData["lastName"],
      bio: response.data.userData["bio"],
      avatar: response.data.userData["avatar"],
      investedAmt: response.data.userData["investedAmt"],
      interests: response.data.userData["interests"],
      balance: response.data.userData["balance"],
    });
  };

  const getUserInvestments = async () => {
    const response = await axios.get("/investments/get");
    setUser({
      investments: response.data.investments,
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
