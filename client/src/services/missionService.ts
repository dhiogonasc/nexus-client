import { Mission } from "@/models/mission";
import { api } from "./api";
import { AttemptFinishRequest, AttemptResponse } from "@/models/attempt";

export const missionService = {
  getById: async (id: number): Promise<Mission> => {
    const request = await api.get<Mission>(`/missions/${id}`);
    return request.data;
  },

  startAttempt: async (missionId: number): Promise<AttemptResponse> => {
    const request = await api.post(
      "/attempts",
      { missionId },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return request.data;
  },

  finishAttempt: async (
    attemptId: number,
    answers: AttemptFinishRequest,
  ): Promise<AttemptResponse> => {
    const request = await api.post<AttemptResponse>(
      `/attempts/${attemptId}/finish`,
      answers,
    );
    return request.data;
  },
};
