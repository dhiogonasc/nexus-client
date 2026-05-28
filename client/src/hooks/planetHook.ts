import {
  FormatedTaskPayload,
  formatPlanets,
  Planet,
} from "@/models/planet";
import { planetService } from "@/services/planetService";
import { useCallback, useEffect, useState } from "react";

export function useAllPlanets() {
  const [planets, setPlanets] = useState<FormatedTaskPayload | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await planetService.getAll();
      setPlanets(formatPlanets(data));
    } catch {
      setError("Nenhum planeta encontrado!");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return { planets, loading, error, refetch: fetchAll };
}

export function usePlanetById(id: number) {
  const [planet, setPlanet] = useState<Planet | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchById = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    setError(null);

    try {
      const data = await planetService.getById(id);
      setPlanet(data);
    } catch {
      setError("Nenhum planeta encontrado!");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchById();
  }, [fetchById]);

  return { planet, loading, error, refetch: fetchById };
}
