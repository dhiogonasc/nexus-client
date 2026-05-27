import {
  AttemptFinishRequest,
  AttemptResponse,
  AttemptStartRequest,
} from "@/models/attempt";
import { Mission } from "@/models/mission";
import { missionService } from "@/services/missionService";
import { planetService } from "@/services/planetService";
import { useCallback, useEffect, useState } from "react";

export function useMissionById(id: number) {
  const [mission, setMission] = useState<Mission | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchById = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    setError(null);

    try {
      const data = await missionService.getById(id);
      setMission(data);
    } catch {
      setError("Nenhuma missão encontrada!");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchById();
  }, [fetchById]);

  return { mission, loading, error, refetch: fetchById };
}

export function useStartMission() {
  const [attempt, setAttempt] = useState<AttemptResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const startMission = useCallback(async (payload: AttemptStartRequest) => {
    setLoading(true);
    setError(null);

    try {
      const data = await missionService.startAttempt(payload);
      setAttempt(data);
    } catch {
      setError("Missão em andamento ou já concluída");
      throw new Error("Erro ao iniciar missão");
    } finally {
      setLoading(false);
    }
  }, []);

  return { startMission, attempt, loading, error };
}

export function useFinishMission() {
  const [attempt, setAttempt] = useState<AttemptResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const finishMission = useCallback(
    async (attemptId: number, answers: AttemptFinishRequest) => {
      if (!attemptId) return;

      setLoading(true);
      setError(null);

      try {
        const data = await missionService.finishAttempt(attemptId, answers);
        setAttempt(data);
      } catch {
        setError("Erro ao finalizar a missão.");
        throw new Error("Erro ao finalizar missão");
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return { finishMission, attempt, loading, error };
}
