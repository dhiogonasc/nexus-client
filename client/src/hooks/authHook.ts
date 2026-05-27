import { useCallback, useState } from "react";
import { router } from "expo-router";
import { authService } from "@/services/authService";
import { LoginRequestDTO, RegisterRequestDTO } from "@/models/auth";
import { storageService } from "@/services/storageService";

export function useLogin() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const login = useCallback(async (credentials: LoginRequestDTO) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const data = await authService.login(credentials);
      setSuccess(true);

      await storageService.saveToken(data.accessToken);

      router.replace("/homePage");
    } catch (err: any) {
      const status = err.response?.status;
      if (status === 401 || status === 400) {
        setError("E-mail ou senha incorretos.");
      } else {
        setError("Erro ao tentar conectar com o servidor Nexus.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return { login, loading, error, success };
}

export function useRegister() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const register = useCallback(async (registerData: RegisterRequestDTO) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await authService.register(registerData);
      setSuccess(true);

      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (err: any) {
      const status = err.response?.status;
      if (status === 409) {
        setError("Este e-mail já está cadastrado.");
      } else if (status === 400) {
        setError("Dados inválidos. Verifique os campos preenchidos.");
      } else {
        setError("Falha ao registrar nova conta. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return { register, loading, error, success };
}
