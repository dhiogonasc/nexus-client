import React from 'react';

import { useLocalSearchParams, useRouter } from 'expo-router';

import { usePlanetDetails } from './hooks/usePlanetDetails';

import PlanetStateScreen from './components/PlanetStateScreen';
import PlanetContent from './components/PlanetContent';

export default function PlanetDetails() {
  const { id, refresh } = useLocalSearchParams<{
    id?: string;
    refresh?: string;
  }>();

  const router = useRouter();

  const planetDetails = usePlanetDetails({
    id,
    refresh,
    router,
  });

  if (planetDetails.carregando) {
    return (
      <PlanetStateScreen
        loading
        message="Pousando no planeta..."
        color="#3B82F6"
      />
    );
  }

  if (planetDetails.erro || !planetDetails.planeta) {
    return (
      <PlanetStateScreen
        message={planetDetails.erro || 'Planeta não encontrado.'}
        color="#406fd4"
        onBack={planetDetails.voltar}
      />
    );
  }

  return (
    <PlanetContent
      planeta={planetDetails.planeta}
      missions={planetDetails.missions}
      progress={planetDetails.progress}
      onBack={planetDetails.voltar}
      onOpenMission={planetDetails.abrirMissao}
    />
  );
}