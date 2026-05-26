import { TaskPayload } from "@/models/task";
import api from "./api";
import { PlanetDetail } from "@/models/planet";

export const planetService = {
  getAll: async (): Promise<TaskPayload> => {
    const request = await api.get<TaskPayload>("/planets");
    return request.data;
  },

  getById: async (id: number): Promise<PlanetDetail> => {
    const request = await api.get<PlanetDetail>(`/planets/${id}`);
    return request.data;
  },
};
