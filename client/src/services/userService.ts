import { User } from "@/models/user";
import { api } from "./api";

export const userService = {
  getMe: async (): Promise<User> => {
    const request = await api.get<User>("/me");
    return request.data;
  },
};
