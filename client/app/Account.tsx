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
  planetName?: string;
  missionName?: string;
}

function formatLevelName(levelName: string) {
  if (!levelName) return 'Interplanetário';

  return levelName
    .replace(/_/g, ' ')
    .toUpperCase()
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

      Alert.alert(
        'Ops!',
        'Não foi possível carregar os dados do seu perfil.',
      );

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
            source={require('../assets/LoginImg.jpg')}
            style={S.topImage}
            resizeMode="cover"
          />

          <LinearGradient
            colors={['transparent', '#000000']}
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
                  <View
                    style={{
                      flexDirection: 'row',
                      alignSelf: 'flex-start',
                      alignItems: 'center',
                    }}
                  >
                    <MaterialCommunityIcons
                      name="account"
                      size={20}
                      color="#FFFFFF"
                      style={{ marginRight: 10 }}
                    />

                    <Text style={S.label}>NOME</Text>
                  </View>

                  <Text style={S.value}>{user.name}</Text>
                  <View style={S.line} />
                </View>

                <View style={S.accountInfo}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignSelf: 'flex-start',
                      alignItems: 'center',
                    }}
                  >
                    <MaterialCommunityIcons
                      name="email-outline"
                      size={20}
                      color="#FFFFFF"
                      style={{ marginRight: 10 }}
                    />

                    <Text style={S.label}>EMAIL</Text>
                  </View>

                  <Text style={S.value}>{user.email}</Text>
                  <View style={S.line} />
                </View>

                <View style={S.accountInfo}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignSelf: 'flex-start',
                      alignItems: 'center',
                    }}
                  >
                    <MaterialCommunityIcons
                      name="fire"
                      size={20}
                      color="#FFFFFF"
                      style={{ marginRight: 10 }}
                    />

                    <Text style={S.label}>XP</Text>
                  </View>

                  <Text style={S.value}>{user.xp}</Text>
                  <View style={S.line} />
                </View>

                <View style={S.accountInfo}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignSelf: 'flex-start',
                      alignItems: 'center',
                    }}
                  >
                    <MaterialCommunityIcons
                      name="medal-outline"
                      size={20}
                      color="#FFFFFF"
                      style={{ marginRight: 10 }}
                    />

                    <Text style={S.label}>NÍVEL ATUAL</Text>
                  </View>

                  <Text style={S.value}>{levelText}</Text>

                  <Text
                    style={{
                      color: '#94A3B8',
                      fontSize: 13,
                      marginTop: 6,
                    }}
                  >
                    {user.levelDescription}
                  </Text>

                  <View style={S.line} />
                </View>

                <View style={S.accountInfo}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignSelf: 'flex-start',
                      alignItems: 'center',
                    }}
                  >
                    <MaterialCommunityIcons
                      name="arrow-up-bold-circle-outline"
                      size={20}
                      color="#FFFFFF"
                      style={{ marginRight: 10 }}
                    />

                    <Text style={S.label}>PRÓXIMO NÍVEL</Text>
                  </View>

                  <Text style={S.value}>{nextLevelText}</Text>
                  <View style={S.line} />
                </View>

                <View style={S.accountInfo}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignSelf: 'flex-start',
                      alignItems: 'center',
                    }}
                  >
                    <MaterialCommunityIcons
                      name="rocket-launch-outline"
                      size={20}
                      color="#FFFFFF"
                      style={{ marginRight: 10 }}
                    />

                    <Text style={S.label}>MISSÃO ATUAL</Text>
                  </View>

                  <Text style={S.value}>
                    {user.missionName || 'Nenhuma missão atual'}
                  </Text>
                  <View style={S.line} />
                </View>

              </>
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}