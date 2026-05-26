import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  Platform,
  Image,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
} from 'react-native';

import { AccountStyles as S } from '@/styles/AccountStyles';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import api from '@/services/api';

interface UserData {
  id: string;
  name: string;
  email: string;
  xp: number;
  level: number;
  levelName: string;
  levelDescription: string;
  nextLevelName?: string;
  nextLevelXpRequired?: number;
  planetId?: number;
  planetName?: string;
  missionName?: string;
}

function formatLevelName(levelName: string) {
  if (!levelName) return 'Interplanetário';

  return levelName.replace(/_/g, ' ').toUpperCase();
}

function getPlanetAccentColor(planetId?: number) {
  if (Number(planetId) === 1) return '#22c55e';
  if (Number(planetId) === 2) return '#a855f7';
  if (Number(planetId) === 3) return '#406fd4';
  if (Number(planetId) === 4) return '#f97316';

  return '#38BDF8';
}

export default function Account() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  async function loadProfile() {
    try {
      setLoading(true);

      const response = await api.get('/me');
      const data = response.data;

      console.log('DADOS DO PERFIL:', data);

      const level = data.progression?.level;
      const nextLevel = data.progression?.level?.next;
      const planet = data.progression?.planet;
      const mission = data.progression?.mission;

      const dadosMapeados: UserData = {
        id: String(data.id || 'N/A'),
        name: data.username || data.name || 'Jogador',
        email: data.email || 'sem-email',
        xp: Number(data.xp || 0),

        level: Number(level?.id || 1),
        levelName: String(level?.name || 'ALUMINIUM_I'),
        levelDescription: String(level?.description || 'Nível inicial'),

        nextLevelName: nextLevel?.name,
        nextLevelXpRequired: nextLevel?.xpRequired,

        planetId: planet?.id,
        planetName: planet?.name,
        missionName: mission?.name,
      };

      setUser(dadosMapeados);
    } catch (error: any) {
      console.error(
        'Erro ao buscar perfil:',
        error?.response?.status,
        error?.response?.data || error,
      );

      Alert.alert('Ops!', 'Não foi possível carregar os dados do seu perfil.');

      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProfile();
  }, []);

  const levelText = useMemo(() => {
    if (!user) {
      return 'Nível Interplanetário';
    }

    return `Nível ${user.level} - ${formatLevelName(user.levelName)}`;
  }, [user]);

  const nextLevelText = useMemo(() => {
    if (!user?.nextLevelName) {
      return 'Próximo nível indisponível';
    }

    if (user.nextLevelXpRequired) {
      return `${formatLevelName(user.nextLevelName)} - ${user.nextLevelXpRequired} XP`;
    }

    return formatLevelName(user.nextLevelName);
  }, [user]);

  const planetAccentColor = useMemo(() => {
    return getPlanetAccentColor(user?.planetId);
  }, [user?.planetId]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={S.container}
    >
      <ScrollView
        contentContainerStyle={S.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />

        <View style={S.imageContainer}>
          <Image
            source={require('../assets/FundoPlanets.png')}
            style={S.topImage}
            resizeMode="cover"
          />

          <LinearGradient
            colors={[
              'rgba(0,0,0,0.05)',
              'rgba(0,0,0,0.35)',
              '#020617',
            ]}
            locations={[0, 0.55, 1]}
            style={S.gradientFade}
          />
        </View>

        <View style={S.contentWrapper}>
          <Text style={S.title}>Seu perfil:</Text>

          <View style={S.profileContainer}>
            {loading ? (
              <View style={{ padding: 40, alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#ffffff" />

                <Text style={{ color: '#fff', marginTop: 10 }}>
                  Carregando seus dados...
                </Text>
              </View>
            ) : !user ? (
              <Text
                style={{
                  color: '#ff4444',
                  textAlign: 'center',
                  padding: 20,
                }}
              >
                Erro ao carregar informações. Faça login novamente.
              </Text>
            ) : (
              <>
                <View style={S.accountInfo}>
                  <View style={S.labelContainer}>
                    <MaterialCommunityIcons
                      name="account"
                      size={20}
                      color="#60A5FA"
                      style={S.labelIcon}
                    />

                    <Text style={S.label}>NOME</Text>
                  </View>

                  <Text style={S.value}>{user.name}</Text>
                  <View style={S.line} />
                </View>

                <View style={S.accountInfo}>
                  <View style={S.labelContainer}>
                    <MaterialCommunityIcons
                      name="email-outline"
                      size={20}
                      color="#A78BFA"
                      style={S.labelIcon}
                    />

                    <Text style={S.label}>EMAIL</Text>
                  </View>

                  <Text style={S.value}>{user.email}</Text>
                  <View style={S.line} />
                </View>

                <View style={S.accountInfo}>
                  <View style={S.labelContainer}>
                    <MaterialCommunityIcons
                      name="fire"
                      size={20}
                      color="#FB923C"
                      style={S.labelIcon}
                    />

                    <Text style={S.label}>XP</Text>
                  </View>

                  <Text style={S.value}>{user.xp}</Text>
                  <View style={S.line} />
                </View>

                <View style={S.accountInfo}>
                  <View style={S.labelContainer}>
                    <MaterialCommunityIcons
                      name="medal-outline"
                      size={20}
                      color="#FACC15"
                      style={S.labelIcon}
                    />

                    <Text style={S.label}>NÍVEL ATUAL</Text>
                  </View>

                  <Text style={S.value}>{levelText}</Text>

                  <Text style={S.descriptionText}>
                    {user.levelDescription}
                  </Text>

                  <View style={S.line} />
                </View>

                <View style={S.accountInfo}>
                  <View style={S.labelContainer}>
                    <MaterialCommunityIcons
                      name="arrow-up-bold-circle-outline"
                      size={20}
                      color="#22C55E"
                      style={S.labelIcon}
                    />

                    <Text style={S.label}>PRÓXIMO NÍVEL</Text>
                  </View>

                  <Text style={S.value}>{nextLevelText}</Text>
                  <View style={S.line} />
                </View>

                <View style={S.accountInfo}>
                  <View style={S.labelContainer}>
                    <MaterialCommunityIcons
                      name="rocket-launch-outline"
                      size={20}
                      color="#38BDF8"
                      style={S.labelIcon}
                    />

                    <Text style={S.label}>MISSÃO ATUAL</Text>
                  </View>

                  <Text style={S.value}>
                    {user.missionName || 'Nenhuma missão atual'}
                  </Text>

                  <Text style={S.descriptionText}>
                    no planeta{' '}
                    <Text style={[S.planetName, { color: planetAccentColor }]}>
                      {user.planetName || 'desconhecido'}
                    </Text>
                    .
                  </Text>
                </View>
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}