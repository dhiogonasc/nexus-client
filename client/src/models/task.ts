export type ExecutionStatus = "UNLOCKED" | "LOCKED" | "COMPLETED";

export const STATUS_BORDER_COLORS = {
  LOCKED: "rgba(239, 68, 68, 0.4)",
  UNLOCKED: "rgba(0,0,0,0.1)",
  COMPLETED: "rgba(34, 197, 94, 0.8)",
};

export interface Task {
  id: number;
  name: string;
  description: string;
  order: number;
  execution: TaskExecution;
}

export interface TaskExecution {
  status: ExecutionStatus;
  isCurrent: boolean;
}

export interface TaskProgress {
  completed: number;
  total: number;
}

export interface TaskPayload {
  tasks: Task[];
  progress: TaskProgress;
}
