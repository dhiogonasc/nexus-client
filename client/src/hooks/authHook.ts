import { useCallback, useState } from "react";
import { router } from "expo-router";
import { authService } from "@/services/authService";
import { LoginRequestDTO, RegisterRequestDTO } from "@/models/auth";
import { storageService } from "@/services/storageService";

function isValidEmail(value: string) {
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  if (!isValid) throw new Error("Por favor, insira um e-mail válido.");
}

export function useLogin() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const login = useCallback(async (credentials: LoginRequestDTO) => {
    if (!credentials.email || !credentials.password) {
      setError("Preencha todos os campos.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      isValidEmail(credentials.email);

      const data = await authService.login(credentials);
      setSuccess(true);

      await storageService.saveToken(data.accessToken);

      setTimeout(() => {
        router.replace("/home");
      }, 1500);
    } catch (err: any) {
      const status = err.response?.status;

      if (err instanceof Error && !status) {
        setError(err.message);
      } else if (status === 401 || status === 400) {
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
      isValidEmail(registerData.email);

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
