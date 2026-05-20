import api from '../api';

export interface Planet {
  id: string;
  name: string;
  description: string;
}

class PlanetService {
  async getAll(): Promise<Planet[]> {
    const response = await api.get('/api/planets');
    return response.data;
  }

  async getById(id: string): Promise<Planet> {
    const response = await api.get(`/api/planets/${id}`);
    return response.data;
  }
}

export default new PlanetService();