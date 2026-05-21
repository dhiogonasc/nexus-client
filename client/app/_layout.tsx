import React from 'react';
import { Stack, usePathname } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import { useFonts, ArchivoBlack_400Regular } from '@expo-google-fonts/archivo-black';

import FooterBar from '../src/components/FooterBar';

export default function Layout() {
  const pathname = usePathname();

  const [fontsLoaded] = useFonts({
    ArchivoBlack_400Regular,
  });

  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#000000',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator color="#FFFFFF" />
      </View>
    );
  }

  const rotasSemFooter = ['/', '/register', '/logout'];

  const deveMostrarFooter = !rotasSemFooter.includes(pathname);

  return (
    <View style={{ flex: 1, backgroundColor: '#000000' }}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#000000' },
        }}
      >
        <Stack.Screen name="index" />
      </Stack>

      {deveMostrarFooter && <FooterBar />}
    </View>
  );
}