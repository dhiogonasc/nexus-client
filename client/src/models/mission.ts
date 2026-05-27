import { Task, TaskExecution } from "./task";

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

export interface Mission {
  id: number;
  name: string;
  description: string;
  order: number;
  execution: TaskExecution;
  content: string;
  questions: Question[];
  xpBonus: number;
  bestResult: number | null;
  planet: Task;
}
