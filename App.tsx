import 'react-native-gesture-handler';

import { StatusBar } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { Routes } from './src/routes';
import { Loading } from './src/components/Loading';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ManageStorage } from './src/services/ManageStorage';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold,
    'Inter-Black': require('./assets/fonts/PlusJakartaSans-ExtraBoldItalic.ttf'),

   });
  
  
  if (!fontsLoaded) {
    return (
      <Loading />
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <Routes />
    </GestureHandlerRootView>
  );
}