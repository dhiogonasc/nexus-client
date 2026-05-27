import api from "./api";
import { User } from "@/models/user";

export const userService = {
  getMe: async (): Promise<User> => {
    const request = await api.get<User>("/me");
    return request.data;
  },
};
