import { TaskExecution, TaskPayload } from "./task";

export interface PlanetDetail {
  id: number;
  name: string;
  description: string;
  order: number;
  execution: TaskExecution;
  content: string;
  xpBonus: number;
  missions: TaskPayload;
}
