import React from 'react';
import {
  ImageBackground,
  ScrollView,
  Text,
  View,
} from 'react-native';

import { BlurView } from 'expo-blur';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { styles } from '@/styles/idStyle';

import { MissionTask } from '../utils/planetHelper';

import PlanetBackground from './PlanetBackground';
import PlanetHeader from './PlanetHeader';
import PlanetProgress from './PlanetProgress';
import MissionCard from './MissionCard';

type Props = {
  planeta: any;
  missions: MissionTask[];
  progress: {
    total: number;
    completed: number;
    percent: number;
  };
  onBack: () => void;
  onOpenMission: (mission: MissionTask) => void;
};

export default function PlanetContent({
  planeta,
  missions,
  progress,
  onBack,
  onOpenMission,
}: Props) {
  return (
    <PlanetBackground>
      <PlanetHeader
        accentColor={planeta.accentColor}
        onBack={onBack}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageContainer}>
          <ImageBackground
            source={planeta.imagem}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <View style={styles.contentWrapper}>
          <BlurView intensity={40} tint="dark" style={styles.contentBlur}>
            <View
              style={[
                styles.accentLine,
                { backgroundColor: planeta.accentColor },
              ]}
            />

            <Text style={[styles.title, { color: planeta.accentColor }]}>
              {planeta.name}
            </Text>

            <View style={styles.descriptionContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  alignSelf: 'flex-start',
                  paddingBottom: 16,
                }}
              >
                <MaterialCommunityIcons
                  name="atom"
                  size={16}
                  color="#94A3B8"
                  style={{ marginRight: 8 }}
                />

                <Text style={styles.description}>
                  {planeta.description}
                </Text>
              </View>

              <Text style={styles.description}>{planeta.content}</Text>
            </View>

            {planeta.execution?.status === 'LOCKED' ? (
              <View
                style={{
                  alignItems: 'center',
                  padding: 25,
                  marginTop: 15,
                  backgroundColor: 'rgba(0,0,0,0.4)',
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: 'rgba(148, 163, 184, 0.2)',
                }}
              >
                <MaterialCommunityIcons
                  name="lock-outline"
                  size={36}
                  color="#94A3B8"
                />

                <Text
                  style={{
                    color: '#fff',
                    fontSize: 16,
                    fontWeight: 'bold',
                    marginTop: 10,
                  }}
                >
                  Acesso Restrito
                </Text>

                <Text
                  style={{
                    color: '#94A3B8',
                    textAlign: 'center',
                    marginTop: 6,
                    fontSize: 13,
                    lineHeight: 20,
                  }}
                >
                  Complete as missões anteriores para liberar este planeta.
                </Text>
              </View>
            ) : (
              <>
                <PlanetProgress
                  accentColor={planeta.accentColor}
                  completed={progress.completed}
                  total={progress.total}
                  percent={progress.percent}
                />

                <Text style={styles.sectionTitle}>
                  Módulos Disponíveis
                </Text>

                {missions.map((mission) => (
                  <MissionCard
                    key={String(mission.id)}
                    mission={mission}
                    accentColor={planeta.accentColor}
                    onPress={() => onOpenMission(mission)}
                  />
                ))}

                {missions.length === 0 && (
                  <Text style={{ color: '#94A3B8', marginTop: 10 }}>
                    Nenhuma missão detectada neste quadrante.
                  </Text>
                )}
              </>
            )}
          </BlurView>
        </View>
      </ScrollView>
    </PlanetBackground>
  );
}