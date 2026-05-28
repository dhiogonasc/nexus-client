import React from "react";

import { useLocalSearchParams } from "expo-router";

import PlanetStateScreen from "./components/PlanetStateScreen";
import PlanetContent from "./components/PlanetContent";
import { usePlanetById } from "@/hooks/planetHook";

export default function Planet() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { planet, loading, error } = usePlanetById(Number(id));

  if (loading) {
    return (
      <PlanetStateScreen
        loading
        message="Pousando no planeta..."
        color="#3B82F6"
      />
    );
  }

  if (error || !planet) {
    return (
      <PlanetStateScreen message={"Planeta não encontrado."} color="#406fd4" />
    );
  }

  return (
    <PlanetContent
      planeta={planet}
      missions={planet.missions}
      progress={planet.progress}
    />
  );
}
