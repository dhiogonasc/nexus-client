import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { styles } from '@/styles/idMissionStyle';

import missionService, {
  Alternative,
  AttemptAnswerRequest,
  AttemptFinishResponse,
  MissionDetail,
  Question,
} from '@/services/domain/mission.service';

export default function MissionPage() {
  const router = useRouter();

  const { id, planetId } = useLocalSearchParams<{
    id?: string;
    planetId?: string;
  }>();

  const [mission, setMission] = useState<MissionDetail | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [opcaoSelecionada, setOpcaoSelecionada] = useState<number | null>(null);
  const [answers, setAnswers] = useState<AttemptAnswerRequest[]>([]);

  const [loading, setLoading] = useState(true);
  const [finishing, setFinishing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [finishResult, setFinishResult] = useState<AttemptFinishResponse | null>(
    null,
  );

  const accentColor = useMemo(() => {
    if (String(planetId) === '1') return '#406fd4';
    if (String(planetId) === '2') return '#a855f7';
    if (String(planetId) === '3') return '#22c55e';
    if (String(planetId) === '4') return '#f97316';

    return '#406fd4';
  }, [planetId]);

  const currentQuestion = questions[currentQuestionIndex];

  const missionTitle = useMemo(() => {
    return mission?.name || mission?.title || 'Missão';
  }, [mission]);

  const planetName = useMemo(() => {
    return mission?.planet?.name || 'Planeta';
  }, [mission]);

  const progressText = useMemo(() => {
    if (!questions.length) return '';

    return `Pergunta ${currentQuestionIndex + 1} de ${questions.length}`;
  }, [currentQuestionIndex, questions.length]);

  function voltarParaPlaneta() {
    if (planetId) {
      router.replace({
        pathname: '/planet/[id]',
        params: {
          id: String(planetId),
          refresh: Date.now().toString(),
        },
      });
      return;
    }

    router.back();
  }

  async function carregarMissao() {
    try {
      if (!id) {
        setErrorMessage('ID da missão não encontrado.');
        setLoading(false);
        return;
      }

      setLoading(true);
      setErrorMessage('');
      setFinishResult(null);
      setAnswers([]);
      setOpcaoSelecionada(null);
      setCurrentQuestionIndex(0);

      const missionData = await missionService.getById(id);

      const orderedQuestions = [...(missionData.questions || [])].sort(
        (a, b) => Number(a.order) - Number(b.order),
      );

      setMission(missionData);
      setQuestions(orderedQuestions);
    } catch (error: any) {
      const status = error?.response?.status;

      const backendMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.response?.data?.detail ||
        error?.response?.data;

      if (status === 401 || status === 403) {
        setErrorMessage('Você precisa estar logado para acessar esta missão.');
        return;
      }

      setErrorMessage(
        typeof backendMessage === 'string'
          ? backendMessage
          : 'Não foi possível carregar a missão. Verifique sua conexão e tente novamente.',
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarMissao();
  }, [id]);

  function selecionarAlternativa(index: number) {
    if (finishing || finishResult) return;

    setOpcaoSelecionada(index);
    setErrorMessage('');
  }

  function salvarRespostaAtual() {
    if (!currentQuestion) {
      return null;
    }

    if (opcaoSelecionada === null) {
      return null;
    }

    const selectedAlternative = currentQuestion.alternatives[opcaoSelecionada];

    if (!selectedAlternative) {
      return null;
    }

    const answer: AttemptAnswerRequest = {
      questionId: Number(currentQuestion.id),
      alternativeId: Number(selectedAlternative.id),
    };

    const filteredAnswers = answers.filter(
      (item) => item.questionId !== answer.questionId,
    );

    return [...filteredAnswers, answer];
  }

  async function confirmarResposta() {
    if (!currentQuestion || opcaoSelecionada === null) {
      return;
    }

    const updatedAnswers = salvarRespostaAtual();

    if (!updatedAnswers) {
      setErrorMessage('Selecione uma alternativa válida.');
      return;
    }

    setAnswers(updatedAnswers);

    const isLastQuestion = currentQuestionIndex >= questions.length - 1;

    if (!isLastQuestion) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setOpcaoSelecionada(null);
      setErrorMessage('');
      return;
    }

    await finalizarMissao(updatedAnswers);
  }

  async function finalizarMissao(finalAnswers: AttemptAnswerRequest[]) {
    try {
      if (!id) {
        setErrorMessage('ID da missão não encontrado.');
        return;
      }

      setFinishing(true);
      setErrorMessage('');

      const attemptData = await missionService.startAttempt(id);

      const result = await missionService.finishAttempt(
        attemptData.id,
        finalAnswers,
      );

      setFinishResult(result);
    } catch (error: any) {
      const status = error?.response?.status;

      const backendMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.response?.data?.detail ||
        error?.response?.data;

      if (status === 401 || status === 403) {
        setErrorMessage('Você precisa estar logado para finalizar esta missão.');
        return;
      }

      if (status === 409) {
        setErrorMessage(
          typeof backendMessage === 'string'
            ? backendMessage
            : 'Não foi possível finalizar. Existe uma tentativa em andamento para esta missão.',
        );
        return;
      }

      setErrorMessage(
        typeof backendMessage === 'string'
          ? backendMessage
          : 'Não foi possível finalizar a missão. Tente novamente em alguns segundos.',
      );
    } finally {
      setFinishing(false);
    }
  }

  function reiniciarMissao() {
    carregarMissao();
  }

  function renderLoading() {
    return (
      <ImageBackground
        source={require('../../assets/GalaxyBG.png')}
        style={styles.container}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(2,6,23,0.6)', 'rgba(2,6,23,0.95)']}
          style={StyleSheet.absoluteFillObject}
        />

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 24,
          }}
        >
          <ActivityIndicator size="large" color={accentColor} />

          <Text style={{ color: 'white', marginTop: 12 }}>
            Carregando missão...
          </Text>
        </View>
      </ImageBackground>
    );
  }

  function renderError() {
    return (
      <ImageBackground
        source={require('../../assets/GalaxyBG.png')}
        style={styles.container}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(2,6,23,0.6)', 'rgba(2,6,23,0.95)']}
          style={StyleSheet.absoluteFillObject}
        />

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 24,
          }}
        >
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              marginBottom: 16,
              fontSize: 16,
              lineHeight: 24,
            }}
          >
            {errorMessage || 'Missão não encontrada.'}
          </Text>

          <TouchableOpacity
            onPress={reiniciarMissao}
            style={{
              paddingVertical: 12,
              paddingHorizontal: 20,
              borderRadius: 12,
              backgroundColor: accentColor,
              marginBottom: 12,
            }}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
              Tentar novamente
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={voltarParaPlaneta}>
            <Text style={{ color: accentColor }}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }

  function renderNoQuestions() {
    return (
      <ImageBackground
        source={require('../../assets/GalaxyBG.png')}
        style={styles.container}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(2,6,23,0.6)', 'rgba(2,6,23,0.95)']}
          style={StyleSheet.absoluteFillObject}
        />

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 24,
          }}
        >
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              marginBottom: 16,
              fontSize: 16,
            }}
          >
            Esta missão ainda não possui perguntas cadastradas.
          </Text>

          <TouchableOpacity onPress={voltarParaPlaneta}>
            <Text style={{ color: accentColor }}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }

  function renderResult() {
    const totalAnswers = finishResult?.answers?.length || 0;
    const totalHits =
      finishResult?.answers?.filter((answer) => answer.hit).length || 0;

    const resultPercent =
      finishResult?.result !== undefined && finishResult?.result !== null
        ? Number(finishResult.result)
        : totalAnswers > 0
          ? Math.round((totalHits / totalAnswers) * 100)
          : 0;

    const acertouTudo = resultPercent === 100;

    return (
      <ImageBackground
        source={require('../../assets/GalaxyBG.png')}
        style={styles.container}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(2,6,23,0.6)', 'rgba(2,6,23,0.95)']}
          style={StyleSheet.absoluteFillObject}
        />

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={voltarParaPlaneta}
          >
            <BlurView intensity={30} tint="dark" style={styles.iconBlur}>
              <MaterialCommunityIcons
                name="close"
                size={24}
                color={accentColor}
              />
            </BlurView>
          </TouchableOpacity>

          <Text style={[styles.headerTitle, { color: accentColor }]}>
            Resultado
          </Text>

          <View style={{ width: 45 }} />
        </View>

        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 24,
            paddingBottom: 120,
            alignItems: 'center',
          }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              width: '100%',
              maxWidth: 760,
              marginTop: 24,
            }}
          >
            <BlurView
              intensity={40}
              tint="dark"
              style={{
                borderRadius: 18,
                overflow: 'hidden',
                padding: 20,
                borderWidth: 1,
                borderColor: acertouTudo ? '#22c55e' : 'rgba(148,163,184,0.25)',
                marginBottom: 20,
              }}
            >
              <MaterialCommunityIcons
                name={acertouTudo ? 'check-circle-outline' : 'alert-circle-outline'}
                size={48}
                color={acertouTudo ? '#22c55e' : '#facc15'}
                style={{ alignSelf: 'center', marginBottom: 12 }}
              />

              <Text
                style={{
                  color: 'white',
                  fontSize: 24,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginBottom: 8,
                }}
              >
                {acertouTudo ? 'Missão concluída!' : 'Missão finalizada'}
              </Text>

              <Text
                style={{
                  color: '#cbd5e1',
                  fontSize: 16,
                  textAlign: 'center',
                  marginBottom: 16,
                }}
              >
                Você acertou {totalHits} de {totalAnswers} perguntas.
              </Text>

              <Text
                style={{
                  color: acertouTudo ? '#22c55e' : accentColor,
                  fontSize: 34,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                {resultPercent}%
              </Text>
            </BlurView>

            {finishResult?.answers?.map((answer) => (
              <View
                key={`${answer.question.id}-${answer.selection.id}`}
                style={{
                  width: '100%',
                  padding: 16,
                  borderRadius: 14,
                  marginBottom: 14,
                  backgroundColor: answer.hit
                    ? 'rgba(34,197,94,0.12)'
                    : 'rgba(239,68,68,0.12)',
                  borderWidth: 1,
                  borderColor: answer.hit ? '#22c55e' : '#ef4444',
                }}
              >
                <Text
                  style={{
                    color: answer.hit ? '#22c55e' : '#ef4444',
                    fontWeight: 'bold',
                    marginBottom: 8,
                    fontSize: 16,
                  }}
                >
                  {answer.hit ? 'Resposta correta' : 'Resposta incorreta'}
                </Text>

                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    marginBottom: 8,
                    lineHeight: 22,
                  }}
                >
                  {answer.order}. {answer.question.content}
                </Text>

                <Text style={{ color: '#cbd5e1', marginBottom: 6 }}>
                  Sua resposta: {answer.selection.content}
                </Text>

                {!answer.hit && answer.correct ? (
                  <Text style={{ color: '#cbd5e1', marginBottom: 6 }}>
                    Resposta correta: {answer.correct.content}
                  </Text>
                ) : null}

                {answer.explanation ? (
                  <Text
                    style={{
                      color: '#e2e8f0',
                      lineHeight: 22,
                      marginTop: 8,
                    }}
                  >
                    {answer.explanation}
                  </Text>
                ) : null}
              </View>
            ))}

            {!acertouTudo && (
              <TouchableOpacity
                style={[
                  styles.confirmButton,
                  {
                    backgroundColor: '#1eb6fc',
                    marginTop: 16,
                  },
                ]}
                onPress={reiniciarMissao}
              >
                <Text style={[styles.confirmButtonText, { color: '#020617' }]}>
                  Tentar novamente
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[
                styles.confirmButton,
                {
                  backgroundColor: accentColor,
                  marginTop: 16,
                },
              ]}
              onPress={voltarParaPlaneta}
            >
              <Text style={styles.confirmButtonText}>
                Voltar para o planeta
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }

  if (loading) {
    return renderLoading();
  }

  if (finishResult) {
    return renderResult();
  }

  if (errorMessage && !mission) {
    return renderError();
  }

  if (!currentQuestion) {
    return renderNoQuestions();
  }

  return (
    <ImageBackground
      source={require('../../assets/GalaxyBG.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <LinearGradient
        colors={['rgba(2,6,23,0.6)', 'rgba(2,6,23,0.95)']}
        style={StyleSheet.absoluteFillObject}
      />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={voltarParaPlaneta}>
          <BlurView intensity={30} tint="dark" style={styles.iconBlur}>
            <MaterialCommunityIcons name="close" size={24} color={accentColor} />
          </BlurView>
        </TouchableOpacity>

        <Text style={[styles.headerTitle, { color: accentColor }]}>
          {planetName} - {missionTitle}
        </Text>

        <View style={{ width: 45 }} />
      </View>

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 24,
          paddingBottom: 120,
          alignItems: 'center',
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.content,
            {
              width: '100%',
              maxWidth: 760,
            },
          ]}
        >
          <Text
            style={{
              color: '#cbd5e1',
              textAlign: 'center',
              marginBottom: 12,
            }}
          >
            {progressText}
          </Text>

          <BlurView intensity={40} tint="dark" style={styles.questionCard}>
            <Text style={styles.questionText}>{currentQuestion.content}</Text>
          </BlurView>

          <View style={styles.optionsContainer}>
            {currentQuestion.alternatives.map(
              (opcao: Alternative, index: number) => {
                const isSelected = opcaoSelecionada === index;

                return (
                  <TouchableOpacity
                    key={String(opcao.id)}
                    activeOpacity={0.8}
                    style={[
                      styles.optionButton,
                      isSelected && {
                        borderColor: accentColor,
                        backgroundColor: 'rgba(255,255,255,0.1)',
                      },
                    ]}
                    onPress={() => selecionarAlternativa(index)}
                  >
                    <View
                      style={[
                        styles.radioCircle,
                        isSelected && { borderColor: accentColor },
                      ]}
                    >
                      {isSelected && (
                        <View
                          style={[
                            styles.radioDot,
                            { backgroundColor: accentColor },
                          ]}
                        />
                      )}
                    </View>

                    <Text style={styles.optionText}>{opcao.content}</Text>
                  </TouchableOpacity>
                );
              },
            )}
          </View>

          {errorMessage ? (
            <View
              style={{
                width: '100%',
                padding: 14,
                borderRadius: 12,
                marginBottom: 18,
                backgroundColor: 'rgba(239,68,68,0.15)',
                borderWidth: 1,
                borderColor: '#ef4444',
              }}
            >
              <Text style={{ color: '#fecaca', textAlign: 'center' }}>
                {errorMessage}
              </Text>
            </View>
          ) : null}

          <TouchableOpacity
            style={[
              styles.confirmButton,
              {
                backgroundColor:
                  opcaoSelecionada !== null && !finishing
                    ? accentColor
                    : '#334155',
              },
            ]}
            disabled={opcaoSelecionada === null || finishing}
            onPress={confirmarResposta}
          >
            {finishing ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.confirmButtonText}>
                {currentQuestionIndex < questions.length - 1
                  ? 'Próxima pergunta'
                  : 'Finalizar missão'}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}