import { TaskPayload } from "@/models/task";
import { Planet } from "@/models/planet";
import { api } from "./api";

export const planetService = {
  getAll: async (): Promise<TaskPayload> => {
    const request = await api.get<TaskPayload>("/planets");
    return request.data;
  },

  getById: async (id: number): Promise<Planet> => {
    const request = await api.get<Planet>(`/planets/${id}`);
    return request.data;
  },
};
