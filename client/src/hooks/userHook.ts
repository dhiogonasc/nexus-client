import { User } from "@/models/user";
import { userService } from "@/services/userService";
import { useCallback, useEffect, useState } from "react";

interface CurrentUser {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export function useCurrentUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getMe = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await userService.getMe();
      setUser(data);
    } catch {
      setError("Nenhum usuário encontrado!");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getMe();
  }, [getMe]);

  const currentUser: CurrentUser = {
    user: user,
    loading: loading,
    error: error,
  };

  return { ...currentUser, refetch: getMe };
}
