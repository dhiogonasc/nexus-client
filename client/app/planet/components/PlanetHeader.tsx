import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { styles } from '@/styles/idStyle';

type Props = {
  accentColor: string;
  onBack: () => void;
};

export default function PlanetHeader({ accentColor, onBack }: Props) {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={onBack}
        activeOpacity={0.7}
      >
        <BlurView intensity={30} tint="dark" style={styles.iconBlur}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={24}
            color={accentColor}
          />
        </BlurView>
      </TouchableOpacity>
    </View>
  );
}