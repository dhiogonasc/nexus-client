import React from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { BlurView } from 'expo-blur';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { styles } from '@/styles/idMissionStyle';

import { AttemptFinishResponse } from '@/services/domain/mission.service';

import MissionBackground from './MissionBackground';
import MissionHeader from './MissionHeader';

type Props = {
  finishResult: AttemptFinishResponse;
  accentColor: string;
  hasNextMission: boolean;
  onRetry: () => void;
  onBack: () => void;
  onNextMission: () => void;
};

export default function MissionResult({
  finishResult,
  accentColor,
  hasNextMission,
  onRetry,
  onBack,
  onNextMission,
}: Props) {
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
    <MissionBackground>
      <MissionHeader
        title="Resultado"
        accentColor={accentColor}
        onBack={onBack}
      />

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
              onPress={onRetry}
            >
              <Text style={[styles.confirmButtonText, { color: '#020617' }]}>
                Tentar novamente
              </Text>
            </TouchableOpacity>
          )}

          {acertouTudo && hasNextMission && (
            <TouchableOpacity
              style={[
                styles.confirmButton,
                {
                  backgroundColor: '#22c55e',
                  marginTop: 16,
                },
              ]}
              onPress={onNextMission}
            >
              <Text style={styles.confirmButtonText}>
                Próxima missão
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
            onPress={onBack}
          >
            <Text style={styles.confirmButtonText}>
              Voltar para o planeta
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </MissionBackground>
  );
}