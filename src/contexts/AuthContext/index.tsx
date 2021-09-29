import React, { createContext } from 'react';

interface IUser {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

type AuthContextProps = {
  user: IUser;
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider: React.FC = ({ children }) => {
  const user: IUser = {
    id: '1',
    name: 'John Doe',
    email: 'john@doe',
    photo: 'https://github.com/joaobispo2077.png',
  };

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
