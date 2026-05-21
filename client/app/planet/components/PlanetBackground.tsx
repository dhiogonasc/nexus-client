import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { styles } from '@/styles/idStyle';

type Props = {
  children: React.ReactNode;
};

export default function PlanetBackground({ children }: Props) {
  return (
    <ImageBackground
      source={require('../../../assets/GalaxyBG.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <LinearGradient
        colors={['rgba(2,6,23,0.3)', 'rgba(2,6,23,0.95)']}
        style={StyleSheet.absoluteFillObject}
      />

      {children}
    </ImageBackground>
  );
}