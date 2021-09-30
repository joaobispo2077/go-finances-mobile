import React, { createContext, useState, useEffect, useCallback } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as AuthSession from 'expo-auth-session';

const { GOOGLE_OAUTH_CLIENT_ID } = process.env;
const { GOOGLE_OAUTH_REDIRECT_URI } = process.env;
interface IUser {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

type AuthContextProps = {
  user: IUser;
  userStorageLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
};

type AuthResponse = {
  params: {
    access_token: string;
  };
  type: string;
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider: React.FC = ({ children }) => {
  const userStorageKey = '@gofinances:user';

  const [user, setUser] = useState<IUser>({} as IUser);
  const [userStorageLoading, setUserStorageLoading] = useState(true);

  async function signInWithGoogle() {
    try {
      const CLIENT_ID = GOOGLE_OAUTH_CLIENT_ID;
      const REDIRECT_URI = GOOGLE_OAUTH_REDIRECT_URI;
      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email');

      const authURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
      console.log(authURL);
      const { type, params } = (await AuthSession.startAsync({
        authUrl: authURL,
      })) as AuthResponse;

      if (type === 'success') {
        console.log('google oauth 0 response', params);
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`,
        );

        const userInfo = await response.json();

        const userLogged = {
          id: userInfo.id,
          name: userInfo.given_name,
          email: userInfo.email,
          photo: userInfo.picture,
        };

        setUser(userLogged);
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
      }
    } catch (err) {
      console.log('error when trying to sign with google', err);
      throw new Error(err as any);
    }
  }

  async function signInWithApple() {
    try {
      const credentials = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (credentials) {
        const userLoggged = {
          id: String(credentials.user),
          email: credentials.email!,
          name: credentials.fullName!.givenName!,
          photo: undefined,
        };

        setUser(userLoggged);

        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLoggged));
      }
    } catch (err) {
      console.log('error when trying to sign with apple', err);
      throw new Error(err as any);
    }
  }

  async function signOut() {
    await AsyncStorage.removeItem(userStorageKey);
    setUser({} as IUser);
  }

  const loadUserFromAsyncStorage = useCallback(async () => {
    try {
      const storedUser = await AsyncStorage.getItem(userStorageKey);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      setUserStorageLoading(false);
    } catch (err) {
      console.log('error when trying to load user from async storage', err);
      throw new Error(err as any);
    }
  }, []);

  useEffect(() => {
    loadUserFromAsyncStorage();
  }, [loadUserFromAsyncStorage]);

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
        signInWithApple,
        signOut,
        userStorageLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
