import React, { createContext, useState } from 'react';

import * as AuthSession from 'expo-auth-session';

interface IUser {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

type AuthContextProps = {
  user: IUser;
  signInWithGoogle: () => Promise<void>;
};

type AuthResponse = {
  params: {
    access_token: string;
  };
  type: string;
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<IUser>({} as IUser);

  async function signInWithGoogle() {
    try {
      const {
        GOOGLE_OAUTH_CLIENT_ID,
        GOOGLE_OAUTH_REDIRECT_URI,
        GOOGLE_OAUTH_RESPONSE_TYPE,
        GOOGLE_OAUTH_SCOPE,
      } = process.env;

      const CLIENT_ID = GOOGLE_OAUTH_CLIENT_ID;
      const REDIRECT_URI = GOOGLE_OAUTH_REDIRECT_URI;
      const RESPONSE_TYPE = GOOGLE_OAUTH_RESPONSE_TYPE;
      const SCOPE = encodeURI(GOOGLE_OAUTH_SCOPE as string);

      const authURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = (await AuthSession.startAsync({
        authUrl: authURL,
      })) as AuthResponse;

      if (type === 'success') {
        console.log('google oauth 0 response', params);
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`,
        );

        const userInfo = await response.json();

        setUser({
          id: userInfo.id,
          name: userInfo.given_name,
          email: userInfo.email,
          photo: userInfo.picture,
        });
      }
    } catch (err) {
      console.log('error when trying to sign with google', err);
      throw new Error(err as any);
    }
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};
