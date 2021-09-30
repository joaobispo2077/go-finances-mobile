import * as React from 'react';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import { StatusBar } from 'react-native';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';

import { AuthProvider } from './src/contexts/AuthContext';
import theme from './src/global/styles/theme';
// import { AppRoutes } from './src/routes/app.routes';
import { useAuth } from './src/hooks/useAuth';
import { Routes } from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  const { userStorageLoading } = useAuth();

  if (!fontsLoaded || userStorageLoading) {
    return <AppLoading />;
  }

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <StatusBar barStyle="light-content" />
        <Routes />
      </ThemeProvider>
    </AuthProvider>
  );
}
