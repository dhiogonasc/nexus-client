import { AttemptFinishRequest, AttemptResponse } from "@/models/attempt";
import { Mission } from "@/models/mission";
import { missionService } from "@/services/missionService";
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
  const [startedAttempt, setAttempt] = useState<AttemptResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const start = useCallback(async (missionId: number) => {
    setLoading(true);
    setError(null);

    try {
      const data = await missionService.startAttempt(missionId);
      setAttempt(data);
    } catch {
      setError("Missão em andamento ou já concluída");
      throw new Error("Erro ao iniciar missão");
    } finally {
      setLoading(false);
    }
  }, []);

  return { start, startedAttempt, loading, error };
}

export function useFinishMission() {
  const [endedAttempt, setAttempt] = useState<AttemptResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const finish = useCallback(
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

  return { finish, endedAttempt, loading, error };
}
