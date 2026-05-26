import api from "../api";
import {
  LoginRequestDTO,
  LoginResponseDTO,
  RegisterRequestDTO,
} from "../../models/auth.types";

function getErrorMessage(error: any): string {
  const data = error?.response?.data;

  if (!data) {
    return "Não foi possível conectar ao servidor.";
  }

  if (typeof data === "string") {
    return data;
  }

  if (data.message) {
    return data.message;
  }

  if (data.error) {
    return data.error;
  }

  if (data.detail) {
    return data.detail;
  }

  if (Array.isArray(data.errors) && data.errors.length > 0) {
    return data.errors
      .map((item: any) => item.defaultMessage || item.message || String(item))
      .join("\n");
  }

  return "Erro inesperado ao processar a solicitação.";
}

export const authService = {
  login: async (credentials: LoginRequestDTO): Promise<LoginResponseDTO> => {
    try {
      const response = await api.post("/auth/login", credentials);
      return response.data;
    } catch (error: any) {
      console.error("Erro no Login:", error.response?.status, error.response?.data);
      throw error;
    }
  },

  register: async (userData: RegisterRequestDTO): Promise<void> => {
    try {
      const payload = {
        username: userData.username.trim(),
        email: userData.email.trim().toLowerCase(),
        password: String(userData.password),
      };

      await api.post("/auth/register", payload);
    } catch (error: any) {
      console.error("Erro no Registro:", error.response?.status, error.response?.data);

      const message = getErrorMessage(error);

      throw new Error(message);
    }
  },
};