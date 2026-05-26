import { PlanetDetail, TaskPayload } from "@/models";
import api from "./api";
import { Task } from "react-native";

export const getAll = async (): Promise<TaskPayload> => {
  const request = await api.get<TaskPayload>("/planets");
  return request.data;
};

export const getById = async (id: number): Promise<PlanetDetail> => {
  const request = await api.get<PlanetDetail>(`/planets/${id}`);
  return request.data;
};
