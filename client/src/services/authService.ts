import {
  LoginRequestDTO,
  LoginResponseDTO,
  RegisterRequestDTO,
} from "../models/auth";
import { api } from "./api";

export const authService = {
  login: async (credentials: LoginRequestDTO): Promise<LoginResponseDTO> => {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  },

  register: async (registerData: RegisterRequestDTO): Promise<void> => {
    await api.post("/auth/register", registerData);
  },
};
