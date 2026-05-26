import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Text,
  View,
  StatusBar,
  Animated,
  ActivityIndicator,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { HomeStyles as S } from '@/styles/homePageStyles';

import PlanetCarousel from '@/components/PlanetCarousel';
import userService, { CurrentUser } from '@/services/domain/user.service';

export default function HomePage() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  async function carregarUsuario() {
    try {
      setLoadingUser(true);

      const data = await userService.getMe();

      console.log('USUÁRIO LOGADO:', data);

      setUser(data);
    } catch (error: any) {
      console.log(
        'Erro ao buscar usuário logado:',
        error?.response?.status,
        error?.response?.data,
      );

      setUser(null);
    } finally {
      setLoadingUser(false);
    }
  }

  useEffect(() => {
    carregarUsuario();
  }, []);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const userName = useMemo(() => {
    const possibleName = user?.username || user?.name || '';
    return String(possibleName).trim();
  }, [user]);

  const greetingText = userName
    ? `Astronauta ${userName}!`
    : 'Astronauta!';

  return (
    <SafeAreaView style={S.container} edges={['top']}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <View style={S.content}>
        <Animated.View
          style={[
            S.headerContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={S.headerContent}>
            <View style={S.headerText}>
              <Text style={S.headerIcon}> 🧑‍🚀 </Text>

              {loadingUser ? (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <ActivityIndicator color="#ffffff" size="small" />
                  <Text style={S.userName}> Carregando...</Text>
                </View>
              ) : (
                <Text style={S.userName}>{greetingText}</Text>
              )}
            </View>
          </View>
        </Animated.View>

        <View style={S.section}>
          <View style={S.sectionHeader}>
            <View style={S.sectionAccent} />
            <Text style={S.sectionTitle}>LISTA DE PLANETAS</Text>
          </View>

          <PlanetCarousel />
        </View>
      </View>
    </SafeAreaView>
  );
}