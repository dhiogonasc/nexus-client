import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { styles } from '@/styles/idMissionStyle';

type Props = {
  title: string;
  accentColor: string;
  onBack: () => void;
};

export default function MissionHeader({ title, accentColor, onBack }: Props) {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <BlurView intensity={30} tint="dark" style={styles.iconBlur}>
          <MaterialCommunityIcons name="close" size={24} color={accentColor} />
        </BlurView>
      </TouchableOpacity>

      <Text style={[styles.headerTitle, { color: accentColor }]}>
        {title}
      </Text>

      <View style={{ width: 45 }} />
    </View>
  );
}