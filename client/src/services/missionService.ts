
import { PlanetDetail } from "@/models/planet";
import api from "./api";

export const missionService = {
  getById: async (id: number): Promise<PlanetDetail> => {
    const request = await api.get<PlanetDetail>(`/missions/${id}`);
    return request.data;
  },
};
