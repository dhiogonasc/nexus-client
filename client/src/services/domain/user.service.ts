import api from '../api';

export interface CurrentUser {
  id?: string | number;
  username?: string;
  name?: string;
  email?: string;
  xp?: number;
  level?: number;
  levelName?: string;
  createdAt?: string;
}

class UserService {
  async getMe(): Promise<CurrentUser> {
    const response = await api.get('/me');
    return response.data;
  }
}

export default new UserService();