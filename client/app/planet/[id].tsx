import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import { useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

import { styles } from '@/styles/idStyle';
import { PLANETAS } from '@/data/planetas';
import api from '@/services/api';

type MissionTask = {
  id: number | string;
  name?: string;
  title?: string;
  description?: string;
  content?: string;
  status?: string;
  executionStatus?: string;
  bestResult?: number | null;
  best_result?: number | null;
  result?: number | null;
  execution?: {
    status?: string;
    bestResult?: number | null;
    best_result?: number | null;
  };
};

export default function PlanetDetails() {
  const { id, refresh } = useLocalSearchParams();
  const router = useRouter();

  const [planeta, setPlaneta] = useState<any>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const buscarDetalhesPlaneta = async () => {
      if (!id) {
        setErro('Coordenadas não identificadas.');
        setCarregando(false);
        return;
      }

      try {
        setCarregando(true);
        setErro(null);

        const response = await api.get(`/planets/${id}`);
        const dadosApi = response.data;

        const idString = id.toString();
        const planetaLocal = (PLANETAS as any)[idString];

        const planetaCompleto = {
          ...dadosApi,
          id: dadosApi.id?.toString() || idString,
          name: dadosApi.name || dadosApi.nome,
          description: dadosApi.description || dadosApi.descricao || '',
          content: dadosApi.content || '',
          imagem:
            planetaLocal?.imagem || require('../../assets/FundoPlanets.png'),
          accentColor: planetaLocal?.accentColor || '#3B82F6',
        };

        setPlaneta(planetaCompleto);
      } catch (error) {
        console.error('Erro ao buscar detalhes do planeta:', error);
        setErro('Não foi possível estabelecer conexão com o planeta.');
      } finally {
        setCarregando(false);
      }
    };

    buscarDetalhesPlaneta();
  }, [id, refresh]);

  const missions: MissionTask[] = useMemo(() => {
    return planeta?.missions?.tasks || [];
  }, [planeta]);

  function getMissionBestResult(missao: MissionTask) {
    const value =
      missao.bestResult ??
      missao.best_result ??
      missao.result ??
      missao.execution?.bestResult ??
      missao.execution?.best_result ??
      null;

    if (value === null || value === undefined) {
      return null;
    }

    return Number(value);
  }

  function getMissionStatus(missao: MissionTask, index?: number): string {
    const explicitStatus =
      missao.execution?.status || missao.status || missao.executionStatus;

    if (explicitStatus === 'LOCKED') {
      return 'LOCKED';
    }

    if (
      explicitStatus === 'DONE' ||
      explicitStatus === 'COMPLETED' ||
      explicitStatus === 'FINISHED'
    ) {
      return 'COMPLETED';
    }

    const bestResult = getMissionBestResult(missao);

    if (bestResult !== null && bestResult >= 70) {
      return 'COMPLETED';
    }

    if (bestResult !== null) {
      return 'IN_PROGRESS';
    }

    if (typeof index === 'number' && index > 0) {
      const previousMission = missions[index - 1];
      const previousStatus = getMissionStatus(previousMission, index - 1);

      if (previousStatus !== 'COMPLETED') {
        return 'LOCKED';
      }
    }

    return 'NOT_STARTED';
  }

  function getMissionStatusLabel(missao: MissionTask, index?: number) {
    const status = getMissionStatus(missao, index);
    const bestResult = getMissionBestResult(missao);

    if (status === 'LOCKED') {
      return 'Bloqueada';
    }

    if (status === 'COMPLETED') {
      return bestResult !== null
        ? `Concluída • Melhor resultado: ${bestResult}%`
        : 'Concluída';
    }

    if (status === 'IN_PROGRESS') {
      return bestResult !== null
        ? `Em andamento • Melhor resultado: ${bestResult}%`
        : 'Em andamento';
    }

    return 'Não iniciada';
  }

  function getMissionIcon(missao: MissionTask, index?: number) {
    const status = getMissionStatus(missao, index);

    if (status === 'LOCKED') return 'lock-outline';
    if (status === 'COMPLETED') return 'check-circle-outline';
    if (status === 'IN_PROGRESS') return 'progress-clock';

    return 'rocket-launch-outline';
  }

  function getMissionColor(missao: MissionTask, index?: number) {
    const status = getMissionStatus(missao, index);

    if (status === 'LOCKED') return '#64748B';
    if (status === 'COMPLETED') return '#22C55E';
    if (status === 'IN_PROGRESS') return '#FACC15';

    return planeta?.accentColor || '#3B82F6';
  }

  const progress = useMemo(() => {
    const total = missions.length;

    if (total === 0) {
      return {
        total: 0,
        completed: 0,
        percent: 0,
      };
    }

    const completed = missions.filter(
      (missao, index) => getMissionStatus(missao, index) === 'COMPLETED',
    ).length;

    return {
      total,
      completed,
      percent: Math.round((completed / total) * 100),
    };
  }, [missions]);

  function abrirMissao(missao: MissionTask, index: number) {
    const status = getMissionStatus(missao, index);

    if (status === 'LOCKED') {
      return;
    }

    router.push({
      pathname: `/mission/[id]`,
      params: {
        id: String(missao.id),
        planetId: String(planeta.id),
      },
    });
  }

  if (carregando) {
    return (
      <View
        style={[
          styles.center,
          {
            flex: 1,
            backgroundColor: '#020617',
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}
      >
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={{ color: 'white', marginTop: 10 }}>
          Pousando no planeta...
        </Text>
      </View>
    );
  }

  if (erro || !planeta) {
    return (
      <View
        style={[
          styles.center,
          {
            flex: 1,
            backgroundColor: '#020617',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 24,
          },
        ]}
      >
        <Text style={{ color: '#ef4444', textAlign: 'center' }}>
          {erro || 'Planeta não encontrado.'}
        </Text>

        <TouchableOpacity onPress={() => router.back()}>
          <Text
            style={{
              color: '#406fd4',
              marginTop: 15,
              fontWeight: 'bold',
            }}
          >
            Voltar para o mapa estelar
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../../assets/GalaxyBG.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <LinearGradient
        colors={['rgba(2,6,23,0.3)', 'rgba(2,6,23,0.95)']}
        style={StyleSheet.absoluteFillObject}
      />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <BlurView intensity={30} tint="dark" style={styles.iconBlur}>
            <MaterialCommunityIcons
              name="arrow-left"
              size={24}
              color={planeta.accentColor}
            />
          </BlurView>
        </TouchableOpacity>
      </View>

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

                <Text style={styles.description}>{planeta.description}</Text>
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
                  Sua nave ainda não tem os requisitos necessários. Complete as
                  missões do planeta anterior para liberar este quadrante.
                </Text>
              </View>
            ) : (
              <>
                <View
                  style={{
                    marginTop: 18,
                    marginBottom: 18,
                    padding: 14,
                    borderRadius: 14,
                    backgroundColor: 'rgba(15,23,42,0.75)',
                    borderWidth: 1,
                    borderColor: 'rgba(148,163,184,0.18)',
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 8,
                    }}
                  >
                    <Text
                      style={{
                        color: '#E2E8F0',
                        fontWeight: 'bold',
                        fontSize: 14,
                      }}
                    >
                      Progresso do planeta
                    </Text>

                    <Text
                      style={{
                        color: planeta.accentColor,
                        fontWeight: 'bold',
                        fontSize: 14,
                      }}
                    >
                      {progress.completed}/{progress.total}
                    </Text>
                  </View>

                  <View
                    style={{
                      width: '100%',
                      height: 8,
                      borderRadius: 999,
                      backgroundColor: 'rgba(100,116,139,0.35)',
                      overflow: 'hidden',
                    }}
                  >
                    <View
                      style={{
                        width: `${progress.percent}%`,
                        height: '100%',
                        borderRadius: 999,
                        backgroundColor: planeta.accentColor,
                      }}
                    />
                  </View>

                  <Text
                    style={{
                      color: '#94A3B8',
                      fontSize: 12,
                      marginTop: 8,
                    }}
                  >
                    {progress.percent}% concluído
                  </Text>
                </View>

                <Text style={styles.sectionTitle}>Módulos Disponíveis</Text>

                {missions.map((missao: MissionTask, index: number) => {
                  const status = getMissionStatus(missao, index);
                  const missionColor = getMissionColor(missao, index);
                  const isLocked = status === 'LOCKED';

                  return (
                    <TouchableOpacity
                      key={String(missao.id)}
                      activeOpacity={isLocked ? 1 : 0.8}
                      style={[
                        styles.moduleCard,
                        {
                          borderLeftColor: missionColor,
                          opacity: isLocked ? 0.55 : 1,
                        },
                      ]}
                      onPress={() => abrirMissao(missao, index)}
                    >
                      <MaterialCommunityIcons
                        name={getMissionIcon(missao, index) as any}
                        size={22}
                        color={missionColor}
                      />

                      <View style={{ flex: 1 }}>
                        <Text style={styles.moduleText}>
                          {missao.name || missao.title || 'Missão'}
                        </Text>

                        <Text
                          style={{
                            color: missionColor,
                            fontSize: 12,
                            marginTop: 4,
                            fontWeight: '600',
                          }}
                        >
                          {getMissionStatusLabel(missao, index)}
                        </Text>
                      </View>

                      {!isLocked && (
                        <MaterialCommunityIcons
                          name="chevron-right"
                          size={22}
                          color="#94A3B8"
                        />
                      )}
                    </TouchableOpacity>
                  );
                })}

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
    </ImageBackground>
  );
}