import React from 'react';

import { useLocalSearchParams, useRouter } from 'expo-router';

import { useMissionFlow } from './hooks/useMissionFlow';

import MissionStateScreen from './components/MissionStateScreen';
import MissionQuestion from './components/MissionQuestion';
import MissionResult from './components/MissionResult';

export default function MissionPage() {
  const router = useRouter();

  const { id, planetId } = useLocalSearchParams<{
    id?: string;
    planetId?: string;
  }>();

  const missionFlow = useMissionFlow({
    id,
    planetId,
    router,
  });

  if (missionFlow.loading) {
    return (
      <MissionStateScreen
        loading
        accentColor={missionFlow.accentColor}
        message="Carregando missão..."
      />
    );
  }

  if (missionFlow.finishResult) {
    return (
      <MissionResult
        finishResult={missionFlow.finishResult}
        accentColor={missionFlow.accentColor}
        onRetry={missionFlow.reiniciarMissao}
        onBack={missionFlow.voltarParaPlaneta}
      />
    );
  }

  if (missionFlow.errorMessage && !missionFlow.mission) {
    return (
      <MissionStateScreen
        accentColor={missionFlow.accentColor}
        message={missionFlow.errorMessage || 'Missão não encontrada.'}
        onRetry={missionFlow.reiniciarMissao}
        onBack={missionFlow.voltarParaPlaneta}
      />
    );
  }

  if (!missionFlow.currentQuestion) {
    return (
      <MissionStateScreen
        accentColor={missionFlow.accentColor}
        message="Esta missão ainda não possui perguntas cadastradas."
        onBack={missionFlow.voltarParaPlaneta}
      />
    );
  }

  return (
    <MissionQuestion
      accentColor={missionFlow.accentColor}
      planetName={missionFlow.planetName}
      missionTitle={missionFlow.missionTitle}
      progressText={missionFlow.progressText}
      currentQuestion={missionFlow.currentQuestion}
      currentQuestionIndex={missionFlow.currentQuestionIndex}
      questionsLength={missionFlow.questions.length}
      opcaoSelecionada={missionFlow.opcaoSelecionada}
      errorMessage={missionFlow.errorMessage}
      finishing={missionFlow.finishing}
      onBack={missionFlow.voltarParaPlaneta}
      onSelectAlternative={missionFlow.selecionarAlternativa}
      onConfirm={missionFlow.confirmarResposta}
    />
  );
}