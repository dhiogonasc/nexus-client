import { Task } from "./task";

export interface AttemptStartRequest {
  missionId: number;
}

interface Answer {
  questionId: number;
  alternativeId: number;
}

export interface Summary {
  id: number;
  content: string;
}

export interface AnswerResult {
  order: number;
  question: Summary;
  selection: Summary;
  correct?: Summary;
  hit: boolean;
  explanation: string;
}

export type AttemptFinishRequest = Answer[];

export interface AttemptResponse {
  id: number;
  startAt: string;
  endAt?: string;
  answers?: AnswerResult[];
  mission: Task;
  result?: number;
}
