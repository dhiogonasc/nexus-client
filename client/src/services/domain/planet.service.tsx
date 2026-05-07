export interface Planet {
    id: string;
    name: string;
    description: string;
    // Add other properties as needed
}

class PlanetService {
    private baseUrl = '/api/planets'; // Adjust base URL as needed

    async getAll(): Promise<Planet[]> {
        const response = await fetch(this.baseUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch planets');
        }
        return response.json();
    }

    async getById(id: string): Promise<Planet> {
        const response = await fetch(`${this.baseUrl}/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch planet');
        }
        return response.json();
    }
}

export default new PlanetService();