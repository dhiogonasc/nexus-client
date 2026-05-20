import api from '../api';

export interface Alternative {
  id: number;
  content: string;
}

export interface Question {
  id: number;
  content: string;
  order: number;
  alternatives: Alternative[];
}

export interface MissionDetail {
  id: number;
  name?: string;
  title?: string;
  content?: string;
  xpBonus?: number;
  bestResult?: number;
  planet?: {
    id: number;
    name: string;
    description?: string;
  };
  questions: Question[];
}

export interface AttemptStartResponse {
  id: number;
  startAt?: string;
  endAt?: string | null;
  result?: number | null;
  mission?: {
    id: number;
    name?: string;
  };
}

export interface AttemptAnswerRequest {
  questionId: number;
  alternativeId: number;
}

export interface AttemptFinishAnswer {
  order: number;
  question: {
    id: number;
    content: string;
  };
  selection: {
    id: number;
    content: string;
  };
  correct: {
    id: number;
    content: string;
  };
  hit: boolean;
  explanation?: string;
}

export interface AttemptFinishResponse {
  id: number;
  startAt?: string;
  endAt?: string;
  result?: number;
  mission?: {
    id: number;
    name?: string;
  };
  answers?: AttemptFinishAnswer[];
}

class MissionService {
  async getById(id: string | number): Promise<MissionDetail> {
    const response = await api.get(`/missions/${id}`);
    return response.data;
  }

  async startAttempt(missionId: string | number): Promise<AttemptStartResponse> {
    const response = await api.post('/attempts', {
      missionId: Number(missionId),
    });

    return response.data;
  }

  async finishAttempt(
    attemptId: string | number,
    answers: AttemptAnswerRequest[],
  ): Promise<AttemptFinishResponse> {
    const response = await api.post(`/attempts/${attemptId}/finish`, answers);
    return response.data;
  }
}

export default new MissionService();