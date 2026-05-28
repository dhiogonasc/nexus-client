import React from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { BlurView } from 'expo-blur';

import { styles } from '@/styles/idMissionStyle';

import { Alternative, Question } from '@/services/domain/mission.service';

import MissionBackground from './MissionBackground';
import MissionHeader from './MissionHeader';

type Props = {
  accentColor: string;
  planetName: string;
  missionTitle: string;
  progressText: string;
  currentQuestion: Question;
  currentQuestionIndex: number;
  questionsLength: number;
  opcaoSelecionada: number | null;
  errorMessage: string;
  finishing: boolean;
  onBack: () => void;
  onSelectAlternative: (index: number) => void;
  onConfirm: () => void;
};

export default function MissionQuestion({
  accentColor,
  planetName,
  missionTitle,
  progressText,
  currentQuestion,
  currentQuestionIndex,
  questionsLength,
  opcaoSelecionada,
  errorMessage,
  finishing,
  onBack,
  onSelectAlternative,
  onConfirm,
}: Props) {
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
                    onPress={() => onSelectAlternative(index)}
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
            onPress={onConfirm}
          >
            {finishing ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.confirmButtonText}>
                {currentQuestionIndex < questionsLength - 1
                  ? 'Próxima pergunta'
                  : 'Finalizar missão'}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </MissionBackground>
  );
}