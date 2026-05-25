import React from 'react';

import { useLocalSearchParams, useRouter } from 'expo-router';

import { useMissionFlow } from './hooks/useMissionFlow';

import MissionStateScreen from './components/MissionStateScreen';
import MissionQuestion from './components/MissionQuestion';
import MissionResult from './components/MissionResult';
import MissionIntro from './components/MissionIntro';

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
        hasNextMission={!!missionFlow.nextMissionId}
        onRetry={missionFlow.reiniciarMissao}
        onBack={missionFlow.voltarParaPlaneta}
        onNextMission={missionFlow.irParaProximaMissao}
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

  if (missionFlow.showIntro) {
    return (
      <MissionIntro
        planetId={planetId}
        planetName={missionFlow.planetName}
        missionTitle={missionFlow.missionTitle}
        introText={missionFlow.introText}
        questionsLength={missionFlow.questions.length}
        xpBonus={missionFlow.mission?.xpBonus || missionFlow.mission?.xp_bonus}
        onBack={missionFlow.voltarParaPlaneta}
        onStart={missionFlow.iniciarQuestoes}
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