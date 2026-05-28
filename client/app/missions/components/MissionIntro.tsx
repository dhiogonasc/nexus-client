import React, { useMemo } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { BlurView } from 'expo-blur';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { styles } from '@/styles/idMissionStyle';

import MissionBackground from './MissionBackground';
import MissionHeader from './MissionHeader';

import { getPlanetAccentColor } from '../utils/missionHelper';

type Props = {
  planetId?: string;
  planetName: string;
  missionTitle: string;
  introText: string;
  questionsLength: number;
  xpBonus?: number;
  onBack: () => void;
  onStart: () => void;
};

export default function MissionIntro({
  planetId,
  planetName,
  missionTitle,
  introText,
  questionsLength,
  xpBonus,
  onBack,
  onStart,
}: Props) {
  const accentColor = useMemo(() => {
    return getPlanetAccentColor(planetId);
  }, [planetId]);

  return (
    <MissionBackground>
      <MissionHeader
        title={`${planetName} - ${missionTitle}`}
        accentColor={accentColor}
        onBack={onBack}
      />

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 24,
          paddingBottom: 120,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            width: '100%',
            maxWidth: 760,
          }}
        >
          <BlurView
            intensity={45}
            tint="dark"
            style={{
              borderRadius: 22,
              overflow: 'hidden',
              padding: 24,
              borderWidth: 1,
              borderColor: accentColor,
              backgroundColor: 'rgba(15,23,42,0.45)',
            }}
          >
            <View
              style={{
                width: 68,
                height: 68,
                borderRadius: 34,
                backgroundColor: `${accentColor}22`,
                borderWidth: 1,
                borderColor: accentColor,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                marginBottom: 16,
              }}
            >
              <MaterialCommunityIcons
                name="rocket-launch-outline"
                size={38}
                color={accentColor}
              />
            </View>

            <Text
              style={{
                color: accentColor,
                fontSize: 24,
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: 12,
              }}
            >
              {missionTitle}
            </Text>

            <Text
              style={{
                color: '#E2E8F0',
                fontSize: 16,
                lineHeight: 24,
                textAlign: 'center',
                marginBottom: 22,
              }}
            >
              {introText}
            </Text>

            <View
              style={{
                backgroundColor: `${accentColor}14`,
                borderRadius: 16,
                padding: 16,
                borderWidth: 1,
                borderColor: `${accentColor}66`,
                marginBottom: 22,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 10,
                }}
              >
                <Text style={{ color: '#CBD5E1', fontWeight: '600' }}>
                  Questões
                </Text>

                <Text style={{ color: accentColor, fontWeight: 'bold' }}>
                  {questionsLength}
                </Text>
              </View>

              <View
                style={{
                  width: '100%',
                  height: 1,
                  backgroundColor: `${accentColor}44`,
                  marginBottom: 10,
                }}
              />

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text style={{ color: '#CBD5E1', fontWeight: '600' }}>
                  Recompensa
                </Text>

                <Text style={{ color: accentColor, fontWeight: 'bold' }}>
                  {xpBonus ?? 0} XP
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={[
                styles.confirmButton,
                {
                  backgroundColor: accentColor,
                },
              ]}
              onPress={onStart}
              activeOpacity={0.8}
            >
              <Text style={styles.confirmButtonText}>
                Iniciar missão
              </Text>
            </TouchableOpacity>
          </BlurView>
        </View>
      </ScrollView>
    </MissionBackground>
  );
}