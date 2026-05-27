import { useEffect, useState } from 'react';
import { router, useRootNavigationState } from 'expo-router';

import { authService } from '@/services';
import { storage } from '@/services/storage';

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function useIndexLogin() {
  const rootNavigationState = useRootNavigationState();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!loginSuccess) return;
    if (!rootNavigationState?.key) return;

    const timer = setTimeout(() => {
      router.replace('/homePage');
    }, 1000);

    return () => clearTimeout(timer);
  }, [loginSuccess, rootNavigationState?.key]);

  function clearError() {
    setErrorMessage('');
  }

  async function handleLogin() {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = String(password);

    setErrorMessage('');

    if (!cleanEmail) {
      setErrorMessage('Digite seu e-mail.');
      return;
    }

    if (!isValidEmail(cleanEmail)) {
      setErrorMessage('Digite um e-mail válido.');
      return;
    }

    if (!cleanPassword) {
      setErrorMessage('Digite sua senha.');
      return;
    }

    try {
      setLoading(true);

      const data = await authService.login({
        email: cleanEmail,
        password: cleanPassword,
      });

      const token =
        data?.token ||
        data?.accessToken ||
        data?.jwt ||
        data?.data?.token ||
        data?.data?.accessToken ||
        data?.user?.token;

      if (!token || token === 'undefined' || token === 'null') {
        setErrorMessage(
          'Login realizado, mas o token não veio corretamente na resposta da API.',
        );
        return;
      }

      await storage.saveToken(token);

      setLoginSuccess(true);
    } catch (error: any) {
      const status = error?.response?.status;

      const backendMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.response?.data?.detail ||
        error?.response?.data;

      if (status === 401 || status === 403) {
        setErrorMessage('E-mail ou senha incorretos.');
        return;
      }

      if (typeof backendMessage === 'string') {
        setErrorMessage(backendMessage);
        return;
      }

      setErrorMessage('Não foi possível fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    loading,
    loginSuccess,
    errorMessage,
    clearError,
    handleLogin,
  };
}