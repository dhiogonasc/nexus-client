export type ExecutionStatus = 'UNLOCKED' | 'LOCKED' | 'COMPLETED';

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
