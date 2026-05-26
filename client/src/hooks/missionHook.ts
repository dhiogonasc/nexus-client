import { PlanetDetail } from "@/models/planet";
import { planetService } from "@/services/planetService";
import { useCallback, useEffect, useState } from "react";

export function useMissionById(id: number) {
  const [mission, setMission] = useState<PlanetDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchById = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    setError(null);

    try {
      const data = await planetService.getById(id);
      setMission(data);
    } catch {
      setError("Nenhum planeta encontrado!");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchById();
  }, [fetchById]);

  return { mission, loading, error, refetch: fetchById };
}
